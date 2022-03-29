const boom = require('@hapi/boom');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    
    // create a new user
    async createUser(request, reply) {

        const db = await request.server.app.db;
        const user = request.payload;
        var uuid = uuidv4();

        await db.connect(function(err){
            if(err){
                console.log(err);
                throw err;
            }

            console.log('Connected to mySQL database');
            var sql = "INSERT INTO users (uuid, email, password, firstname, surname) VALUES ('" + uuid +"', '" + user.email +"', '" + user.password +"', '" + user.firstname +"', '" + user.surname +"')";
        
            db.query(sql, function(err, result){
                if(err){
                    console.log(err);
                    boom.conflict('Error inserting ' + err);
                    throw err;
                }

                console.log('Data inserted');
            })
        });
        
        return {
            status: 200,
            message: 'Data Inserted'
        };
    }
}