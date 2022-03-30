'use strict';
const Joi = require('@hapi/joi');
const postController = require('../controllers/post');

exports.PostPlugin = {

    name: 'Posts',
    version: '1.0.0',
    register: async function (server, options){
        
        server.route({
            path: '/post',
            method: 'POST',
            options: {
                handler: postController.createAPost,
                description: 'user can create a post',
                notes: 'user can create a post',
                tags: ['api', 'posts'],
                plugins:{
                    'hapi-swagger':{
                        payloadType:'form'
                    }
                },
                validate:{
                    payload: Joi.object({
                        email: Joi.string().email().required(),
                        title: Joi.string().required(),
                        content: Joi.string().required()
                    })
                }
            }
        });

        server.route({
            path: '/post/{uuid}',
            method: 'PUT',
            options: {
                handler: postController.updatePost,
                description: 'user can update a post',
                notes: 'user can update a post',
                tags: ['api', 'posts'],
                plugins:{
                    'hapi-swagger':{
                        payloadType:'form'
                    }
                },
                validate:{
                    params: Joi.object({
                        uuid: Joi.string().required(),
                    }),
                    payload: Joi.object({
                        email: Joi.string().email().required(),
                        title: Joi.string(),
                        content: Joi.string()
                    })
                }
            }
        });

        server.route({
            path: '/post/{uuid}',
            method: 'DELETE',
            options: {
                handler: postController.deletePost,
                description: 'user can delete a post',
                notes: 'user can delete a post',
                tags: ['api', 'posts'],
                plugins:{
                    'hapi-swagger':{
                        payloadType:'form'
                    }
                },
                validate:{
                    params: Joi.object({
                        uuid: Joi.string().required(),
                    }),
                    payload: Joi.object({
                        email: Joi.string().email().required(),
                    })
                }
            }
        })
    }
}