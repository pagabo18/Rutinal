package com.pagabo18.rutinal;

import android.content.Context;
import android.content.SharedPreferences;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

/**
 * Lee el estado guardado por el WebView y expone consultas prácticas
 * para los widgets (bloque actual, próximos, hábitos).
 *
 * Formato de estado (mismo shape que en el HTML):
 * {
 *   "cats": [{"id","label","color"}],
 *   "habits": [{"id","name","cat","meta"}],
 *   "habitLog": {"2026-07-14": ["id1","id2"], ...},
 *   "sch_weekday": [{"start":"08:00","end":"10:00","label":"...","cat":"trabajo"}],
 *   "sch_saturday": [...],
 *   "sch_sunday": [...],
 *   "imprevistos": [{"date":"2026-07-14","start":"14:00","end":"15:00","label":"...","cat":"impr"}]
 * }
 */
public class DataHelper {
    public static class Block {
        public String label, cat, color, startStr, endStr;
        public int startMin, endMin;
        public boolean isImprevisto;
    }
    public static class Habit {
        public String id, name, cat, meta, color;
        public boolean doneToday;
    }

    public static JSONObject loadState(Context ctx) {
        SharedPreferences sp = ctx.getSharedPreferences(WebAppInterface.PREFS, Context.MODE_PRIVATE);
        String s = sp.getString(WebAppInterface.K_STATE, "{}");
        try { return new JSONObject(s); } catch (Exception e) { return new JSONObject(); }
    }

    public static void saveState(Context ctx, JSONObject state) {
        SharedPreferences sp = ctx.getSharedPreferences(WebAppInterface.PREFS, Context.MODE_PRIVATE);
        sp.edit().putString(WebAppInterface.K_STATE, state.toString()).apply();
    }

    public static String todayKey() {
        Calendar c = Calendar.getInstance();
        return String.format(Locale.US, "%04d-%02d-%02d",
                c.get(Calendar.YEAR), c.get(Calendar.MONTH) + 1, c.get(Calendar.DAY_OF_MONTH));
    }

    public static int nowMin() {
        Calendar c = Calendar.getInstance();
        return c.get(Calendar.HOUR_OF_DAY) * 60 + c.get(Calendar.MINUTE);
    }

    private static int timeToMin(String t) {
        try {
            String[] p = t.split(":");
            return Integer.parseInt(p[0]) * 60 + Integer.parseInt(p[1]);
        } catch (Exception e) { return 0; }
    }

    public static String fmtDur(int min) {
        if (min < 0) min = 0;
        if (min < 60) return min + " min";
        int h = min / 60, m = min % 60;
        return m == 0 ? (h + " h") : (h + " h " + m + " min");
    }

    private static String catColor(JSONObject state, String catId, boolean isImprevisto) {
        if (isImprevisto) return "#C2410C";
        JSONArray cats = state.optJSONArray("cats");
        if (cats == null) return "#52525B";
        for (int i = 0; i < cats.length(); i++) {
            JSONObject c = cats.optJSONObject(i);
            if (c != null && catId != null && catId.equals(c.optString("id"))) {
                return c.optString("color", "#52525B");
            }
        }
        return "#52525B";
    }

    public static String catLabel(JSONObject state, String catId, boolean isImprevisto) {
        if (isImprevisto) return "Imprevisto";
        JSONArray cats = state.optJSONArray("cats");
        if (cats == null) return "";
        for (int i = 0; i < cats.length(); i++) {
            JSONObject c = cats.optJSONObject(i);
            if (c != null && catId != null && catId.equals(c.optString("id"))) {
                return c.optString("label", "");
            }
        }
        return "";
    }

