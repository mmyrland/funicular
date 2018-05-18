exports.register = function(server, options, next) {

  server.ext('onPreResponse', function(request, reply) {
    let response = request.response
    if (!response.isBoom) {
      return reply.continue()
    }

    if (response.data) {
      response.output.payload.errorData = response.data
    }

    return reply(response)
  })

  next()
}

exports.register.attributes = {
  name: 'error-data',
  version: '1.0.0'
}
