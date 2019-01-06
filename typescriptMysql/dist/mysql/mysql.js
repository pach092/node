"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log("Clase inicializada");
        this.cnn = mysql.createConnection({
            host: "35.202.128.79",
            user: "francisco",
            password: "4lun1d34s*1",
            database: "cursonode_db"
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log("Error en query");
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback("El registro solicitado no existe");
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
            }
            this.conectado = true;
            console.log("Base de datos online");
        });
    }
}
exports.default = MySQL;
