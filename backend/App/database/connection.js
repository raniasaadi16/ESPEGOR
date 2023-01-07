const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + './../../.env' });


const pool = mysql.createPool({
    host:'db-mysql-fra1-59892-do-user-13026201-0.b.db.ondigitalocean.com',
    database: 'egor',
    user: 'egor',
    password: 'AVNS_-0v-XDvwIb1rU0P8392',
    port: 25060,
    // host: 'localhost',
    // database: 'egor',
    // user: 'root',
    // password: '',
    // port: 3307,
    connectionLimit: 30,
});

pool.on('release', function (connection) {
      console.log('Connection %d released', connection.threadId);
    });
// pool.on('connection', function (connection) {
//       connection.query('SET SESSION auto_increment_increment=1')
//     console.log('connection')
// });
pool.on('enqueue', function () {
      console.log('Waiting for available connection slot');
});

pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
  });
// function keepAlive() { 
//     pool.getConnection(function(err, connection){
//       if(err) { console.error('mysql keepAlive err', err); return; }
//       console.log('ping db')
//       connection.ping();     // this is what you want
//       connection.release();
//     });
//   }
//   setInterval(keepAlive, 60000); 


exports.pool = pool;