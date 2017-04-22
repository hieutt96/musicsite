'use strict';
const express = require('express');
const router = express.Router();
const authorController = require(global.__base + 'app/controllers/author/index');
const deserializeUser = require(global.__base + 'app/controllers/middleware/deserializeUser.js');
const isUser = require(global.__base + 'app/controllers/middleware/isUser.js');

//Get author by ID
router.get('/find/:authorId', authorController.getByID);
//Tạo tác giả
router.post('/create', deserializeUser, isUser, authorController.create);
module.exports = router;