package com.pagabo18.rutinal;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.SystemClock;
import android.view.View;
import android.widget.RemoteViews;

import org.json.JSONObject;

import java.util.Locale;

/**
 * Widget "Pomodoro" (4x1): muestra la cuenta regresiva en vivo (Chronometer
 * con countDown) cuando el temporizador corre, o el tiempo restante en
 * pausa. Botones ▶ / ⏸ / ↺ controlan el espejo 'widget_pomo' dentro de
 * state_json y encolan la acción para que el JS la sincronice.
 */
public class PomoWidgetProvider extends AppWidgetProvider {

    public static final String ACTION_POMO = "com.pagabo18.rutinal.WIDGET_POMO";
    public static final String EXTRA_ACTION = "a"; // start | pause | reset

    private static final long DEFAULT_FOCUS_MS = 25L * 60_000L;

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
            if (intent != null && ACTION_POMO.equals(intent.getAction())) {
                String a = intent.getStringExtra(EXTRA_ACTION);
                if ("start".equals(a) || "pause".equals(a) || "reset".equals(a)) {
                    applyAction(context, a);
                }
                WidgetRefresher.refreshAll(context);
            }
        } catch (Exception ignored) {}
    }

    /** Duración de la fase de enfoque en ms (pomo_settings.focus si existe). */
    private static long focusMs(JSONObject state) {
        long ms = DEFAULT_FOCUS_MS;
        try {
            JSONObject ps = state.optJSONObject("pomo_settings");
            if (ps != null) {
                double v = ps.optDouble("focus", 0);
                if (v > 0) {
                    // Puede venir en minutos o en ms según la versión del JS
                    ms = (v >= 1000) ? (long) v : (long) (v * 60_000L);
                }
            }
        } catch (Exception ignored) {}
        return ms;
    }

    /** Aplica start/pause/reset sobre el espejo widget_pomo. Nunca lanza. */
    private static void applyAction(Context context, String a) {
        try {
            long now = System.currentTimeMillis();
            JSONObject state = DataHelper.loadState(context);
            JSONObject wp = state.optJSONObject("widget_pomo");
            if (wp == null) wp = new JSONObject();

            String phase = wp.optString("phase", "focus");
            if (phase.isEmpty()) phase = "focus";
            long endMs = (long) wp.optDouble("endMs", 0);
            long remainingMs = (long) wp.optDouble("remainingMs", 0);

            if ("start".equals(a)) {
                long dur = (remainingMs > 0) ? remainingMs : DEFAULT_FOCUS_MS;
                long newEnd = now + dur;
                wp.put("running", true);
                wp.put("phase", phase);
                wp.put("endMs", newEnd);
                wp.put("remainingMs", dur);
                if (!wp.has("cycle")) wp.put("cycle", 1);
                if (!wp.has("cycles")) wp.put("cycles", 4);
                // Alarma nativa de fin de fase (mismo mecanismo que el JS)
                try {
                    NotificationScheduler.schedulePomo(context, phase, "short", 1, newEnd);
                } catch (Exception ignored) {}
            } else if ("pause".equals(a)) {
                long rem = endMs - now;
                if (rem < 0) rem = 0;
                wp.put("running", false);
                wp.put("remainingMs", rem);
                try { NotificationScheduler.cancelPomo(context); } catch (Exception ignored) {}
            } else { // reset
                wp.put("running", false);
                wp.put("remainingMs", focusMs(state));
                wp.put("phase", "focus");
                wp.put("cycle", 1);
                try { NotificationScheduler.cancelPomo(context); } catch (Exception ignored) {}
            }

            state.put("widget_pomo", wp);
            DataHelper.saveState(context, state);

            JSONObject action = new JSONObject();
            action.put("t", "pomo");
            action.put("a", a);
            WidgetActionQueue.append(context, action);
        } catch (Exception ignored) {}
    }

    /** Actualiza todas las instancias del widget. Nunca lanza. */
    public static void refreshAll(Context context) {
        try {
            AppWidgetManager mgr = AppWidgetManager.getInstance(context);
            if (mgr == null) return;
            ComponentName cn = new ComponentName(context, PomoWidgetProvider.class);
            int[] ids = mgr.getAppWidgetIds(cn);
            if (ids == null || ids.length == 0) return;
            for (int id : ids) {
                updateOne(context, mgr, id);
            }
        } catch (Exception ignored) {}
    }

    private static String phaseLabel(String phase) {
        if ("short".equals(phase)) return "Descanso";
        if ("long".equals(phase)) return "Descanso largo";
        if ("timer".equals(phase)) return "Temporizador";
        return "Enfoque";
    }

    private static String fmtMmSs(long ms) {
        if (ms < 0) ms = 0;
        long totalSec = ms / 1000;
        return String.format(Locale.US, "%02d:%02d", totalSec / 60, totalSec % 60);
    }

    private static PendingIntent controlIntent(Context context, String a, int requestCode) {
        Intent i = new Intent(context, PomoWidgetProvider.class);
        i.setAction(ACTION_POMO);
        i.setData(Uri.parse("rutinal://pomo_widget/" + a));
        i.putExtra(EXTRA_ACTION, a);
        return PendingIntent.getBroadcast(context, requestCode, i,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    private static void updateOne(Context context, AppWidgetManager mgr, int widgetId) {
        RemoteViews rv = new RemoteViews(context.getPackageName(), R.layout.widget_pomo);

        boolean running = false;
        boolean hasState = false;
        long now = System.currentTimeMillis();
        long endMs = 0, remainingMs = 0;
        String phase = "focus";
        int cycle = 1, cycles = 4;

        try {
            JSONObject state = DataHelper.loadState(context);
            JSONObject wp = state.optJSONObject("widget_pomo");
            if (wp != null) {
                hasState = true;
                running = wp.optBoolean("running", false);
                endMs = (long) wp.optDouble("endMs", 0);
                remainingMs = (long) wp.optDouble("remainingMs", 0);
                phase = wp.optString("phase", "focus");
                if (phase.isEmpty()) phase = "focus";
                cycle = wp.optInt("cycle", 1);
                cycles = wp.optInt("cycles", 4);
            }
        } catch (Exception ignored) {
            hasState = false;
        }

        boolean live = hasState && running && endMs > now;

        if (live) {
            // Cuenta regresiva en vivo con Chronometer
            rv.setViewVisibility(R.id.widget_pomo_chrono, View.VISIBLE);
            rv.setViewVisibility(R.id.widget_pomo_time, View.GONE);
            rv.setChronometerCountDown(R.id.widget_pomo_chrono, true);
            rv.setChronometer(R.id.widget_pomo_chrono,
                    SystemClock.elapsedRealtime() + (endMs - now), null, true);
            rv.setTextViewText(R.id.widget_pomo_phase, phaseLabel(phase));
        } else {
            rv.setViewVisibility(R.id.widget_pomo_chrono, View.GONE);
            rv.setViewVisibility(R.id.widget_pomo_time, View.VISIBLE);
            if (hasState) {
                long rem = running ? Math.max(0, endMs - now) : remainingMs;
                rv.setTextViewText(R.id.widget_pomo_time, fmtMmSs(rem));
                rv.setTextViewText(R.id.widget_pomo_phase,
                        phaseLabel(phase) + " · En pausa");
            } else {
                rv.setTextViewText(R.id.widget_pomo_time, "Pomodoro");
                rv.setTextViewText(R.id.widget_pomo_phase, "Toca para iniciar un Pomodoro");
            }
        }

        // "ciclo X de Y" (oculto en modo temporizador o sin estado)
        if (hasState && !"timer".equals(phase)) {
            rv.setTextViewText(R.id.widget_pomo_cycle, "ciclo " + cycle + " de " + cycles);
            rv.setViewVisibility(R.id.widget_pomo_cycle, View.VISIBLE);
        } else {
            rv.setViewVisibility(R.id.widget_pomo_cycle, View.GONE);
        }

        // Botones: ▶ visible si no corre, ⏸ visible si corre, ↺ siempre
        rv.setViewVisibility(R.id.widget_pomo_play, live ? View.GONE : View.VISIBLE);
        rv.setViewVisibility(R.id.widget_pomo_pause, live ? View.VISIBLE : View.GONE);
        rv.setOnClickPendingIntent(R.id.widget_pomo_play, controlIntent(context, "start", 20));
        rv.setOnClickPendingIntent(R.id.widget_pomo_pause, controlIntent(context, "pause", 21));
        rv.setOnClickPendingIntent(R.id.widget_pomo_reset, controlIntent(context, "reset", 22));

        // Tocar el cuerpo abre la pestaña Pomodoro
        Intent open = new Intent(context, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        open.setData(Uri.parse("rutinal://open/pomo"));
        open.putExtra("open_tab", "pomo");
        PendingIntent pi = PendingIntent.getActivity(context, 3, open,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        rv.setOnClickPendingIntent(R.id.widget_pomo_root, pi);
        rv.setOnClickPendingIntent(R.id.widget_pomo_body, pi);

        mgr.updateAppWidget(widgetId, rv);
    }
}
