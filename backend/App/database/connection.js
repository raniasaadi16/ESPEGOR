const mysql = require('mysql');
require('dotenv').config({path: __dirname + './../../.env'});


const pool = mysql.createPool({
    host: 'b6abklgm9cxtpc6ahwlq-mysql.services.clever-cloud.com',
    database: 'b6abklgm9cxtpc6ahwlq',
    user: 'uuqyuudj1mix11ix',
    password: 'phcy9cupOttT6GdxrT6V',
    port: '3306'
    // host: 'localhost',
    // database: 'egor',
    // user: 'root',
    // password: '',
    // port:3307
});

exports.pool = pool;
