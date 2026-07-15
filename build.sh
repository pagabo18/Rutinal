#!/bin/bash
set -e

export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export ANDROID_HOME=/home/user/android-sdk
export PATH=$JAVA_HOME/bin:$ANDROID_HOME/build-tools/34.0.0:$ANDROID_HOME/platform-tools:$PATH

PROJECT_DIR=/home/user/workspace/organizame
BUILD=$PROJECT_DIR/build
ANDROID_JAR=$ANDROID_HOME/platforms/android-34/android.jar

cd $PROJECT_DIR
rm -rf $BUILD
mkdir -p $BUILD/gen $BUILD/obj $BUILD/apk

echo "=== 1. Compilar recursos con aapt2 ==="
mkdir -p $BUILD/compiled-res
aapt2 compile --dir res -o $BUILD/compiled-res.zip

echo "=== 2. Linkear recursos + generar R.java ==="
aapt2 link \
  -o $BUILD/base.apk \
  -I $ANDROID_JAR \
  --manifest AndroidManifest.xml \
  -A assets \
  --java $BUILD/gen \
  $BUILD/compiled-res.zip

echo "=== 3. Compilar Java a .class ==="
find src -name "*.java" > $BUILD/sources.txt
find $BUILD/gen -name "*.java" >> $BUILD/sources.txt
javac --release 11 -classpath $ANDROID_JAR -d $BUILD/obj @$BUILD/sources.txt

echo "=== 4. Convertir .class a .dex con d8 ==="
d8 --release --lib $ANDROID_JAR --output $BUILD $(find $BUILD/obj -name "*.class")

echo "=== 5. Agregar classes.dex al APK ==="
cd $BUILD
cp base.apk unsigned.apk
zip -j unsigned.apk classes.dex
cd $PROJECT_DIR

echo "=== 6. Firmar APK (debug keystore) ==="
KEYSTORE=$BUILD/debug.keystore
if [ ! -f $KEYSTORE ]; then
  keytool -genkey -v -keystore $KEYSTORE -alias organizame \
    -keyalg RSA -keysize 2048 -validity 10000 \
    -storepass android -keypass android \
    -dname "CN=Organizame, O=Gabriel, C=MX"
fi

zipalign -f 4 $BUILD/unsigned.apk $BUILD/aligned.apk

apksigner sign \
  --ks $KEYSTORE --ks-pass pass:android --key-pass pass:android \
  --out $BUILD/Organizame.apk \
  $BUILD/aligned.apk

echo "=== 7. Verificar ==="
apksigner verify $BUILD/Organizame.apk && echo "APK VÁLIDO"
ls -lh $BUILD/Organizame.apk
