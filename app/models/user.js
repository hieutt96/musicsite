'use strict';

const pool = require(global.__base + 'app/config/database/mysql/pool');
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

class User {

    constructor(props) {
        this._userId = props.userId;
        this._username = props.username;
        this._email = props.email;
        this._displayName = props.displayName;
        this._birthday = props.birthday;
        this._livingIn = props.livingIn;
        this._gender = props.gender;
        this._isBlock = props.isBlock;
        this._avatar = props.avatar;
        if (props.encryptedPassword) {
            this._password = props.encryptedPassword;
        } else {
            this._password = bcrypt.hashSync(props.password);
        }
    }

    get userId() { return this._userId; }
    get username() { return this._username; }
    get email() { return this._email; }
    get displayName() { return this._displayName; }
    get birthday() { return this._birthday; }
    get livingIn() { return this._livingIn; }
    get gender() { return this._gender; }
    get isBlock() { return this._isBlock; }
    get avatar() { return this._avatar; }
    rawData() {
        return {
            userId: this.userId,
            username: this.username,
            email: this.email,
            displayName: this.displayName,
            birthday: this.birthday,
            livingIn: this.livingIn,
            gender: this.gender,
            isBlock: this.isBlock,
            avatar: this.avatar
        };
    }

    save(callback) {
        pool.getConnection((err, conn) => {
            if (err) { return callback(err); }

            let query = 'INSERT INTO `user` SET ?';
            let user = Object.assign({}, this.rawData(), { password: this._password });
            conn.query(query, [user], (err, result) => {
                conn.release();
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                this._userId = result.insertId;
                callback(null);
            });
        });
    }

    toJSON(callback) {
        return callback(null, this.rawData());
    }

    comparePassword(password) {
        return bcrypt.compareSync(password, this._password);
    }

    static findById(id, callback) {
        pool.getConnection((err, conn) => {
            if (err) { return callback(err); }

            let query = 'SELECT * FROM `user` WHERE userId = ?';
            conn.query(query, [id], (err, rows) => {
                conn.release();
                if (err) return callback(err);

                if (!rows[0]) {
                    return callback(null, null);
                }

                let info = Object.assign({}, rows[0], {
                    encryptedPassword: rows[0].password,
                    birthday: moment(rows[0].birthday).format('YYYY-MM-DD')
                });
                let user = new User(info);
                return callback(null, user);
            });
        });
    }

    static findByEmail(email, callback) {
        pool.getConnection((err, conn) => {
            if (err) { return callback(err); }

            let query = 'SELECT * FROM `user` WHERE email = ?';
            conn.query(query, [email], (err, rows) => {
                conn.release();
                if (err) return callback(err);

                if (!rows[0]) {
                    return callback(null, null);
                }

                let info = Object.assign({}, rows[0], {
                    encryptedPassword: rows[0].password,
                    birthday: moment(rows[0].birthday).format('YYYY-MM-DD')
                });
                let user = new User(info);
                return callback(null, user);
            });
        });
    }

    static findByUsername(username, callback) {
            pool.getConnection((err, conn) => {
                if (err) { return callback(err); }

                let query = 'SELECT * FROM `user` WHERE username = ?';
                conn.query(query, [username], (err, rows) => {
                    conn.release();
                    if (err) return callback(err);

                    if (!rows[0]) {
                        return callback(null, null);
                    }

                    let info = Object.assign({}, rows[0], {
                        encryptedPassword: rows[0].password,
                        birthday: moment(rows[0].birthday).format('YYYY-MM-DD')
                    });
                    let user = new User(info);
                    return callback(null, user);
                });
            });
        }
        //Find avatar
    static findAva(userId, callback) {
            let query = 'select avatar from user where userId = ?';
            pool.query(query, [userId], (err, results) => {
                if (err) return callback(err);
                else {
                    return callback(null, results[0]);
                }

            });
        }
        //Update user
    static updateUser(user, callback) {
        let query = "update user set username = ?, password = ?, displayName = ?, birthday = ?, livingIn = ?,avatar = ? where userId = ?";
        pool.query(query, [user.username, user.password, user.displayName, user.birthday, user.livingIn, user.avatar, user.userId], (err, results) => {
            if (err) return callback(err);
            return callback(null, null);
        });
    }

    updateInfo(data, callback) {
        let info = {};
        let keys = ['password', 'displayName', 'birthday', 'livingIn', 'avatar'];
        for (i in keys) {
            if (data[keys[i]]) {
                info[keys[i]] = data[keys[i]];
            }
        }
        let query = 'UPDATE user SET ? WHERE userId = ?';
        pool.query(query, [info, this._userId], (err, result) => {
            if (err) {
                return callback(err);
            }
            for (i in keys) {
                if (info[keys[i]]) {
                    this["_" + keys[i]] = data[keys[i]];
                }
            }
        });
    }
}

module.exports = User;