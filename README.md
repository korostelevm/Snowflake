
### to try

1 - install dependencies
```
npm run install-all
```

2 - for local dev 
```
npm run start
```




3 - manual deployment
```
npm run deploy -- --app:bucket=s3_bucket_name
```



### Frontend
`ui/ui.js` accepts get requests for html or module through query params:
returns shell html contrainer https://microfrontend.{{root_url}}/
returns a system.js importable module at https://microfrontend.{{root_url}}/?microfrontend=module

cache control set to revalidate asynchronously for one hour - may recieve stale for 5 seconds before one refresh 
`'Cache-Control': 'max-age=5, stale-while-revalidate=3600'`

for implementing in external html/frameworks see example in `index.html`


### Api
`service/service.js` lambda accepts url parameters for both post and get requests at 
https://microfrontend.{{root_url}}/{resource}/{method}


### local dev
port 8080 a content server to serve the index.html file
port 1111 a webpack dev server to serve the microfrontend as a system.js module
port 3000 a pass through express server defined in `index.js` wrapping the lambda function 

### builder/trains/productions
at lambda runtime the localhost are replaced with the proper env, everything behaves the same way

### testing
there is a api stabilization routine implemented in `tests` in our usual python behave
cypress integration spec is defined in `cypresss/integration/local.js` - this test works the same locaally and on buider
to run tests headless `./tests_after.sh` or `cypress run`
to run tests in browser `cypress open`