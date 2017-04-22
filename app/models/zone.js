'use strict';
const pool = require(global.__base + 'app/config/database/mysql/pool');

class Zone {

    constructor(props) {
        this._zoneId = props.zoneId;
        this._name = props.name;
    }

    get zoneId() { return this._zoneId; }
    get name() { return this._name; }

    rawData() {
        return {
            zoneId: this.zoneId,
            name: this.name
        }
    }
    save(callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'insert into zone set ?';
            let zone = Object.assign({}, this.rawData());
            connection.query(query, [zone], (err, results) => {
                connection.release();
                if (err) return callback(err);
                this._zoneId = results.insertId;
                callback(null);
            });

        });
    }
    toJSON(callback) {
        return callback(null, this.rawData());
    }
    static findById(zoneId, callback) {
        let query = 'select * from zone where zoneId = ?';
        pool.query(query, [zoneId], (err, result) => {
            if (err) return callback(err);
            let zone = new Zone(result[0]);
            return callback(null, zone);
        });
    }


}
module.exports = Zone;