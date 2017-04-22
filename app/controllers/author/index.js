'use strict';

const getByID = require(global.__base + 'app/controllers/author/getByID.js');
const create = require(global.__base + 'app/controllers/author/create.js');
const authorController = {
    create: create,
    getByID: getByID
}
module.exports = authorController;