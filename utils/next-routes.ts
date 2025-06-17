const routes = module.exports = require('next-routes')()

routes
.add('index', '/', 'index')
.add('sign-in', '/auth/signin', 'sign-in')
.add('user-list', '/user-list', 'user-list')
.add('tc-commands', '/tc-commands', 'tc-commands')
.add('firm-ware', '/firm-ware', 'firm-ware')
.add('device-group', '/device-group', 'device-group')
.add('address-logs', '/address-logs', 'address-logs')