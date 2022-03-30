'use strict';
const Joi = require('@hapi/joi');
const postcommentvote = require('../controllers/postcommentvote');

exports.PostCommentVotePlugin = {

    name: 'Post Comment Vote',
    version: '1.0.0',
    register: async function (server, options){
        
        server.route({
            path: '/votecomment',
            method: 'POST',
            options: {
                handler: postcommentvote.createCommentVote,
                description: 'creates a comment on a vote',
                notes: 'creates a comment on a vote',
                tags: ['api', 'commentVote'],
                plugins:{
                    'hapi-swagger':{
                        payloadType:'form'
                    }
                },
                validate: {
                    payload: Joi.object({
                        commentuuid: Joi.string().required(),
                        useruuid: Joi.string().required(),
                        vote: Joi.boolean().required()
                    })
                }
            }
        });
        
    }
}