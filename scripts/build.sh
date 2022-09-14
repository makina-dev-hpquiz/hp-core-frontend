echo "BUILD ET DEPLOIEMENT HP-CORE"

cd ..

echo "Suppression des résidus des anciens builds"
rm -R platforms/android/app/build/outputs/apk/debug/

ionic cordova build android --prod
cd platforms/android/app/build/outputs/apk/debug/

app="app-debug.apk"
extension=".apk"

nameApk=$(ionic config get name | tr -d "'" ) 
version=$(ionic config get version | tr -d "'")

latestApp=$nameApk"-latest"$extension
versionApp=$nameApk"-"$version$extension

cp $app $versionApp
mv $app $latestApp 

ls -lh

echo "Déplacement des APK dans le tomcat"
mv $latestApp C:/bin/apache-tomcat-9.0.55/webapps/APK
mv $versionApp C:/bin/apache-tomcat-9.0.55/webapps/APK