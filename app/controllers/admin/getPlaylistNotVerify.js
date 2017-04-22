const Playlist = require(global.__base + 'app/models/playlist.js');
const Admin = require(global.__base + 'app/models/playlist.js');

let GetVer = (req, res) => {
    Playlist.getPlaylistNotVerify((err, playlist) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        if (!playlist) return res.status(200).json({ errCode: 0, msg: 'Empty' });
        else {
            return res.status(200).json({ errCode: 0, msg: 'Success', data: playlist });
        }
    });
};
module.exports = GetVer;