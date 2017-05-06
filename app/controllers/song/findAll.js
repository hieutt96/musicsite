const Song = require(global.__base + 'app/models/song.js');

// Hàm truy vấn trên nhiều trường
let findAll = (req, res) => {
    Song.find(req.body, req.body.page, (err, songs) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internall error' });
        }
        let result = [];
        let count = 0;
        let n = songs.length;
        if (n === 0) {
        	return res.status(200).json({ errCode: 0, msg: 'Success', data: result });
        }
        let getAndPush = (count) => {
        	songs[count].toJSON((err, songJSON) => {
        		if (err) {
        			console.log(err);
            		return res.status(500).json({ errCode: 500, msg: 'Internall error' });
        		}
        		result.push(songJSON);
        		count++;
        		if (count < n) {
        			getAndPush(count);
        		} else {
        			return res.status(200).json({ errCode: 0, msg: 'Success', data: result });
        		}
        	});
        };
        getAndPush(count);
    });
}
module.exports = findAll;