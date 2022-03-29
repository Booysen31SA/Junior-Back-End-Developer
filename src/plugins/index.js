'use strict';

const { HomePlugin } = require('./home');
const { UserPlugin } = require('./user');
const { PostPlugin } = require('./post');
const { PostVotePlugin } = require('./postvote');

module.exports = [ HomePlugin, UserPlugin, PostPlugin, PostVotePlugin ];