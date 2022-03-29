const boom = require('@hapi/boom');
const { DATETIME } = require('mysql/lib/protocol/constants/types');
const { v4: uuidv4 } = require('uuid');

module.exports = {

    async createAPostComment(request, reply) {
        const db = await request.server.app.db;
        const payload = request.payload;
        const uuid = uuidv4();

        //check if user exist
        const userExist = await getUserbyUuid(payload.useruuid, db);
        if (userExist.length == 0) {
            return boom.conflict('User dont exist');
        }

        // check if post exist
        const postExist = await getPostbyUuid(payload.postuuid, db);
        if (postExist.length == 0) {
            return boom.conflict('Post dont exist');
        }

        //insert comment
        var sql = "INSERT INTO postcomment (uuid, idpostcomment, idusercomment, postcomment) VALUES ('" + uuid + "', '" + payload.postuuid + "', '" + payload.useruuid + "', '" + payload.comment + "')";
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
     }
}

function getUserbyUuid(uuid, db) {

    const result = new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE uuid = '" + uuid + "'", function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            return resolve(result);
        });
    });

    return result;
}

function getPostbyUuid(uuid, db) {
    const result = new Promise((resolve, reject) => {
        db.query("SELECT * FROM post WHERE uuid = '" + uuid + "'", function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            return resolve(result);
        });
    });

    return result;
}