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

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Widget "Hábitos de hoy" interactivo: muestra los hábitos que caben según su
 * tamaño (hasta 6, primero los pendientes), con avance del día; cada fila se
 * toca para marcarlo/desmarcarlo. El toggle
 * reescribe state_json y encola la acción en 'widget_actions' para que
 * el JS la sincronice al abrir la app.
 */
public class HabitsWidgetProvider extends AppWidgetProvider {

    public static final String ACTION_HABIT_TOGGLE = "com.pagabo18.rutinal.WIDGET_HABIT_TOGGLE";
    public static final String EXTRA_HABIT_ID = "habit_id";

    private static final int MAX_ROWS = 6;

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int id : appWidgetIds) {
            updateOne(context, appWidgetManager, id);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        try {
            if (intent != null && ACTION_HABIT_TOGGLE.equals(intent.getAction())) {
                String habitId = intent.getStringExtra(EXTRA_HABIT_ID);
                if (habitId != null && !habitId.isEmpty()) {
                    toggleHabit(context, habitId);
                }
                WidgetRefresher.refreshAll(context);
            }
        } catch (Exception ignored) {}
    }

    /** Invierte habitLog[hoy][habitId] en state_json y encola la acción. Nunca lanza. */
    private static void toggleHabit(Context context, String habitId) {
        try {
            String today = DataHelper.todayKey();
            JSONObject state = DataHelper.loadState(context);
            JSONObject log = state.optJSONObject("habitLog");
            if (log == null) log = new JSONObject();

            JSONObject day = log.optJSONObject(today);
            if (day == null) {
                day = new JSONObject();
                // Migrar el formato legacy (array de ids hechos) si existiera
                JSONArray legacy = log.optJSONArray(today);
                if (legacy != null) {
                    for (int i = 0; i < legacy.length(); i++) {
                        String id = legacy.optString(i, "");
                        if (!id.isEmpty()) day.put(id, true);
                    }
                }
            }

            boolean nuevo = !day.optBoolean(habitId, false);
            day.put(habitId, nuevo);
            log.put(today, day);
            state.put("habitLog", log);
            DataHelper.saveState(context, state);

            JSONObject action = new JSONObject();
            action.put("t", "habit_toggle");
            action.put("id", habitId);
            action.put("date", today);
            action.put("v", nuevo);
            WidgetActionQueue.append(context, action);
        } catch (Exception ignored) {}
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
                R.id.widget_habit_row_1,
                R.id.widget_habit_row_2,
                R.id.widget_habit_row_3,
                R.id.widget_habit_row_4,
                R.id.widget_habit_row_5,
                R.id.widget_habit_row_6
        };
    }

    private static int[] checkIds() {
        return new int[] {
                R.id.widget_habit_check_1,
                R.id.widget_habit_check_2,
                R.id.widget_habit_check_3,
                R.id.widget_habit_check_4,
                R.id.widget_habit_check_5,
                R.id.widget_habit_check_6
        };
    }

    private static int[] nameIds() {
        return new int[] {
                R.id.widget_habit_name_1,
                R.id.widget_habit_name_2,
                R.id.widget_habit_name_3,
                R.id.widget_habit_name_4,
                R.id.widget_habit_name_5,
                R.id.widget_habit_name_6
        };
    }

    /** Hábitos de hoy como {id, nombre, "1" si está hecho}; primero los pendientes. Nunca lanza. */
    public static java.util.List<String[]> todayHabits(Context context) {
        java.util.List<String[]> pend = new java.util.ArrayList<>(), done = new java.util.ArrayList<>();
        try {
            JSONObject state = DataHelper.loadState(context);
            JSONArray habits = state.optJSONArray("habits");
            String today = DataHelper.todayKey();
            JSONObject log = state.optJSONObject("habitLog");
            JSONObject todayObj = (log != null) ? log.optJSONObject(today) : null;
            // Compatibilidad con el formato legacy (array de ids)
            JSONArray todayArr = (log != null && todayObj == null) ? log.optJSONArray(today) : null;
            if (habits != null) {
                for (int i = 0; i < habits.length(); i++) {
                    JSONObject h = habits.optJSONObject(i);
                    if (h == null) continue;
                    String id = h.optString("id");
                    String name = h.optString("name", "");
                    if (name.isEmpty()) continue;
                    boolean isDone = false;
                    if (todayObj != null) {
                        isDone = todayObj.optBoolean(id, false);
                    } else if (todayArr != null) {
                        for (int j = 0; j < todayArr.length(); j++) {
                            if (id.equals(todayArr.optString(j))) { isDone = true; break; }
                        }
                    }
                    (isDone ? done : pend).add(new String[]{id, name, isDone ? "1" : "0"});
                }
            }
        } catch (Exception ignored) {
            // Estado ausente o corrupto: lista vacía.
        }
        pend.addAll(done);
        return pend;
    }

    /** Intent del toggle de un hábito (el mismo para el widget y la notificación). */
    public static PendingIntent toggleIntent(Context context, String id) {
        Intent toggle = new Intent(context, HabitsWidgetProvider.class);
        toggle.setAction(ACTION_HABIT_TOGGLE);
        toggle.setData(Uri.parse("rutinal://habit_toggle/" + Uri.encode(id)));
        toggle.putExtra(EXTRA_HABIT_ID, id);
        return PendingIntent.getBroadcast(context, id.hashCode(), toggle,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    /** Cuántas filas caben según el alto del widget (cada fila mide 32dp). */
    private static int rowsThatFit(AppWidgetManager mgr, int widgetId) {
        try {
            android.os.Bundle o = mgr.getAppWidgetOptions(widgetId);
            int h = o == null ? 0 : Math.max(o.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT, 0),
                    o.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT, 0));
            if (h <= 0) return 3;
            // 32dp de margen del fondo + ~40dp del encabezado y la barra
            return Math.max(1, Math.min(MAX_ROWS, (h - 72) / 32));
        } catch (Exception e) {
            return 3;
        }
    }

    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager mgr, int widgetId, android.os.Bundle newOptions) {
        try { updateOne(context, mgr, widgetId); } catch (Exception ignored) {}
    }

    private static void updateOne(Context context, AppWidgetManager mgr, int widgetId) {
        RemoteViews rv = new RemoteViews(context.getPackageName(), R.layout.widget_habits);
        int[] rows = rowIds();
        int[] checks = checkIds();
        int[] names = nameIds();
        java.util.List<String[]> list = todayHabits(context);
        int total = list.size(), done = 0;
        for (String[] h : list) if ("1".equals(h[2])) done++;
        int fit = rowsThatFit(mgr, widgetId), shown = Math.min(fit, total);

        for (int i = 0; i < rows.length; i++) {
            if (i >= shown) { rv.setViewVisibility(rows[i], View.GONE); continue; }
            String[] h = list.get(i);
            boolean isDone = "1".equals(h[2]);
            rv.setImageViewResource(checks[i], isDone ? R.drawable.ic_check_on : R.drawable.ic_check_off);
            rv.setTextViewText(names[i], h[1]);
            // hecho: tachado y en gris
            rv.setTextColor(names[i], context.getColor(isDone ? R.color.widgetText2 : R.color.widgetText1));
            rv.setInt(names[i], "setPaintFlags", android.graphics.Paint.ANTI_ALIAS_FLAG | (isDone ? android.graphics.Paint.STRIKE_THRU_TEXT_FLAG : 0));
            rv.setViewVisibility(rows[i], View.VISIBLE);
            rv.setOnClickPendingIntent(rows[i], toggleIntent(context, h[0]));
        }

        if (total > 0) {
            rv.setTextViewText(R.id.widget_habits_count, (done == total ? "✓ " : "") + done + "/" + total);
            rv.setViewVisibility(R.id.widget_habits_count, View.VISIBLE);
            rv.setProgressBar(R.id.widget_habits_progress, total, done, false);
            rv.setViewVisibility(R.id.widget_habits_progress, View.VISIBLE);
            int more = total - shown;
            if (more > 0) {
                rv.setTextViewText(R.id.widget_habits_more, "+" + more + " más");
                rv.setViewVisibility(R.id.widget_habits_more, View.VISIBLE);
            } else {
                rv.setViewVisibility(R.id.widget_habits_more, View.GONE);
            }
        } else {
            rv.setViewVisibility(R.id.widget_habits_count, View.GONE);
            rv.setViewVisibility(R.id.widget_habits_progress, View.GONE);
            rv.setTextViewText(R.id.widget_habits_more, "Agrega tus hábitos en Rutinal");
            rv.setViewVisibility(R.id.widget_habits_more, View.VISIBLE);
        }

        // Tocar el título / fondo abre la app en la pestaña de hábitos
        Intent open = new Intent(context, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        open.setData(Uri.parse("rutinal://open/habitos"));
        open.putExtra("open_tab", "habitos");
        PendingIntent pi = PendingIntent.getActivity(context, 1, open,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        rv.setOnClickPendingIntent(R.id.widget_habits_root, pi);
        rv.setOnClickPendingIntent(R.id.widget_habits_title, pi);
        rv.setOnClickPendingIntent(R.id.widget_habits_more, pi);

        mgr.updateAppWidget(widgetId, rv);
    }
}
