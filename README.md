# SmogApp
My first react-native app for air quality.

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
