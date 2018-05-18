const glob = require('glob')
const _ = require('lodash')
const path = require('path')
const cwd = process.cwd()

function getRoutes(pattern, options) {
  let files = glob.sync(pattern, options)
  return files.reduce((memo, file) => {
    file = path.join(cwd, file)
    let actions = _.values(require(file))
    return [].concat(memo, actions)
  }, [])
}

exports.register = function(server, options, next) {
  server.route(
    getRoutes(options.pattern, { ignore: '**/*.test.js' })
  )
  next()
}

exports.register.attributes = {
  name: 'route-loader',
  version: '1.0.0'
}
