const conn = require('../database/connection').pool;
const bcrypt = require('bcrypt');
const jwtFuncs = require('../services/jwt');
const jwt = require('jsonwebtoken');


function Login(req, res){
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ?";
    conn.getConnection((err, connection) => {
        connection.query(query, [email], (err, result) => {
            if (err) throw err;
            if (result.length > 0){

                const db_password = result[0].user_password;

                const checkPassword = bcrypt.compareSync(password, db_password);

                if (checkPassword){
                    // auth successfully
                    const token = jwtFuncs.createAuthToken(result[0]);
                    res.send({
                        logged: true,
                        msg: 'log in successfully',
                        type: result[0].type,
                        token: token,
                    });
                } else {
                    res.send({
                        logged: false,
                        msg: 'Password Incorrect!',
                    });
                }
            } else {
                res.send({
                    logged: false,
                    msg: 'Email Incorrect!',
                });
            }
        });
    });
}

function GetUserType(req, res){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (typeof token === 'undefined' || token == null){
        return res.send({
            auth: false,
            msg: 'User Must Be Redirected To Login Page',
        });
    }

    jwt.verify(token, process.env.APP_SECRET_TOKEN, (err, use) => {
        if (err){
            return res.send({err: true, msg: "must be a valide token"});
        } 
        return res.json(use);
    });
}

function GetAuthUser(req, res){
    const user = req.user;

    conn.getConnection((err, connection) => {
        const query = 'SELECT * FROM users JOIN players ON players.user_id = users.id WHERE users.id = ?';
        connection.query(query, user.id, (err, result) => {
            connection.release();
            res.json({
                data: result[0],
                msg: 'success',
                type: result[0] ? result[0].type : 8,
                isAuth: true
            });
        });
    });
        
}

module.exports.Login = Login;
module.exports.GetUserType = GetUserType;
module.exports.GetAuthUser = GetAuthUser;