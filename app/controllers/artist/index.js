'use strict';
const createArtist = require(global.__base + 'app/controllers/artist/create.js');
const getArtistName = require(global.__base + 'app/controllers/artist/getSingerByName.js');
const getArtistType = require(global.__base + 'app/controllers/artist/getSingerByType.js');
const getArtistID = require(global.__base + 'app/controllers/artist/getSingerByID.js');
const artistController = {
    newArtist: createArtist,
    getArtistName: getArtistName,
    getArtistType: getArtistType,
    getArtistID: getArtistID
}
module.exports = artistController;