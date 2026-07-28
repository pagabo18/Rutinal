package com.pagabo18.rutinal;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.graphics.Color;

public class MainActivity extends Activity {
    private static final int REQ_CAMERA_WEB = 4301;
    private static final int REQ_FILE_CHOOSER = 4302;
    private WebView webView;
    private android.webkit.PermissionRequest pendingWebPermissionRequest;
    private ValueCallback<Uri[]> pendingFileChooserCallback;

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

        // Permitir getUserMedia (cámara) desde el WebView para escanear códigos
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                boolean wantsVideo = false;
                String[] resources = request.getResources();
                if (resources != null) {
                    for (String r : resources) {
                        if (PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(r)) {
                            wantsVideo = true;
                            break;
                        }
                    }
                }
                if (!wantsVideo) {
                    request.deny();
                    return;
                }
                if (checkSelfPermission(Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
                    request.grant(new String[]{PermissionRequest.RESOURCE_VIDEO_CAPTURE});
                } else {
                    pendingWebPermissionRequest = request;
                    requestPermissions(new String[]{Manifest.permission.CAMERA}, REQ_CAMERA_WEB);
                }
            }

            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> filePathCallback,
                                             FileChooserParams fileChooserParams) {
                // Liberar cualquier callback anterior sin resolver
                if (pendingFileChooserCallback != null) {
                    try { pendingFileChooserCallback.onReceiveValue(null); } catch (Exception ignored) {}
                    pendingFileChooserCallback = null;
                }
                pendingFileChooserCallback = filePathCallback;
                try {
                    Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
                    intent.addCategory(Intent.CATEGORY_OPENABLE);
                    String type = "*/*";
                    String[] accept = (fileChooserParams != null) ? fileChooserParams.getAcceptTypes() : null;
                    if (accept != null && accept.length > 0 && accept[0] != null && !accept[0].trim().isEmpty()) {
                        type = accept[0].trim();
                        if (accept.length > 1) {
                            intent.putExtra(Intent.EXTRA_MIME_TYPES, accept);
                        }
                    }
                    intent.setType(type);
                    startActivityForResult(Intent.createChooser(intent, "Elegir archivo"), REQ_FILE_CHOOSER);
                    return true;
                } catch (Exception e) {
                    ValueCallback<Uri[]> cb = pendingFileChooserCallback;
                    pendingFileChooserCallback = null;
                    if (cb != null) {
                        try { cb.onReceiveValue(null); } catch (Exception ignored) {}
                    }
                    return false;
                }
            }
        });

        webView.setBackgroundColor(Color.parseColor("#0B0F1A"));

        // Bridge JS <-> Java
        webView.addJavascriptInterface(new WebAppInterface(this), "Android");

        webView.loadUrl("file:///android_asset/web/index.html");
        setContentView(webView);

        // Archivos JSON compartidos/abiertos con la app (el WebView aún carga,
        // por eso se entrega con retraso)
        handleImportIntent(getIntent(), true);

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

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleImportIntent(intent, false);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQ_FILE_CHOOSER) {
            ValueCallback<Uri[]> cb = pendingFileChooserCallback;
            pendingFileChooserCallback = null;
            if (cb != null) {
                Uri[] result = null;
                try {
                    if (resultCode == Activity.RESULT_OK && data != null && data.getData() != null) {
                        result = new Uri[]{ data.getData() };
                    }
                } catch (Exception ignored) {}
                try { cb.onReceiveValue(result); } catch (Exception ignored) {}
            }
        }
    }

    /**
     * Lee un JSON compartido/abierto con la app (ACTION_VIEW / ACTION_SEND)
     * y lo entrega al JS como window.onImportFile(texto). Nunca lanza.
     */
    private void handleImportIntent(Intent intent, boolean delayed) {
        if (intent == null || webView == null) return;
        String action = intent.getAction();
        if (!Intent.ACTION_VIEW.equals(action) && !Intent.ACTION_SEND.equals(action)) return;

        String text = null;
        try {
            if (Intent.ACTION_SEND.equals(action)) {
                text = intent.getStringExtra(Intent.EXTRA_TEXT);
                if (text == null) {
                    Uri stream = (Uri) intent.getParcelableExtra(Intent.EXTRA_STREAM);
                    if (stream != null) text = readTextFromUri(stream);
                }
            } else {
                Uri data = intent.getData();
                if (data != null) text = readTextFromUri(data);
            }
        } catch (Exception ignored) {}
        if (text == null || text.isEmpty()) return;

        final String quoted = org.json.JSONObject.quote(text);
        Runnable deliver = new Runnable() {
            @Override public void run() {
                try {
                    webView.evaluateJavascript(
                            "window.onImportFile && window.onImportFile(" + quoted + ")", null);
                } catch (Exception ignored) {}
            }
        };
        try {
            if (delayed) {
                webView.postDelayed(deliver, 1500);
            } else {
                webView.post(deliver);
            }
        } catch (Exception ignored) {}
    }

    /** Lee texto UTF-8 de un content Uri con límite de 5 MB. null si falla. */
    private String readTextFromUri(Uri uri) {
        java.io.InputStream is = null;
        try {
            is = getContentResolver().openInputStream(uri);
            if (is == null) return null;
            java.io.ByteArrayOutputStream bos = new java.io.ByteArrayOutputStream();
            byte[] buf = new byte[8192];
            int n;
            int total = 0;
            while ((n = is.read(buf)) > 0) {
                total += n;
                if (total > 5 * 1024 * 1024) return null; // límite 5 MB
                bos.write(buf, 0, n);
            }
            return new String(bos.toByteArray(), "UTF-8");
        } catch (Exception e) {
            return null;
        } finally {
            if (is != null) {
                try { is.close(); } catch (Exception ignored) {}
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQ_CAMERA_WEB && pendingWebPermissionRequest != null) {
            final PermissionRequest request = pendingWebPermissionRequest;
            pendingWebPermissionRequest = null;
            final boolean granted = grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED;
            runOnUiThread(new Runnable() {
                @Override public void run() {
                    try {
                        if (granted) {
                            request.grant(new String[]{PermissionRequest.RESOURCE_VIDEO_CAPTURE});
                        } else {
                            request.deny();
                        }
                    } catch (Exception ignored) {}
                }
            });
        }
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
