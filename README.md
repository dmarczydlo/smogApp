# SmogApp
My first react-native app for air quality.

![image](https://i.imgur.com/BzhQkiv.gif)



## Requires
* Watchman
* Android SDK (23 and 27)
* Android ADV or device
* react-native cli

### Maps setup
Create file android/app/src/main/res/values/secrets.xml like below:
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="google_maps_api_key">XXXX-XXX</string>
</resources>
```

## Watchman setup

```shell
cd ~
git clone https://github.com/facebook/watchman.git
cd watchman/
git checkout v4.9.0-rc1  #(latest version)
sudo apt-get install libtool-bin
sudo apt-get install -y autoconf automake build-essential python-dev

sudo apt-get install -y pkg-config
sudo apt-get install libssl-dev

git clean -dfx #(if had old version) 
./autogen.sh 
./configure  #(./configure --without-python - if have permission issue)
make
sudo make install
watchman --version
echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_watches  && echo 999999 | sudo tee -a  /proc/sys/fs/inotify/max_queued_events && echo 999999 | sudo tee  -a /proc/sys/fs/inotify/max_user_instances && watchman  shutdown-server

```
