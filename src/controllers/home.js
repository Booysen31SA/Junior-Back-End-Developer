const boom = require('boom');

module.exports = {
    async healthcheck(request, reply) {
        var data = {
            message: 'OK'
        };

        return data
    }
}