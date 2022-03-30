const boom = require('@hapi/boom');
const { DATETIME } = require('mysql/lib/protocol/constants/types');
const { v4: uuidv4 } = require('uuid');

module.exports = {

    async createAPost(request, reply) {
        const db = await request.server.app.db;
        const payload = request.payload;
        var uuid = uuidv4();

        //check if user exist
        const userExist = await getUserbyEmail(payload.email, db);
        if (userExist.length == 0) {
            return boom.conflict('User dont exist');
        }

        //insert into posts
        var createddate = dateAndTime();
        var sql = "INSERT INTO post (uuid, email, title, content, createddate) VALUES ('" + uuid + "', '" + payload.email + "','" + payload.title + "', '" + payload.content + "', '" + createddate + "')";

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

    async updatePost(request, reply) {
        const db = await request.server.app.db;
        const uuid = request.params.uuid;
        const payload = request.payload;

        const post = await getPostbyUuid(uuid, db);
        if (post.length === 0) {
            return boom.notFound('Post not found');
        }

        // const uuid = user;
        const columns = Object.keys(payload);
        const values = Object.values(payload);

        const sql = "UPDATE post SET " + columns.join(" =  ? ,") + " = ?" + " WHERE uuid = '" + uuid + "' and email = '" + payload.email + "'";

        const result = new Promise((resolve, reject) => {
            db.query(sql, values, function (err, result) {
                if (err) {
                    boom.conflict('Error updating post');
                }
                return resolve(result);
            });
        });

        return result;
    },

    async deletePost(request, reply) {
        const db = await request.server.app.db;
        const uuid = request.params.uuid;
        const email = request.payload.email;

        const post = await getPostbyUuid(uuid, db);
        if (post.length === 0) {
            return boom.notFound('Post not found');
        }

        const sql = "DELETE FROM post WHERE uuid = '" + uuid + "' and email = '" + email + "'";
        console.log(sql);

        const result = new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {
                if (err) {
                    boom.conflict('Error deleting post');
                }
                return resolve(result);
            });
        });

        return result;
    }
}

function dateAndTime() {
    var currentdate = new Date();
    var datetime =  currentdate.getFullYear() + "-" + (currentdate.getMonth()+1) + "-" +currentdate.getDate() + " "
        + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return datetime;
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

function getPostbyUuid(uuid, db){
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