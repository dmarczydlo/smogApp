#!/bin/bash

file="./android//keystores/release.keystore"
if [ -f "$file" ]
then
	echo "$file exist"
else
	keytool -genkey -v -keystore ./android/keystores/release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
fi

cd android && ./gradlew assembleRelease
pwd
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keystores/release.keystore app/build/outputs/apk/release/app-release-unsigned.apk release
jarsigner -verify -verbose -certs app/build/outputs/apk/release/app-release-unsigned.apk
