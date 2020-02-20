const AWS = require('aws-sdk');
var _ = require('lodash')
var moment = require('moment');
const handlers = require('./handlers')

var respond = function(payload,code){
    let headers = {
        "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Content-Encoding,Accept,Accept-Language,Content-Language,Cache-Control",
        'Content-Type': 'application/json'
    }
    headers = _.assign(headers, payload.response_headers)
    return {
        'statusCode': code,
        'headers': headers,
        'body': JSON.stringify(payload.body)
    }
}




lambda_handler = async (event, context) => {
    console.log(JSON.stringify(event,null,2))
    console.log(JSON.stringify(context,null,2))
    if(typeof(event.headers['x-status'])!='undefined' || event.httpMethod == 'OPTIONS')
        return respond('OK',200)
    
    var res,resource
    var body = {}
    if(event.body){
        body = JSON.parse(event.body)
    }

    if(event.pathParameters){   
        resource = event.pathParameters.resource
        method = event.pathParameters.method
        res = await handlers[resource][method](body)
    }
    
    return respond( res, res.statusCode ? res.statusCode : 200)
};

module.exports = {
    lambda_handler
}