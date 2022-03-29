
'use strict';
const Joi = require('@hapi/joi');
const postcomment = require('../controllers/postcomment');

exports.PostCommentPlugin = {

    name: 'Posts Comment',
    version: '1.0.0',
    register: async function (server, options) {

        server.route({
            path: '/postcomment',
            method: 'POST',
            options: {
                handler: postcomment.createAPostComment,
                description: 'Create a new post comment',
                tags: ['api', 'postcomment'],
                plugins:{
                    'hapi-swagger':{
                        payloadType:'form'
                    }
                },
                validate: {
                    payload: Joi.object({
                        postuuid: Joi.string().required(),
                        useruuid: Joi.string().required(),
                        comment: Joi.string().required()
                    })
                }
            }
        });
    }
}