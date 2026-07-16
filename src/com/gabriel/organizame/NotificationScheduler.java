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

import java.util.Calendar;
import java.util.List;

/**
 * Programa notificaciones de bloques (pre / inicio / fin) y de Pomodoro.
 */
public class NotificationScheduler {
    public static final String CHANNEL_ID = "bloques";
    public static final String CHANNEL_NAME = "Bloques";
    public static final String CHANNEL_POMO_ID = "pomodoro";
    public static final String CHANNEL_POMO_NAME = "Pomodoro";
    public static final String CHANNEL_HABITS_ID = "habits_reminder";
    public static final String CHANNEL_HABITS_NAME = "Recordatorio de hábitos";

    static final String PREFS_ALARMS = "organizame_alarms";
    static final String K_ACTIVE_IDS = "active_ids";
    static final String K_POMO_ID = "pomo_id";
    static final String K_HABIT_TIME = "habit_reminder_hhmm"; // "HH:mm" o vacío
    static final String K_DND_AUTO = "dnd_auto";
    static final String K_DND_PREV_FILTER = "dnd_prev_filter";
    public static final int HABIT_ALARM_ID = 0x60000001;

    public static final String EXTRA_LABEL = "label";
    public static final String EXTRA_START = "start";
    public static final String EXTRA_END = "end";
    public static final String EXTRA_COLOR = "color";
    public static final String EXTRA_CAT = "cat";
    public static final String EXTRA_KIND = "kind"; // "pre" | "start" | "end"
    public static final String EXTRA_NOTIF_ID = "notif_id";
    public static final String EXTRA_BLOCK_KEY = "block_key";

    public static final String EXTRA_POMO_PHASE = "pomo_phase"; // focus | short | long
    public static final String EXTRA_POMO_NEXT = "pomo_next";
    public static final String EXTRA_POMO_CYCLE = "pomo_cycle";

