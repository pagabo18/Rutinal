package com.pagabo18.rutinal;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.os.SystemClock;
import android.view.View;
import android.widget.RemoteViews;

import org.json.JSONObject;

/**
 * Widget "Entrenamiento" (4x2): durante el entrenamiento muestra el ejercicio
 * y la serie que siguen, con la carga objetivo, la cuenta del descanso y los
 * botones Serie hecha / +30 s / Saltar. Sin entrenamiento en curso muestra
 * la rutina que toca hoy y un botón para empezarla. Lee la foto 'gym_live'
 * que manda el JS (ver GymLive).
 */
public class GymWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) {
            try { updateOne(context, mgr, id); } catch (Exception ignored) {}
        }
    }

    public static void refreshAll(Context context) {
        try {
            AppWidgetManager mgr = AppWidgetManager.getInstance(context);
            if (mgr == null) return;
            int[] ids = mgr.getAppWidgetIds(new ComponentName(context, GymWidgetProvider.class));
            if (ids == null) return;
            for (int id : ids) {
                try { updateOne(context, mgr, id); } catch (Exception ignored) {}
            }
        } catch (Exception ignored) {}
    }

    private static void updateOne(Context ctx, AppWidgetManager mgr, int id) {
        RemoteViews rv = new RemoteViews(ctx.getPackageName(), R.layout.widget_gym);
        JSONObject s = GymLive.load(ctx);
        rv.setOnClickPendingIntent(R.id.gw_root, GymLive.openIntent(ctx));
        rv.setOnClickPendingIntent(R.id.gw_body, GymLive.openIntent(ctx));

        if (GymLive.isActive(s)) {
            int done = s.optInt("done", 0), total = Math.max(1, s.optInt("total", 1));
            rv.setTextViewText(R.id.gw_head, s.optString("name", "Gym") + " · " + done + "/" + total);
            rv.setViewVisibility(R.id.gw_bar, View.VISIBLE);
            rv.setProgressBar(R.id.gw_bar, total, Math.min(done, total), false);
            JSONObject it = GymLive.nextItem(s);
            long end = GymLive.restEnd(s);
            if (it == null) {
                rv.setTextViewText(R.id.gw_ex, GymLive.label(s, "fin", "¡Listo! Abre la app para terminar."));
                rv.setTextViewText(R.id.gw_set, s.optString("name", ""));
                rv.setViewVisibility(R.id.gw_done, View.GONE);
                end = 0;
            } else {
                String tgt = it.optString("t");
                rv.setTextViewText(R.id.gw_ex, (end > 0 ? GymLive.label(s, "next", "Sigue") + ": " : "") + it.optString("n"));
                rv.setTextViewText(R.id.gw_set, it.optString("s") + (tgt.isEmpty() ? "" : " · " + tgt));
                rv.setViewVisibility(R.id.gw_done, View.VISIBLE);
                rv.setTextViewText(R.id.gw_done, "✓ " + GymLive.label(s, "done", "Serie hecha"));
                rv.setOnClickPendingIntent(R.id.gw_done, GymLive.actionIntent(ctx, "done"));
            }
            if (end > 0) {
                long left = end - System.currentTimeMillis();
                rv.setViewVisibility(R.id.gw_rest_k, View.VISIBLE);
                rv.setTextViewText(R.id.gw_rest_k, GymLive.label(s, "rest", "Descanso"));
                rv.setViewVisibility(R.id.gw_chrono, View.VISIBLE);
                rv.setChronometerCountDown(R.id.gw_chrono, true);
                rv.setChronometer(R.id.gw_chrono, SystemClock.elapsedRealtime() + left, null, true);
                rv.setViewVisibility(R.id.gw_plus, View.VISIBLE);
                rv.setViewVisibility(R.id.gw_skip, View.VISIBLE);
                rv.setTextViewText(R.id.gw_plus, GymLive.label(s, "plus", "+30 s"));
                rv.setTextViewText(R.id.gw_skip, GymLive.label(s, "skip", "Saltar"));
                rv.setOnClickPendingIntent(R.id.gw_plus, GymLive.actionIntent(ctx, "plus"));
                rv.setOnClickPendingIntent(R.id.gw_skip, GymLive.actionIntent(ctx, "skip"));
            } else {
                rv.setViewVisibility(R.id.gw_rest_k, View.GONE);
                rv.setViewVisibility(R.id.gw_chrono, View.GONE);
                rv.setViewVisibility(R.id.gw_plus, View.GONE);
                rv.setViewVisibility(R.id.gw_skip, View.GONE);
            }
        } else {
            rv.setViewVisibility(R.id.gw_bar, View.GONE);
            rv.setViewVisibility(R.id.gw_rest_k, View.GONE);
            rv.setViewVisibility(R.id.gw_chrono, View.GONE);
            rv.setViewVisibility(R.id.gw_plus, View.GONE);
            rv.setViewVisibility(R.id.gw_skip, View.GONE);
            JSONObject today = GymLive.todayInfo(s);
            rv.setTextViewText(R.id.gw_head, GymLive.label(s, "today", "Hoy toca"));
            if (today != null) {
                rv.setTextViewText(R.id.gw_ex, today.optString("name", "Gym"));
                rv.setTextViewText(R.id.gw_set, today.optString("info", ""));
                rv.setViewVisibility(R.id.gw_done, View.VISIBLE);
                rv.setTextViewText(R.id.gw_done, GymLive.label(s, "start", "Empezar"));
            } else {
                rv.setTextViewText(R.id.gw_ex, GymLive.label(s, "none", "Sin rutina para hoy"));
                rv.setTextViewText(R.id.gw_set, GymLive.label(s, "noneSub", "Programa tus rutinas en la pestaña Gym."));
                rv.setViewVisibility(R.id.gw_done, View.VISIBLE);
                rv.setTextViewText(R.id.gw_done, GymLive.label(s, "open", "Abrir Gym"));
            }
            rv.setOnClickPendingIntent(R.id.gw_done, GymLive.openIntent(ctx));
        }
        mgr.updateAppWidget(id, rv);
    }
}
