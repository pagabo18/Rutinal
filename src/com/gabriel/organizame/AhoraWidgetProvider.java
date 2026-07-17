package com.gabriel.organizame;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.widget.RemoteViews;

public class AhoraWidgetProvider extends AppWidgetProvider {
    private static final String ACTION_TICK = "com.gabriel.organizame.WIDGET_TICK";

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) render(ctx, mgr, id);
    }

    @Override
    public void onReceive(Context ctx, Intent intent) {
        super.onReceive(ctx, intent);
        if (ACTION_TICK.equals(intent.getAction())) {
            AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
            int[] ids = mgr.getAppWidgetIds(new ComponentName(ctx, AhoraWidgetProvider.class));
            for (int id : ids) render(ctx, mgr, id);
        }
    }

    private static void render(Context ctx, AppWidgetManager mgr, int widgetId) {
        RemoteViews rv;
        try {
            rv = new RemoteViews(ctx.getPackageName(), R.layout.widget_ahora);
        } catch (Exception e) {
            return;
        }

        try {
            DataHelper.Block cur = DataHelper.currentBlock(ctx);
            if (cur == null) {
                rv.setTextViewText(R.id.ah_title, "Sin bloque activo");
                rv.setTextViewText(R.id.ah_meta, "Toca para abrir Organízame");
                rv.setTextViewText(R.id.ah_time, "—");
                rv.setInt(R.id.ah_bar_fill, "setBackgroundColor", Color.parseColor("#8E8E93"));
                rv.setInt(R.id.ah_accent, "setBackgroundColor", Color.parseColor("#8E8E93"));
                setProgress(rv, 0);
            } else {
                int now = DataHelper.nowMin();
                int total = Math.max(1, cur.endMin - cur.startMin);
                int elapsed = Math.max(0, Math.min(total, now - cur.startMin));
                int remaining = Math.max(0, cur.endMin - now);
                int pct = (int) Math.round(100.0 * elapsed / total);

                int color;
                try { color = Color.parseColor(cur.color); } catch (Exception e) { color = Color.parseColor("#8E8E93"); }
                rv.setTextViewText(R.id.ah_title, cur.label == null ? "" : cur.label);
                rv.setTextViewText(R.id.ah_meta, cur.startStr + " – " + cur.endStr);
                rv.setTextViewText(R.id.ah_time, DataHelper.fmtDur(remaining) + " restantes");
                rv.setInt(R.id.ah_bar_fill, "setBackgroundColor", color);
                rv.setInt(R.id.ah_accent, "setBackgroundColor", color);
                setProgress(rv, pct);
            }
        } catch (Exception ex) {
            // Si algo falla al construir contenido, mostrar estado por defecto
            rv.setTextViewText(R.id.ah_title, "Organízame");
            rv.setTextViewText(R.id.ah_meta, "Toca para abrir");
            rv.setTextViewText(R.id.ah_time, "—");
        }

        // Al tocar el widget → abrir app
        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) flags |= PendingIntent.FLAG_IMMUTABLE;
        PendingIntent openPI = PendingIntent.getActivity(ctx, 0, open, flags);
        rv.setOnClickPendingIntent(R.id.ah_root, openPI);

        mgr.updateAppWidget(widgetId, rv);
    }

    /** Progreso 0-100 con LinearLayout weights (portable). */
    private static void setProgress(RemoteViews rv, int pct) {
        pct = Math.max(0, Math.min(100, pct));
        try {
            // API 31+ soporta setFloat con setLayoutWeight
            rv.setFloat(R.id.ah_bar_fill, "setLayoutWeight", (float) pct);
            rv.setFloat(R.id.ah_bar_rest, "setLayoutWeight", (float) (100 - pct));
        } catch (Exception ignored) {}
    }
}
