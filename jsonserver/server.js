var jsonServer  = require('json-server')
var server      = jsonServer.create()
var router      = jsonServer.router(require('./jsonserver.js')())
var middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3001, function () {
console.log('JSON Server is running')
})