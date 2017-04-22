'use strict';

const signup = require(global.__base + 'app/controllers/admin/signup');
const login = require(global.__base + 'app/controllers/admin/login');
const logout = require(global.__base + 'app/controllers/admin/logout');
const deserializeAdmin = require(global.__base + 'app/controllers/middleware/deserializeAdmin.js');
const isAdmin = require(global.__base + 'app/controllers/middleware/isAdmin.js');
const block = require(global.__base + 'app/controllers/admin/blockUser.js');
const getUser = require(global.__base + 'app/controllers/admin/getUser.js');
const getListen = require(global.__base + 'app/controllers/admin/getListen.js');
const getDownload = require(global.__base + 'app/controllers/admin/getDownload.js');
const getPlaylistNotVerify = require(global.__base + 'app/controllers/admin/getPlaylistNotVerify.js');
const verify = require(global.__base + 'app/controllers/admin/verify.js');
const adminController = {
    login: login,
    signup: signup,
    logout: logout,
    block: block,
    getPlaylistNotVerify: getPlaylistNotVerify,
    getUser: getUser,
    getListen: getListen,
    getDownload: getDownload,
    verify: verify

};

module.exports = adminController;