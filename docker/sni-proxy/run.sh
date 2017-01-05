#!/bin/bash -ex

cp -f /etc/nginx/nginx.tmpl /etc/nginx/nginx.conf
sed -i -e "s/APIM/${APIM_DNS}/g" /etc/nginx/nginx.conf
sed -i -e "s/PORTAL/${PORTAL_DNS}/g" /etc/nginx/nginx.conf
sed -i -e "s/GATEWAY/${GATEWAY_DNS}/g" /etc/nginx/nginx.conf
sed -i -e "s/DATAPOWER/${DATAPOWER_DNS}/g" /etc/nginx/nginx.conf
sed -i -e "s/CONSUMER/${CONSUMER_DNS}/g" /etc/nginx/nginx.conf
sed -i -e "s/STUBSVCS/${STUBSVCS_DNS}/g" /etc/nginx/nginx.conf
cat /etc/nginx/nginx.conf
exec nginx -g "daemon off;"