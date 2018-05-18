const Hapi = require('hapi')
const _ = require('lodash')

const createTestServer = (routes) => {
  let server = new Hapi.Server({ debug: { request: ['error'] } })
  server.connection({})

  // register plugins
  server.register([
    { register: require('../plugins/error-data') },
    { register: require('../plugins/request-logger') },
    { register: require('hapi-qs') },
    { register: require('h2o2') },
    { register: require('../plugins/auth-jwt') },
  ])

  // register routes object
  if (Array.isArray(routes)) {
    routes.forEach(route => server.route(_.values(route)))
  } else {
    server.route(_.values(routes))
  }

  return server
}

module.exports = createTestServer
