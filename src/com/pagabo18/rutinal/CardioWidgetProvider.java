package com.pagabo18.rutinal;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.view.View;
import android.widget.RemoteViews;

import org.json.JSONObject;

import java.util.Locale;

/**
 * Widget "Cardio y pasos" (4x1): pasos y minutos de cardio de hoy contra la meta.
 *
 * Las metas, los minutos y los textos llegan en el espejo 'widget_cardio' que el JS
 * guarda dentro de state_json ({ date, steps, stepsGoal, min, minGoal, notify, L }).
 * Si el contador de pasos del teléfono está activo, los pasos salen de StepCounter
 * (se actualizan aunque la app esté cerrada). Aquí vive también el aviso de
 * "meta de pasos cumplida": una vez al día, cuando los pasos alcanzan la meta.
 */
public class CardioWidgetProvider extends AppWidgetProvider {
    private static final String CH_GOALS = "goals";
    private static final int NOTIF_ID = 77020;
    private static final String PREFS = "rutinal_cardio";

    @Override
    public void onUpdate(Context context, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) {
            try { updateOne(context, mgr, id); } catch (Exception ignored) {}
        }
    }

    /** Actualiza todas las instancias del widget. Nunca lanza. */
    public static void refreshAll(Context context) {
        try {
            AppWidgetManager mgr = AppWidgetManager.getInstance(context);
            if (mgr == null) return;
            int[] ids = mgr.getAppWidgetIds(new ComponentName(context, CardioWidgetProvider.class));
            if (ids == null) return;
            for (int id : ids) updateOne(context, mgr, id);
        } catch (Exception ignored) {}
    }

    private static String fmt(long n) {
        return String.format(Locale.US, "%,d", n);
    }

    private static String today() {
        return StepCounter.day(System.currentTimeMillis());
    }

    private static JSONObject mirror(Context ctx) {
        try { return DataHelper.loadState(ctx).optJSONObject("widget_cardio"); } catch (Exception e) { return null; }
    }

    /** Pasos de hoy: los del teléfono si el contador está activo; si no, los que anotó la app hoy. */
    static long stepsToday(Context ctx, JSONObject w) {
        long fromApp = w != null && today().equals(w.optString("date")) ? Math.max(0, w.optLong("steps", 0)) : 0;
        long fromPhone = 0;
        try {
            if (StepCounter.isOn(ctx) && StepCounter.hasPermission(ctx)) fromPhone = new JSONObject(StepCounter.info(ctx)).optLong("today", 0);
        } catch (Exception ignored) {}
        return Math.max(fromApp, fromPhone);
    }

    private static void bar(RemoteViews rv, int barId, int okId, long cur, long goal) {
        boolean has = goal > 0, ok = has && cur >= goal;
        int max = (int) Math.max(1, goal), prog = (int) Math.max(0, Math.min(cur, max));
        rv.setViewVisibility(barId, has && !ok ? View.VISIBLE : View.GONE);
        rv.setViewVisibility(okId, ok ? View.VISIBLE : View.GONE);
        rv.setProgressBar(ok ? okId : barId, max, prog, false);
    }

    private static void updateOne(Context ctx, AppWidgetManager mgr, int widgetId) {
        RemoteViews rv = new RemoteViews(ctx.getPackageName(), R.layout.widget_cardio);
        JSONObject w = mirror(ctx);
        if (w == null) {
            rv.setViewVisibility(R.id.cw_cols, View.GONE);
            rv.setViewVisibility(R.id.cw_empty, View.VISIBLE);
        } else {
            JSONObject L = w.optJSONObject("L");
            if (L == null) L = new JSONObject();
            boolean sameDay = today().equals(w.optString("date"));
            long steps = stepsToday(ctx, w), sg = Math.max(0, w.optLong("stepsGoal", 0));
            long min = sameDay ? Math.max(0, w.optLong("min", 0)) : 0, mg = Math.max(0, w.optLong("minGoal", 0));
            rv.setViewVisibility(R.id.cw_cols, View.VISIBLE);
            rv.setViewVisibility(R.id.cw_empty, View.GONE);
            rv.setTextViewText(R.id.cw_kicker, L.optString("title", "Cardio y pasos").toUpperCase());
            rv.setTextViewText(R.id.cw_steps_k, L.optString("steps", "Pasos"));
            rv.setTextViewText(R.id.cw_min_k, L.optString("cardio", "Cardio"));
            rv.setTextViewText(R.id.cw_steps_v, fmt(steps) + (sg > 0 ? " / " + fmt(sg) : ""));
            rv.setTextViewText(R.id.cw_min_v, min + (mg > 0 ? " / " + mg : "") + " min");
            bar(rv, R.id.cw_steps_bar, R.id.cw_steps_bar_ok, steps, sg);
            bar(rv, R.id.cw_min_bar, R.id.cw_min_bar_ok, min, mg);
        }
        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        open.setData(Uri.parse("rutinal://open/hoy"));
        open.putExtra("open_tab", "hoy");
        rv.setOnClickPendingIntent(R.id.cw_root, PendingIntent.getActivity(ctx, 6, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE));
        mgr.updateAppWidget(widgetId, rv);
    }

    // ---------- aviso de meta de pasos cumplida ----------

    /** Se llama tras cada lectura del contador de pasos. Avisa una sola vez al día. */
    public static void checkStepGoal(Context context) {
        try {
            Context ctx = context.getApplicationContext();
            JSONObject w = mirror(ctx);
            if (w == null || !w.optBoolean("notify", true)) return;
            long goal = w.optLong("stepsGoal", 0);
            if (goal <= 0 || !StepCounter.isOn(ctx)) return;
            long steps = stepsToday(ctx, w);
            if (steps < goal) return;
            SharedPreferences sp = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
            String day = today();
            if (day.equals(sp.getString("goalDay", ""))) return;
            sp.edit().putString("goalDay", day).apply();

            NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm == null) return;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && nm.getNotificationChannel(CH_GOALS) == null) {
                NotificationChannel ch = new NotificationChannel(CH_GOALS, "Metas del día", NotificationManager.IMPORTANCE_DEFAULT);
                ch.setDescription("Aviso cuando cumples tu meta de pasos.");
                nm.createNotificationChannel(ch);
            }
            JSONObject L = w.optJSONObject("L");
            if (L == null) L = new JSONObject();
            String title = L.optString("goalT", "Meta de pasos cumplida");
            String text = L.optString("goalD", "Llevas {n} de {g} pasos hoy.").replace("{n}", fmt(steps)).replace("{g}", fmt(goal));
            Intent open = new Intent(ctx, MainActivity.class);
            open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            open.putExtra("open_tab", "hoy");
            PendingIntent pi = PendingIntent.getActivity(ctx, 7, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
            Notification.Builder b = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O ? new Notification.Builder(ctx, CH_GOALS) : new Notification.Builder(ctx);
            b.setSmallIcon(R.drawable.ic_notif).setContentTitle(title).setContentText(text)
             .setAutoCancel(true).setColor(Color.parseColor("#16A34A")).setContentIntent(pi);
            nm.notify(NOTIF_ID, b.build());
        } catch (Exception ignored) {}
    }
}
