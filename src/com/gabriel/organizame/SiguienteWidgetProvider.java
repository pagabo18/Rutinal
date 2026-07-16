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

import java.util.List;

public class SiguienteWidgetProvider extends AppWidgetProvider {
    private static final String ACTION_TICK = "com.gabriel.organizame.WIDGET_TICK_SIG";

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) render(ctx, mgr, id);
    }

    @Override
    public void onReceive(Context ctx, Intent intent) {
        super.onReceive(ctx, intent);
        String action = intent.getAction();
        if (ACTION_TICK.equals(action) || AppWidgetManager.ACTION_APPWIDGET_UPDATE.equals(action)) {
            AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
            int[] ids = mgr.getAppWidgetIds(new ComponentName(ctx, SiguienteWidgetProvider.class));
            for (int id : ids) render(ctx, mgr, id);
        }
    }

    private static void render(Context ctx, AppWidgetManager mgr, int widgetId) {
        RemoteViews rv = new RemoteViews(ctx.getPackageName(), R.layout.widget_siguiente);

        int now = DataHelper.nowMin();
        DataHelper.Block cur = DataHelper.currentBlock(ctx);
        List<DataHelper.Block> next = DataHelper.nextBlocks(ctx, 1);

        DataHelper.Block target = next.isEmpty() ? null : next.get(0);
        String label = "Siguiente";
        String colorStr = "#8E8E93";
        String title = "Sin bloques por venir";
        String meta = "Toca para abrir";
        String inNum = "—";
        String inUnit = "";

        if (target != null) {
            label = "Siguiente";
            colorStr = target.color;
            title = target.label;
            meta = target.startStr + " – " + target.endStr;
            int mins = Math.max(0, target.startMin - now);
            if (mins < 60) {
                inNum = String.valueOf(mins);
                inUnit = "min";
            } else {
                int h = mins / 60;
                int m = mins % 60;
                if (m == 0) {
                    inNum = h + "h";
                    inUnit = "";
                } else {
                    inNum = h + "h";
                    inUnit = m + "m";
                }
            }
        } else if (cur != null) {
            // Si no hay siguiente pero hay uno activo, mostrar el actual
            label = "Ahora";
            colorStr = cur.color;
            title = cur.label;
            meta = cur.startStr + " – " + cur.endStr;
            int remaining = Math.max(0, cur.endMin - now);
            if (remaining < 60) {
                inNum = String.valueOf(remaining);
                inUnit = "min";
            } else {
                int h = remaining / 60;
                int m = remaining % 60;
                inNum = h + "h";
                inUnit = m > 0 ? m + "m" : "";
            }
        }

        int color;
        try { color = Color.parseColor(colorStr); } catch (Exception e) { color = Color.parseColor("#8E8E93"); }

        rv.setTextViewText(R.id.sig_lbl, label);
        rv.setTextViewText(R.id.sig_title, title);
        rv.setTextViewText(R.id.sig_meta, meta);
        rv.setTextViewText(R.id.sig_in_num, inNum);
        rv.setTextViewText(R.id.sig_in_unit, inUnit);
        rv.setInt(R.id.sig_accent, "setBackgroundColor", color);

        // Al tocar el widget → abrir app
        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) flags |= PendingIntent.FLAG_IMMUTABLE;
        PendingIntent openPI = PendingIntent.getActivity(ctx, 0, open, flags);
        rv.setOnClickPendingIntent(R.id.sig_root, openPI);

        mgr.updateAppWidget(widgetId, rv);
    }
}
