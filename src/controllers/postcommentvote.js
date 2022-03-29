const boom = require('@hapi/boom');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async createCommentVote(request, reply) {
        const db = await request.server.app.db;
        const payload = request.payload;
        var vote = 1;
        const uuid = uuidv4();

        //check if user exist
        const userExist = await getUserbyUuid(payload.useruuid, db);
        if (userExist.length == 0) {
            return boom.conflict('User dont exist');
        }

        // check if comment exist
        const commentExist = await getCommentbyUuid(payload.commentuuid, db);
        if (commentExist.length == 0) {
            return boom.conflict('Comment dont exist');
        }

        vote = payload.vote == true ? 1 : 0;

        // check if post comment vote exist
        const commentVoteExist = await getCommentVotebyUuid(payload.useruuid, payload.commentuuid, db);

        //if vote dont exist create a new comment vote
        if (commentVoteExist.length == 0) {
            var sql = "INSERT INTO postcommentvote (uuid, commentuuid, useruuid, vote) VALUES ('" + uuid + "', '" + payload.commentuuid + "', '" + payload.useruuid + "', '" + vote + "')";
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

        //check if comment vote is the same then remove comment vote
        if (commentVoteExist[0].vote == vote) {
            var sql = "DELETE FROM postcommentvote WHERE commentuuid = '" + payload.commentuuid + "' and useruuid = '" + payload.useruuid + "'";
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

        //if comment vote not the same update comment vote
        if(commentVoteExist[0].vote != vote){
            var sql = "UPDATE postcommentvote SET vote = '" + vote + "' WHERE commentuuid = '" + payload.commentuuid + "' and useruuid = '" + payload.useruuid + "'";
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

function getCommentVotebyUuid(useruuid, commentuuid, db) {
    
        const result = new Promise((resolve, reject) => {
            db.query("SELECT * FROM postcommentvote WHERE useruuid = '" + useruuid + "' and commentuuid = '" + commentuuid + "'", function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                return resolve(result);
            });
        });
    
        return result;
}

function getCommentbyUuid(commentuuid, db){

    const result = new Promise((resolve, reject) => {
        db.query("SELECT * FROM postcomment WHERE uuid = '" + commentuuid + "'", function (err, result) {
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