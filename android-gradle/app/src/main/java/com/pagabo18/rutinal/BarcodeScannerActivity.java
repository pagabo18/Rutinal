package com.pagabo18.rutinal;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Size;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.OptIn;
import androidx.appcompat.app.AppCompatActivity;
import androidx.camera.core.CameraSelector;
import androidx.camera.core.ExperimentalGetImage;
import androidx.camera.core.ImageAnalysis;
import androidx.camera.core.ImageProxy;
import androidx.camera.core.Preview;
import androidx.camera.lifecycle.ProcessCameraProvider;
import androidx.camera.view.PreviewView;
import androidx.core.content.ContextCompat;

import com.google.common.util.concurrent.ListenableFuture;
import com.google.mlkit.vision.barcode.BarcodeScannerOptions;
import com.google.mlkit.vision.barcode.BarcodeScanning;
import com.google.mlkit.vision.barcode.common.Barcode;
import com.google.mlkit.vision.common.InputImage;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Escanea códigos de barras y EAN con CameraX + ML Kit.
 * Al detectar un código válido, devuelve el resultado a MainActivity vía startActivityForResult.
 */
public class BarcodeScannerActivity extends AppCompatActivity {
    private static final int REQ_CAMERA_PERM = 4202;
    private PreviewView previewView;
    private TextView hintView;
    private ExecutorService cameraExecutor;
    private volatile boolean handled = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            getWindow().setStatusBarColor(Color.BLACK);
            getWindow().setNavigationBarColor(Color.BLACK);
        }

        FrameLayout root = new FrameLayout(this);
        root.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        root.setBackgroundColor(Color.BLACK);

        previewView = new PreviewView(this);
        previewView.setLayoutParams(new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        root.addView(previewView);

        // Overlay con marco de escaneo + hint
        LinearLayout overlay = new LinearLayout(this);
        overlay.setOrientation(LinearLayout.VERTICAL);
        overlay.setGravity(Gravity.CENTER);
        FrameLayout.LayoutParams olp = new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        overlay.setLayoutParams(olp);
        overlay.setPadding(dp(32), dp(32), dp(32), dp(32));

        View frame = new View(this);
        LinearLayout.LayoutParams flp = new LinearLayout.LayoutParams(dp(260), dp(180));
        frame.setLayoutParams(flp);
        frame.setBackground(makeScanFrame());
        overlay.addView(frame);

        hintView = new TextView(this);
        hintView.setText("Apunta al código de barras");
        hintView.setTextColor(Color.WHITE);
        hintView.setTextSize(14);
        LinearLayout.LayoutParams hlp = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        hlp.topMargin = dp(24);
        hintView.setLayoutParams(hlp);
        hintView.setGravity(Gravity.CENTER);
        overlay.addView(hintView);

        // Botón cancelar
        TextView cancel = new TextView(this);
        cancel.setText("Cancelar");
        cancel.setTextColor(Color.WHITE);
        cancel.setTextSize(15);
        cancel.setPadding(dp(20), dp(12), dp(20), dp(12));
        cancel.setBackgroundColor(Color.parseColor("#66000000"));
        FrameLayout.LayoutParams clp = new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        clp.gravity = Gravity.TOP | Gravity.START;
        clp.leftMargin = dp(12);
        clp.topMargin = dp(28);
        cancel.setLayoutParams(clp);
        cancel.setOnClickListener(v -> { setResult(RESULT_CANCELED); finish(); });

        root.addView(overlay);
        root.addView(cancel);

        setContentView(root);

        cameraExecutor = Executors.newSingleThreadExecutor();

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                == PackageManager.PERMISSION_GRANTED) {
            startCamera();
        } else {
            requestPermissions(new String[]{Manifest.permission.CAMERA}, REQ_CAMERA_PERM);
        }
    }

    private android.graphics.drawable.GradientDrawable makeScanFrame() {
        android.graphics.drawable.GradientDrawable gd = new android.graphics.drawable.GradientDrawable();
        gd.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
        gd.setStroke(dp(3), Color.parseColor("#7C9CFF"));
        gd.setCornerRadius(dp(12));
        gd.setColor(Color.TRANSPARENT);
        return gd;
    }

    private int dp(int px) {
        return (int) (px * getResources().getDisplayMetrics().density);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQ_CAMERA_PERM) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                startCamera();
            } else {
                hintView.setText("Sin permiso de cámara");
                // Cerrar tras breve delay
                previewView.postDelayed(() -> { setResult(RESULT_CANCELED); finish(); }, 1500);
            }
        }
    }

    private void startCamera() {
        ListenableFuture<ProcessCameraProvider> providerFuture = ProcessCameraProvider.getInstance(this);
        providerFuture.addListener(() -> {
            try {
                ProcessCameraProvider provider = providerFuture.get();

                Preview preview = new Preview.Builder().build();
                preview.setSurfaceProvider(previewView.getSurfaceProvider());

                ImageAnalysis analysis = new ImageAnalysis.Builder()
                        .setTargetResolution(new Size(1280, 720))
                        .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                        .build();

                BarcodeScannerOptions opts = new BarcodeScannerOptions.Builder()
                        .setBarcodeFormats(
                                Barcode.FORMAT_EAN_13,
                                Barcode.FORMAT_EAN_8,
                                Barcode.FORMAT_UPC_A,
                                Barcode.FORMAT_UPC_E,
                                Barcode.FORMAT_CODE_128,
                                Barcode.FORMAT_CODE_39,
                                Barcode.FORMAT_CODE_93,
                                Barcode.FORMAT_QR_CODE,
                                Barcode.FORMAT_ITF)
                        .build();
                com.google.mlkit.vision.barcode.BarcodeScanner scanner = BarcodeScanning.getClient(opts);

                analysis.setAnalyzer(cameraExecutor, new BarcodeAnalyzer(scanner));

                CameraSelector selector = CameraSelector.DEFAULT_BACK_CAMERA;
                provider.unbindAll();
                provider.bindToLifecycle(this, selector, preview, analysis);
            } catch (Exception e) {
                hintView.setText("Error al iniciar cámara");
            }
        }, ContextCompat.getMainExecutor(this));
    }

    private class BarcodeAnalyzer implements ImageAnalysis.Analyzer {
        private final com.google.mlkit.vision.barcode.BarcodeScanner scanner;
        BarcodeAnalyzer(com.google.mlkit.vision.barcode.BarcodeScanner s) { this.scanner = s; }

        @Override
        @OptIn(markerClass = ExperimentalGetImage.class)
        public void analyze(@NonNull ImageProxy proxy) {
            if (handled) { proxy.close(); return; }
            android.media.Image mediaImage = proxy.getImage();
            if (mediaImage == null) { proxy.close(); return; }
            InputImage img = InputImage.fromMediaImage(mediaImage, proxy.getImageInfo().getRotationDegrees());
            scanner.process(img)
                    .addOnSuccessListener(new com.google.android.gms.tasks.OnSuccessListener<List<Barcode>>() {
                        @Override
                        public void onSuccess(List<Barcode> barcodes) {
                            if (handled) return;
                            for (Barcode b : barcodes) {
                                String raw = b.getRawValue();
                                if (raw != null && !raw.isEmpty()) {
                                    handled = true;
                                    Intent out = new Intent();
                                    out.putExtra("barcode", raw);
                                    setResult(RESULT_OK, out);
                                    finish();
                                    return;
                                }
                            }
                        }
                    })
                    .addOnCompleteListener(t -> proxy.close());
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (cameraExecutor != null) cameraExecutor.shutdown();
    }
}
