`use strict`;

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Plugins = require('../plugins');
const database  = require('../config/database');

const swaggerOptions = {
    info: {
        title: 'Junior - Back End Developer',
        version: '1'
    },
    grouping: 'tags',
    sortEndpoints: 'ordered'
}

exports.init = async () => {
    const server = Hapi.server();
    const db = await database.db;
    server.app.db = db;

    await server.register([].concat(
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        },
        Plugins
    ));
    return server;
}

exports.start = async () => {
    try {
        const server = Hapi.server({
            port: process.env.PORT,
            host: process.env.HOST
        });

        server.app.db = await database.db;
        await server.register([].concat(
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            },
            Plugins
        ));

        await server.start();
        console.log('Server is running at: ', server.info.uri);

    } catch (error) {
        console.log(error);
    }
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});