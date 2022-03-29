const path = require('path');
const massive = require('massive');

exports.db = (() => {
    return massive({
        host: process.env.POSTGRES_HOST,
        port: 5432,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        ssl: false
    }
    // , {scripts: path.resolve(__dirname, '../db')}
    )
})();