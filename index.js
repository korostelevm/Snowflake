var express = require('express');
var app = express();
var service = require('./service/service.js')
var _ = require('lodash')

var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.options('/*', function(req,res){
    req.httpMethod = 'OPTIONS'
    service.lambda_handler(req).then((r)=>{
        _.each(r.headers,function(v,k){
            res.setHeader(k,v)
        })
        res.status(r.statusCode)
        res.send(r.body)
    })
})

app.get('/*/*', function(req, res) { 
    req.httpMethod = 'GET'
    req.body = JSON.stringify(req.body)
    req.path = req.originalUrl
    if (req.path.split('/').length >1){
        req['pathParameters'] = {
            resource: req.path.split('/')[1], 
            method: req.path.split('/')[2],
        }
    }
    service.lambda_handler(req).then((r)=>{
        _.each(r.headers,function(v,k){
            res.setHeader(k,v)
        })
        res.status(r.statusCode)
        res.send(r.body)
    })
});

app.post('/*/*', function(req, res) {
    req.httpMethod = 'POST'
    req.body = JSON.stringify(req.body)
    console.log(req)
    req.path = req.originalUrl
    if (req.path.split('/').length> 1){
        req['pathParameters'] = {
            resource: req.path.split('/')[1],
            method: req.path.split('/')[2],
        }
    }
    service.lambda_handler(req).then((r)=>{
        _.each(r.headers,function(v,k){
            res.setHeader(k,v)
        })
        res.status(r.statusCode)
        res.send(r.body)
    })
});

app.listen(3000);