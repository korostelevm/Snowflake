const fs = require('fs')
Object.assign(process.env, JSON.parse(fs.readFileSync('.env.json')))
const app = require('./service/app')
const port = 3000

var service_wss = require('./service/wss/wss.js')
service_wss.set_local_ws(app)  

app.listen(port)
console.log(`listening on http://localhost:${port}`)
