package com.pagabo18.rutinal;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;

/**
 * Recordatorio diario de comida. Suave: prioridad baja, sin sonido, sin
 * vibración. Solo aparece si el usuario aún no ha registrado comida hoy
 * (clave "last_meal_log_date" en prefs, escrita por el WebView vía
 * setLastMealLog). Siempre se reprograma para el día siguiente.
 */
public class MealReminderReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context ctx, Intent intent) {
        NotificationScheduler.ensureHabitChannel(ctx);
        // Reprogramar la próxima (siempre, aunque hoy no toque notificar)
        try { NotificationScheduler.scheduleMealReminder(ctx); } catch (Exception ignored) {}

        try {
            String last = NotificationScheduler.getLastMealLogDate(ctx);
            String today = DataHelper.todayKey();
            if (today.equals(last)) return; // ya registró comida hoy: no molestar

            Intent open = new Intent(ctx, MainActivity.class);
            open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            open.putExtra("tab", "comida");
            PendingIntent openPI = PendingIntent.getActivity(ctx, 9002, open, piFlags());

            Notification.Builder b;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                b = new Notification.Builder(ctx, NotificationScheduler.CHANNEL_HABITS_ID);
            } else {
                b = new Notification.Builder(ctx);
                b.setPriority(Notification.PRIORITY_LOW);
            }
            b.setSmallIcon(R.drawable.ic_notif)
             .setContentTitle("Recordatorio de comida")
             .setContentText("¿Ya comiste? Registra tu comida en Rutinal 🍽")
             .setAutoCancel(true)
             .setColor(Color.parseColor("#D97706"))
             .setContentIntent(openPI)
             .setCategory(Notification.CATEGORY_REMINDER)
             .setOnlyAlertOnce(true)
             .setDefaults(0); // sin sonido ni vibración

            b.setVisibility(Notification.VISIBILITY_PUBLIC);

            NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm != null) nm.notify(9002, b.build());
        } catch (Exception ignored) {}
    }

    private int piFlags() {
        int f = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) f |= PendingIntent.FLAG_IMMUTABLE;
        return f;
    }
}
