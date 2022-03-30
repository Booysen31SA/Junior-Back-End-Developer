const boom = require('@hapi/boom');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');

module.exports = {
    async getPostByUser(request, reply) {
        const db = await request.server.app.db;
        const email = request.params.email;

        const user = await getUserByEmail(email, db);
        if (user.length === 0) {
            return boom.conflict('User dont exist');
        }

        const posts = await getAllPostsByUserEmail(email, db);
        return posts;
    },
    async getAllupAndDownVotesForUser(request, reply) {
        const db = await request.server.app.db;
        const email = request.params.email;

        const user = await getUserByEmail(email, db);
        if (user.length === 0) {
            return boom.conflict('User dont exist');
        }

        const posts = await getAllupAndDownVotesForUser(email, db);
        return posts;
    },
    async getPostAllCommentsTotalVotes(request, reply) {
        const db = await request.server.app.db;
        const postuuid = request.params.uuid;

        const allcomments = await getAllCommentsOfPost(postuuid, db);
        //3b687c3d-07d4-4c63-84f7-cee1411182be
        return allcomments;
    }
}

//get all comments of a post, upvotes, downvotes, total comments
function getAllCommentsOfPost(uuid, db) {
    
        const result = new Promise((resolve, reject) => {
            db.query(`SELECT *, 
                        (SELECT COUNT(*) from reddit_api.postvote WHERE vote = 1 and idpostvote = p.uuid) as 'upVote', 
                        (SELECT COUNT(*) from reddit_api.postvote WHERE vote = 0 and idpostvote = p.uuid) as 'upVote',
                        (SELECT COUNT(*) from reddit_api.postcomment WHERE pc.idpostcomment = p.uuid) as 'totalcomments'
                    from reddit_api.post p Left Outer Join reddit_api.postcomment pc ON (p.uuid = pc.idpostcomment) 
                    where p.uuid = "?"`, [uuid], (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(result);
            });
        });
        return result;
}

//check if user exist
function getUserByEmail(email, db) {
    const user = new Promise((resolve, reject) => {
        db.query('SELECT * from users where email = ?', [email], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
            
        });
    });
    return user;
}

//get all posts created by the user
function getAllPostsByUserEmail(email, db) {

    const result = new Promise((resolve, reject) => {
        db.query('SELECT * FROM post WHERE email = ? ', [email], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
    return result;
}

// get all upvote and downvote of a post
function getAllupAndDownVotesForUser(email, db) {

    const result = new Promise((resolve, reject) => {
        db.query('SELECT * FROM reddit_api.post p JOIN reddit_api.postvote pv ON (p.uuid = pv.idpostvote)  WHERE p.email = ?', [email], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
    return result;
}