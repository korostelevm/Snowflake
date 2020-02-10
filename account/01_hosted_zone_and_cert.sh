#!/usr/bin/env bash

set -ex

cd $(dirname $0)

url=coldlambda.com
ssm_prefix=account


# route53
# hosted_zone_json=$(aws route53 create-hosted-zone --name "$url." --caller-reference "$url.")
# hosted_zone_id=$(echo $hosted_zone_json | jq -r '.HostedZone.Id' | sed -e 's/\/hostedzone\///' )
hosted_zone_id=Z1WCZLT7BT9XLD

cert_arn=$(aws acm request-certificate --domain-name "*.$url" --validation-method DNS | jq -r ".CertificateArn")

echo "cert_arn=$cert_arn"

echo "Waiting 10 seconds for cert to become eventually consistent"
sleep 10

cert_json=$(aws acm describe-certificate --certificate-arn "$cert_arn")
echo "cert_json=$cert_json"
cert_dns_name=$(echo $cert_json | jq -r '.Certificate.DomainValidationOptions[] | select(.ValidationMethod=="DNS")|.ResourceRecord.Name')
cert_dns_value=$(echo $cert_json | jq -r '.Certificate.DomainValidationOptions[] | select(.ValidationMethod=="DNS")|.ResourceRecord.Value')

cert_dns_json=$(cat <<EOF
{
  "Comment": "Cerify ACM Cert $cert_arn",
  "Changes": [{
    "Action": "UPSERT",
    "ResourceRecordSet": {
      "Name": "$cert_dns_name",
      "Type": "CNAME",
      "SetIdentifier": "Certificate validation record for $url",
      "Region": "us-east-1",
      "TTL": 300,
      "ResourceRecords": [
        {
            "Value": "$cert_dns_value"
        }
      ]
    }
  }]
}
EOF
)

aws route53 change-resource-record-sets --hosted-zone-id "$hosted_zone_id" --change-batch "$cert_dns_json"

aws ssm put-parameter --name "$ssm_prefix/root-url"           --value "$url" --type String
aws ssm put-parameter --name "$ssm_prefix/hosted-zone-id"     --value "$hosted_zone_id" --type String
aws ssm put-parameter --name "$ssm_prefix/ssl-cert"           --value "$cert_arn" --type String
