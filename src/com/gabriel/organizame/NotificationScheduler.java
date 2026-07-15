package com.gabriel.organizame;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Calendar;
import java.util.List;

/**
 * Programa notificaciones al inicio de cada bloque (y 5 min antes)
 * usando AlarmManager.setExactAndAllowWhileIdle.
 *
 * Estrategia:
 *   - Se llama scheduleAll() cuando cambian bloques o al abrir la app.
 *   - Cancela todos los pending intents anteriores (guardados por id) y reprograma.
 *   - Guardamos la lista de ids programados en SharedPreferences para poder cancelarlos.
 */
public class NotificationScheduler {
    public static final String CHANNEL_ID = "bloques";
    public static final String CHANNEL_NAME = "Bloques";

    static final String PREFS_ALARMS = "organizame_alarms";
    static final String K_ACTIVE_IDS = "active_ids";

    public static final String EXTRA_LABEL = "label";
    public static final String EXTRA_START = "start";
    public static final String EXTRA_END = "end";
    public static final String EXTRA_COLOR = "color";
    public static final String EXTRA_CAT = "cat";
    public static final String EXTRA_IS_PRE = "is_pre"; // aviso 5 min antes
    public static final String EXTRA_NOTIF_ID = "notif_id";
    public static final String EXTRA_BLOCK_KEY = "block_key";

    public static void ensureChannel(Context ctx) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        if (nm.getNotificationChannel(CHANNEL_ID) != null) return;
        NotificationChannel ch = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, NotificationManager.IMPORTANCE_HIGH);
        ch.setDescription("Avisos al iniciar y antes de cada bloque.");
        ch.enableVibration(true);
        nm.createNotificationChannel(ch);
    }

    /** Cancela alarmas previas y programa todas las de hoy. Llamado desde el bridge JS. */
    public static void scheduleAll(Context ctx) {
        ensureChannel(ctx);
        cancelAll(ctx);

        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;

        List<DataHelper.Block> blocks = DataHelper.todayBlocks(ctx);
        long now = System.currentTimeMillis();
        JSONArray active = new JSONArray();

        for (DataHelper.Block b : blocks) {
            long startMs = todayMillisAt(b.startMin);
            String blockKey = b.startStr + "-" + b.endStr + "-" + b.label + (b.isImprevisto ? "-i" : "");

            // Aviso 5 min antes
            long preMs = startMs - 5 * 60_000L;
            if (preMs > now) {
                int id = notifId(blockKey, true);
                schedule(am, ctx, preMs, buildIntent(ctx, b, true, id, blockKey), id);
                active.put(id);
            }
            // Aviso al iniciar
            if (startMs > now) {
                int id = notifId(blockKey, false);
                schedule(am, ctx, startMs, buildIntent(ctx, b, false, id, blockKey), id);
                active.put(id);
            }
        }

        SharedPreferences sp = ctx.getSharedPreferences(PREFS_ALARMS, Context.MODE_PRIVATE);
        sp.edit().putString(K_ACTIVE_IDS, active.toString()).apply();
    }

    public static void cancelAll(Context ctx) {
        SharedPreferences sp = ctx.getSharedPreferences(PREFS_ALARMS, Context.MODE_PRIVATE);
        String s = sp.getString(K_ACTIVE_IDS, "[]");
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        try {
            JSONArray arr = new JSONArray(s);
            for (int i = 0; i < arr.length(); i++) {
                int id = arr.getInt(i);
                Intent intent = new Intent(ctx, BlockNotificationReceiver.class);
                intent.setAction("com.gabriel.organizame.BLOCK_ALARM");
                intent.setData(android.net.Uri.parse("organizame://alarm/" + id));
                PendingIntent pi = PendingIntent.getBroadcast(ctx, id, intent, piFlags(true));
                if (pi != null) am.cancel(pi);
            }
        } catch (Exception ignored) {}
        sp.edit().remove(K_ACTIVE_IDS).apply();
    }

    private static void schedule(AlarmManager am, Context ctx, long when, Intent intent, int requestCode) {
        PendingIntent pi = PendingIntent.getBroadcast(ctx, requestCode, intent, piFlags(false));
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                if (am.canScheduleExactAlarms()) {
                    am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, when, pi);
                } else {
                    am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, when, pi);
                }
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, when, pi);
            } else {
                am.setExact(AlarmManager.RTC_WAKEUP, when, pi);
            }
        } catch (SecurityException e) {
            am.set(AlarmManager.RTC_WAKEUP, when, pi);
        }
    }

    private static Intent buildIntent(Context ctx, DataHelper.Block b, boolean isPre, int id, String key) {
        Intent i = new Intent(ctx, BlockNotificationReceiver.class);
        i.setAction("com.gabriel.organizame.BLOCK_ALARM");
        i.setData(android.net.Uri.parse("organizame://alarm/" + id));
        i.putExtra(EXTRA_LABEL, b.label);
        i.putExtra(EXTRA_START, b.startStr);
        i.putExtra(EXTRA_END, b.endStr);
        i.putExtra(EXTRA_COLOR, b.color);
        i.putExtra(EXTRA_CAT, b.cat);
        i.putExtra(EXTRA_IS_PRE, isPre);
        i.putExtra(EXTRA_NOTIF_ID, id);
        i.putExtra(EXTRA_BLOCK_KEY, key);
        return i;
    }

    private static int piFlags(boolean forCancel) {
        int f = PendingIntent.FLAG_UPDATE_CURRENT;
        if (forCancel) f |= PendingIntent.FLAG_NO_CREATE;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) f |= PendingIntent.FLAG_IMMUTABLE;
        return f;
    }

    private static long todayMillisAt(int minOfDay) {
        Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR_OF_DAY, minOfDay / 60);
        c.set(Calendar.MINUTE, minOfDay % 60);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        return c.getTimeInMillis();
    }

    private static int notifId(String key, boolean isPre) {
        int h = key.hashCode() & 0x7FFFFFFF;
        return isPre ? (h | 0x40000000) : (h & ~0x40000000);
    }
}
