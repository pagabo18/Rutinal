package com.pagabo18.rutinal;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

/**
 * Pasos del día con el contador de pasos del teléfono (Sensor.TYPE_STEP_COUNTER).
 *
 * El sensor entrega los pasos acumulados desde que se encendió el teléfono y sigue
 * contando aunque la app esté cerrada. Aquí se guarda la última lectura y, en cada
 * lectura nueva, la diferencia se suma al día que corresponde. Se lee al abrir la
 * app, cada hora, poco antes de medianoche (para cerrar bien el día) y cuando se
 * refrescan los widgets. No usa servicio en primer plano ni internet.
 */
public class StepCounter {
    public static final String PERM = "android.permission.ACTIVITY_RECOGNITION";
    public static final int REQ_PERM = 102;
    private static final String PREFS = "rutinal_steps";
    private static final int RC_HOURLY = 9301, RC_MIDNIGHT = 9302;
    private static final int KEEP_DAYS = 40;

    private static SharedPreferences sp(Context ctx) {
        return ctx.getApplicationContext().getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    public static boolean hasSensor(Context ctx) {
        try {
            SensorManager sm = (SensorManager) ctx.getSystemService(Context.SENSOR_SERVICE);
            return sm != null && sm.getDefaultSensor(Sensor.TYPE_STEP_COUNTER) != null;
        } catch (Exception e) {
            return false;
        }
    }

    public static boolean hasPermission(Context ctx) {
        return Build.VERSION.SDK_INT < 29 || ctx.checkSelfPermission(PERM) == PackageManager.PERMISSION_GRANTED;
    }

    public static boolean isOn(Context ctx) {
        return sp(ctx).getBoolean("on", false);
    }

    /** Enciende o apaga el conteo. Al apagar se olvida la última lectura (no se suman pasos del tiempo apagado). */
    public static void setOn(Context ctx, boolean on) {
        SharedPreferences.Editor e = sp(ctx).edit().putBoolean("on", on);
        if (!on) e.remove("last").remove("lastTs");
        e.apply();
        if (on) schedule(ctx); else cancel(ctx);
    }

    static String day(long ms) {
        Calendar c = Calendar.getInstance();
        c.setTimeInMillis(ms);
        return String.format(Locale.US, "%04d-%02d-%02d", c.get(Calendar.YEAR), c.get(Calendar.MONTH) + 1, c.get(Calendar.DAY_OF_MONTH));
    }

    static long startOfDay(long ms) {
        Calendar c = Calendar.getInstance();
        c.setTimeInMillis(ms);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        return c.getTimeInMillis();
    }

    /**
     * Reparte una lectura nueva entre los días. `days` es { "2026-11-27": pasos }.
     * Devuelve el mapa actualizado. Sin estado de Android: se puede probar suelto.
     *
     * @param last   lectura anterior (-1 si no hay)
     * @param lastTs cuándo fue la lectura anterior
     * @param cum    pasos acumulados desde el arranque
     */
    static JSONObject apply(JSONObject days, long last, long lastTs, long cum, long now) throws Exception {
        String today = day(now);
        if (!days.has(today)) days.put(today, 0);
        if (last < 0 || lastTs <= 0 || now < lastTs) return days; // primera lectura: se empieza a contar desde aquí
        long delta = cum - last;
        if (delta < 0) delta = cum;        // el teléfono se reinició: el contador volvió a cero
        if (delta <= 0 || delta > 150000) return days; // nada nuevo o lectura absurda
        String lastDay = day(lastTs);
        if (lastDay.equals(today)) {
            days.put(today, days.optLong(today, 0) + delta);
            return days;
        }
        // La diferencia cruza la medianoche: se reparte según el tiempo de cada lado.
        // Con la lectura de poco antes de medianoche casi todo queda en el día correcto.
        long mid = startOfDay(now), gap = now - lastTs;
        double fracPrev = gap > 0 ? Math.max(0, Math.min(1, (double) (mid - lastTs) / gap)) : 0;
        long prevPart = Math.round(delta * fracPrev);
        String yesterday = day(mid - 1);
        if (lastDay.equals(yesterday)) days.put(yesterday, days.optLong(yesterday, 0) + prevPart);
        days.put(today, days.optLong(today, 0) + (delta - prevPart));
        return days;
    }

    private static void prune(JSONObject days, long now) {
        String min = day(now - KEEP_DAYS * 86400000L);
        List<String> drop = new ArrayList<String>();
        for (Iterator<String> it = days.keys(); it.hasNext(); ) {
            String k = it.next();
            if (k.compareTo(min) < 0) drop.add(k);
        }
        for (String k : drop) days.remove(k);
    }

    static synchronized void record(Context ctx, long cum, long now) {
        try {
            SharedPreferences p = sp(ctx);
            JSONObject days = new JSONObject(p.getString("days", "{}"));
            apply(days, p.getLong("last", -1), p.getLong("lastTs", 0), cum, now);
            prune(days, now);
            p.edit().putString("days", days.toString()).putLong("last", cum).putLong("lastTs", now).apply();
        } catch (Exception ignored) {}
    }

    /** Lee el sensor una vez y guarda. `after` corre siempre al terminar (hilo principal). */
    public static void sample(Context context, final Runnable after) {
        final Context ctx = context.getApplicationContext();
        final Handler h = new Handler(Looper.getMainLooper());
        try {
            if (!isOn(ctx) || !hasPermission(ctx)) { if (after != null) h.post(after); return; }
            final SensorManager sm = (SensorManager) ctx.getSystemService(Context.SENSOR_SERVICE);
            final Sensor s = sm == null ? null : sm.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
            if (s == null) { if (after != null) h.post(after); return; }
            final boolean[] done = {false};
            final SensorEventListener l = new SensorEventListener() {
                @Override public void onSensorChanged(SensorEvent e) {
                    if (done[0]) return;
                    done[0] = true;
                    try { sm.unregisterListener(this); } catch (Exception ignored) {}
                    if (e != null && e.values != null && e.values.length > 0) record(ctx, (long) e.values[0], System.currentTimeMillis());
                    if (after != null) after.run();
                }
                @Override public void onAccuracyChanged(Sensor sensor, int accuracy) {}
            };
            if (!sm.registerListener(l, s, SensorManager.SENSOR_DELAY_NORMAL, h)) { if (after != null) h.post(after); return; }
            h.postDelayed(new Runnable() {
                @Override public void run() {
                    if (done[0]) return;
                    done[0] = true;
                    try { sm.unregisterListener(l); } catch (Exception ignored) {}
                    if (after != null) after.run();
                }
            }, 4000);
        } catch (Exception e) {
            if (after != null) h.post(after);
        }
    }

    /** Lo que ve la app: { sensor, perm, on, today, days: { fecha: pasos }, ts }. */
    public static String info(Context ctx) {
        try {
            SharedPreferences p = sp(ctx);
            JSONObject o = new JSONObject();
            JSONObject days = new JSONObject(p.getString("days", "{}"));
            o.put("sensor", hasSensor(ctx));
            o.put("perm", hasPermission(ctx));
            o.put("on", p.getBoolean("on", false));
            o.put("today", days.optLong(day(System.currentTimeMillis()), 0));
            o.put("days", days);
            o.put("ts", p.getLong("lastTs", 0));
            return o.toString();
        } catch (Exception e) {
            return "{}";
        }
    }

    // ---------- lecturas con la app cerrada ----------

    private static PendingIntent pi(Context ctx, int rc) {
        Intent i = new Intent(ctx, StepsReceiver.class).setAction(StepsReceiver.ACTION);
        int f = PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0);
        return PendingIntent.getBroadcast(ctx, rc, i, f);
    }

    /** Una lectura por hora (sin despertar de más) y otra poco antes de medianoche. */
    public static void schedule(Context ctx) {
        try {
            if (!isOn(ctx)) return;
            AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
            if (am == null) return;
            long now = System.currentTimeMillis();
            am.setInexactRepeating(AlarmManager.RTC_WAKEUP, now + AlarmManager.INTERVAL_HOUR, AlarmManager.INTERVAL_HOUR, pi(ctx, RC_HOURLY));
            long at = startOfDay(now) + 86400000L - 150000L; // 23:57:30
            if (at <= now + 5000) at += 86400000L;
            if (Build.VERSION.SDK_INT >= 23) am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi(ctx, RC_MIDNIGHT));
            else am.set(AlarmManager.RTC_WAKEUP, at, pi(ctx, RC_MIDNIGHT));
        } catch (Exception ignored) {}
    }

    private static void cancel(Context ctx) {
        try {
            AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
            if (am == null) return;
            am.cancel(pi(ctx, RC_HOURLY));
            am.cancel(pi(ctx, RC_MIDNIGHT));
        } catch (Exception ignored) {}
    }
}
