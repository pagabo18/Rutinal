package com.pagabo18.rutinal;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** Lectura periódica del contador de pasos con la app cerrada (cada hora y antes de medianoche). */
public class StepsReceiver extends BroadcastReceiver {
    public static final String ACTION = "com.pagabo18.rutinal.STEPS_SAMPLE";

    @Override
    public void onReceive(final Context ctx, Intent intent) {
        try {
            if (intent == null || !ACTION.equals(intent.getAction())) return;
            final PendingResult pr = goAsync();
            StepCounter.sample(ctx, new Runnable() {
                @Override public void run() {
                    try { StepCounter.schedule(ctx.getApplicationContext()); } catch (Exception ignored) {}
                    try { pr.finish(); } catch (Exception ignored) {}
                }
            });
        } catch (Exception ignored) {}
    }
}
