#!/usr/bin/env bash

# Set Variables
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

printf "\nClean Complete!\n"