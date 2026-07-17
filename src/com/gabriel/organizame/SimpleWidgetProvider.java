package com.gabriel.organizame;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.widget.RemoteViews;

public class SimpleWidgetProvider extends AppWidgetProvider {
    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) {
            try {
                RemoteViews rv = new RemoteViews(ctx.getPackageName(), R.layout.widget_simple);
                Intent open = new Intent(ctx, MainActivity.class);
                open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
                int flags = PendingIntent.FLAG_UPDATE_CURRENT;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) flags |= PendingIntent.FLAG_IMMUTABLE;
                PendingIntent pi = PendingIntent.getActivity(ctx, id, open, flags);
                rv.setOnClickPendingIntent(R.id.simple_text, pi);
                mgr.updateAppWidget(id, rv);
            } catch (Exception ignored) {}
        }
    }
}
