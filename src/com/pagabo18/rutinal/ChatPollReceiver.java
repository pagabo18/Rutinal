package com.pagabo18.rutinal;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Build;
import android.os.SystemClock;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

/**
 * Avisos de mensajes del chat con la app cerrada.
 *
 * No hay servicio de push: cada ~15 minutos este receptor pregunta al servidor si
 * hay mensajes nuevos para la cuenta y, si los hay, muestra una notificación.
 * Usa una sesión propia (distinta a la del WebView) que la app le entrega al
 * activar los avisos, para no interferir con la sesión que usa la pantalla.
 * Todo es "mejor esfuerzo": cualquier fallo se ignora y se reintenta en la siguiente vuelta.
 */
public class ChatPollReceiver extends BroadcastReceiver {
    public static final String PREFS = "rutinal_chat";
    public static final String ACTION = "com.pagabo18.rutinal.CHAT_POLL";
    public static final String CHANNEL_ID = "rutinal_chat";
    private static final int REQ = 9100;
    private static final int NOTIF_ID = 9100;
    private static final long EVERY_MS = 15L * 60L * 1000L;

    @Override
    public void onReceive(final Context context, Intent intent) {
        final Context ctx = context.getApplicationContext();
        try { schedule(ctx, EVERY_MS); } catch (Throwable ignored) {}
        final PendingResult pr = goAsync();
        new Thread(new Runnable() {
            @Override public void run() {
                try { poll(ctx); } catch (Throwable ignored) {}
                finally { try { pr.finish(); } catch (Throwable ignored) {} }
            }
        }).start();
    }

    // ----- activación desde la app -----

    /** Guarda la sesión propia del revisor y empieza a revisar. json: { url, key, uid, access, refresh, exp }. */
    public static void enable(Context ctx, String json) {
        try {
            JSONObject o = new JSONObject(json);
            String url = o.optString("url"), key = o.optString("key"), uid = o.optString("uid"), refresh = o.optString("refresh");
            if (!url.startsWith("https://") || key.isEmpty() || uid.isEmpty() || refresh.isEmpty()) return;
            sp(ctx).edit()
                .putString("url", url).putString("key", key).putString("uid", uid)
                .putString("access", o.optString("access")).putString("refresh", refresh)
                .putLong("exp", (long) o.optDouble("exp", 0))
                .putString("last", nowIso())
                .apply();
            ensureChannel(ctx);
            schedule(ctx, 60000L);
        } catch (Throwable ignored) {}
    }

    /** Deja de revisar, borra la sesión guardada y la cierra en el servidor. */
    public static void disable(final Context ctx) {
        try {
            final SharedPreferences sp = sp(ctx);
            final String url = sp.getString("url", ""), key = sp.getString("key", ""), access = sp.getString("access", "");
            sp.edit().remove("access").remove("refresh").remove("exp").remove("uid").remove("last").apply();
            cancel(ctx);
            if (!url.isEmpty() && !access.isEmpty()) {
                new Thread(new Runnable() {
                    @Override public void run() {
                        try { http("POST", url + "/auth/v1/logout?scope=local", key, access, "{}"); } catch (Throwable ignored) {}
                    }
                }).start();
            }
        } catch (Throwable ignored) {}
    }

    public static boolean isEnabled(Context ctx) {
        try { return !sp(ctx).getString("refresh", "").isEmpty(); } catch (Throwable e) { return false; }
    }

    /** Nombres por conversación y textos ya traducidos. json: { names: { linkId: nombre }, one, many }. */
    public static void setMeta(Context ctx, String json) {
        try {
            new JSONObject(json); // valida
            sp(ctx).edit().putString("meta", json).apply();
            if (isEnabled(ctx)) schedule(ctx, EVERY_MS);
        } catch (Throwable ignored) {}
    }

    /** La app ya mostró los mensajes hasta esta fecha (ISO del servidor): no se avisan otra vez. */
    public static void markSeen(Context ctx, String iso) {
        try {
            if (iso == null || iso.length() < 19) return;
            SharedPreferences sp = sp(ctx);
            String last = sp.getString("last", "");
            if (last.length() < 19 || iso.substring(0, 19).compareTo(last.substring(0, 19)) >= 0) {
                sp.edit().putString("last", iso).apply();
            }
        } catch (Throwable ignored) {}
    }

