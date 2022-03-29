'use strict';
const Joi = require('@hapi/joi');
const userController = require('../controllers/user');

exports.UserPlugin = {

    name: 'User',
    version: '1.0.0',
    register: async function (server, options){
        
        server.route({
            path: '/user',
            method: 'POST',
            options: {
                handler: userController.createUser,
                description: 'Creates a new user to the database',
                notes: 'creates a new user to the database',
                tags: ['api', 'user'],
                plugins:{
                    'hapi-swagger':{
                        payloadType:'form'
                    }
                },
                validate:{
                    payload: Joi.object({
                        email: Joi.string().email().required(),
                        password: Joi.string().required(),
                        firstname: Joi.string().required(),
                        surname: Joi.string().required()
                    })
                }
            }
        });
        
    }
}