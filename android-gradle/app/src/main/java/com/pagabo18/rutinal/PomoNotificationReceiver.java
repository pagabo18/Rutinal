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
 * Notificación al terminar una fase Pomodoro.
 */
public class PomoNotificationReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context ctx, Intent intent) {
        NotificationScheduler.ensureChannel(ctx);

        String phase = intent.getStringExtra(NotificationScheduler.EXTRA_POMO_PHASE);
        String next = intent.getStringExtra(NotificationScheduler.EXTRA_POMO_NEXT);
        int cycle = intent.getIntExtra(NotificationScheduler.EXTRA_POMO_CYCLE, 0);
        int notifId = intent.getIntExtra(NotificationScheduler.EXTRA_NOTIF_ID, 0);

        if (phase == null) phase = "focus";

        String title;
        String body;
        int accent;
        switch (phase) {
            case "short":
                title = "Termina el descanso";
                body = "Vuelve al enfoque cuando quieras.";
                accent = Color.parseColor("#10B981");
                break;
            case "long":
                title = "Termina el descanso largo";
                body = "Empieza una nueva ronda de Pomodoros.";
                accent = Color.parseColor("#3B82F6");
                break;
            default: // focus
                title = "Termina el Pomodoro";
                body = describeNext(next);
                accent = Color.parseColor("#2563EB");
                break;
        }

        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent openPI = PendingIntent.getActivity(ctx, notifId + 7, open, piFlags());

        Notification.Builder b;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            b = new Notification.Builder(ctx, NotificationScheduler.CHANNEL_POMO_ID);
        } else {
            b = new Notification.Builder(ctx);
            b.setPriority(Notification.PRIORITY_HIGH);
        }
        b.setSmallIcon(R.drawable.ic_notif)
         .setContentTitle(title)
         .setContentText(body)
         .setStyle(new Notification.BigTextStyle().bigText(body))
         .setAutoCancel(true)
         .setColor(accent)
         .setContentIntent(openPI)
         .setCategory(Notification.CATEGORY_ALARM)
         .setVibrate(new long[]{0, 250, 150, 250});

        b.setVisibility(Notification.VISIBILITY_PUBLIC);

        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm != null) nm.notify(notifId, b.build());
    }

    private String describeNext(String next) {
        if (next == null) return "Toma un descanso.";
        switch (next) {
            case "short": return "Descanso corto.";
            case "long":  return "Descanso largo.";
            default:      return "Sigue con la siguiente fase.";
        }
    }

    private int piFlags() {
        int f = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) f |= PendingIntent.FLAG_IMMUTABLE;
        return f;
    }
}
