#!/bin/sh

echo "006-force-liberty-restart-script"
echo Passw0rd! | sudo -S cp ~/.pot/core/env-setup/system-scripts/hosts /etc/hosts
echo Passw0rd! | sudo -S chmod 644 /etc/hosts
exit $?