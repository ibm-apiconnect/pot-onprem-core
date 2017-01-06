#!/bin/sh

mysql --user="root" --password="Passw0rd!" --database="think" < /mysql-db-script.txt

exit $?