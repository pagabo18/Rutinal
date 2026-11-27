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
 * Widget "Entrenamiento": durante el entrenamiento muestra el ejercicio y la
 * serie que siguen, la cuenta del descanso y los botones Serie hecha / +30 s /
 * Saltar. Si el widget tiene 3 filas o más de alto, muestra también el peso,
 * las repeticiones y el RIR de esa serie con botones − y + (como la fila de
 * series de la app): al marcarla se registra con esos valores y pasa a la siguiente. Sin entrenamiento en curso muestra
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

    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager mgr, int id, android.os.Bundle newOptions) {
        try { updateOne(context, mgr, id); } catch (Exception ignored) {}
    }

    /** ¿Cabe la fila de valores? (alto del widget en dp) */
    private static boolean tall(AppWidgetManager mgr, int id) {
        try {
            android.os.Bundle o = mgr.getAppWidgetOptions(id);
            int h = o == null ? 0 : Math.max(o.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT, 0), o.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT, 0));
            return h >= 220;
        } catch (Exception e) {
            return false;
        }
    }

    private static void bindStepper(Context ctx, RemoteViews rv, String f, int minusId, int valueId, int plusId, String value) {
        rv.setTextViewText(valueId, value == null || value.isEmpty() ? "–" : value);
        rv.setOnClickPendingIntent(minusId, GymLive.actionIntent(ctx, f + "-"));
        rv.setOnClickPendingIntent(plusId, GymLive.actionIntent(ctx, f + "+"));
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
        rv.setViewVisibility(R.id.gw_edit, View.GONE);
        rv.setInt(R.id.gw_set, "setMaxLines", 2);

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
                rv.setViewVisibility(R.id.gw_done, View.VISIBLE);
                rv.setTextViewText(R.id.gw_done, "✓ " + GymLive.label(s, "done", "Serie hecha"));
                if (GymLive.editable(it) && tall(mgr, id)) {
                    // Fila de valores: lo planeado arriba y el peso, reps y RIR ajustables
                    String plan = it.optString("p");
                    rv.setTextViewText(R.id.gw_set, it.optString("s") + (plan.isEmpty() ? "" : " · " + plan));
                    rv.setInt(R.id.gw_set, "setMaxLines", 1);
                    rv.setViewVisibility(R.id.gw_edit, View.VISIBLE);
                    rv.setTextViewText(R.id.gw_kg_k, it.optString("u", "kg").toUpperCase());
                    bindStepper(ctx, rv, "kg", R.id.gw_kg_m, R.id.gw_kg_v, R.id.gw_kg_p, it.optString("kg", ""));
                    bindStepper(ctx, rv, "reps", R.id.gw_reps_m, R.id.gw_reps_v, R.id.gw_reps_p, it.optString("reps", ""));
                    bindStepper(ctx, rv, "rir", R.id.gw_rir_m, R.id.gw_rir_v, R.id.gw_rir_p, it.optString("rir", ""));
                    rv.setOnClickPendingIntent(R.id.gw_done, GymLive.actionIntent(ctx, "done_w"));
                } else {
                    rv.setTextViewText(R.id.gw_set, it.optString("s") + (tgt.isEmpty() ? "" : " · " + tgt));
                    rv.setOnClickPendingIntent(R.id.gw_done, GymLive.actionIntent(ctx, "done"));
                }
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
