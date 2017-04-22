const pool = require(global.__base + 'app/config/database/mysql/pool');
const Song = require(global.__base + 'app/models/song.js');
class Playlist {
    constructor(props) {
        this._playlistId = props.playlistId;
        this._name = props.name;
        this._description = props.description;
        this._type = props.type;
        this._isVerify = props.isVerify;
        this._dateTime = props.dateTime;
        this._userId = props.userId;
        this._cover = props.cover;
    }
    get playlistId() { return this._playlistId; }
    get name() { return this._name; }
    get description() { return this._description; }
    get type() { return this._type; }
    get isVerify() { return this._isVerify; }
    get dateTime() { return this._dateTime; }
    get userId() { return this._userId; }
    get cover() { return this._cover; }

    rawData() {
        return {
            playlistId: this.playlistId,
            name: this.name,
            description: this.description,
            type: this.type,
            isVerify: this.isVerify,
            dateTime: this.dateTime,
            userId: this.userId,
            cover: this.cover
        }
    }

    save(callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'insert into playlist set ?';
            let playlist = Object.assign({}, this.rawData());
            connection.query(query, [playlist], (err, results) => {
                connection.release();
                if (err) return callback(err);
                this._playlistId = results.insertId;
                callback(null);
            });
        });
    }
    toJSON(callback) {
        return callback(null, this.rawData());
    }

    // Tìm theo ID
    static findById(id, callback) {
            let query = 'select * from playlist where playlistId = ?';
            pool.query(query, [id], (err, results) => {
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                callback(null, new Playlist(results[0]));

            });
        }
        //Tìm theo tên trả về nhiều kết quả

    static findByName(name, callback) {
        let query = 'select * from playlist where name = ?';
        pool.query(query, [name], (err, results) => {
            if (err) return callback(err);
            if (!results[0]) return callback(null, null);
            let data = [];
            results.forEach(function(item) {
                data.push(new Playlist(item));
            });
            callback(null, data);
        });
    }

    // Tìm kiếm bằng type, có thể trả về nhiều kết quả
    static findByType(type, callback) {
        let query = 'select * from playlist where type = ?';
        pool.query(query, [type], (err, resutls) => {
            if (err) return callback(err);
            if (!results[0]) return callback(null, null);
            let data = [];
            results.forEach(function(item) {
                data.push(new Playlist(item));
            });
            callback(null, data);
        });
    }

    //Tìm kiếm bằng ID người dùng sở hữu playlist, trả về nhiều kết quả

    static findByUserId(id, callback) {
        let query = 'select * from playlist where userId = ?';
        pool.query(query, [id], (err, results) => {
            if (err) return callback(err);
            if (!results[0]) return callback(null, null);
            let data = [];
            results.forEach(function(item) {
                data.push(new Playlist(item));
            });
            callback(null, data);
        });

    }

    static addSong(songId, playlistName, order, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = "select * from playlist where name = ?";
            connection.query(query, [playlistName, userId], (err, results) => {
                if (err) return callback(err);
                else {
                    console.log(results);
                    let info = {
                        songId: songId,
                        playlistId: results[0].playlistId,
                        order: order
                    };
                    let query = "insert into song_in_playlist set ?";
                    connection.query(query, [info], (err, results) => {
                        connection.release();
                        if (err) {
                            return callback(err);
                        }
                        callback(null);
                    });

                }
            });
        });

    }
    static removeSong(songId, playlistId, userId, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'select * from song_in_playlist where songId = ? and playlistId = ? and order = ? ';
            connection.query(query, [songId, playlistId, userId], (err, results) => {
                if (err) {
                    connection.release();
                    return callback(err);
                }
                if (results) {
                    let query = "delete from song_in_playlist where songId = ? and playlistId = ?";
                    connection.query(query, [songId, playlistId], (err, results) => {
                        console.log(results);
                        connection.release();
                        if (err) return callback(err);
                        return callback(null, results);
                    });
                } else return callback(null);
            });

        });
    }
    static deletePlaylist(playlistId, userId, callback) {
        let query = 'delete from playlist where playlistId = ? and userId = ?';
        pool.query(query, [playlistId, userId], (err, results) => {
            if (err) return callback(err);
            else return callback(null, results);
        });

    }
    static getPlaylistNotVerify(callback) {
        let query = 'select * from playlist where isVerify = 1';
        pool.query(query, [], (err, results) => {
            if (err) return callback(err);
            if (!results) return callback(null);
            let data = [];
            results.forEach(function(item) {
                data.push(new Playlist(item));
            });
            callback(null, data);
        });
    }
    static findAll(callback) {
        let query = 'select * from playlist';
        pool.query(query, [], (err, results) => {
            if (err) return callback(err);
            if (!results) return callback(null, null);
            results.forEach(function(item) {
                data.push(new Playlist(item));
            });
            callback(null, data);
        });
    }


}
module.exports = Playlist;