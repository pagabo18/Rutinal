package com.pagabo18.rutinal;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Build;

import org.json.JSONObject;

/**
 * Recordatorio diario de hábitos. Suave: prioridad baja, sin sonido, sin vibración.
 * Solo aparece si aún faltan hábitos por completar hoy.
 */
public class HabitReminderReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context ctx, Intent intent) {
        NotificationScheduler.ensureHabitChannel(ctx);
        // Reprogramar la próxima
        NotificationScheduler.scheduleHabitReminder(ctx);

        int pending = countPendingHabitsToday(ctx);
        if (pending <= 0) return; // no molestar si ya está todo hecho

        String title = "Hábitos pendientes";
        String body = pending == 1
            ? "Te queda 1 hábito por hoy."
            : ("Te quedan " + pending + " hábitos por hoy.");

        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        open.putExtra("tab", "habitos");
        PendingIntent openPI = PendingIntent.getActivity(ctx, 9001, open, piFlags());

        Notification.Builder b;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            b = new Notification.Builder(ctx, NotificationScheduler.CHANNEL_HABITS_ID);
        } else {
            b = new Notification.Builder(ctx);
            b.setPriority(Notification.PRIORITY_LOW);
        }
        b.setSmallIcon(R.drawable.ic_notif)
         .setContentTitle(title)
         .setContentText(body)
         .setAutoCancel(true)
         .setColor(Color.parseColor("#059669"))
         .setContentIntent(openPI)
         .setCategory(Notification.CATEGORY_REMINDER)
         .setOnlyAlertOnce(true)
         .setDefaults(0); // sin sonido ni vibración

        b.setVisibility(Notification.VISIBILITY_PUBLIC);

        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm != null) nm.notify(9001, b.build());
    }

    private int countPendingHabitsToday(Context ctx) {
        SharedPreferences sp = ctx.getSharedPreferences(WebAppInterface.PREFS, Context.MODE_PRIVATE);
        String json = sp.getString(WebAppInterface.K_STATE, "{}");
        try {
            JSONObject root = new JSONObject(json);
            org.json.JSONArray habits = root.optJSONArray("habits");
            if (habits == null || habits.length() == 0) return 0;

            String todayKey = DataHelper.todayKey();
            JSONObject log = root.optJSONObject("habitLog");
            JSONObject today = log != null ? log.optJSONObject(todayKey) : null;

            int pending = 0;
            for (int i = 0; i < habits.length(); i++) {
                JSONObject h = habits.optJSONObject(i);
                if (h == null) continue;
                String id = h.optString("id");
                boolean done = today != null && today.optBoolean(id, false);
                if (!done) pending++;
            }
            return pending;
        } catch (Exception e) {
            return 0;
        }
    }

    private int piFlags() {
        int f = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) f |= PendingIntent.FLAG_IMMUTABLE;
        return f;
    }
}
