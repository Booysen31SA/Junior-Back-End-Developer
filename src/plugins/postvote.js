'use strict';
const Joi = require('@hapi/joi');
const postvoteController = require('../controllers/postvote');

exports.PostVotePlugin = {

    name: 'Posts Vote',
    version: '1.0.0',
    register: async function (server, options) {

        server.route({
            path: '/postvote',
            method: 'POST',
            options: {
                handler: postvoteController.createAPostVote,
                description: 'Create a new post vote',
                notes: 'true = like, false = dislike',
                tags: ['api', 'postvote'],
                plugins:{
                    'hapi-swagger':{
                        payloadType:'form'
                    }
                },
                validate: {
                    payload: Joi.object({
                        postuuid: Joi.string().required(),
                        useruuid: Joi.string().required(),
                        vote: Joi.boolean().required()
                    })
                }
            }
        });
    }
}