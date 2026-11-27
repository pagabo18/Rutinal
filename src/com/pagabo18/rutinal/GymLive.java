package com.pagabo18.rutinal;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.PictureInPictureParams;
import android.app.RemoteAction;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.drawable.Icon;
import android.net.Uri;
import android.os.Build;
import android.util.Rational;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * Entrenamiento en vivo: el JS manda una "foto" del entrenamiento en curso
 * (series pendientes en orden, descanso y textos ya traducidos) con
 * Android.setGymLive(json). Con eso se muestra:
 *  - una notificación fija visible en la pantalla de bloqueo, con
 *    cuenta regresiva del descanso y botones Serie hecha / +30 s / Saltar;
 *  - el widget "Entrenamiento" de la pantalla de inicio;
 *  - las acciones de la ventana flotante (picture-in-picture).
 * Los botones avanzan la foto aquí mismo (para que se vea al instante) y
 * encolan la acción para que el JS la registre en gym_logs.
 * Nada de esta clase lanza excepciones hacia afuera.
 */
public class GymLive {
    public static final String K_LIVE = "gym_live";
    public static final String CH_LIVE = "gym_live";
    public static final String CH_ALERT = "gym_rest_alert";
    public static final int NOTIF_ID = 77001;
    public static final int NOTIF_ALERT_ID = 77002;
    public static final String ACTION = "com.pagabo18.rutinal.GYM_LIVE";
    public static final String EXTRA_A = "a"; // done | plus | skip | rest_end

    private static final int RC_DONE = 7701, RC_PLUS = 7702, RC_SKIP = 7703, RC_ALARM = 7704, RC_OPEN = 7705;

    // ---------- estado ----------

    public static JSONObject load(Context ctx) {
        try {
            SharedPreferences sp = ctx.getSharedPreferences(WebAppInterface.PREFS, Context.MODE_PRIVATE);
            return new JSONObject(sp.getString(K_LIVE, "{}"));
        } catch (Exception e) {
            return new JSONObject();
        }
    }

    public static void save(Context ctx, JSONObject s) {
        try {
            SharedPreferences sp = ctx.getSharedPreferences(WebAppInterface.PREFS, Context.MODE_PRIVATE);
            sp.edit().putString(K_LIVE, s.toString()).commit();
        } catch (Exception ignored) {}
    }

    /** Hay un entrenamiento empezado, sin terminar y no abandonado. */
    public static boolean isActive(JSONObject s) {
        return s != null && s.optBoolean("active", false)
                && s.optLong("exp", 0) > System.currentTimeMillis();
    }

    /** Además el usuario no apagó "Mostrar en pantalla de bloqueo". */
    public static boolean showsNotification(JSONObject s) {
        return isActive(s) && s.optBoolean("on", true);
    }

    static String label(JSONObject s, String key, String def) {
        JSONObject L = s.optJSONObject("L");
        String v = L != null ? L.optString(key, "") : "";
        return v.isEmpty() ? def : v;
    }

    /** Descanso vigente (fin en ms) o 0. */
    public static long restEnd(JSONObject s) {
        JSONObject r = s.optJSONObject("rest");
        if (r == null) return 0;
        long end = r.optLong("end", 0);
        return end > System.currentTimeMillis() ? end : 0;
    }

    public static JSONObject nextItem(JSONObject s) {
        JSONArray q = s.optJSONArray("queue");
        return q != null && q.length() > 0 ? q.optJSONObject(0) : null;
    }

    /** Rutina programada para hoy (cuando no hay entrenamiento en curso). */
    public static JSONObject todayInfo(JSONObject s) {
        JSONObject week = s.optJSONObject("week");
        if (week == null) return null;
        int dow = Calendar.getInstance().get(Calendar.DAY_OF_WEEK) - 1; // 0 = domingo
        return week.optJSONObject(String.valueOf(dow));
    }

    // ---------- JS -> nativo ----------

