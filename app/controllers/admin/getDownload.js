const Admin = require(global.__base + 'app/models/admin.js');

let getDownload = (req, res) => {
	let page;
	if (!req.query.page) {
		page = 0;
	} else {
		page = parseInt(req.query.page, 10);
	}
    Admin.getDownload(page, (err, songs) => {
    	if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internall error' });
        }
        let result = [];
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
        getAndPush(0);
    });

}
module.exports = getDownload;