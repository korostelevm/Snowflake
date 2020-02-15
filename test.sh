#!/usr/bin/env bash
set -ex
if [ $stage = "acceptance" ]; then
    cd tests/features/ 
    behave --no-capture
    cd ../..


    npm install cypress --save-dev
    npm install cypress-file-upload
    apt-get -y install libgconf2-4
    npm install -g cypress --unsafe-perm --silent
    root_url=$(aws ssm get-parameter --name /skill/SellerDigital/root-url --query Parameter.Value --output text)
    export CYPRESS_APP_URL="https://cake${NAMESPACE}.${root_url}/"
fi


cypress run
