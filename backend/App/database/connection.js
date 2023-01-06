const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + './../../.env' });


const pool = mysql.createPool({
    host:'db-mysql-fra1-59892-do-user-13026201-0.b.db.ondigitalocean.com',
    database: 'egor',
    user: 'egor',
    password: 'AVNS_-0v-XDvwIb1rU0P8392',
    port: 25060
    // host: 'localhost',
    // database: 'egor',
    // user: 'root',
    // password: '',
    // port: 3307,
    // connectionLimit: 5,
    // waitForConnections: true,
});


pool.on('connection', function (connection) {
      connection.query('SET SESSION auto_increment_increment=1')
    console.log('connection')
});
pool.on('enqueue', function () {
      console.log('Waiting for available connection slot');
});
pool.query('SELECT 1 AS sln', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
exports.pool = pool;