    public static void ensureChannel(Context ctx) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        if (nm.getNotificationChannel(CHANNEL_ID) == null) {
            NotificationChannel ch = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, NotificationManager.IMPORTANCE_HIGH);
            ch.setDescription("Avisos al iniciar, terminar y antes de cada bloque.");
            ch.enableVibration(true);
            nm.createNotificationChannel(ch);
        }
        if (nm.getNotificationChannel(CHANNEL_POMO_ID) == null) {
            NotificationChannel ch = new NotificationChannel(CHANNEL_POMO_ID, CHANNEL_POMO_NAME, NotificationManager.IMPORTANCE_HIGH);
            ch.setDescription("Avisos de Pomodoro al terminar cada fase.");
            ch.enableVibration(true);
            nm.createNotificationChannel(ch);
        }
        ensureHabitChannel(ctx);
    }

    public static void ensureHabitChannel(Context ctx) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        if (nm.getNotificationChannel(CHANNEL_HABITS_ID) != null) return;
        NotificationChannel ch = new NotificationChannel(CHANNEL_HABITS_ID, CHANNEL_HABITS_NAME, NotificationManager.IMPORTANCE_LOW);
        ch.setDescription("Recordatorio diario suave de hábitos. Sin sonido ni vibración.");
        ch.enableVibration(false);
        ch.setSound(null, null);
        ch.setShowBadge(false);
        nm.createNotificationChannel(ch);
    }

    // ----- Recordatorio de hábitos -----

    /** Guarda la hora y programa la próxima. hhmm vacío o null cancela. */
    public static void setHabitReminderTime(Context ctx, String hhmm) {
        SharedPreferences sp = ctx.getSharedPreferences(PREFS_ALARMS, Context.MODE_PRIVATE);
        if (hhmm == null || hhmm.isEmpty()) {
            sp.edit().remove(K_HABIT_TIME).apply();
            cancelHabitReminder(ctx);
        } else {
            sp.edit().putString(K_HABIT_TIME, hhmm).apply();
            scheduleHabitReminder(ctx);
        }
    }

    public static String getHabitReminderTime(Context ctx) {
        SharedPreferences sp = ctx.getSharedPreferences(PREFS_ALARMS, Context.MODE_PRIVATE);
        return sp.getString(K_HABIT_TIME, "");
    }

    // ----- No Molestar automático -----

    public static void setDndAuto(Context ctx, boolean enabled) {
        SharedPreferences sp = ctx.getSharedPreferences(PREFS_ALARMS, Context.MODE_PRIVATE);
        sp.edit().putBoolean(K_DND_AUTO, enabled).apply();
    }

    public static boolean getDndAuto(Context ctx) {
        SharedPreferences sp = ctx.getSharedPreferences(PREFS_ALARMS, Context.MODE_PRIVATE);
        return sp.getBoolean(K_DND_AUTO, false);
    }

    /** Activa No Molestar (solo prioridad) y guarda el filtro previo. */
    public static void enableDnd(Context ctx) {
        if (!getDndAuto(ctx)) return;
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return;
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null || !nm.isNotificationPolicyAccessGranted()) return;
        try {
            int prev = nm.getCurrentInterruptionFilter();
            SharedPreferences sp = ctx.getSharedPreferences(PREFS_ALARMS, Context.MODE_PRIVATE);
            sp.edit().putInt(K_DND_PREV_FILTER, prev).apply();
            nm.setInterruptionFilter(NotificationManager.INTERRUPTION_FILTER_PRIORITY);
        } catch (Exception ignored) {}
    }

    /** Restaura el filtro previo (o ALL si no se guardó). */
    public static void disableDnd(Context ctx) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return;
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null || !nm.isNotificationPolicyAccessGranted()) return;
        try {
            SharedPreferences sp = ctx.getSharedPreferences(PREFS_ALARMS, Context.MODE_PRIVATE);
            int prev = sp.getInt(K_DND_PREV_FILTER, NotificationManager.INTERRUPTION_FILTER_ALL);
            if (prev == 0) prev = NotificationManager.INTERRUPTION_FILTER_ALL;
            nm.setInterruptionFilter(prev);
            sp.edit().remove(K_DND_PREV_FILTER).apply();
        } catch (Exception ignored) {}
    }

    /** Devuelve true si esta categoría debe activar DND automático. */
    public static boolean isFocusCategory(String cat) {
        if (cat == null) return false;
        String c = cat.toLowerCase();
        return c.equals("trabajo") || c.equals("enfoque") || c.equals("focus");
    }

    public static void scheduleHabitReminder(Context ctx) {
        ensureHabitChannel(ctx);
        String hhmm = getHabitReminderTime(ctx);
        if (hhmm == null || hhmm.isEmpty()) return;
        int colon = hhmm.indexOf(':');
        if (colon < 0) return;
        int hh, mm;
        try {
            hh = Integer.parseInt(hhmm.substring(0, colon));
            mm = Integer.parseInt(hhmm.substring(colon + 1));
        } catch (Exception e) { return; }

        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;

        Calendar target = Calendar.getInstance();
        target.set(Calendar.HOUR_OF_DAY, hh);
        target.set(Calendar.MINUTE, mm);
        target.set(Calendar.SECOND, 0);
        target.set(Calendar.MILLISECOND, 0);
        if (target.getTimeInMillis() <= System.currentTimeMillis()) {
            target.add(Calendar.DAY_OF_YEAR, 1);
        }

        Intent i = new Intent(ctx, HabitReminderReceiver.class);
        i.setAction("com.gabriel.organizame.HABIT_REMINDER");
        i.setData(android.net.Uri.parse("organizame://habit/" + HABIT_ALARM_ID));
        schedule(am, ctx, target.getTimeInMillis(), i, HABIT_ALARM_ID);
    }

    public static void cancelHabitReminder(Context ctx) {
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        Intent i = new Intent(ctx, HabitReminderReceiver.class);
        i.setAction("com.gabriel.organizame.HABIT_REMINDER");
        i.setData(android.net.Uri.parse("organizame://habit/" + HABIT_ALARM_ID));
        PendingIntent pi = PendingIntent.getBroadcast(ctx, HABIT_ALARM_ID, i, piFlags(true));
        if (pi != null) am.cancel(pi);
    }

    /** Cancela alarmas previas y programa todas las de hoy. */
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
            long endMs = todayMillisAt(b.endMin);
            String blockKey = b.startStr + "-" + b.endStr + "-" + b.label + (b.isImprevisto ? "-i" : "");

            // Aviso 5 min antes
            long preMs = startMs - 5 * 60_000L;
            if (preMs > now) {
                int id = notifId(blockKey, "pre");
                schedule(am, ctx, preMs, buildIntent(ctx, b, "pre", id, blockKey), id);
                active.put(id);
            }
            // Aviso al iniciar
            if (startMs > now) {
                int id = notifId(blockKey, "start");
                schedule(am, ctx, startMs, buildIntent(ctx, b, "start", id, blockKey), id);
                active.put(id);
            }
            // Aviso al terminar
            if (endMs > now) {
                int id = notifId(blockKey, "end");
                schedule(am, ctx, endMs, buildIntent(ctx, b, "end", id, blockKey), id);
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

    // ----- Pomodoro -----

    public static void schedulePomo(Context ctx, String phase, String nextPhase, int cycle, long endMs) {
        ensureChannel(ctx);
        cancelPomo(ctx);
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        if (endMs <= System.currentTimeMillis()) return;

        int id = 0x50000000 | ((int) (endMs / 1000) & 0x0FFFFFFF);
        Intent i = new Intent(ctx, PomoNotificationReceiver.class);
        i.setAction("com.gabriel.organizame.POMO_ALARM");
        i.setData(android.net.Uri.parse("organizame://pomo/" + id));
        i.putExtra(EXTRA_POMO_PHASE, phase);
        i.putExtra(EXTRA_POMO_NEXT, nextPhase);
        i.putExtra(EXTRA_POMO_CYCLE, cycle);
        i.putExtra(EXTRA_NOTIF_ID, id);
        schedule(am, ctx, endMs, i, id);

        SharedPreferences sp = ctx.getSharedPreferences(PREFS_ALARMS, Context.MODE_PRIVATE);
        sp.edit().putInt(K_POMO_ID, id).apply();
    }

    public static void cancelPomo(Context ctx) {
        SharedPreferences sp = ctx.getSharedPreferences(PREFS_ALARMS, Context.MODE_PRIVATE);
        int id = sp.getInt(K_POMO_ID, 0);
        if (id == 0) return;
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        Intent i = new Intent(ctx, PomoNotificationReceiver.class);
        i.setAction("com.gabriel.organizame.POMO_ALARM");
        i.setData(android.net.Uri.parse("organizame://pomo/" + id));
        PendingIntent pi = PendingIntent.getBroadcast(ctx, id, i, piFlags(true));
        if (pi != null) am.cancel(pi);
        // Descartar cualquier notificación pomodoro visible
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm != null) nm.cancel(id);
        sp.edit().remove(K_POMO_ID).apply();
    }

    // ----- helpers -----

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

    private static Intent buildIntent(Context ctx, DataHelper.Block b, String kind, int id, String key) {
        Intent i = new Intent(ctx, BlockNotificationReceiver.class);
        i.setAction("com.gabriel.organizame.BLOCK_ALARM");
        i.setData(android.net.Uri.parse("organizame://alarm/" + id));
        i.putExtra(EXTRA_LABEL, b.label);
        i.putExtra(EXTRA_START, b.startStr);
        i.putExtra(EXTRA_END, b.endStr);
        i.putExtra(EXTRA_COLOR, b.color);
        i.putExtra(EXTRA_CAT, b.cat);
        i.putExtra(EXTRA_KIND, kind);
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

    private static int notifId(String key, String kind) {
        int h = key.hashCode() & 0x0FFFFFFF;
        int tag;
        switch (kind) {
            case "pre": tag = 0x10000000; break;
            case "end": tag = 0x20000000; break;
            default:    tag = 0x30000000; break; // start
        }
        return h | tag;
    }
}
