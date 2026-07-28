package com.pagabo18.rutinal;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.view.View;
import android.widget.RemoteViews;

import org.json.JSONObject;

import java.util.Locale;

/**
 * Widget "Comida de hoy" (4x1): calorías consumidas vs meta, barra de
 * progreso y resumen de macros. Lee el espejo 'widget_food' que el JS
 * guarda dentro de state_json. Tocar el widget abre la pestaña Comida.
 */
public class FoodWidgetProvider extends AppWidgetProvider {

    private static final int RED = Color.parseColor("#EF4444");

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int id : appWidgetIds) {
            updateOne(context, appWidgetManager, id);
        }
    }

    /** Actualiza todas las instancias del widget. Nunca lanza. */
    public static void refreshAll(Context context) {
        try {
            AppWidgetManager mgr = AppWidgetManager.getInstance(context);
            if (mgr == null) return;
            ComponentName cn = new ComponentName(context, FoodWidgetProvider.class);
            int[] ids = mgr.getAppWidgetIds(cn);
            if (ids == null || ids.length == 0) return;
            for (int id : ids) {
                updateOne(context, mgr, id);
            }
        } catch (Exception ignored) {}
    }

    private static String fmt(int n) {
        return String.format(Locale.US, "%,d", n);
    }

    private static void updateOne(Context context, AppWidgetManager mgr, int widgetId) {
        RemoteViews rv = new RemoteViews(context.getPackageName(), R.layout.widget_food);

        boolean hasData = false;
        try {
            JSONObject state = DataHelper.loadState(context);
            JSONObject wf = state.optJSONObject("widget_food");
            if (wf != null) {
                hasData = true;
                int kcal = wf.optInt("kcal", 0);
                int goal = wf.optInt("goal", 0);
                int p = wf.optInt("p", 0), gp = wf.optInt("gp", 0);
                int c = wf.optInt("c", 0), gc = wf.optInt("gc", 0);
                int f = wf.optInt("f", 0), gf = wf.optInt("gf", 0);

                rv.setTextViewText(R.id.widget_food_kcal,
                        fmt(kcal) + " / " + fmt(goal) + " kcal");

                // Rojo si se pasa del 105% de la meta
                if (goal > 0 && kcal > goal * 105L / 100L) {
                    rv.setTextColor(R.id.widget_food_kcal, RED);
                }

                int max = (goal > 0) ? goal : Math.max(kcal, 1);
                int prog = Math.min(kcal, max);
                if (prog < 0) prog = 0;
                rv.setProgressBar(R.id.widget_food_progress, max, prog, false);
                rv.setViewVisibility(R.id.widget_food_progress, View.VISIBLE);

                rv.setTextViewText(R.id.widget_food_macros,
                        "P " + p + "/" + gp + " · C " + c + "/" + gc + " · G " + f + "/" + gf);
                rv.setViewVisibility(R.id.widget_food_macros, View.VISIBLE);
            }
        } catch (Exception ignored) {
            hasData = false;
        }

        if (!hasData) {
            rv.setTextViewText(R.id.widget_food_kcal, "Abre Rutinal para ver tu día");
            rv.setViewVisibility(R.id.widget_food_progress, View.GONE);
            rv.setViewVisibility(R.id.widget_food_macros, View.GONE);
        }

        // Tocar el widget abre la pestaña Comida
        Intent open = new Intent(context, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        open.setData(Uri.parse("rutinal://open/comida"));
        open.putExtra("open_tab", "comida");
        PendingIntent pi = PendingIntent.getActivity(context, 2, open,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        rv.setOnClickPendingIntent(R.id.widget_food_root, pi);

        mgr.updateAppWidget(widgetId, rv);
    }
}
