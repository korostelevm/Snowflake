#!/usr/bin/env bash

set -ex

cd $(dirname $0)

url=coldlambda.com


hz_id=$(aws route53 list-hosted-zones-by-name | jq -r --arg url "$url." '.HostedZones[] | select(.Name==$url) | .Id')
hz_json=$(aws route53 get-hosted-zone --id "$hz_id")


# ##################################
# Trying to add route53 NS delegation
ns_list=$(echo $hz_json | jq '[.DelegationSet.NameServers[] as $v | {Value: $v}]')

ns_record_set=$(cat <<EOF
{
  "Comment": "Subdomain delegation nameservers $url",
  "Changes": [{
    "Action": "UPSERT",
    "ResourceRecordSet": {
      "Name": "$url.",
      "Type": "NS",
      "TTL": 300,
      "ResourceRecords": $ns_list
    }
  }]
}
EOF
)


cat <<EOF
################################################################################
# Run the following in SHARED:
parent_url=\$(aws ssm get-parameter --name "/account/root-url" --query 'Parameter.Value' --output text)
parent_zone=\$(aws route53 list-hosted-zones --query "HostedZones[?Name=='\$parent_url.'].Id" --output text \
| sed -e 's/\/hostedzone\///')

aws route53 change-resource-record-sets \
--hosted-zone-id "Z1WCZLT7BT9XLD" \
--change-batch '$ns_record_set'
EOF
