'use strict'

exports.register = function(server, options, next) {

  function validate(decoded, request, callback) {
    return callback(null,true)
  }

  // register this plugin as an authentication strategy
  options.strategies.forEach(opt => {
    opt.config.validateFunc = validate
    opt.config.key = process.env.FUNICULAR_SECRET
    server.auth.strategy(opt.name, opt.strategy, opt.config)
  })

  if (options.defaultStrategy) {
    server.auth.default(options.defaultStrategy)
  }

  next()
}


exports.register.attributes = {
  name: 'auth-jwt',
  version: '1.0.0'
}
