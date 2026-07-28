package com.pagabo18.rutinal;

import android.content.Context;

/**
 * Punto único para refrescar todos los widgets de la app.
 * Nunca lanza: cada refresco va protegido por su propio try/catch.
 */
public class WidgetRefresher {

    public static void refreshAll(Context ctx) {
        try { AhoraWidgetProvider.refreshAll(ctx); } catch (Exception ignored) {}
        try { HabitsWidgetProvider.refreshAll(ctx); } catch (Exception ignored) {}
    }
}
