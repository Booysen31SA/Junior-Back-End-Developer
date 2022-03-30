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

        server.route({
            path: '/user/{email}',
            method: 'GET',
            options: {
                handler: userController.getUserByEmail,
                description: 'get user by email',
                notes: 'get user by email',
                tags: ['api', 'user'],
                plugins:{
                    'hapi-swagger':{
                        payloadType:'form'
                    }
                },
                validate:{
                    params: Joi.object({
                        email: Joi.string().email().required(),
                    })
                }
            }
        });

        server.route({
            path: '/user/{email}',
            method: 'PUT',
            options: {
                handler: userController.updateUser,
                description: 'update user by email',
                notes: 'update user by email',
                tags: ['api', 'user'],
                plugins:{
                    'hapi-swagger':{
                        payloadType:'form'
                    }
                },
                validate:{
                    params: Joi.object({
                        email: Joi.string().email().required()
                    }),
                    payload: Joi.object({
                        email: Joi.string().email(),
                        firstname: Joi.string(),
                        surname: Joi.string()
                    })
                }
            }
        });

        server.route({
            path: '/user/{email}',
            method: 'DELETE',
            options: {
                handler: userController.deleteUser,
                description: 'delete user by email',
                notes: 'delete user by email',
                tags: ['api', 'user'],
                plugins:{
                    'hapi-swagger':{
                        payloadType:'form'
                    }
                },
                validate:{
                    params: Joi.object({
                        email: Joi.string().email().required()
                    })
                }
            }
        });
        
    }
}