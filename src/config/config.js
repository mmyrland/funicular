'use strict'
const packageJSON = require('../../package.json')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  connections: [{
    port: process.env.PORT || 8000,
    router: { stripTrailingSlash: true },
    routes: {
      timeout: { server: 90000 },
      cors: { credentials: true }
    }
  }],
  server: {
    debug: isProduction ? false : { request: ['error'] },
    connections: { state: { strictHeader: false } }
  },
  registrations: [
    { plugin: 'h2o2' },
    { plugin: './src/plugins/error-data' },
    { plugin: 'hapi-auth-jwt2' },
    { plugin: 'hapi-qs' },
    {
      plugin: {
        register: './src/plugins/auth-jwt',
        options: {
          strategies: [{
            name: 'jwt',
            strategy: 'jwt',
            config: {
              verifyOptions: {algorithms: ['HS256']}
            }
          }]
        }
      }
    },
    {
      plugin: {
        register: './src/plugins/swagger',
        options: {
          info: {
            'title': 'Funicular Rest API Documentation',
            'version': packageJSON.version,
          },
          securityDefinitions: {
            token: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header'
            }
          }
        }
      }
    },
    { plugin: './src/plugins/health' },
    { plugin: './src/plugins/startup' },
    {
      plugin: {
        register: './src/plugins/route-loader',
        options: {
          pattern: 'src/routes/**/*.js',
        }
      }
    }
  ]
}
