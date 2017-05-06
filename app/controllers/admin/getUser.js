const Admin = require(global.__base + 'app/models/admin.js');

let getUser = (req, res) => {
	let page;
	if (!req.query.page) {
		page = 0;
	} else {
		page = parseInt(req.query.page, 10);
	}
    Admin.getUser(page, (err, users) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internall error' });
        }
        let result = [];
        let count = 0;
        let n = users.length;
        if (n === 0) {
        	return res.status(200).json({ errCode: 0, msg: 'Success', data: result });
        }
        let getAndPush = (count) => {
        	users[count].toJSON((err, songJSON) => {
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
module.exports = getUser;