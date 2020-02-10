from behave import given, when, then
import os
import requests
# from botocore.vendored import requests
import json
import boto3
import time
from pprint import pprint
import time
import datetime

namespace = ''
if "NAMESPACE" in os.environ:
    namespace = os.environ['NAMESPACE']

params ={}
skill='SellerDigital'
params = {}
response = boto3.client('ssm').get_parameter(
    Name='/skill/'+skill+'/root-url',
    # Name='/account/root-url',
)
root_url = response['Parameter']['Value']

response = boto3.client('ssm').get_parameter(
    Name='/account/app-bucket',
    # Name='/account/root-url',
)
app_bucket = response['Parameter']['Value']

response = boto3.client('ssm').get_parameter(
    Name='/account/internal-api-key',
)
api_key = response['Parameter']['Value']


acceptance_url = 'https://cake'+namespace+'.'+root_url+"/"

if 'CODEBUILD_BUILD_URL' not in os.environ:
    acceptance_url = 'http://localhost:8080/'


acceptance_headers = {
    'content-type': 'application/json',
}


print("URL: ",acceptance_url)
@when('The service responds to health checks in less than {option} seconds')
def send_request(context, option):
    global params
    data = {
        'request': 'ping',
        }
    stabilized = []
    headers = {
        'x-status':'',
    }
    headers.update(acceptance_headers)
    for i in range(60):
        time.sleep(1)
        response = requests.options(f'{acceptance_url}icing/get', data=json.dumps(data), headers = headers, verify = False)
        params.update({'status_code': response.status_code})
        if response.status_code == 200:
            stabilized.append(1)
        else:
            stabilized.append(0)
        if len(stabilized) > 15:
            stabilized.pop(0)

        if sum(stabilized) == 15:
            assert True
            break
        ts = time.time()
        st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
        print(st, 'status:',str(response.status_code),sum(stabilized))




@then('I receive a {code} status code')
def check_status(context, code):
    print(f'expected: {code}')
    print(f'actual: {params["status_code"]}')

    assert int(code) == params['status_code']

