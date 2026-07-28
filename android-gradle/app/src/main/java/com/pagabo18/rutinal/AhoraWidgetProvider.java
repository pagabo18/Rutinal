package com.pagabo18.rutinal;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.widget.RemoteViews;

import org.json.JSONObject;

import java.util.List;

/**
 * Widget "Ahora" (4x1): muestra el bloque actual del día y el siguiente.
 * Lee el estado guardado por el WebView (SharedPreferences 'rutinal_data')
 * a través de DataHelper. Tocar el widget abre la app.
 */
public class AhoraWidgetProvider extends AppWidgetProvider {

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
            ComponentName cn = new ComponentName(context, AhoraWidgetProvider.class);
            int[] ids = mgr.getAppWidgetIds(cn);
            if (ids == null || ids.length == 0) return;
            for (int id : ids) {
                updateOne(context, mgr, id);
            }
        } catch (Exception ignored) {}
    }

    private static void updateOne(Context context, AppWidgetManager mgr, int widgetId) {
        RemoteViews rv = new RemoteViews(context.getPackageName(), R.layout.widget_ahora);

        String currentLabel = "Sin bloque activo";
        String currentSub = "";
        String nextText = "Sin más bloques hoy";
        int progressPct = -1; // -1 = sin bloque activo (barra oculta)

        try {
            JSONObject state = DataHelper.loadState(context);

            DataHelper.Block cur = DataHelper.currentBlock(context);
            if (cur != null) {
                currentLabel = (cur.label == null || cur.label.isEmpty()) ? "Bloque" : cur.label;
                String cat = DataHelper.catLabel(state, cur.cat, cur.isImprevisto);
                int left = cur.endMin - DataHelper.nowMin();
                StringBuilder sb = new StringBuilder();
                sb.append(cur.startStr).append(" – ").append(cur.endStr);
                if (cat != null && !cat.isEmpty()) sb.append(" · ").append(cat);
                sb.append(" · quedan ").append(DataHelper.fmtDur(left));
                currentSub = sb.toString();

                // % transcurrido del bloque actual
                int dur = cur.endMin - cur.startMin;
                if (dur > 0) {
                    int pct = (DataHelper.nowMin() - cur.startMin) * 100 / dur;
                    if (pct < 0) pct = 0;
                    if (pct > 100) pct = 100;
                    progressPct = pct;
                }
            }

            List<DataHelper.Block> next = DataHelper.nextBlocks(context, 1);
            if (next != null && !next.isEmpty()) {
                DataHelper.Block n = next.get(0);
                String nl = (n.label == null || n.label.isEmpty()) ? "Bloque" : n.label;
                nextText = "Luego: " + nl + " · " + n.startStr;
            }
        } catch (Exception ignored) {
            // Estado ausente o corrupto: se muestran los textos por defecto.
        }

        rv.setTextViewText(R.id.widget_current_label, currentLabel);
        rv.setTextViewText(R.id.widget_current_time, currentSub);
        rv.setViewVisibility(R.id.widget_current_time,
                currentSub.isEmpty() ? View.GONE : View.VISIBLE);
        rv.setTextViewText(R.id.widget_next, nextText);

        // Barra de progreso del bloque actual
        if (progressPct >= 0) {
            rv.setProgressBar(R.id.widget_ahora_progress, 100, progressPct, false);
            rv.setViewVisibility(R.id.widget_ahora_progress, View.VISIBLE);
        } else {
            rv.setViewVisibility(R.id.widget_ahora_progress, View.GONE);
        }

        Intent open = new Intent(context, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        open.setData(android.net.Uri.parse("rutinal://open/hoy"));
        open.putExtra("open_tab", "hoy");
        PendingIntent pi = PendingIntent.getActivity(context, 0, open,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        rv.setOnClickPendingIntent(R.id.widget_root, pi);

        mgr.updateAppWidget(widgetId, rv);
    }
}
