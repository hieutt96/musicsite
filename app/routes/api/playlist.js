'use strict';
const express = require('express');
const router = express.Router();
const playlistController = require(global.__base + 'app/controllers/playlist/index.js');
const deserializeUser = require(global.__base + 'app/controllers/middleware/deserializeUser.js');
const isUser = require(global.__base + 'app/controllers/middleware/isUser.js');
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
//Tạo playlist mới
router.post('/create', deserializeUser, isUser, upload.single("file"), playlistController.create);

//Thêm bài hát vào một playlist đã có
router.post('/add', deserializeUser, isUser, playlistController.add);

//Remove một bài hát khỏi 1 playlist
router.delete('/remove', deserializeUser, isUser, playlistController.remove);

//Delete 1 playlist
router.delete('/delete', deserializeUser, isUser, playlistController.delete);
module.exports = router;