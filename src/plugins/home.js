'use strict';
const Joi = require('@hapi/joi');
const homeController = require('../controllers/home');

exports.HomePlugin = {

    name: 'Home',
    version: '1.0.0',
    register: async function (server, options){
        
        server.route({
            path: '/',
            method: 'GET',
            options: {
                handler: homeController.healthcheck,
                description: 'API health check to see if working',
                notes: 'health check',
                tags: ['api']
            }
        });
        
    }
}