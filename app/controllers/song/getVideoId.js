const Song = require(global.__base + 'app/models/song.js');

let getVideoId = (req, res) => {
    let id = req.params.videoId;
    Song.getVideoById(req.params.id, (err, video) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        if (!video) {
            return res.status(404).json({ errCode: -3, msg: 'Not found' });
        } else {
            video.toJSON((err, videoJSON) => {
                let resData = { video: videoJSON };
                return res.status(200).json({ errCode: 200, msg: 'Success', data: resData });
            });
        }
    })
}
module.exports = getVideoId;