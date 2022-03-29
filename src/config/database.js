const path = require('path');
const mysql = require('mysql');
const boom = require('@hapi/boom');
const dotenv = require('dotenv');
dotenv.config();

exports.db = (() => {
    return db = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
    //, {scripts: path.resolve(__dirname, '../db')}
    );

})();