'use strict';

const { HomePlugin } = require('./home');
const { UserPlugin } = require('./user');
const { PostPlugin } = require('./post');

module.exports = [ HomePlugin, UserPlugin, PostPlugin ];