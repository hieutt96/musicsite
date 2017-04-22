const Playlist = require(global.__base + 'app/models/playlist.js');
let getByID = (req, res) => {
    Playlist.findById(req.params.id, (err, playlist) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        if (!playlist) return res.status(404).json({ errCode: -3, msg: "Not found playlist!" });
        else {
            playlist.toJSON((err, playlistJSON) => {
                if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
                let resData = { playlist: playlistJSON };
                return res.status(200).json({ errCode: 0, msg: "Success", data: resData });
            });
        }
    });

}
module.exports = getByID;