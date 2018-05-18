const Joi = require('joi')


module.exports = {
  startSession: {
    method: 'GET',
    path: '/sessions/start/{pairId}',
    config: {
      tags: ['api'],
      description: 'Notifies a start to session',
      validate: {
        params: {
          id: Joi.number().integer().required()
        },
        options: {
          stripUnknown: true
        }
      },
      handler: async function(request, reply) {
        console.info("sent startSession request")
        reply("sent startSession request")
      }
    }
  },
  endSession: {
    method: 'GET',
    path: '/sessions/end/{pairId}',
    config: {
      tags: ['api'],
      description: 'Notifies an end to session',
      validate: {
        params: {
          id: Joi.number().integer().required()
        },
        options: {
          stripUnknown: true
        }
      },
      handler: async function(request, reply) {
        console.info("sent endSession request")
        reply("sent endSession request")
      }
    }
  }
}