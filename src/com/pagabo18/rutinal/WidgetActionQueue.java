package com.pagabo18.rutinal;

import android.content.Context;
import android.content.SharedPreferences;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Cola de acciones nativo -> JS generada por los widgets interactivos.
 * Se guarda como array JSON en SharedPreferences 'rutinal_data', clave
 * 'widget_actions'. El JS la drena con Android.consumeWidgetActions().
 * Todas las operaciones van sincronizadas sobre la clase y protegidas
 * con try/catch: nunca lanzan.
 */
public class WidgetActionQueue {
    public static final String K_ACTIONS = "widget_actions";

    /** Agrega una acción al final de la cola. Nunca lanza. */
    public static void append(Context ctx, JSONObject action) {
        if (ctx == null || action == null) return;
        synchronized (WidgetActionQueue.class) {
            try {
                SharedPreferences sp = ctx.getSharedPreferences(
                        WebAppInterface.PREFS, Context.MODE_PRIVATE);
                JSONArray arr;
                try {
                    arr = new JSONArray(sp.getString(K_ACTIONS, "[]"));
                } catch (Exception e) {
                    arr = new JSONArray();
                }
                arr.put(action);
                sp.edit().putString(K_ACTIONS, arr.toString()).commit();
            } catch (Exception ignored) {}
        }
    }

    /** ¿Hay acciones del entrenamiento sin aplicar por el JS? Nunca lanza. */
    public static boolean hasGym(Context ctx) {
        if (ctx == null) return false;
        synchronized (WidgetActionQueue.class) {
            try {
                SharedPreferences sp = ctx.getSharedPreferences(
                        WebAppInterface.PREFS, Context.MODE_PRIVATE);
                JSONArray arr = new JSONArray(sp.getString(K_ACTIONS, "[]"));
                for (int i = 0; i < arr.length(); i++) {
                    JSONObject a = arr.optJSONObject(i);
                    if (a != null && a.optString("t").startsWith("gym_")) return true;
                }
            } catch (Exception ignored) {}
            return false;
        }
    }

    /**
     * Devuelve el array JSON como string y borra la clave atómicamente.
     * Devuelve "[]" si está vacía o si algo falla.
     */
    public static String consume(Context ctx) {
        if (ctx == null) return "[]";
        synchronized (WidgetActionQueue.class) {
            try {
                SharedPreferences sp = ctx.getSharedPreferences(
                        WebAppInterface.PREFS, Context.MODE_PRIVATE);
                String s = sp.getString(K_ACTIONS, "[]");
                sp.edit().remove(K_ACTIONS).commit();
                if (s == null || s.isEmpty()) return "[]";
                // Validar que sea un array JSON; si está corrupto, descartar.
                try { new JSONArray(s); } catch (Exception e) { return "[]"; }
                return s;
            } catch (Exception e) {
                return "[]";
            }
        }
    }
}
