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
        cb(null, './upload/images/avatar');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});
var upload = multer({ storage: storage });
router.post('/signup', upload.single("file"), userController.signup);
router.post('/login', userController.login);
router.get('/logout', isUser, deserializeUser, userController.logout);
//Post tất cả thông tin lên, chỗ nào cập nhật thì nó sẽ tự cập nhật
//username, password, displayName, birthday, livingIn, avatar(cái này cho mục chọn file)
router.put('/update', isUser, deserializeUser, upload.single("file"), userController.update);

module.exports = router;