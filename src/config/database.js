const path = require('path');
const mysql = require('mysql');
const boom = require('@hapi/boom');
const dotenv = require('dotenv');
dotenv.config();

exports.db = (() => {
    var db = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
    //, {scripts: path.resolve(__dirname, '../db')}
    );

    db.connect(function(err){
        if(err){
            console.log(err);
            throw err;
        }

        console.log('Connected to mySQL database');
    });

    return db;

})();