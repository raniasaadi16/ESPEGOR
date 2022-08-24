const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({path: __dirname + './../../.env'});


const pool = mysql.createPool({
    host: 'localhost',
    database: 'egor',
    user: 'root',
    password: '',
    port:3307
});

exports.pool = pool;
