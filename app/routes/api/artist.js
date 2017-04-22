'use strict';
const express = require('express');
const router = express.Router();
const artistController = require(global.__base + 'app/controllers/artist/index.js');
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
//Tạo playlist 
router.post('/create', deserializeUser, isUser, upload.single("file"), artistController.newArtist);
router.post('/find/name', artistController.getArtistName);
router.post('/find/type', artistController.getArtistType);
router.get('/find/:artistId', artistController.getArtistID);
module.exports = router;