package com.gabriel.organizame;

import android.Manifest;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.Context;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.provider.CalendarContract;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

/**
 * Lector de Google Calendar via Calendar Provider nativo.
 * Solo lectura. Los eventos que llegan aqui ya estan sincronizados por el
 * sync adapter del sistema (funcionan offline con lo que ya se descargo).
 */
public class GCalHelper {

    public static boolean hasPermission(Context ctx) {
        return ctx.checkSelfPermission(Manifest.permission.READ_CALENDAR)
                == PackageManager.PERMISSION_GRANTED;
    }

    /**
     * Devuelve todos los calendarios del dispositivo.
     * JSON: [{"id":123,"name":"Mi calendario","color":"#4285F4","account":"foo@gmail.com"}]
     */
    public static String listCalendars(Context ctx) {
        JSONArray out = new JSONArray();
        if (!hasPermission(ctx)) return out.toString();
        String[] proj = new String[] {
                CalendarContract.Calendars._ID,
                CalendarContract.Calendars.CALENDAR_DISPLAY_NAME,
                CalendarContract.Calendars.CALENDAR_COLOR,
                CalendarContract.Calendars.ACCOUNT_NAME,
                CalendarContract.Calendars.VISIBLE
        };
        Cursor c = null;
        try {
            c = ctx.getContentResolver().query(
                    CalendarContract.Calendars.CONTENT_URI, proj,
                    CalendarContract.Calendars.VISIBLE + " = 1", null, null);
            if (c != null) {
                while (c.moveToNext()) {
                    JSONObject o = new JSONObject();
                    o.put("id", c.getLong(0));
                    o.put("name", c.getString(1));
                    int color = c.getInt(2);
                    o.put("color", String.format("#%06X", (0xFFFFFF & color)));
                    o.put("account", c.getString(3));
                    out.put(o);
                }
            }
        } catch (Exception ignored) {
        } finally {
            if (c != null) c.close();
        }
        return out.toString();
    }

    /**
     * Devuelve eventos del dia (yyyy-MM-dd, zona local) para los calendarios
     * indicados (ids separados por coma, o vacio = todos los visibles).
     * JSON: [{"id":..,"title":"..","start":"HH:mm","end":"HH:mm","color":"#..","calId":..,
     *         "allDay":bool,"location":".."}]
     */
    public static String getEventsForDate(Context ctx, String dateKey, String calIdsCsv) {
        JSONArray out = new JSONArray();
        if (!hasPermission(ctx)) return out.toString();
        long[] range = dayRange(dateKey);
        if (range == null) return out.toString();

        // Usar Instances para expandir eventos recurrentes.
        Uri.Builder b = CalendarContract.Instances.CONTENT_URI.buildUpon();
        ContentUris.appendId(b, range[0]);
        ContentUris.appendId(b, range[1]);
        Uri uri = b.build();

        String[] proj = new String[] {
                CalendarContract.Instances.EVENT_ID,
                CalendarContract.Instances.TITLE,
                CalendarContract.Instances.BEGIN,
                CalendarContract.Instances.END,
                CalendarContract.Instances.ALL_DAY,
                CalendarContract.Instances.CALENDAR_ID,
                CalendarContract.Instances.DISPLAY_COLOR,
                CalendarContract.Instances.EVENT_LOCATION,
                CalendarContract.Instances.STATUS
        };

        String sel = null;
        String[] selArgs = null;
        if (calIdsCsv != null && !calIdsCsv.trim().isEmpty()) {
            String[] parts = calIdsCsv.split(",");
            StringBuilder inList = new StringBuilder();
            for (int i = 0; i < parts.length; i++) {
                if (i > 0) inList.append(",");
                inList.append(Long.parseLong(parts[i].trim()));
            }
            sel = CalendarContract.Instances.CALENDAR_ID + " IN (" + inList + ")";
        }

        Cursor c = null;
        try {
            c = ctx.getContentResolver().query(uri, proj, sel, selArgs,
                    CalendarContract.Instances.BEGIN + " ASC");
            SimpleDateFormat hhmm = new SimpleDateFormat("HH:mm", Locale.US);
            hhmm.setTimeZone(TimeZone.getDefault());
            if (c != null) {
                while (c.moveToNext()) {
                    int status = c.getInt(8);
                    // Saltar eventos cancelados
                    if (status == CalendarContract.Instances.STATUS_CANCELED) continue;
                    JSONObject o = new JSONObject();
                    o.put("id", c.getLong(0));
                    o.put("title", c.getString(1) == null ? "(Sin t\u00edtulo)" : c.getString(1));
                    long begin = c.getLong(2);
                    long end = c.getLong(3);
                    boolean allDay = c.getInt(4) == 1;
                    o.put("allDay", allDay);
                    o.put("start", hhmm.format(new java.util.Date(begin)));
                    o.put("end", hhmm.format(new java.util.Date(end)));
                    o.put("calId", c.getLong(5));
                    int color = c.getInt(6);
                    o.put("color", String.format("#%06X", (0xFFFFFF & color)));
                    o.put("location", c.getString(7) == null ? "" : c.getString(7));
                    out.put(o);
                }
            }
        } catch (Exception ignored) {
        } finally {
            if (c != null) c.close();
        }
        return out.toString();
    }

    /** Devuelve [startOfDayMillis, endOfDayMillis] para el yyyy-MM-dd dado. */
    private static long[] dayRange(String dateKey) {
        try {
            SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            f.setTimeZone(TimeZone.getDefault());
            java.util.Date d = f.parse(dateKey);
            if (d == null) return null;
            Calendar c = Calendar.getInstance();
            c.setTime(d);
            c.set(Calendar.HOUR_OF_DAY, 0);
            c.set(Calendar.MINUTE, 0);
            c.set(Calendar.SECOND, 0);
            c.set(Calendar.MILLISECOND, 0);
            long start = c.getTimeInMillis();
            c.add(Calendar.DAY_OF_YEAR, 1);
            long end = c.getTimeInMillis();
            return new long[] { start, end };
        } catch (Exception e) {
            return null;
        }
    }
}
