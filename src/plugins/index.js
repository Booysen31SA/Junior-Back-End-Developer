'use strict';

const { HomePlugin } = require('./home');
const { UserPlugin } = require('./user');
const { PostPlugin } = require('./post');
const { PostVotePlugin } = require('./postvote');
const { PostCommentPlugin } = require('./postcomment');
const { PostCommentVotePlugin } = require('./postcommentvote');

module.exports = [ HomePlugin, UserPlugin, PostPlugin, PostVotePlugin, PostCommentPlugin, PostCommentVotePlugin ];