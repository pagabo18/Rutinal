package com.pagabo18.rutinal;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;

import java.util.Calendar;
import java.util.List;

/**
 * Hábitos de hoy en la pantalla de bloqueo: una notificación fija y silenciosa con el
 * avance del día y hasta tres botones para marcar los hábitos pendientes sin abrir la app.
 * Es opcional (Ajustes > «Hábitos en la pantalla de bloqueo») y viene apagada.
 * Los botones usan el mismo toggle que el widget de hábitos. Nada de esta clase lanza.
 */
public class HabitsLive {
    public static final String K_ON = "habits_live_on";
    public static final String CH = "habits_live";
    public static final int NOTIF_ID = 77010;

    public static boolean isOn(Context ctx) {
        try {
            SharedPreferences sp = ctx.getSharedPreferences(WebAppInterface.PREFS, Context.MODE_PRIVATE);
            return sp.getBoolean(K_ON, false);
        } catch (Exception e) {
            return false;
        }
    }

    public static void setOn(Context ctx, boolean on) {
        try {
            SharedPreferences sp = ctx.getSharedPreferences(WebAppInterface.PREFS, Context.MODE_PRIVATE);
            sp.edit().putBoolean(K_ON, on).commit();
        } catch (Exception ignored) {}
        update(ctx);
    }

    private static String shortName(String n) {
        n = n == null ? "" : n.trim();
        return n.length() > 18 ? n.substring(0, 17).trim() + "…" : n;
    }

    public static void update(Context ctx) {
        try {
            NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm == null) return;
            if (!isOn(ctx)) { nm.cancel(NOTIF_ID); return; }
            List<String[]> list = HabitsWidgetProvider.todayHabits(ctx);
            int total = list.size(), done = 0;
            for (String[] h : list) if ("1".equals(h[2])) done++;
            if (total == 0) { nm.cancel(NOTIF_ID); return; }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && nm.getNotificationChannel(CH) == null) {
                NotificationChannel ch = new NotificationChannel(CH, "Hábitos en la pantalla de bloqueo", NotificationManager.IMPORTANCE_LOW);
                ch.setDescription("Tus hábitos de hoy con botones para marcarlos sin abrir la app");
                ch.setShowBadge(false);
                ch.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
                ch.setSound(null, null);
                ch.enableVibration(false);
                nm.createNotificationChannel(ch);
            }

            StringBuilder pending = new StringBuilder();
            for (String[] h : list) {
                if ("1".equals(h[2])) continue;
                if (pending.length() > 0) pending.append(" · ");
                pending.append(h[1]);
            }
            String title = "Hábitos de hoy · " + done + "/" + total;
            String text = done == total ? "Todo listo por hoy" : pending.toString();

            Intent open = new Intent(ctx, MainActivity.class);
            open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            open.setData(Uri.parse("rutinal://open/habitos"));
            open.putExtra("open_tab", "habitos");
            PendingIntent pi = PendingIntent.getActivity(ctx, 1, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

            Notification.Builder b = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O ? new Notification.Builder(ctx, CH) : new Notification.Builder(ctx);
            b.setSmallIcon(R.drawable.ic_notif)
             .setContentTitle(title)
             .setContentText(text)
             .setStyle(new Notification.BigTextStyle().bigText(text))
             .setOngoing(done < total)
             .setOnlyAlertOnce(true)
             .setShowWhen(false)
             .setColor(Color.parseColor("#18181B"))
             .setContentIntent(pi)
             .setVisibility(Notification.VISIBILITY_PUBLIC)
             .setProgress(total, done, false);
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) b.setPriority(Notification.PRIORITY_LOW);

            // Hasta tres pendientes con su botón (los primeros de la lista)
            int n = 0;
            for (String[] h : list) {
                if ("1".equals(h[2])) continue;
                b.addAction(new Notification.Action.Builder(R.drawable.ic_notif_check, "✓ " + shortName(h[1]), HabitsWidgetProvider.toggleIntent(ctx, h[0])).build());
                if (++n >= 3) break;
            }

            // A medianoche se quita sola; vuelve a salir con los hábitos del día nuevo al siguiente refresco
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                Calendar c = Calendar.getInstance();
                c.add(Calendar.DAY_OF_YEAR, 1);
                c.set(Calendar.HOUR_OF_DAY, 0); c.set(Calendar.MINUTE, 0); c.set(Calendar.SECOND, 5); c.set(Calendar.MILLISECOND, 0);
                long ms = c.getTimeInMillis() - System.currentTimeMillis();
                if (ms > 0) b.setTimeoutAfter(ms);
            }
            nm.notify(NOTIF_ID, b.build());
        } catch (Exception ignored) {}
    }
}
