const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({path: __dirname + './../../.env'});


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
    // host: 'localhost',
    // database: 'egor',
    // user: 'root',
    // password: '',
    // port:3307
});

exports.pool = pool;
