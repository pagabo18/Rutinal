package com.pagabo18.rutinal;

import android.content.Context;
import android.content.SharedPreferences;
import android.webkit.JavascriptInterface;

/**
 * Puente JS <-> Java. El WebView llama window.Android.saveState(json)
 * cada vez que cambia bloques, hábitos o el log del día. Guardamos en
 * SharedPreferences 'rutinal_data'.
 */
public class WebAppInterface {
    public static final String PREFS = "rutinal_data";
    public static final String K_STATE = "state_json";

    private final Context ctx;
    private final MainActivity activity;

    public WebAppInterface(Context ctx) {
        this.activity = (ctx instanceof MainActivity) ? (MainActivity) ctx : null;
        this.ctx = ctx.getApplicationContext();
    }

    @JavascriptInterface
    public void saveState(String json) {
        if (json == null) return;
        SharedPreferences sp = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        sp.edit().putString(K_STATE, json).apply();
        // Reprograma notificaciones cada vez que cambia el schedule
        try { NotificationScheduler.scheduleAll(ctx); } catch (Exception ignored) {}
        // Refresca los widgets ("Ahora" y "Hábitos de hoy")
        try { WidgetRefresher.refreshAll(ctx); } catch (Exception ignored) {}
    }

    @JavascriptInterface
    public void refreshAllWidgets() {
        WidgetRefresher.refreshAll(ctx);
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
    public void setMealReminder(String hhmm) {
        try { NotificationScheduler.setMealReminderTime(ctx, hhmm); } catch (Exception ignored) {}
    }

    @JavascriptInterface
    public String getMealReminder() {
        try { return NotificationScheduler.getMealReminderTime(ctx); } catch (Exception ignored) { return ""; }
    }

    @JavascriptInterface
    public void setLastMealLog(String dateKey) {
        try { NotificationScheduler.setLastMealLogDate(ctx, dateKey); } catch (Exception ignored) {}
    }

    @JavascriptInterface
    public void setHydrationReminders(String timesJson) {
        try { NotificationScheduler.setHydrationTimes(ctx, timesJson); } catch (Exception ignored) {}
    }

    @JavascriptInterface
    public void openAppSettings() {
        if (activity == null) return;
        activity.runOnUiThread(new Runnable() {
            @Override public void run() {
                try {
                    android.content.Intent i = new android.content.Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                    i.setData(android.net.Uri.parse("package:" + activity.getPackageName()));
                    i.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
                    activity.startActivity(i);
                } catch (Exception ignored) {}
            }
        });
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
    public boolean canUseDnd() {
        try {
            android.app.NotificationManager nm = (android.app.NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
            return nm != null && nm.isNotificationPolicyAccessGranted();
        } catch (Exception e) { return false; }
    }

    @JavascriptInterface
    public void openDndSettings() {
        try {
            android.content.Intent i = new android.content.Intent(android.provider.Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS);
            i.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
            ctx.startActivity(i);
        } catch (Exception ignored) {}
    }

    @JavascriptInterface
    public void setDndAuto(boolean enabled) {
        try { NotificationScheduler.setDndAuto(ctx, enabled); } catch (Exception ignored) {}
    }

    @JavascriptInterface
    public boolean getDndAuto() {
        try { return NotificationScheduler.getDndAuto(ctx); } catch (Exception e) { return false; }
    }

    @JavascriptInterface
    public void openBarcodeScanner() {
        if (activity == null) return;
        activity.runOnUiThread(new Runnable() {
            @Override public void run() {
                try {
                    android.content.Intent i = new android.content.Intent(activity, BarcodeScannerActivity.class);
                    activity.startActivityForResult(i, MainActivity.REQ_BARCODE);
                } catch (Exception ignored) {}
            }
        });
    }

    @JavascriptInterface
    public boolean hasNativeBarcodeScanner() {
        return true;
    }

    @JavascriptInterface
    public void shareText(final String subject, final String text) {
        if (text == null || text.isEmpty()) return;
        try {
            android.content.Intent send = new android.content.Intent(android.content.Intent.ACTION_SEND);
            send.setType("text/plain");
            send.putExtra(android.content.Intent.EXTRA_SUBJECT, subject == null ? "Rutinal" : subject);
            send.putExtra(android.content.Intent.EXTRA_TEXT, text);
            android.content.Intent chooser = android.content.Intent.createChooser(send, "Compartir");
            if (activity != null) {
                activity.startActivity(chooser);
            } else {
                chooser.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
                ctx.startActivity(chooser);
            }
        } catch (Exception ignored) {}
    }

    /**
     * Guarda un archivo de texto en Descargas. Devuelve la ruta o el
     * nombre visible si tuvo éxito, o "" si falló.
     */
    @JavascriptInterface
    public String saveTextFile(String filename, String content) {
        if (content == null) return "";
        try {
            String name = (filename == null) ? "" : filename.replaceAll("[^a-zA-Z0-9._-]", "");
            if (name.isEmpty()) name = "rutinal.json";
            byte[] bytes = content.getBytes("UTF-8");

            if (android.os.Build.VERSION.SDK_INT >= 29) {
                android.content.ContentValues values = new android.content.ContentValues();
                values.put(android.provider.MediaStore.MediaColumns.DISPLAY_NAME, name);
                values.put(android.provider.MediaStore.MediaColumns.MIME_TYPE, "application/json");
                android.net.Uri uri = ctx.getContentResolver().insert(
                        android.provider.MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
                if (uri == null) return "";
                java.io.OutputStream os = ctx.getContentResolver().openOutputStream(uri);
                if (os == null) return "";
                try {
                    os.write(bytes);
                    os.flush();
                } finally {
                    try { os.close(); } catch (Exception ignored) {}
                }
                return "Descargas/" + name;
            } else {
                java.io.File dir = android.os.Environment.getExternalStoragePublicDirectory(
                        android.os.Environment.DIRECTORY_DOWNLOADS);
                if (dir != null && !dir.exists()) dir.mkdirs();
                java.io.File f = new java.io.File(dir, name);
                java.io.FileOutputStream fos = new java.io.FileOutputStream(f);
                try {
                    fos.write(bytes);
                    fos.flush();
                } finally {
                    try { fos.close(); } catch (Exception ignored) {}
                }
                return f.getAbsolutePath();
            }
        } catch (Exception e) {
            return "";
        }
    }

    /**
     * Devuelve la cola de acciones generadas por los widgets (array JSON
     * como string) y la borra atómicamente. "[]" si está vacía.
     */
    @JavascriptInterface
    public String consumeWidgetActions() {
        try { return WidgetActionQueue.consume(ctx); } catch (Exception e) { return "[]"; }
    }

    @JavascriptInterface
    public String getState() {
        SharedPreferences sp = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        return sp.getString(K_STATE, "{}");
    }
}
