const Playlist = require(global.__base + 'app/models/playlist.js');

let createPlaylist = (req, res) => {
    console.log(req.file);
    Playlist.findByName(req.body.name, (err, playlist) => {

        if (err) {
            return res.status(500).json({ errCode: 500, msg: "Internal error" });
        }
        if (playlist) {
            return res.status(400).json({ errCode: -2, msg: "Playlist already exists" });
        }
        if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg') {
            res.status(415).json({ errCode: -7, msg: 'Unsupported Media Type ' });
        } else {

            let info = {
                name: req.body.name,
                description: req.body.description,
                type: req.body.type,
                isVerify: req.body.type === 0 ? true : false,
                dateTime: new Date(),
                userId: req.user.userId,
                cover: req.file.path
            }
            let newPlaylist = new Playlist(info);
            newPlaylist.save((err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ errCode: 500, msg: "Internal error" });
                }
                newPlaylist.toJSON((err, newPlaylistJSON) => {
                    let resData = { playlist: newPlaylistJSON };
                    return res.status(200).json({ errCode: 0, msg: " Success", data: resData });
                });
            });

        }
    })
}

module.exports = createPlaylist;