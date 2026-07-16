package com.gabriel.organizame;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.SharedPreferences;
import android.webkit.JavascriptInterface;

/**
 * Puente JS <-> Java. El WebView llama window.Android.saveState(json)
 * cada vez que cambia bloques, hábitos o el log del día. Guardamos en
 * SharedPreferences 'organizame_data' y disparamos update de los 3 widgets.
 */
public class WebAppInterface {
    public static final String PREFS = "organizame_data";
    public static final String K_STATE = "state_json";

    private final Context ctx;

    public WebAppInterface(Context ctx) {
        this.ctx = ctx.getApplicationContext();
    }

    @JavascriptInterface
    public void saveState(String json) {
        if (json == null) return;
        SharedPreferences sp = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        sp.edit().putString(K_STATE, json).apply();
        refreshAllWidgets();
        // Reprograma notificaciones cada vez que cambia el schedule
        try { NotificationScheduler.scheduleAll(ctx); } catch (Exception ignored) {}
    }

    @JavascriptInterface
    public void scheduleNotifications() {
        try { NotificationScheduler.scheduleAll(ctx); } catch (Exception ignored) {}
    }

    @JavascriptInterface
    public void schedulePomoAlarm(String phase, String nextPhase, int cycle, double endMs) {
        try {
            NotificationScheduler.schedulePomo(ctx, phase, nextPhase, cycle, (long) endMs);
        } catch (Exception ignored) {}
    }

    @JavascriptInterface
    public void cancelPomoAlarm() {
        try { NotificationScheduler.cancelPomo(ctx); } catch (Exception ignored) {}
    }

    @JavascriptInterface
    public void setHabitReminder(String hhmm) {
        try { NotificationScheduler.setHabitReminderTime(ctx, hhmm); } catch (Exception ignored) {}
    }

    @JavascriptInterface
    public String getHabitReminder() {
        try { return NotificationScheduler.getHabitReminderTime(ctx); } catch (Exception ignored) { return ""; }
    }

    @JavascriptInterface
    public boolean canScheduleExactAlarms() {
        if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.S) return true;
        android.app.AlarmManager am = (android.app.AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        return am != null && am.canScheduleExactAlarms();
    }

    @JavascriptInterface
    public void openExactAlarmSettings() {
        if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.S) return;
        try {
            android.content.Intent i = new android.content.Intent(android.provider.Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM);
            i.setData(android.net.Uri.parse("package:" + ctx.getPackageName()));
            i.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
            ctx.startActivity(i);
        } catch (Exception ignored) {}
    }

    @JavascriptInterface
    public String getState() {
        SharedPreferences sp = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        return sp.getString(K_STATE, "{}");
    }

    private void refreshAllWidgets() {
        AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
        Class<?>[] providers = {
            AhoraWidgetProvider.class,
            ProximosWidgetProvider.class,
            HabitosWidgetProvider.class
        };
        for (Class<?> p : providers) {
            try {
                @SuppressWarnings("unchecked")
                Class<? extends android.appwidget.AppWidgetProvider> cls =
                    (Class<? extends android.appwidget.AppWidgetProvider>) p;
                ComponentName cn = new ComponentName(ctx, cls);
                int[] ids = mgr.getAppWidgetIds(cn);
                if (ids != null && ids.length > 0) {
                    android.content.Intent i = new android.content.Intent(ctx, cls);
                    i.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
                    i.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
                    ctx.sendBroadcast(i);
                    // Notificar cambio en la lista de "Próximos"
                    if (p == ProximosWidgetProvider.class) {
                        mgr.notifyAppWidgetViewDataChanged(ids, R.id.prox_list);
                    }
                }
            } catch (Exception ignored) {}
        }
    }
}
