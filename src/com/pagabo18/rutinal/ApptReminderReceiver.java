package com.pagabo18.rutinal;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Build;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Recordatorio de citas: la app entrega la lista de citas próximas
 * ([{ id, at (ms), title, text }]) y aquí se programa un aviso 30 minutos antes de cada una.
 * La lista se guarda para reprogramar tras reiniciar el teléfono.
 */
public class ApptReminderReceiver extends BroadcastReceiver {
    public static final String ACTION = "com.pagabo18.rutinal.APPT_REMINDER";
    private static final String PREFS = "rutinal_appts";
    private static final int BASE_REQ = 9200;
    private static final int MAX = 12;
    private static final long LEAD_MS = 30L * 60L * 1000L;

    @Override
    public void onReceive(Context ctx, Intent intent) {
        try {
            ChatPollReceiver.ensureChannel(ctx);
            String title = intent.getStringExtra("title");
            String text = intent.getStringExtra("text");
            int n = intent.getIntExtra("n", 0);
            if (title == null || text == null) return;

            Intent open = new Intent(ctx, MainActivity.class);
            open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            PendingIntent pi = PendingIntent.getActivity(ctx, BASE_REQ + n, open, flags());

            Notification.Builder b;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) b = new Notification.Builder(ctx, ChatPollReceiver.CHANNEL_ID);
            else b = new Notification.Builder(ctx);
            b.setSmallIcon(R.drawable.ic_notif)
             .setContentTitle(title)
             .setContentText(text)
             .setStyle(new Notification.BigTextStyle().bigText(text))
             .setAutoCancel(true)
             .setColor(Color.parseColor("#111827"))
             .setContentIntent(pi)
             .setCategory(Notification.CATEGORY_EVENT);
            NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm != null) nm.notify(BASE_REQ + n, b.build());
        } catch (Throwable ignored) {}
    }

    /** Guarda la lista y reprograma todos los avisos. */
    public static void sync(Context ctx, String json) {
        try {
            new JSONArray(json); // valida
            ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString("list", json).apply();
            schedule(ctx);
        } catch (Throwable ignored) {}
    }

    /** Programa (o reprograma) los avisos a partir de la lista guardada. */
    public static void schedule(Context ctx) {
        try {
            AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
            if (am == null) return;
            for (int i = 0; i < MAX; i++) {
                try { am.cancel(PendingIntent.getBroadcast(ctx, BASE_REQ + i, base(ctx, i), flags())); } catch (Throwable ignored) {}
            }
            JSONArray arr = new JSONArray(ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString("list", "[]"));
            long now = System.currentTimeMillis();
            int n = 0;
            for (int i = 0; i < arr.length() && n < MAX; i++) {
                JSONObject o = arr.optJSONObject(i);
                if (o == null) continue;
                long at = (long) o.optDouble("at", 0);
                if (at <= now) continue;                    // ya pasó
                long when = Math.max(now + 5000L, at - LEAD_MS);
                Intent it = base(ctx, n);
                it.putExtra("title", o.optString("title", "Rutinal"));
                it.putExtra("text", o.optString("text", ""));
                it.putExtra("n", n);
                PendingIntent pi = PendingIntent.getBroadcast(ctx, BASE_REQ + n, it, flags());
                try {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && !am.canScheduleExactAlarms()) {
                        am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, when, pi);
                    } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, when, pi);
                    } else {
                        am.setExact(AlarmManager.RTC_WAKEUP, when, pi);
                    }
                } catch (SecurityException e) {
                    am.set(AlarmManager.RTC_WAKEUP, when, pi);
                }
                n++;
            }
        } catch (Throwable ignored) {}
    }

    private static Intent base(Context ctx, int n) {
        Intent i = new Intent(ctx, ApptReminderReceiver.class);
        i.setAction(ACTION);
        i.setData(android.net.Uri.parse("rutinal://appt/" + n));
        return i;
    }

    private static int flags() {
        int f = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) f |= PendingIntent.FLAG_IMMUTABLE;
        return f;
    }
}