    public static void setFromJs(Context ctx, String json) {
        try {
            JSONObject s = new JSONObject(json);
            save(ctx, s);
            update(ctx);
        } catch (Exception ignored) {}
    }

    // ---------- acciones de botones ----------

    public static void apply(Context ctx, String a) {
        try {
            JSONObject s = load(ctx);
            if (!isActive(s)) { update(ctx); return; }
            long now = System.currentTimeMillis();
            JSONObject action = new JSONObject();
            if ("done".equals(a)) {
                JSONArray q = s.optJSONArray("queue");
                if (q == null || q.length() == 0) return;
                JSONObject it = q.optJSONObject(0);
                JSONArray rest = new JSONArray();
                for (int i = 1; i < q.length(); i++) rest.put(q.get(i));
                s.put("queue", rest);
                s.put("done", s.optInt("done", 0) + 1);
                int sec = it.optInt("r", 0);
                long end = 0;
                if (sec > 0 && rest.length() > 0) {
                    end = now + sec * 1000L;
                    JSONObject r = new JSONObject();
                    r.put("end", end);
                    r.put("total", sec);
                    s.put("rest", r);
                } else {
                    s.put("rest", JSONObject.NULL);
                }
                action.put("t", "gym_set");
                action.put("date", s.optString("date"));
                action.put("rid", s.optString("rid"));
                action.put("ex", it.optString("ex"));
                action.put("i", it.optInt("i"));
                action.put("rest", end);
            } else if ("plus".equals(a)) {
                long end = restEnd(s);
                JSONObject r = s.optJSONObject("rest");
                if (end == 0 || r == null) return;
                end += 30_000L;
                r.put("end", end);
                r.put("total", r.optInt("total", 0) + 30);
                action.put("t", "gym_rest");
                action.put("end", end);
            } else if ("skip".equals(a)) {
                s.put("rest", JSONObject.NULL);
                action.put("t", "gym_rest");
                action.put("end", 0);
            } else if ("rest_end".equals(a)) {
                // Alarma de fin de descanso: avisar con vibración y quitar la cuenta
                long end = 0;
                JSONObject r = s.optJSONObject("rest");
                if (r != null) end = r.optLong("end", 0);
                if (end == 0 || end > now + 2000) { update(ctx); return; }
                s.put("rest", JSONObject.NULL);
                save(ctx, s);
                if (s.optBoolean("on", true)) alertRestOver(ctx, s);
                update(ctx, true);
                return;
            } else {
                return;
            }
            save(ctx, s);
            WidgetActionQueue.append(ctx, action);
            update(ctx, true);
        } catch (Exception ignored) {}
    }

    // ---------- presentación ----------

    /** Notificación, widget, alarma de descanso y ventana flotante. */
    public static void update(Context ctx) { update(ctx, false); }

    /** fromButton: lo pidió un botón nativo, así que el JS debe aplicar la acción ya. */
    public static void update(Context ctx, boolean fromButton) {
        JSONObject s = load(ctx);
        try { scheduleRestAlarm(ctx, s); } catch (Exception ignored) {}
        try { showNotification(ctx, s); } catch (Exception ignored) {}
        try { GymWidgetProvider.refreshAll(ctx); } catch (Exception ignored) {}
        try { MainActivity.refreshPip(fromButton); } catch (Throwable ignored) {}
    }

