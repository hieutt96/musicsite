const Artist = require(global.__base + 'app/models/artist.js');

let getSingerByID = (req, res) => {
    Author.findById(req.params.artistId, (err, artist) => {
        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        if (!author) return res.status(404).json({ errCode: -3, msg: "Not found" });
        else {
            let resData = [];
            artist.toJSON((err, artistJSON) => {
                if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
                resData = { artist: artistJSON };
                return res.status(200).json({ errCode: 0, msg: "Success", data: resData });
            });
        }

    });
}
module.exports = getSingerByID;