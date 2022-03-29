const boom = require('@hapi/boom');
const { v4: uuidv4 } = require('uuid');

module.exports = {

    // create a new user
    async createUser(request, reply) {

        const db = await request.server.app.db;
        const user = request.payload;
        var uuid = uuidv4();

        //check if user exist
        const userExist = await getUserbyEmail(user.email, db);
        if (userExist.length > 0) {
            return boom.conflict('User already exist');
        }

        var sql = "INSERT INTO users (uuid, email, password, firstname, surname) VALUES ('" + uuid + "', '" + user.email + "', '" + user.password + "', '" + user.firstname + "', '" + user.surname + "')";

        const result = new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                return resolve(result);
            });
        });

        return result;
    },

    async getUserByEmail(request, reply) {
        const db = await request.server.app.db;
        const email = request.params.email;

        return await getUserbyEmail(email, db);
    },

    async updateUser(request, reply) {
        const db = await request.server.app.db;
        const email = request.params.email;
        const payload = request.payload;

        const user = await getUserbyEmail(email, db);
        if (user.length === 0) {
            return boom.notFound('User not found');
        }

        // const uuid = user;
        const columns = Object.keys(payload);
        const values = Object.values(payload);

        const sql = "UPDATE users SET " + columns.join(" =  ? ,") + " = ?" + " WHERE uuid = '" + user[0].uuid + "'";

        const result = new Promise((resolve, reject) => {
            db.query(sql, values, function (err, result) {
                if (err) {
                    boom.conflict('Error updating user');
                    reject(err);
                    return;
                }
                return resolve(result);
            });
        });

        return {
            message: 'User updated'
        }
    },

    async deleteUser(request, reply) {
        const db = await request.server.app.db;
        const email = request.params.email;
    
        const user = await getUserbyEmail(email, db);
        if (user.length === 0) {
            return boom.notFound('User not found');
        }
    
        const sql = "DELETE FROM users WHERE uuid = '" + user[0].uuid + "'";
    
        const result = new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                }
                return resolve(result);
            });
        });
    
        return {
            message: 'User deleted'
        }
    }
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace).replace(new RegExp('{', 'g'), '').replace(new RegExp('}', 'g'), '').replace(new RegExp(':', 'g'), '=');
}
function getUserbyEmail(email, db) {

    const result = new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE email = '" + email + "'", function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            return resolve(result);
        });
    });

    return result;
}