'use strict';
const Joi = require('@hapi/joi');
const queryController = require('../controllers/query');

exports.QueryPlugin = {

    name: 'Query',
    version: '1.0.0',
    register: async function (server, options) {

        server.route({
            path: '/query/{email}',
            method: 'GET',
            options: {
                handler: queryController.getPostByUser,
                description: 'get all posts created by a user',
                notes: 'health checkget all posts created by a user',
                tags: ['api', 'query'],
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
                validate: {
                    params: Joi.object({
                        email: Joi.string().required()
                    })
                }
            }
        });

        server.route({
            path: '/query/{email}/upanddownvotes',
            method: 'GET',
            options: {
                handler: queryController.getAllupAndDownVotesForUser,
                description: 'get all up and down votes for the user',
                notes: 'get all up and down votes for the user',
                tags: ['api', 'query'],
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
                validate: {
                    params: Joi.object({
                        email: Joi.string().required()
                    })
                }
            }
        });

    }
}