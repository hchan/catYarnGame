@rem make sure you have a keystore
@rem i.e. keytool -genkey -v -keystore yarntails.keystore -alias yarntails -keyalg RSA -keysize 2048 -validity 10000
@rem remember to set the STORE_PASS
@rem set STORE_PASS=xxxxxx
if  not defined STORE_PASS (echo "STORE_PASS is not defined")
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore yarntails.keystore platforms\android\build\outputs\apk\android-release-unsigned.apk yarntails -storepass %STORE_PASS%
del yarntails.apk
%ANDROID_HOME%\build-tools\26.0.0\zipalign -v 4 platforms\android\build\outputs\apk\android-release-unsigned.apk yarntails.apk