    /** Devuelve todos los bloques del día ordenados por hora. */
    public static List<Block> todayBlocks(Context ctx) {
        JSONObject state = loadState(ctx);
        List<Block> out = new ArrayList<>();

        // Elegir schedule según día de semana
        Calendar c = Calendar.getInstance();
        int dow = c.get(Calendar.DAY_OF_WEEK);
        String key;
        if (dow == Calendar.SATURDAY) key = "sch_saturday";
        else if (dow == Calendar.SUNDAY) key = "sch_sunday";
        else key = "sch_weekday";
        JSONArray blocks = state.optJSONArray(key);
        if (blocks != null) {
            for (int i = 0; i < blocks.length(); i++) {
                JSONObject b = blocks.optJSONObject(i);
                if (b == null) continue;
                Block bl = new Block();
                bl.startStr = b.optString("start", "00:00");
                bl.endStr = b.optString("end", "00:00");
                bl.startMin = timeToMin(bl.startStr);
                bl.endMin = timeToMin(bl.endStr);
                bl.label = b.optString("label", "");
                bl.cat = b.optString("cat", "personal");
                bl.color = catColor(state, bl.cat, false);
                bl.isImprevisto = false;
                out.add(bl);
            }
        }

        // Imprevistos del día actual
        JSONArray imprs = state.optJSONArray("imprevistos");
        String today = todayKey();
        if (imprs != null) {
            for (int i = 0; i < imprs.length(); i++) {
                JSONObject b = imprs.optJSONObject(i);
                if (b == null) continue;
                if (!today.equals(b.optString("date"))) continue;
                Block bl = new Block();
                bl.startStr = b.optString("start", "00:00");
                bl.endStr = b.optString("end", "00:00");
                bl.startMin = timeToMin(bl.startStr);
                bl.endMin = timeToMin(bl.endStr);
                bl.label = b.optString("label", "");
                bl.cat = "impr";
                bl.color = "#C2410C";
                bl.isImprevisto = true;
                out.add(bl);
            }
        }

        // Ordenar por hora de inicio
        java.util.Collections.sort(out, (a, b) -> Integer.compare(a.startMin, b.startMin));
        return out;
    }

    public static Block currentBlock(Context ctx) {
        int now = nowMin();
        for (Block b : todayBlocks(ctx)) {
            if (b.startMin <= now && now < b.endMin) return b;
        }
        return null;
    }

    public static List<Block> nextBlocks(Context ctx, int limit) {
        int now = nowMin();
        List<Block> out = new ArrayList<>();
        for (Block b : todayBlocks(ctx)) {
            if (b.startMin > now) {
                out.add(b);
                if (out.size() >= limit) break;
            }
        }
        return out;
    }

    public static List<Habit> habitsToday(Context ctx, int limit) {
        JSONObject state = loadState(ctx);
        List<Habit> out = new ArrayList<>();
        JSONArray habits = state.optJSONArray("habits");
        if (habits == null) return out;

        JSONObject log = state.optJSONObject("habitLog");
        JSONArray doneArr = (log != null) ? log.optJSONArray(todayKey()) : null;
        List<String> done = new ArrayList<>();
        if (doneArr != null) {
            for (int i = 0; i < doneArr.length(); i++) done.add(doneArr.optString(i));
        }

        for (int i = 0; i < habits.length() && (limit < 0 || out.size() < limit); i++) {
            JSONObject h = habits.optJSONObject(i);
            if (h == null) continue;
            Habit hh = new Habit();
            hh.id = h.optString("id");
            hh.name = h.optString("name", "");
            hh.cat = h.optString("cat", "personal");
            hh.meta = h.optString("meta", "");
            hh.color = catColor(state, hh.cat, false);
            hh.doneToday = done.contains(hh.id);
            out.add(hh);
        }
        return out;
    }

    /** Toggle de un hábito para hoy. Devuelve el nuevo estado (true si quedó marcado). */
    public static boolean toggleHabit(Context ctx, String habitId) {
        JSONObject state = loadState(ctx);
        JSONObject log = state.optJSONObject("habitLog");
        if (log == null) log = new JSONObject();
        String k = todayKey();
        JSONArray arr = log.optJSONArray(k);
        List<String> ids = new ArrayList<>();
        if (arr != null) for (int i = 0; i < arr.length(); i++) ids.add(arr.optString(i));

        boolean isNow;
        if (ids.contains(habitId)) { ids.remove(habitId); isNow = false; }
        else { ids.add(habitId); isNow = true; }

        JSONArray nu = new JSONArray();
        for (String s : ids) nu.put(s);
        try {
            log.put(k, nu);
            state.put("habitLog", log);
            saveState(ctx, state);
        } catch (Exception ignored) {}
        return isNow;
    }
}
