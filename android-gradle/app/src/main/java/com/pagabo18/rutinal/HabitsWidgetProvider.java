package com.pagabo18.rutinal;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.widget.RemoteViews;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Widget "Hábitos de hoy" (4x2): muestra hasta 6 hábitos del día con
 * "✓ " (hecho) o "○ " (pendiente). Solo lectura: tocar el widget abre
 * la app. Lee el estado guardado por el WebView (SharedPreferences
 * 'rutinal_data') a través de DataHelper.
 */
public class HabitsWidgetProvider extends AppWidgetProvider {

    private static final int MAX_ROWS = 6;

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
            ComponentName cn = new ComponentName(context, HabitsWidgetProvider.class);
            int[] ids = mgr.getAppWidgetIds(cn);
            if (ids == null || ids.length == 0) return;
            for (int id : ids) {
                updateOne(context, mgr, id);
            }
        } catch (Exception ignored) {}
    }

    private static int[] rowIds() {
        return new int[] {
                R.id.widget_habit_1,
                R.id.widget_habit_2,
                R.id.widget_habit_3,
                R.id.widget_habit_4,
                R.id.widget_habit_5,
                R.id.widget_habit_6
        };
    }

    private static void updateOne(Context context, AppWidgetManager mgr, int widgetId) {
        RemoteViews rv = new RemoteViews(context.getPackageName(), R.layout.widget_habits);
        int[] rows = rowIds();
        int shown = 0;

        rv.setTextViewText(R.id.widget_habits_title, "Hábitos de hoy");

        try {
            JSONObject state = DataHelper.loadState(context);
            JSONArray habits = state.optJSONArray("habits");
            String today = DataHelper.todayKey();
            JSONObject log = state.optJSONObject("habitLog");
            JSONObject todayObj = (log != null) ? log.optJSONObject(today) : null;
            // Compatibilidad con el formato legacy (array de ids)
            JSONArray todayArr = (log != null && todayObj == null) ? log.optJSONArray(today) : null;

            if (habits != null) {
                for (int i = 0; i < habits.length() && shown < MAX_ROWS; i++) {
                    JSONObject h = habits.optJSONObject(i);
                    if (h == null) continue;
                    String id = h.optString("id");
                    String name = h.optString("name", "");
                    if (name.isEmpty()) continue;

                    boolean done = false;
                    if (todayObj != null) {
                        done = todayObj.optBoolean(id, false);
                    } else if (todayArr != null) {
                        for (int j = 0; j < todayArr.length(); j++) {
                            if (id.equals(todayArr.optString(j))) { done = true; break; }
                        }
                    }

                    rv.setTextViewText(rows[shown], (done ? "✓ " : "○ ") + name);
                    rv.setViewVisibility(rows[shown], View.VISIBLE);
                    shown++;
                }
            }
        } catch (Exception ignored) {
            // Estado ausente o corrupto: se muestra el texto por defecto.
        }

        if (shown == 0) {
            rv.setTextViewText(rows[0], "Sin hábitos configurados");
            rv.setViewVisibility(rows[0], View.VISIBLE);
            shown = 1;
        }
        for (int i = shown; i < rows.length; i++) {
            rv.setViewVisibility(rows[i], View.GONE);
        }

        // Solo lectura: tocar el widget abre la app
        Intent open = new Intent(context, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pi = PendingIntent.getActivity(context, 1, open,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        rv.setOnClickPendingIntent(R.id.widget_habits_root, pi);

        mgr.updateAppWidget(widgetId, rv);
    }
}
