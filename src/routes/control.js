const Joi = require('joi')


module.exports = {
  next: {
    method: 'GET',
    path: '/next/{pairId}',
    config: {
      tags: ['api'],
      description: 'Initiates media change on stream',
      validate: {
        params: {
          pairId: Joi.required()
        },
        options: {
          stripUnknown: true
        }
      },
      handler: async function(request, reply) {
        console.info("sent next request")
        reply("sent next request")
      }
    }
  }
}
