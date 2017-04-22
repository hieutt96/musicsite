const Playlist = require(global.__base + 'app/models/playlist.js');
let getAll = (req, res) => {
    Playlist.findAll((err, playlist) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        if (!playlist) return res.status(404).json({ errCode: 404, msg: "Not found" });
        else {
            let resData = [];
            playlist.forEach(function(item) {
                item.toJSON((err, playlistJSON) => {
                    resData.push(playlistJSON);
                });
            });
            return res.status(200).json({ errCode: 0, msg: "Success", data: resData });
        }
    });
}
module.exports = getAll;