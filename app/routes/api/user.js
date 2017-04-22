'use strict';

const express = require('express');
const router = express.Router();
const userController = require(global.__base + 'app/controllers/user/index');
const deserializeUser = require(global.__base + 'app/controllers/middleware/deserializeUser.js');
const isUser = require(global.__base + 'app/controllers/middleware/isUser.js');
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/images');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
router.post('/signup', upload.single("file"), userController.signup);
router.post('/login', userController.login);
router.get('/logout', isUser, deserializeUser, userController.logout);

module.exports = router;