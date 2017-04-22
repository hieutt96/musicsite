const Admin = require(global.__base + 'app/models/admin.js');

let verify = (req, res) => {
    Admin.verify(req.body.playlistId, (err) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        else return res.status(200).json({ errCode: 0, msg: "Success" });
    });
}
module.exports = verify;