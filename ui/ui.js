var path = require('path')
var fs = require("fs");


const zlib = require('zlib');

var headers = {
    "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Content-Encoding,Accept,Accept-Language,Content-Language,x-status",
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'max-age=5, stale-while-revalidate=3600'
}

function compressed(response) {
    return new Promise((resolve, reject) => {
        zlib.gzip(response, function (error, gzippedResponse) {
            headers["Content-Encoding"] = "gzip"
            resolve({
                "body": gzippedResponse.toString("base64"),
                "isBase64Encoded": true,
                "statusCode": 200,
                "headers": headers
            })
        })
    })
}

exports.lambda_handler = async (event, context, callback) => {
    // console.log(JSON.stringify(event,null,2))
    // console.log(JSON.stringify(context,null,2))
    var host = 'https://'+event.headers.Host
    if(typeof(event.headers['x-status'])!='undefined' || event.httpMethod == 'OPTIONS')
        return respond('OK',200)
    
    var response = fs.readFileSync(path.join(__dirname, './index.html'), "utf8");
    response = response.replace(/http:\/\/localhost:1111\/microfrontend.js/g, host+'/?microfrontend=module');
    
    if (event.queryStringParameters && event.queryStringParameters.microfrontend) {
        response = fs.readFileSync(path.join(__dirname, './microfrontend.js'), "utf8");
        response = response.replace(/http:\/\/localhost:3000\//g, host + '/');
    }

    return await compressed(response)
}
