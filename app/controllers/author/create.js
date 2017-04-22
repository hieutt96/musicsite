'use strict';
const Author = require(global.__base + 'app/models/author.js');

let newAuthor = (req, res) => {
    if (name === null) {
        return res.status(400).json({ errCode: -1, msg: "Missing argument" });
    }
    let info = {
        name: req.body.name,
        description: req.body.description
    }
    Author.findByName(info.name, (err, author) => {
        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        if (author) return res.status(400).json({ errCode: -2, msg: "Author already exists" });
        else {
            let newAuthor = new Author(info);
            newAuthor.save((err) => {
                if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
                newAuthor.toJSON((err, newAuthorJSON) => {
                    let resData = { author: newAuthorJSON };
                    return res.status(200).json({ errCode: 0, msg: "Success", data: resData });
                });
            });
        }
    });


}
module.exports = newAuthor;