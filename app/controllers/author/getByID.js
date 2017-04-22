'use strict';
const Author = require(global.__base + 'app/models/author.js');

let getByID = (req, res) => {

    Author.findById(req.params.authorId, (err, author) => {
        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        if (!author) return res.status(404).json({ errCode: -3, msg: 'Not found' });
        else {
            let resData = [];
            author.toJSON((err, authorJSON) => {
                if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
                resData = { author: authorJSON };
                return res.status(200).json({ errCode: 0, msg: 'Success', data: resData });
            });
        }

    });

}
module.exports = getByID;