package com.pagabo18.rutinal;

import android.app.AlarmManager;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

public class NotificationActionReceiver extends BroadcastReceiver {
    public static final String ACTION_DONE = "com.pagabo18.rutinal.NOTIF_DONE";
    public static final String ACTION_SNOOZE = "com.pagabo18.rutinal.NOTIF_SNOOZE";

    @Override
    public void onReceive(Context ctx, Intent intent) {
        int id = intent.getIntExtra(NotificationScheduler.EXTRA_NOTIF_ID, 0);
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);

        if (ACTION_DONE.equals(intent.getAction())) {
            if (nm != null) nm.cancel(id);
            return;
        }

        if (ACTION_SNOOZE.equals(intent.getAction())) {
            if (nm != null) nm.cancel(id);
            // Reprograma la MISMA notificación 10 min después
            Intent again = new Intent(ctx, BlockNotificationReceiver.class);
            again.setAction("com.pagabo18.rutinal.BLOCK_ALARM");
            again.setData(android.net.Uri.parse("rutinal://alarm/snz/" + id + "/" + System.currentTimeMillis()));
            again.putExtras(intent.getExtras());
            int flags = PendingIntent.FLAG_UPDATE_CURRENT;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) flags |= PendingIntent.FLAG_IMMUTABLE;
            PendingIntent pi = PendingIntent.getBroadcast(ctx, id, again, flags);
            AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
            if (am == null) return;
            long when = System.currentTimeMillis() + 10 * 60_000L;
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
    }
}
