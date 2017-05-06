const User = require(global.__base + 'app/models/user.js');
const bcrypt = require('bcrypt-nodejs');

let update = (req, res) => {
    User.findAva(req.user.userId, (err, info) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        let ava = info.avatar;
        let data = {
            // username: req.body.username,
            password: bcrypt.hashSync(req.body.password),
            displayName: req.body.displayName,
            birthday: req.body.birthday,
            livingIn: req.body.livingIn,
            avatar: req.file ? req.file.path : ava
            // userId: req.user.userId
        };
        user.updateInfo(data, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ errCode: 500, msg: "Internal error" });
            }
            return res.status(200).json({ errCode: 0, msg: "Success" });
        });
        // User.updateUser(data, (err, info) => {
        //     if (err) {
        //         console.log(err);
        //         return res.status(500).json({ errCode: 500, msg: "Internal error" });
        //     } else return res.status(200).json({ errCode: 0, msg: "Success" });
        // });

    });

}
module.exports = update;