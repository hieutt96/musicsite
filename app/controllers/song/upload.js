'use strict';
const Song = require(global.__base + 'app/models/song.js');
const Author = require(global.__base + 'app/models/author.js');
const Artist = require(global.__base + 'app/models/artist.js');
const utils = require(global.__base + 'app/utils/index');
const moment = require('moment');

let upload = (req, res) => {
    // Check key not exists
    let keys = ['name', 'description', 'authorId', 'artistIds', 'zoneId', 'categoryId'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.status(400).json({
            errCode: -1,
            msg: 'Missing argument ' + keys[notExists]
        });
    }
    if (!req.file) {
        return res.status(400).json({
            errCode: -1, 
            msg: 'Missing file'
        });
    }
    // Sai định dạng file
    if (req.file.mimetype !== 'audio/mp3' && req.file.mimetype !== 'video/mp4') {
        res.status(415).json({ errCode: -7, msg: 'Unsupported Media Type ' });
    }
    // Check artist ids
    let artistIds = [];
    console.log(req.body.artistIds)
    try {
        artistIds = JSON.parse(req.body.artistIds);
        if (!artistIds[0]) {
            return res.status(400).json({
                errCode: -1,
                msg: 'Missing argument artistIds'
            });
        }
    } catch(err) {
        console.error(err);
        return res.status(500).json({ errCode: 500, msg: 'Internal error' });
    }

    //Tìm kiếm tác giả trong database
    Author.findById(req.body.authorId, (err, author) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        
        //Nếu có tác giả thì kiểm tra ca sĩ
        let info = {
            name: req.body.name,
            description: req.body.description,
            link: req.file.path,
            dateTime: moment(Date.now()).format('YYYY-MM-DD'),
            listen: 0,
            download: 0,
            type: (req.file.mimetype === 'audio/mp3' ? 1 : 2),
            userId: req.user.userId,
            zoneId: req.body.zoneId,
            categoryId: req.body.categoryId,
            authorId: author ? author.authorId : 1
        };
        let newSong = new Song(info);
        // Save song
        newSong.save((err) => {
            if (err) {
                console.log(err);
                return res.stus(500).json({ errCode: 500, msg: 'Internal error' });
            }
            // Find artists
            let n = artistIds.length;
            if (n === 0) {
                // Save present to default artist
                newSong.savePresent(newSong.songId, 1, (err) => {
                    if (err) {
                        console.log(err);
                        return res.stus(500).json({ errCode: 500, msg: 'Internal error' });
                    }
                    // Response
                    newSong.toJSON((err, newSongJSON) => {
                        if (err) return res.json({ errCode: 500, msg: 'Internal error' });
                        let resData = { song: newSongJSON };
                        return res.json({ errCode: 0, msg: 'Success', data: resData });
                    });
                });
            }

            let saved = 0;
            let getAndSave = (count) => {
                Artist.findById(artistIds[count], (err, artist) => {
                    if (err) {
                        console.log(err);
                        return res.stus(500).json({ errCode: 500, msg: 'Internal error' });
                    }
                    if (!artist) {
                        count++;
                        if (count < n) {
                            getAndSave(count);
                        } else {
                            if (saved === 0) {
                                // Save present to default artist
                                newSong.savePresent(newSong.songId, 1, (err) => {
                                    if (err) {
                                        console.log(err);
                                        return res.stus(500).json({ errCode: 500, msg: 'Internal error' });
                                    }
                                    // Response
                                    newSong.toJSON((err, newSongJSON) => {
                                        if (err) return res.json({ errCode: 500, msg: 'Internal error' });
                                        let resData = { song: newSongJSON };
                                        return res.json({ errCode: 0, msg: 'Success', data: resData });
                                    });
                                });
                            } else {
                                // Response
                                newSong.toJSON((err, newSongJSON) => {
                                    if (err) return res.json({ errCode: 500, msg: 'Internal error' });
                                    let resData = { song: newSongJSON };
                                    return res.json({ errCode: 0, msg: 'Success', data: resData });
                                });
                            }
                        }
                    }
                    // Save
                    newSong.savePresent(newSong.songId, artist.artistId, (err) => {
                        if (err) {
                            console.log(err);
                            return res.stus(500).json({ errCode: 500, msg: 'Internal error' });
                        }
                        count++;
                        saved++;
                        if (count < n) {
                            getAndSave(count);
                        } else {
                            // Response
                            newSong.toJSON((err, newSongJSON) => {
                                if (err) return res.json({ errCode: 500, msg: 'Internal error' });
                                let resData = { song: newSongJSON };
                                return res.json({ errCode: 0, msg: 'Success', data: resData });
                            });
                        }
                    });
                });
            };
            getAndSave(0);
        });

            // Artist.findById(req.body.artist, (err, artist) => {
            //     if (err) {
            //         console.log(err);
            //         return res.stus(500).json({ errCode: 500, msg: 'Internal error' });
            //     }
            //     //Có tác giả - có ca sĩ
            //     //Nếu tồn tại ca sĩ
            //     if (artist) {
            //         let info = {
            //             name: req.body.name,
            //             description: req.body.description,
            //             link: req.file.path,
            //             dateTime: new Date(),
            //             listen: 0,
            //             download: 0,
            //             type: (req.file.mimetype === 'audio/mp3' ? 1 : 2),
            //             userId: req.user.userId,
            //             zoneId: req.body.zoneId,
            //             categoryId: req.body.categoryId,
            //             authorId: author[0]._authorId
            //         };
            //         let newSong = new Song(info);
            //         newSong.save((err) => {
            //             if (err) {
            //                 console.log(err);
            //                 return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            //             }
            //             newSong.savePresent(newSong.songId, artist.artistId, (err) => {
            //                 if (err) return res.json({ errCode: 500, msg: "Internal error" });
            //                 newSong.toJSON((err, newSongJSON) => {
            //                     if (err) return res.json({ errCode: 500, msg: 'Internal error' });
            //                     let resData = { song: newSongJSON };
            //                     return res.json({ errCode: 0, msg: 'Success', data: resData });
            //                 });
            //             })
            //         });
            //     }
            //     //Có tác giả - không ca sĩ
            //     //Nếu không tồn tại ca sĩ tạo ca sĩ mới với tham số mặc định :
            //     else {
            //         let singerInfo = {
            //             name: req.body.artist,
            //             type: 0,
            //             description: 'Not available'
            //         }
            //         let newArtist = new Artist(singerInfo);
            //         newArtist.save((err) => {
            //             if (err) {
            //                 console.log(err);
            //                 return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            //             }
            //             newArtist.toJSON((err, newArtistJSON) => {
            //                 let resData = { artist: newArtistJSON };
            //                 let info = {
            //                     name: req.body.name,
            //                     description: req.body.description,
            //                     link: req.file.path,
            //                     listen: 0,
            //                     download: 0,
            //                     dateTime: new Date(),
            //                     type: (req.file.mimetype === 'audio/mp3' ? 1 : 2),
            //                     userId: req.user.userId,
            //                     zoneId: req.body.zoneId,
            //                     categoryId: req.body.categoryId,
            //                     authorId: author[0]._authorId
            //                 };
            //                 let newSong = new Song(info);
            //                 newSong.save((err) => {
            //                     if (err) {
            //                         console.log(err);
            //                         return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            //                     }
            //                     newSong.savePresent(newSong.songId, newArtistJSON.artistId, (err) => {
            //                         newSong.toJSON((err, newSongJSON) => {
            //                             if (err) return res.json({ errCode: 500, msg: 'Internal error' });
            //                             let resData = { song: newSongJSON };
            //                             return res.json({ errCode: 0, msg: 'Success', data: resData });
            //                         });
            //                     })
            //                 });
            //             })
            //         });
            //     }
            // });
        
            // Artist.findByName(req.body.artist, (err, artist) => {
            //     if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });

            //     if (artist) { //Có ca sĩ - không tác giả
            //         //Tạo tác giả mới với tham số mặc định 
            //         let authorInfo = {
            //             name: req.body.author,
            //             description: 'Not available'
            //         };
            //         let newAuthor = new Author(authorInfo);
            //         newAuthor.save((err) => {
            //             if (err) {
            //                 console.log(err);
            //                 return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            //             }
            //             newAuthor.toJSON((err, newAuthorJSON) => {
            //                 let info = {
            //                     name: req.body.name,
            //                     description: req.body.description,
            //                     link: req.file.path,
            //                     listen: 0,
            //                     download: 0,
            //                     dateTime: new Date(),
            //                     type: (req.file.mimetype === 'audio/mp3' ? 1 : 2),
            //                     userId: req.user.userId,
            //                     zoneId: req.body.zoneId,
            //                     categoryId: req.body.categoryId,
            //                     authorId: newAuthorJSON.authorId
            //                 };
            //                 let newSong = new Song(info);
            //                 newSong.save((err) => {
            //                     if (err) {
            //                         console.log(err);
            //                         return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            //                     }
            //                     newSong.savePresent(newSong.songId, artist.artistId, (err) => {
            //                         if (err) return res.json({ errCode: 500, msg: "Internal error" });
            //                         newSong.toJSON((err, newSongJSON) => {
            //                             let resData = { song: newSongJSON };
            //                             if (err) return res.json({ errCode: 500, msg: 'Internal error' });
            //                             return res.json({ errCode: 0, msg: 'Success', data: resData })
            //                         });
            //                     })
            //                 });
            //             });
            //         });
            //     } else {
            //         //Không ca sĩ - Không tác giả
            //         //Tạo ca sĩ trước
            //         let singerInfo = {
            //             name: req.body.artist,
            //             type: 0,
            //             description: 'Not available'
            //         }
            //         let newArtist = new Artist(singerInfo);
            //         newArtist.save((err) => {
            //             if (err) {
            //                 console.log(err);
            //                 return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            //             }
            //             newArtist.toJSON((err, newArtistJSON) => {
            //                 let resData = { artist: newArtistJSON };
            //                 let authorInfo = {
            //                     name: req.body.author,
            //                     description: 'Not availble'
            //                 };
            //                 let newAuthor = new Author(authorInfo);
            //                 newAuthor.save((err) => {
            //                     if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            //                     newAuthor.toJSON((err, newAuthorJSON) => {
            //                         if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            //                         let info = {
            //                             name: req.body.name,
            //                             description: req.body.description,
            //                             link: req.file.path,
            //                             listen: 0,
            //                             download: 0,
            //                             dateTime: new Date(),
            //                             type: (req.file.mimetype === 'audio/mp3' ? 1 : 2),
            //                             userId: req.user.userId,
            //                             zoneId: req.body.zoneId,
            //                             categoryId: req.body.categoryId,
            //                             authorId: newAuthorJSON.authorId
            //                         };
            //                         let newSong = new Song(info);
            //                         newSong.save((err) => {
            //                             if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            //                             newSong.savePresent(newSong.songId, newArtistJSON.artistId, (err) => {
            //                                 if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            //                                 newSong.toJSON((err, newSongJSON) => {
            //                                     let resData = { song: newSongJSON };
            //                                     if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            //                                     return res.status(200).json({ errCode: 0, msg: 'Success', data: resData });
            //                                 });
            //                             });
            //                         });
            //                     });
            //                 });
            //             });
            //         });
            //     }
            // });
    });
}
module.exports = upload;