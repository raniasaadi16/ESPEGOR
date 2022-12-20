const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({path: __dirname + './../../.env'});


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
    // port:3307
});


// function pool ()
//     {
//         return new Promise((resolve, reject) => {
//             let pool = mysql.createPool({
//                 host:'dbaas-db-3227774-do-user-13026201-0.b.db.ondigitalocean.com',
//                 database: 'egor',
//                 user: 'doadmin',
//                 password: 'AVNS_OIr5Ksa0leWStmwmDJd',
//                 port: 25060
//             });

//             pool.getConnection((err, con) =>
//             {
//                 try
//                 {
//                     if (con)
//                     {
//                         con.release();
//                         resolve({"status":"success", "data":"MySQL connected.", "con":pool});
//                     }
//                 }
//                 catch (err)
//                 {
//                     reject({"status":"failed", "error":`MySQL error. ${err}`});
//                 }
//                 resolve({"status":"failed", "error":"Error connecting to MySQL."});
//             });
//         });
//     }

    exports.pool = pool;