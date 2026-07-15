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

public class HabitosWidgetProvider extends AppWidgetProvider {
    public static final String ACTION_TOGGLE = "com.gabriel.organizame.HABIT_TOGGLE";
    public static final String EXTRA_HABIT_ID = "habit_id";

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) render(ctx, mgr, id);
    }

    @Override
    public void onReceive(Context ctx, Intent intent) {
        super.onReceive(ctx, intent);
        if (ACTION_TOGGLE.equals(intent.getAction())) {
            String hid = intent.getStringExtra(EXTRA_HABIT_ID);
            if (hid != null) DataHelper.toggleHabit(ctx, hid);
            AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
            int[] ids = mgr.getAppWidgetIds(new ComponentName(ctx, HabitosWidgetProvider.class));
            for (int id : ids) render(ctx, mgr, id);
        }
    }

    private static void render(Context ctx, AppWidgetManager mgr, int widgetId) {
        RemoteViews rv = new RemoteViews(ctx.getPackageName(), R.layout.widget_habitos);

        List<DataHelper.Habit> hs = DataHelper.habitsToday(ctx, 4);
        int[] rowIds = {R.id.hb_row0, R.id.hb_row1, R.id.hb_row2, R.id.hb_row3};
        int[] nameIds = {R.id.hb_name0, R.id.hb_name1, R.id.hb_name2, R.id.hb_name3};
        int[] checkIds = {R.id.hb_check0, R.id.hb_check1, R.id.hb_check2, R.id.hb_check3};
        int[] dotIds = {R.id.hb_dot0, R.id.hb_dot1, R.id.hb_dot2, R.id.hb_dot3};

        int done = 0;
        for (int i = 0; i < 4; i++) {
            if (i < hs.size()) {
                DataHelper.Habit h = hs.get(i);
                rv.setViewVisibility(rowIds[i], android.view.View.VISIBLE);
                rv.setTextViewText(nameIds[i], h.name);
                rv.setInt(checkIds[i], "setImageResource",
                        h.doneToday ? R.drawable.ic_check_on : R.drawable.ic_check_off);
                try { rv.setInt(dotIds[i], "setBackgroundColor", Color.parseColor(h.color)); }
                catch (Exception e) { rv.setInt(dotIds[i], "setBackgroundColor", Color.parseColor("#52525B")); }
                if (h.doneToday) done++;

                // PendingIntent para toggle
                Intent it = new Intent(ctx, HabitosWidgetProvider.class);
                it.setAction(ACTION_TOGGLE);
                it.putExtra(EXTRA_HABIT_ID, h.id);
                it.setData(android.net.Uri.parse("organizame://habit/" + h.id));
                int flags = PendingIntent.FLAG_UPDATE_CURRENT;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) flags |= PendingIntent.FLAG_IMMUTABLE;
                PendingIntent pi = PendingIntent.getBroadcast(ctx, h.id.hashCode(), it, flags);
                rv.setOnClickPendingIntent(rowIds[i], pi);
            } else {
                rv.setViewVisibility(rowIds[i], android.view.View.GONE);
            }
        }

        rv.setTextViewText(R.id.hb_header, "Hábitos de hoy  ·  " + done + "/" + hs.size());

        // Header tap → abrir app
        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) flags |= PendingIntent.FLAG_IMMUTABLE;
        PendingIntent openPI = PendingIntent.getActivity(ctx, widgetId, open, flags);
        rv.setOnClickPendingIntent(R.id.hb_header_wrap, openPI);

        mgr.updateAppWidget(widgetId, rv);
    }
}
