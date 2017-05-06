'use strict';

const pool = require(global.__base + 'app/config/database/mysql/pool');
const bcrypt = require('bcrypt-nodejs');
const PAGE_LENGTH = 10;

class Admin {

    constructor(props) {
        this._adminId = props.adminId;
        this._username = props.username;
        this._priority = props.priority;
        this._email = props.email;
        if (props.encryptedPassword) {
            this._password = props.encryptedPassword;
        } else {
            this._password = bcrypt.hashSync(props.password);
        }
    }

    get adminId() { return this._adminId; }
    get username() { return this._username; }
    get email() { return this._email; }
    get priority() { return this._priority; }

    rawData() {
        return {
            adminId: this._adminId,
            username: this._username,
            email: this._email,
            priority: this._priority
        }
    }

    save(callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'insert into `admin` set ?';
            let admin = Object.assign({}, this.rawData(), { password: this._password });
            connection.query(query, [admin], (err, results) => {
                connection.release();
                if (err) return callback(err);
                this._adminId = results.insertId;
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


    //Tìm kiếm bằng ID chỉ trả về 1 kq
    static findById(id, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'select * from `admin` where adminId=?';
            connection.query(query, [id], (err, results) => {
                connection.release();
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                let info = Object.assign({}, results[0], {
                    encryptedPassword: results[0].password
                });
                let admin = new Admin(info);
                return callback(null, admin);
            });
        });
    }

    //Tìm kiếm bằng username chỉ trả về 1 kết quả
    static findByUsername(username, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'select * from `admin` where username= ?';
            connection.query(query, [username], (err, results) => {
                connection.release();
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                let info = Object.assign({}, results[0], { encryptedPassword: results[0].password });
                let admin = new Admin(info);
                return callback(null, admin);
            });
        });
    }

    //Tìm kiếm bằng email chỉ trả về 1 kq
    static findByEmail(email, callback) {
            pool.getConnection((err, connection) => {
                if (err) return callback(err);
                let query = 'select * from `admin` where username = ?';
                connection.query(query, [email], (err, results) => {
                    connection.release();
                    if (err) return callback(err);
                    if (!results[0]) return callback(null, null);
                    let info = Object.assign({}, results[0], { encryptedPassword: results[0].password });
                    let admin = new Admin(info);
                    return callback(null, admin);
                });
            });
        }
        //Block User
    static Block(userId, callback) {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                return callback(err);
            }
            let query = 'select isBlock from user where userId = ?';
            connection.query(query, [userId], (err, user) => {
                if (err) {
                    connection.release();
                    return callback(err);
                }
                if (user[0].isBlock === 0) {
                    console.log("hihi");
                    let query = 'update user set isBlock = 1 where userId = ? ';
                    connection.query(query, [userId], (err, results) => {
                        connection.release();
                        if (err) return callback(err);
                    });
                } else {
                    let query = 'update user set isBlock = 0 where userId = ? ';
                    connection.query(query, [userId], (err, results) => {
                        connection.release();
                        if (err) return callback(err);
                    });
                }
                return callback(null);
            });
        });
    }

    static getUser(page, callback) {

        const User = require(global.__base + 'app/models/user');

        let query = 'select * from user ORDER BY userId DESC LIMIT ? OFFSET ?';
        pool.query(query, [PAGE_LENGTH, page * PAGE_LENGTH], (err, rows) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            let result = [];
            rows.forEach((row, i) => {
                result.push(new User(row));
            });
            return callback(null, result);
        });
    }
    static getListen(page, callback) {
        const Song = require(global.__base + 'app/models/song');

        let query = 'select * from song order by song.listen desc LIMIT ? OFFSET ?';
        pool.query(query, [PAGE_LENGTH, page * PAGE_LENGTH], (err, rows) => {
            if (err) {
                console.log(err);
                return callback(err);
            } 
            let result = [];
            rows.forEach((row, i) => {
                result.push(new Song(row));
            });
            return callback(null, result);
        });
    }
    static getDownload(page, callback) {
        const Song = require(global.__base + 'app/models/song');
        
        let query = 'select * from song order by song.download desc LIMIT ? OFFSET ?';
        pool.query(query, [PAGE_LENGTH, page * PAGE_LENGTH], (err, rows) => {
            if (err) {
                console.log(err);
                return callback(err);
            } 
            let result = [];
            rows.forEach((row, i) => {
                result.push(new Song(row));
            });
            return callback(null, result);
        });
    }
        //Hàm xác nhận playlist là album, post cái playlistId lên
    static verify(playlistId, callback) {
        let query = 'update playlist set isVerify = 0 where playlistId = ?';
        pool.query(query, [playlistId], (err, results) => {
            if (err) return callback(err);
            return callback(null);
        });
    }


}
module.exports = Admin;