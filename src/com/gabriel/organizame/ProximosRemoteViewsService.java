package com.gabriel.organizame;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;

import java.util.List;

public class ProximosRemoteViewsService extends RemoteViewsService {
    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new Factory(getApplicationContext());
    }

    static class Factory implements RemoteViewsFactory {
        private final Context ctx;
        private List<DataHelper.Block> data;

        Factory(Context ctx) { this.ctx = ctx; }

        @Override public void onCreate() { data = DataHelper.nextBlocks(ctx, 5); }
        @Override public void onDataSetChanged() { data = DataHelper.nextBlocks(ctx, 5); }
        @Override public void onDestroy() {}
        @Override public int getCount() { return data == null ? 0 : data.size(); }

        @Override
        public RemoteViews getViewAt(int position) {
            RemoteViews rv = new RemoteViews(ctx.getPackageName(), R.layout.widget_prox_item);
            DataHelper.Block b = data.get(position);
            rv.setTextViewText(R.id.pi_time, b.startStr);
            rv.setTextViewText(R.id.pi_title, b.label);
            int dur = Math.max(0, b.endMin - b.startMin);
            rv.setTextViewText(R.id.pi_dur, DataHelper.fmtDur(dur));
            try {
                rv.setInt(R.id.pi_dot, "setBackgroundColor", Color.parseColor(b.color));
            } catch (Exception e) {
                rv.setInt(R.id.pi_dot, "setBackgroundColor", Color.parseColor("#52525B"));
            }

            // Click en item → abre app
            Intent fill = new Intent();
            rv.setOnClickFillInIntent(R.id.pi_root, fill);
            return rv;
        }

        @Override public RemoteViews getLoadingView() { return null; }
        @Override public int getViewTypeCount() { return 1; }
        @Override public long getItemId(int position) { return position; }
        @Override public boolean hasStableIds() { return true; }
    }
}
