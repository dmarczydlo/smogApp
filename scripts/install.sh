#!/bin/bash
adb uninstall "com.smogapp"
adb install android/app/build/outputs/apk/release/app-release-unsigned.apk
