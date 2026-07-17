package com.gabriel.organizame;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.graphics.Color;

public class MainActivity extends Activity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Barra de estado con color de la app
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            getWindow().setStatusBarColor(Color.parseColor("#0B0F1A"));
            getWindow().setNavigationBarColor(Color.parseColor("#0B0F1A"));
        }

        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setMediaPlaybackRequiresUserGesture(false);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }
        });

        webView.setBackgroundColor(Color.parseColor("#0B0F1A"));

        // Bridge JS <-> Java para widgets
        webView.addJavascriptInterface(new WebAppInterface(this), "Android");

        webView.loadUrl("file:///android_asset/web/index.html");
        setContentView(webView);

        // Pedir permiso de notificaciones en Android 13+
        if (Build.VERSION.SDK_INT >= 33) {
            if (checkSelfPermission("android.permission.POST_NOTIFICATIONS") != android.content.pm.PackageManager.PERMISSION_GRANTED) {
                requestPermissions(new String[]{"android.permission.POST_NOTIFICATIONS"}, 101);
            }
        }

        // Asegurar canal + programar notificaciones al abrir
        NotificationScheduler.ensureChannel(this);
        NotificationScheduler.scheduleAll(this);
    }

    public void requestCalendarPermission() {
        if (checkSelfPermission("android.permission.READ_CALENDAR") == android.content.pm.PackageManager.PERMISSION_GRANTED) {
            notifyWebPermission(true);
            return;
        }
        // Detectar si el usuario ya dijo 'No volver a preguntar' o si es la primera vez
        boolean canShowRationale = shouldShowRequestPermissionRationale("android.permission.READ_CALENDAR");
        // En Android 11+ si fue denegado 2 veces, ni shouldShowRationale ni requestPermissions muestran nada
        try {
            android.widget.Toast.makeText(this, "Solicitando permiso de Calendar\u2026", android.widget.Toast.LENGTH_SHORT).show();
        } catch (Exception ignored) {}
        requestPermissions(new String[]{"android.permission.READ_CALENDAR"}, 102);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == 102) {
            boolean granted = grantResults.length > 0 && grantResults[0] == android.content.pm.PackageManager.PERMISSION_GRANTED;
            if (!granted) {
                // Si fue denegado permanentemente, ofrecer abrir Ajustes
                boolean canAskAgain = shouldShowRequestPermissionRationale("android.permission.READ_CALENDAR");
                if (!canAskAgain) {
                    try {
                        android.widget.Toast.makeText(this, "Activa 'Calendario' en Ajustes de la app", android.widget.Toast.LENGTH_LONG).show();
                    } catch (Exception ignored) {}
                }
            }
            notifyWebPermission(granted);
        }
    }

    private void notifyWebPermission(boolean granted) {
        try {
            if (webView != null) {
                webView.evaluateJavascript(
                    "window.dispatchEvent(new CustomEvent('gcalPermission', {detail:{granted:" + granted + "}}))",
                    null);
            }
        } catch (Exception ignored) {}
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
