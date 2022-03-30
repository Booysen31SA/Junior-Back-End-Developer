const boom = require('@hapi/boom');

module.exports = {
    async healthcheck(request, reply) {
        var data = {
            message: 'OK'
        };

        return data
    }
}