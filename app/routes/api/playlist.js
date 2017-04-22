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
//Tạo playlist mới, post name, type (0 với playlist thường, 1 với album phải xác thực,), description, và một tệp file
router.post('/create', deserializeUser, isUser, upload.single("file"), playlistController.create);

//Thêm bài hát vào một playlist đã có, post songId và name (tên của playlist)
router.post('/add', deserializeUser, isUser, playlistController.add);

//Remove một bài hát khỏi 1 playlist: post lên 1 cái songId và 1 cái playlistId, phải là thằng user mới xóa được
router.delete('/remove', deserializeUser, isUser, playlistController.remove);

//Delete 1 playlist post 1 cái playlistId lên địa chỉ này = delete, phải là user tạo mới xóa được
router.delete('/delete', deserializeUser, isUser, playlistController.delete);

//get By ID
router.get('/:id', playlistController.getByID);

//get all playlist
router.get('/', playlistController.getAll);
module.exports = router;