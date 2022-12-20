const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({path: __dirname + './../../.env'});


const pool = mysql.createPool({
    host:'dbaas-db-3227774-do-user-13026201-0.b.db.ondigitalocean.com',
    database: 'egor',
    user: 'doadmin',
    password: 'AVNS_OIr5Ksa0leWStmwmDJd',
    port: 25060
    // host: 'localhost',
    // database: 'egor',
    // user: 'root',
    // password: '',
    // port:3307
});

exports.pool = pool;
