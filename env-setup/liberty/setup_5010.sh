#!/usr/bin/env bash

# PRE-REQS
# Install Node 4.4.x using instructions at https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
# Include node install build tools: sudo apt-get install -y build-essential

# Set Variables
ihs_fn="ihs.tgz"
ihs_url="https://ibm.box.com/shared/static/z3fy8hf0okmas0qczvbqisox6fhkurlv.tgz"

plugin_fn="plugin.tgz"
plugin_url="https://ibm.box.com/shared/static/wuzrq1tzauylyylnmhthq96ihsp3srup.tgz"

liberty_controller_fn="apiconnect-collective-controller-linux-x86_64-1.3.1.tgz"
liberty_controller_url="https://ibm.box.com/shared/static/o9iuhmwtxknee6njye4l34n9tqckmrdc.tgz"

download_dir="/home/student/Downloads/apic-liberty-packages"

# Clean up Liberty and IHS
clear
printf "\nCleaning Config...\n"
wlpn-controller stop || true
/opt/IBM/HTTPServer/bin/apachectl -k stop
killall -9 node || true
killall -9 java || true
rm -rf ~/wlpn
rm -rf ~/.liberty
rm -rf /opt/IBM
rm -rf $download_dir
echo `npm uninstall -g apiconnect-collective-controller`
echo `npm uninstall -g apiconnect-collective-member`

# Install OpenSSH Server
printf "\nInstalling SSH Server...\n"
apt-get install openssh-server

# Download Packages...
sudo -u student mkdir $download_dir

printf "\nDownloading IHS Package...\n"
echo `curl -k -L -o "$download_dir/$ihs_fn" "$ihs_url"`

printf "\nDownloading IHS Plugin Package...\n"
echo `curl -k -L -o "$download_dir/$plugin_fn" "$plugin_url"`

printf "\nDownloading Liberty Controller Package...\n"
echo `curl -k -L -o "$download_dir/$liberty_controller_fn" "$liberty_controller_url"`

echo `chown -R student:student "$download_dir"`

# Install Liberty Packages
printf "\nInstalling Liberty Controller Package, this may take a minute...\n"
echo `npm install -g --unsafe-perm "$download_dir/$liberty_controller_fn"`

printf "\nInstalling Liberty Member Package, this may take a minute...\n"
echo `npm install -g --unsafe-perm apiconnect-collective-member`

# Configure Liberty
printf "\nStarting Liberty Controller...\n"
sudo -u student wlpn-controller setup --password=Passw0rd!
sudo -u student wlpn-controller start

printf "\nConfiguring Liberty Collective...\n"
sleep 5
sudo -u student wlpn-collective updateHost xubuntu-vm --user=student --password=Passw0rd! --port=9443 --host=xubuntu-vm --rpcUser=student --rpcUserPassword=Passw0rd! --autoAcceptCertificates

# Install IHS
printf "\nInstalling IHS...\n"
mkdir -p /opt/IBM
cd /opt/IBM/
echo `tar xf "$download_dir/$ihs_fn"`
echo `tar xf "$download_dir/$plugin_fn"`

# Configure IHS
printf "\nConfiguring IHS...\n"
cd /home/student/.liberty/wlp/bin/
sudo -u student wlpn-controller ihsSetup --host=xubuntu-vm --port=9443 --user=student --password=Passw0rd! --keystorePassword=Passw0rd! --pluginInstallRoot="/opt/IBM/WebSphere/Plugins/" --webServerNames=webserver1

printf "\nCopying IHS Keys...\n"
sleep 5
cp plugin-cfg.xml /opt/IBM/WebSphere/Plugins/config/webserver1/
cp plugin-key.jks /opt/IBM/WebSphere/Plugins/config/webserver1/

printf "\nRegistering IHS with Liberty...\n"
sudo -u student wlpn-controller ihsRegister --host=xubuntu-vm --port=9443 --user=student --password=Passw0rd! --ihsIp=xubuntu-vm --ihsPort=80

printf "\nConverting IHS Keys...\n"
cd /opt/IBM/HTTPServer/bin/
rm /opt/IBM/WebSphere/Plugins/config/webserver1/plugin-key.kdb
./gskcmd -keydb -convert -pw Passw0rd! -db /opt/IBM/WebSphere/Plugins/config/webserver1/plugin-key.jks -old_format jks -target /opt/IBM/WebSphere/Plugins/config/webserver1/plugin-key.kdb -new_format cms -stash
sleep 5
./gskcmd -cert -setdefault -pw Passw0rd! -db /opt/IBM/WebSphere/Plugins/config/webserver1/plugin-key.kdb -label default
sleep 5

# Start IBM HTTP Server
printf "\nStarting IHS...\n"
/opt/IBM/HTTPServer/bin/apachectl -k start

printf "\nSetup Complete!\n"