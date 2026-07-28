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
        String kind = intent.getStringExtra(NotificationScheduler.EXTRA_KIND);
        if (kind == null) kind = "start";
        int notifId = intent.getIntExtra(NotificationScheduler.EXTRA_NOTIF_ID, 0);
        String cat = intent.getStringExtra(NotificationScheduler.EXTRA_CAT);
        boolean silent = intent.getBooleanExtra(NotificationScheduler.EXTRA_SILENT, false);

        // No Molestar automático en bloques de trabajo/enfoque
        if (NotificationScheduler.isFocusCategory(cat)) {
            if ("start".equals(kind)) NotificationScheduler.enableDnd(ctx);
            else if ("end".equals(kind)) NotificationScheduler.disableDnd(ctx);
        }

        if (label == null) label = "Bloque";
        if (start == null) start = "";
        if (end == null) end = "";

        int accent;
        try { accent = Color.parseColor(color); } catch (Exception e) { accent = Color.parseColor("#2563EB"); }

        String title;
        String body;
        boolean showActions = true;
        switch (kind) {
            case "pre":
                title = "En 5 min: " + label;
                body = start + " – " + end;
                break;
            case "end":
                title = "Termina: " + label;
                body = "Terminó tu bloque (" + start + " – " + end + ")";
                showActions = false;
                break;
            default: // start
                title = "Empieza ahora: " + label;
                body = "Bloque de " + start + " a " + end;
                break;
        }

        // Acción: Listo → descarta esta notificación
        Intent listo = new Intent(ctx, NotificationActionReceiver.class);
        listo.setAction(NotificationActionReceiver.ACTION_DONE);
        listo.setData(android.net.Uri.parse("rutinal://notif/done/" + notifId));
        listo.putExtra(NotificationScheduler.EXTRA_NOTIF_ID, notifId);
        PendingIntent listoPI = PendingIntent.getBroadcast(ctx, notifId + 1, listo, piFlags());

        // Acción: Posponer 10 min → replanifica
        Intent snz = new Intent(ctx, NotificationActionReceiver.class);
        snz.setAction(NotificationActionReceiver.ACTION_SNOOZE);
        snz.setData(android.net.Uri.parse("rutinal://notif/snooze/" + notifId));
        android.os.Bundle extras = intent.getExtras();
        if (extras != null) snz.putExtras(extras);
        PendingIntent snzPI = PendingIntent.getBroadcast(ctx, notifId + 2, snz, piFlags());

        // Tap principal → abrir app
        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent openPI = PendingIntent.getActivity(ctx, notifId + 3, open, piFlags());

        Notification.Builder b;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            String chId = silent ? NotificationScheduler.CHANNEL_SILENT_ID : NotificationScheduler.CHANNEL_ID;
            b = new Notification.Builder(ctx, chId);
        } else {
            b = new Notification.Builder(ctx);
            b.setPriority(silent ? Notification.PRIORITY_LOW : Notification.PRIORITY_HIGH);
        }
        b.setSmallIcon(R.drawable.ic_notif)
         .setContentTitle(title)
         .setContentText(body)
         .setStyle(new Notification.BigTextStyle().bigText(body))
         .setAutoCancel(true)
         .setColor(accent)
         .setContentIntent(openPI)
         .setCategory(Notification.CATEGORY_REMINDER);

        // Modo Fin de Semana silencioso: quita sonido, vibración y baja prioridad
        if (silent) {
            b.setSound(null);
            b.setVibrate(new long[]{0});
            b.setDefaults(0);
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
                b.setPriority(Notification.PRIORITY_LOW);
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                // No podemos cambiar el canal en tiempo real, pero silenciamos lo demás
                try { b.setOnlyAlertOnce(true); } catch (Exception ignored) {}
            }
        }

        // Iconos vectoriales para acciones (solo pre/start)
        if (showActions) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                android.graphics.drawable.Icon iconOk = android.graphics.drawable.Icon.createWithResource(ctx, R.drawable.ic_notif_check);
                android.graphics.drawable.Icon iconZz = android.graphics.drawable.Icon.createWithResource(ctx, R.drawable.ic_notif_snooze);
                b.addAction(new Notification.Action.Builder(iconOk, ctx.getString(R.string.action_done), listoPI).build());
                b.addAction(new Notification.Action.Builder(iconZz, ctx.getString(R.string.action_snooze_10), snzPI).build());
            } else {
                b.addAction(R.drawable.ic_notif_check, ctx.getString(R.string.action_done), listoPI);
                b.addAction(R.drawable.ic_notif_snooze, ctx.getString(R.string.action_snooze_10), snzPI);
            }
        }
        b.setVisibility(Notification.VISIBILITY_PUBLIC);

        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm != null) nm.notify(notifId, b.build());

        // Re-encadenar alarmas (bloques restantes / día siguiente) aunque
        // el usuario no abra la app. Nunca debe romper la notificación.
        try { NotificationScheduler.scheduleAll(ctx); } catch (Exception ignored) {}
    }

    private int piFlags() {
        int f = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) f |= PendingIntent.FLAG_IMMUTABLE;
        return f;
    }
}
