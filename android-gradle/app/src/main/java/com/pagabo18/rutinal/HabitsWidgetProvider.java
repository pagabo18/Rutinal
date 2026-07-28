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
 * Widget "Hábitos de hoy" (4x2) interactivo: muestra hasta 6 hábitos del
 * día y cada fila se puede tocar para marcarlo/desmarcarlo. El toggle
 * reescribe state_json y encola la acción en 'widget_actions' para que
 * el JS la sincronice al abrir la app.
 */
public class HabitsWidgetProvider extends AppWidgetProvider {

    public static final String ACTION_HABIT_TOGGLE = "com.pagabo18.rutinal.WIDGET_HABIT_TOGGLE";
    public static final String EXTRA_HABIT_ID = "habit_id";

    private static final int MAX_ROWS = 6;
    private static final int ACCENT = Color.parseColor("#3B82F6");

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

    private static void updateOne(Context context, AppWidgetManager mgr, int widgetId) {
        RemoteViews rv = new RemoteViews(context.getPackageName(), R.layout.widget_habits);
        int[] rows = rowIds();
        int[] checks = checkIds();
        int[] names = nameIds();
        int shown = 0;
        int total = 0;
        int done = 0;

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
                    total++;
                    if (isDone) done++;

                    if (shown < MAX_ROWS) {
                        rv.setTextViewText(checks[shown], isDone ? "✓" : "○");
                        if (isDone) rv.setTextColor(checks[shown], ACCENT);
                        rv.setTextViewText(names[shown], name);
                        rv.setViewVisibility(rows[shown], View.VISIBLE);

                        // Toggle al tocar la fila
                        Intent toggle = new Intent(context, HabitsWidgetProvider.class);
                        toggle.setAction(ACTION_HABIT_TOGGLE);
                        toggle.setData(Uri.parse("rutinal://habit_toggle/" + Uri.encode(id)));
                        toggle.putExtra(EXTRA_HABIT_ID, id);
                        PendingIntent tpi = PendingIntent.getBroadcast(context,
                                id.hashCode(), toggle,
                                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
                        rv.setOnClickPendingIntent(rows[shown], tpi);
                        shown++;
                    }
                }
            }
        } catch (Exception ignored) {
            // Estado ausente o corrupto: se muestra el texto por defecto.
        }

        if (total > 0) {
            rv.setTextViewText(R.id.widget_habits_title, "Hábitos · " + done + "/" + total + " hoy");
        } else {
            rv.setTextViewText(R.id.widget_habits_title, "Hábitos de hoy");
        }

        if (shown == 0) {
            rv.setTextViewText(checks[0], "○");
            rv.setTextViewText(names[0], "Sin hábitos configurados");
            rv.setViewVisibility(rows[0], View.VISIBLE);
            shown = 1;
        }
        for (int i = shown; i < rows.length; i++) {
            rv.setViewVisibility(rows[i], View.GONE);
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

        mgr.updateAppWidget(widgetId, rv);
    }
}
