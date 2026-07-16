package com.gabriel.organizame;

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

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

/**
 * Recordatorio de hidratación. Suave: canal LOW, sin sonido ni vibración.
 * Se autorepite reprogramando todo el set al dispararse cualquiera.
 */
public class HydrationReminderReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context ctx, Intent intent) {
        NotificationScheduler.ensureHabitChannel(ctx);
        // Reprogramar todas las alarmas (a mañana o siguiente hora del día)
        NotificationScheduler.scheduleHydrationReminders(ctx);

        int slot = intent.getIntExtra("slot", 0);
        int id = NotificationScheduler.HYD_ALARM_ID_BASE + slot;

        // Leer meta y consumo del día
        int goal = 8;
        int today = 0;
        try {
            SharedPreferences sp = ctx.getSharedPreferences(WebAppInterface.PREFS, Context.MODE_PRIVATE);
            String json = sp.getString(WebAppInterface.K_STATE, "{}");
            JSONObject root = new JSONObject(json);
            JSONObject settings = root.optJSONObject("hydration_settings");
            if (settings != null) goal = settings.optInt("goal", 8);
            JSONObject log = root.optJSONObject("hydration_log");
            String k = new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(Calendar.getInstance().getTime());
            if (log != null) today = log.optInt(k, 0);
        } catch (Exception ignored) {}

        // No molestar si ya alcanzó la meta
        if (goal > 0 && today >= goal) return;

        int remaining = Math.max(0, goal - today);
        String title = "💧 Hora de hidratarte";
        String body;
        if (goal > 0) {
            body = "Llevas " + today + " de " + goal + " vasos. Te falta" + (remaining == 1 ? "" : "n") + " " + remaining + ".";
        } else {
            body = "Toma un vaso de agua.";
        }

        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        open.putExtra("tab", "habitos");
        PendingIntent openPI = PendingIntent.getActivity(ctx, id + 500, open, piFlags());

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
         .setStyle(new Notification.BigTextStyle().bigText(body))
         .setAutoCancel(true)
         .setColor(Color.parseColor("#0EA5E9"))
         .setContentIntent(openPI)
         .setCategory(Notification.CATEGORY_REMINDER)
         .setOnlyAlertOnce(true)
         .setDefaults(0)
         .setVisibility(Notification.VISIBILITY_PUBLIC);

        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm != null) nm.notify(id, b.build());
    }

    private int piFlags() {
        int f = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) f |= PendingIntent.FLAG_IMMUTABLE;
        return f;
    }
}
