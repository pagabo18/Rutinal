package com.gabriel.organizame;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;

/**
 * Se dispara con AlarmManager. Construye la notificación con acciones
 * "Listo" y "Posponer 10 min".
 */
public class BlockNotificationReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context ctx, Intent intent) {
        NotificationScheduler.ensureChannel(ctx);

        String label = intent.getStringExtra(NotificationScheduler.EXTRA_LABEL);
        String start = intent.getStringExtra(NotificationScheduler.EXTRA_START);
        String end = intent.getStringExtra(NotificationScheduler.EXTRA_END);
        String color = intent.getStringExtra(NotificationScheduler.EXTRA_COLOR);
        boolean isPre = intent.getBooleanExtra(NotificationScheduler.EXTRA_IS_PRE, false);
        int notifId = intent.getIntExtra(NotificationScheduler.EXTRA_NOTIF_ID, 0);

        if (label == null) label = "Bloque";
        if (start == null) start = "";
        if (end == null) end = "";

        int accent;
        try { accent = Color.parseColor(color); } catch (Exception e) { accent = Color.parseColor("#2563EB"); }

        String title;
        String body;
        if (isPre) {
            title = "En 5 min: " + label;
            body = start + " – " + end;
        } else {
            title = "Empieza ahora: " + label;
            body = "Bloque de " + start + " a " + end;
        }

        // Acción: Listo → descarta esta notificación
        Intent listo = new Intent(ctx, NotificationActionReceiver.class);
        listo.setAction(NotificationActionReceiver.ACTION_DONE);
        listo.setData(android.net.Uri.parse("organizame://notif/done/" + notifId));
        listo.putExtra(NotificationScheduler.EXTRA_NOTIF_ID, notifId);
        PendingIntent listoPI = PendingIntent.getBroadcast(ctx, notifId + 1, listo, piFlags());

        // Acción: Posponer 10 min → replanifica
        Intent snz = new Intent(ctx, NotificationActionReceiver.class);
        snz.setAction(NotificationActionReceiver.ACTION_SNOOZE);
        snz.setData(android.net.Uri.parse("organizame://notif/snooze/" + notifId));
        snz.putExtras(intent.getExtras());
        PendingIntent snzPI = PendingIntent.getBroadcast(ctx, notifId + 2, snz, piFlags());

        // Tap principal → abrir app
        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent openPI = PendingIntent.getActivity(ctx, notifId + 3, open, piFlags());

        Notification.Builder b;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            b = new Notification.Builder(ctx, NotificationScheduler.CHANNEL_ID);
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
         .setCategory(Notification.CATEGORY_REMINDER);

        // Iconos vectoriales para acciones
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            android.graphics.drawable.Icon iconOk = android.graphics.drawable.Icon.createWithResource(ctx, R.drawable.ic_notif_check);
            android.graphics.drawable.Icon iconZz = android.graphics.drawable.Icon.createWithResource(ctx, R.drawable.ic_notif_snooze);
            b.addAction(new Notification.Action.Builder(iconOk, "Listo", listoPI).build());
            b.addAction(new Notification.Action.Builder(iconZz, "Posponer 10 min", snzPI).build());
        } else {
            b.addAction(R.drawable.ic_notif_check, "Listo", listoPI);
            b.addAction(R.drawable.ic_notif_snooze, "Posponer 10 min", snzPI);
        }
        b.setVisibility(Notification.VISIBILITY_PUBLIC);

        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm != null) nm.notify(notifId, b.build());
    }

    private int piFlags() {
        int f = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) f |= PendingIntent.FLAG_IMMUTABLE;
        return f;
    }
}
