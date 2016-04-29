#! /bin/bash
# load data for analytics
# API Connect POT version 0.1
# malley@us.ibm.com
USAGE="Usage analytics clientid"

#option processing
if [ $# == 0 ]; then
echo $USAGE
exit 1;
fi

#main curl statement in loop
i="0"
while [ $i -le 50 ]
do
curl -k --request GET \
  --url 'https://api.think.ibm/sales/sb/api/customers' \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header 'x-ibm-client-id: '$1 
i=$[$i+1]
done