    // ----- alarma -----

    public static void schedule(Context ctx, long inMs) {
        if (!isEnabled(ctx)) return;
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        PendingIntent pi = pending(ctx);
        long when = SystemClock.elapsedRealtime() + inMs;
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) am.setAndAllowWhileIdle(AlarmManager.ELAPSED_REALTIME_WAKEUP, when, pi);
            else am.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, when, pi);
        } catch (Throwable e) {
            try { am.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, when, pi); } catch (Throwable ignored) {}
        }
    }

    public static void cancel(Context ctx) {
        try {
            AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
            if (am != null) am.cancel(pending(ctx));
        } catch (Throwable ignored) {}
    }

    private static PendingIntent pending(Context ctx) {
        Intent i = new Intent(ctx, ChatPollReceiver.class);
        i.setAction(ACTION);
        int f = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) f |= PendingIntent.FLAG_IMMUTABLE;
        return PendingIntent.getBroadcast(ctx, REQ, i, f);
    }

    // ----- revisión -----

    private static void poll(Context ctx) throws Exception {
        SharedPreferences sp = sp(ctx);
        String url = sp.getString("url", ""), key = sp.getString("key", ""), uid = sp.getString("uid", "");
        String refresh = sp.getString("refresh", ""), access = sp.getString("access", "");
        if (url.isEmpty() || key.isEmpty() || uid.isEmpty() || refresh.isEmpty()) return;
        if (!online(ctx)) return;
        if (MainActivity.FOREGROUND) return; // con la app a la vista, ella misma muestra los mensajes

        // 1) token vigente (se renueva con el refresh token propio de este revisor)
        if (access.isEmpty() || System.currentTimeMillis() > sp.getLong("exp", 0) - 120000L) {
            JSONObject body = new JSONObject();
            body.put("refresh_token", refresh);
            Resp r = http("POST", url + "/auth/v1/token?grant_type=refresh_token", key, null, body.toString());
            if (r.code == 200) {
                JSONObject j = new JSONObject(r.body);
                access = j.optString("access_token");
                String nr = j.optString("refresh_token");
                if (access.isEmpty() || nr.isEmpty()) return;
                sp.edit().putString("access", access).putString("refresh", nr)
                    .putLong("exp", System.currentTimeMillis() + j.optLong("expires_in", 3600) * 1000L).apply();
            } else if (r.code == 400 || r.code == 401 || r.code == 403) {
                // La sesión ya no vale (cuenta desactivada, contraseña cambiada, sesión cerrada): se apaga
                sp.edit().remove("access").remove("refresh").remove("exp").apply();
                cancel(ctx);
                return;
            } else return;
        }

        // 2) mensajes nuevos que no escribí yo
        String last = sp.getString("last", "");
        if (last.isEmpty()) { sp.edit().putString("last", nowIso()).apply(); return; }
        String q = url + "/rest/v1/notes?select=link_id,body,created_at&author_id=neq." + URLEncoder.encode(uid, "UTF-8")
            + "&created_at=gt." + URLEncoder.encode(last, "UTF-8") + "&order=created_at.asc&limit=20";
        Resp r = http("GET", q, key, access, null);
        if (r.code == 401) { sp.edit().putLong("exp", 0).apply(); return; }
        if (r.code != 200) return;
        JSONArray rows = new JSONArray(r.body);
        if (rows.length() == 0) return;

        JSONObject meta = new JSONObject();
        try { meta = new JSONObject(sp.getString("meta", "{}")); } catch (Throwable ignored) {}
        JSONObject names = meta.optJSONObject("names");
        String one = meta.optString("one", "Mensaje nuevo"), many = meta.optString("many", "mensajes nuevos");

        JSONObject lastRow = rows.getJSONObject(rows.length() - 1);
        String who = names != null ? names.optString(lastRow.optString("link_id"), "") : "";
        String title, text;
        if (rows.length() == 1) {
            title = who.isEmpty() ? one : who;
            text = lastRow.optString("body");
        } else {
            title = "Rutinal";
            text = rows.length() + " " + many;
        }
        sp.edit().putString("last", lastRow.optString("created_at", nowIso())).apply();
        show(ctx, title, text, rows, names);
    }

    private static void show(Context ctx, String title, String text, JSONArray rows, JSONObject names) {
        ensureChannel(ctx);
        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int f = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) f |= PendingIntent.FLAG_IMMUTABLE;
        PendingIntent pi = PendingIntent.getActivity(ctx, NOTIF_ID, open, f);

        Notification.Builder b;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) b = new Notification.Builder(ctx, CHANNEL_ID);
        else b = new Notification.Builder(ctx);
        b.setSmallIcon(R.drawable.ic_notif)
         .setContentTitle(title)
         .setContentText(text)
         .setAutoCancel(true)
         .setColor(Color.parseColor("#111827"))
         .setContentIntent(pi)
         .setCategory(Notification.CATEGORY_MESSAGE)
         .setVisibility(Notification.VISIBILITY_PRIVATE);
        if (rows.length() == 1) {
            b.setStyle(new Notification.BigTextStyle().bigText(text));
        } else {
            Notification.InboxStyle st = new Notification.InboxStyle();
            for (int i = Math.max(0, rows.length() - 5); i < rows.length(); i++) {
                JSONObject n = rows.optJSONObject(i);
                if (n == null) continue;
                String w = names != null ? names.optString(n.optString("link_id"), "") : "";
                st.addLine((w.isEmpty() ? "" : w + ": ") + n.optString("body"));
            }
            b.setStyle(st);
        }
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm != null) nm.notify(NOTIF_ID, b.build());
    }

    public static void ensureChannel(Context ctx) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null || nm.getNotificationChannel(CHANNEL_ID) != null) return;
        NotificationChannel ch = new NotificationChannel(CHANNEL_ID, "Mensajes", NotificationManager.IMPORTANCE_DEFAULT);
        ch.setDescription("Mensajes de tus especialistas o entrenados.");
        nm.createNotificationChannel(ch);
    }

    // ----- utilidades -----

    private static SharedPreferences sp(Context ctx) {
        return ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    private static boolean online(Context ctx) {
        try {
            ConnectivityManager cm = (ConnectivityManager) ctx.getSystemService(Context.CONNECTIVITY_SERVICE);
            if (cm == null) return true;
            NetworkInfo ni = cm.getActiveNetworkInfo();
            return ni != null && ni.isConnected();
        } catch (Throwable e) { return true; }
    }

    private static String nowIso() {
        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US);
        f.setTimeZone(TimeZone.getTimeZone("UTC"));
        return f.format(new Date());
    }

    private static final class Resp {
        final int code; final String body;
        Resp(int code, String body) { this.code = code; this.body = body; }
    }

    private static Resp http(String method, String url, String key, String bearer, String body) throws Exception {
        HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
        try {
            c.setConnectTimeout(8000);
            c.setReadTimeout(8000);
            c.setRequestMethod(method);
            c.setRequestProperty("apikey", key);
            c.setRequestProperty("Accept", "application/json");
            if (bearer != null && !bearer.isEmpty()) c.setRequestProperty("Authorization", "Bearer " + bearer);
            if (body != null) {
                c.setDoOutput(true);
                c.setRequestProperty("Content-Type", "application/json");
                OutputStream os = c.getOutputStream();
                os.write(body.getBytes("UTF-8"));
                os.close();
            }
            int code = c.getResponseCode();
            InputStream in = code >= 400 ? c.getErrorStream() : c.getInputStream();
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            if (in != null) {
                byte[] buf = new byte[4096];
                int n;
                while ((n = in.read(buf)) > 0) { out.write(buf, 0, n); if (out.size() > 200000) break; }
                in.close();
            }
            return new Resp(code, out.toString("UTF-8"));
        } finally {
            c.disconnect();
        }
    }
}
