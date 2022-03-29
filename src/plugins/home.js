'use strict';
const Joi = require('@hapi/joi');
const homeController = require('../controllers/home');

exports.HomePlugin = {
    name: 'Home',
    version: '1.0.0',
    register: async (server, options) => {
        server.route([
            {
                path: '/',
                method: 'GET',
                handler: homeController.healthcheck,
                options: {
                    description: 'Healthcheck',
                    notes: 'Returns a simple message',
                    tags: ['api']
                }
            }
        ]);
    }
}