const boom = require('@hapi/boom');
const { DATETIME } = require('mysql/lib/protocol/constants/types');
const { v4: uuidv4 } = require('uuid');

module.exports = {

    async createAPostVote(request, reply) {
        const db = await request.server.app.db;
        const payload = request.payload;
        var vote = 1;
        
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

        // check if vote already exist
        const voteExist = await getVotebyUuid(payload.useruuid, payload.postuuid, db);

        vote = payload.vote == true ? 1 : 0;

        //if vote dont exist create a new vote
        if (voteExist.length == 0) {
            var sql = "INSERT INTO postvote (idpostvote, iduservote, vote) VALUES ('" + payload.postuuid + "', '" + payload.useruuid + "', '" + vote + "')";
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

        //check if vote is the same then remove vote
        if (voteExist[0].vote == vote) {
            var sql = "DELETE FROM postvote WHERE idpostvote = '" + payload.postuuid + "' and iduservote = '" + payload.useruuid + "'";
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

        //if vote not the same update vote
        if (voteExist[0].vote != vote) {
            var sql = "UPDATE postvote SET vote = '" + vote + "' WHERE idpostvote = '" + payload.postuuid + "' and iduservote = '" + payload.useruuid + "'";
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
}

function getVotebyUuid(useruuid, postuuid, db){

    const result = new Promise((resolve, reject) => {
        db.query("SELECT * FROM postvote WHERE idpostvote = '" + postuuid + "' and iduservote = '" + useruuid + "'", function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            return resolve(result);
        });
    });

    return result;
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