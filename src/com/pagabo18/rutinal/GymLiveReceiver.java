package com.pagabo18.rutinal;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** Botones de la notificación, del widget y de la ventana flotante del entrenamiento, y fin del descanso. */
public class GymLiveReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context ctx, Intent intent) {
        try {
            if (intent == null || !GymLive.ACTION.equals(intent.getAction())) return;
            String a = intent.getStringExtra(GymLive.EXTRA_A);
            if (a != null) GymLive.apply(ctx.getApplicationContext(), a);
        } catch (Exception ignored) {}
    }
}
