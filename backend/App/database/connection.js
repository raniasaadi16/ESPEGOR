const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({path: __dirname + './../../.env'});


const pool = mysql.createPool({
    host: 'b6abklgm9cxtpc6ahwlq-mysql.services.clever-cloud.com',
    database: 'b6abklgm9cxtpc6ahwlq',
    user: 'uuqyuudj1mix11ix',
    password: 'phcy9cupOttT6GdxrT6V',
    port: 3306
});

exports.pool = pool;