    static void ensureChannels(Context ctx) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        if (nm.getNotificationChannel(CH_LIVE) == null) {
            NotificationChannel ch = new NotificationChannel(CH_LIVE, "Entrenamiento en curso", NotificationManager.IMPORTANCE_LOW);
            ch.setDescription("Ejercicio que sigue y descanso, visible en la pantalla de bloqueo");
            ch.setShowBadge(false);
            ch.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
            ch.setSound(null, null);
            ch.enableVibration(false);
            nm.createNotificationChannel(ch);
        }
        if (nm.getNotificationChannel(CH_ALERT) == null) {
            NotificationChannel ch = new NotificationChannel(CH_ALERT, "Fin del descanso", NotificationManager.IMPORTANCE_HIGH);
            ch.setDescription("Aviso con vibración cuando termina el descanso entre series");
            ch.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
            ch.enableVibration(true);
            ch.setVibrationPattern(new long[]{0, 250, 150, 250});
            nm.createNotificationChannel(ch);
        }
    }

    static int piFlags() {
        int f = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) f |= PendingIntent.FLAG_IMMUTABLE;
        return f;
    }

    public static PendingIntent actionIntent(Context ctx, String a) {
        Intent i = new Intent(ctx, GymLiveReceiver.class);
        i.setAction(ACTION);
        i.setData(Uri.parse("rutinal://gym_live/" + a));
        i.putExtra(EXTRA_A, a);
        int rc = "done".equals(a) ? RC_DONE : "plus".equals(a) ? RC_PLUS : "skip".equals(a) ? RC_SKIP : RC_ALARM;
        return PendingIntent.getBroadcast(ctx, rc, i, piFlags());
    }

    public static PendingIntent openIntent(Context ctx) {
        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        open.setData(Uri.parse("rutinal://open/gym_live"));
        open.putExtra("open_tab", "gym_live");
        return PendingIntent.getActivity(ctx, RC_OPEN, open, piFlags());
    }

    private static Notification.Builder builder(Context ctx, String channel) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) return new Notification.Builder(ctx, channel);
        return new Notification.Builder(ctx);
    }

    private static void showNotification(Context ctx, JSONObject s) {
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        if (!showsNotification(s)) {
            nm.cancel(NOTIF_ID);
            nm.cancel(NOTIF_ALERT_ID);
            return;
        }
        ensureChannels(ctx);
        long now = System.currentTimeMillis();
        String name = s.optString("name", "Gym");
        int done = s.optInt("done", 0), total = Math.max(1, s.optInt("total", 1));
        JSONObject it = nextItem(s);
        long end = restEnd(s);

        Notification.Builder b = builder(ctx, CH_LIVE);
        b.setSmallIcon(R.drawable.ic_notif)
         .setOngoing(true)
         .setOnlyAlertOnce(true)
         .setShowWhen(false)
         .setColor(Color.parseColor("#18181B"))
         .setContentIntent(openIntent(ctx))
         .setCategory("workout")
         .setVisibility(Notification.VISIBILITY_PUBLIC)
         .setSubText(name + " · " + done + "/" + total)
         .setProgress(total, Math.min(done, total), false);
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) b.setPriority(Notification.PRIORITY_LOW);
        long exp = s.optLong("exp", 0);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && exp > now) b.setTimeoutAfter(exp - now);

        if (it == null) {
            b.setContentTitle(label(s, "fin", "¡Listo! Abre la app para terminar."))
             .setContentText(name);
        } else {
            String ex = it.optString("n"), set = it.optString("s"), tgt = it.optString("t");
            String line = set + (tgt.isEmpty() ? "" : " · " + tgt);
            if (end > 0) {
                b.setShowWhen(true)
                 .setUsesChronometer(true)
                 .setWhen(end)
                 .setContentTitle(label(s, "rest", "Descanso") + " · " + label(s, "next", "Sigue") + ": " + ex)
                 .setContentText(line)
                 .setStyle(new Notification.BigTextStyle().bigText(ex + "\n" + line));
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) b.setChronometerCountDown(true);
                b.addAction(new Notification.Action.Builder(R.drawable.ic_notif_snooze, label(s, "plus", "+30 s"), actionIntent(ctx, "plus")).build());
                b.addAction(new Notification.Action.Builder(R.drawable.ic_notif_snooze, label(s, "skip", "Saltar"), actionIntent(ctx, "skip")).build());
            } else {
                b.setContentTitle(ex)
                 .setContentText(line)
                 .setStyle(new Notification.BigTextStyle().bigText(line));
            }
            b.addAction(new Notification.Action.Builder(R.drawable.ic_notif_check, label(s, "done", "Serie hecha"), actionIntent(ctx, "done")).build());
        }
        // Android 16+: se pide que sea una "actualización en vivo" (Live Update). En Samsung con One UI 8
        // sale en la Now Bar de la pantalla de bloqueo; en otros, como chip en la barra de estado.
        // En versiones anteriores estos extras se ignoran.
        try {
            android.os.Bundle ex = new android.os.Bundle();
            ex.putBoolean("android.requestPromotedOngoing", true);
            if (end <= 0) ex.putString("android.shortCriticalText", done + "/" + total);
            b.addExtras(ex);
        } catch (Exception ignored) {}
        nm.notify(NOTIF_ID, b.build());
    }

    private static void alertRestOver(Context ctx, JSONObject s) {
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null || !isActive(s)) return;
        ensureChannels(ctx);
        JSONObject it = nextItem(s);
        if (it == null) return;
        String text = it.optString("n") + " · " + it.optString("s") + (it.optString("t").isEmpty() ? "" : " · " + it.optString("t"));
        Notification.Builder b = builder(ctx, CH_ALERT);
        b.setSmallIcon(R.drawable.ic_notif)
         .setContentTitle(label(s, "go", "¡A la siguiente serie!"))
         .setContentText(text)
         .setAutoCancel(true)
         .setColor(Color.parseColor("#18181B"))
         .setContentIntent(openIntent(ctx))
         .setCategory(Notification.CATEGORY_ALARM)
         .setVisibility(Notification.VISIBILITY_PUBLIC)
         .setVibrate(new long[]{0, 250, 150, 250});
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) b.setPriority(Notification.PRIORITY_HIGH);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) b.setTimeoutAfter(20_000L);
        b.addAction(new Notification.Action.Builder(R.drawable.ic_notif_check, label(s, "done", "Serie hecha"), actionIntent(ctx, "done")).build());
        nm.notify(NOTIF_ALERT_ID, b.build());
    }

    private static void scheduleRestAlarm(Context ctx, JSONObject s) {
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        PendingIntent pi = actionIntent(ctx, "rest_end");
        long end = isActive(s) ? restEnd(s) : 0;
        if (end == 0) { am.cancel(pi); return; }
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && !am.canScheduleExactAlarms()) {
                am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, end, pi);
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, end, pi);
            } else {
                am.setExact(AlarmManager.RTC_WAKEUP, end, pi);
            }
        } catch (SecurityException e) {
            am.set(AlarmManager.RTC_WAKEUP, end, pi);
        }
    }

    // ---------- ventana flotante (picture-in-picture) ----------

    public static PictureInPictureParams pipParams(Context ctx) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return null;
        JSONObject s = load(ctx);
        List<RemoteAction> acts = new ArrayList<>();
        if (isActive(s) && nextItem(s) != null) {
            if (restEnd(s) > 0) {
                acts.add(new RemoteAction(Icon.createWithResource(ctx, R.drawable.ic_gym_plus),
                        label(s, "plus", "+30 s"), label(s, "plus", "+30 s"), actionIntent(ctx, "plus")));
                acts.add(new RemoteAction(Icon.createWithResource(ctx, R.drawable.ic_gym_skip),
                        label(s, "skip", "Saltar"), label(s, "skip", "Saltar"), actionIntent(ctx, "skip")));
            }
            acts.add(new RemoteAction(Icon.createWithResource(ctx, R.drawable.ic_notif_check),
                    label(s, "done", "Serie hecha"), label(s, "done", "Serie hecha"), actionIntent(ctx, "done")));
        }
        return new PictureInPictureParams.Builder()
                .setAspectRatio(new Rational(4, 3))
                .setActions(acts)
                .build();
    }
}
