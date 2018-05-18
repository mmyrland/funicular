'use strict'

exports.register = function(server, options, next) {

  server.route({
    method: 'GET',
    path: '/health',
    config: {
      auth: false,
    },
    handler: (request, reply) => {
      reply({healthy: true})
    }
  })

  next()
}

exports.register.attributes = {
  name: 'health',
  version: '1.0.0'
}
