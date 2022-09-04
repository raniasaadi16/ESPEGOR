const conn = require('../database/connection').pool;
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary')
const { OAuth2Client } = require('google-auth-library')
const dotenv = require('dotenv')
dotenv.config({path: '.env'});
const jwtFuncs = require('../services/jwt');
const fetch = require('node-fetch')
const { URLSearchParams } = require('url'); // import URLSearchParams from url. You can also use form-data (const FormData = require('form-data');).
const client = new OAuth2Client(process.env.GOOGLE_AUTH_API)
const btoa = require('btoa');
const { get, post } = require('snekfetch');
const formData = require("form-data")

async function PlayerRegister (req, res){
    const { name, email, password, bio, phone } = req.body;
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    let picture
    try{
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'egor',
                use_filename: true
            });
            picture = result.secure_url;
        }
    }catch(err){
        console.log(err)
    }
    conn.getConnection((err, connection) => {

        connection.query("SELECT email FROM users WHERE email = ?", [email], (err, result) => {
            if (err) throw err;
            if (result.length > 0){
                return {msg: "This Email Has Already Been Used"};
            } else {
                const saveUser = {
                    name, 
                    email,
                    user_password: hashedPassword,
                    phone
                }
                connection.query("INSERT INTO users SET ?", saveUser ,(err, userResult) => {
                    connection.query("INSERT INTO players (user_id, profile_image, bio) VALUES (?,?,?)", [userResult.insertId, picture, bio] ,(err, result) => {
                        connection.release();
                        res.json({
                            logged: true,
                            msg: 'User Has Register Successfully',
                            password: hashedPassword,
                        });
                    }); 
                }); 
            }
        });
    });
}

async function PlayerRegisterG (req, res){
    const { tokenId} = req.body
    let user
    const response = await client.verifyIdToken({idToken : tokenId, audience: process.env.GOOGLE_AUTH_API})
    const { email, given_name, family_name, picture, email_verified } = response.payload
    if(!email_verified) return res.json({msg: 'auth failed'})
  
    const hashedPassword = bcrypt.hashSync(process.env.SECRET, 10);
    user = {
        name: `${given_name} ${family_name}`,
        user_password: hashedPassword,
        email: email,
        oauth : true,
        oauthtype : 'google'
    }
    if(!user.email) return re.json({msg: 'something went very wrong'})   

    conn.getConnection((err, connection) => {
        connection.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if(err) return res.json({msg: 'error'})
            if(result.length > 0){
                if(!result[0].oauth) return res.json({msg: 'please login with your email and password'})
                if(result[0].oauthtype !== 'google') return res.json({msg: `this user use ${result[0].oauthtype} to athenticate`})
                const token = jwtFuncs.createAuthToken(result[0]);
                    res.send({
                        logged: true,
                        msg: 'log in successfully',
                        type: result[0].type,
                        token: token,
                    });
            }else{
                connection.query("INSERT INTO users SET ?", user ,(err, userResult) => {
                    connection.query("INSERT INTO players (user_id, profile_image) VALUES (?,?)", [userResult.insertId, picture] ,(err, result) => {
                        connection.release();
                        const user = {id : userResult.insertId}
                        const token = jwtFuncs.createAuthToken(user);
                        res.send({
                            logged: true,
                            msg: 'log in successfully',
                            type: 0,
                            token: token,
                        });
                    }); 
                });
            }

        })
        
    });
}

async function PlayerRegisterFB (req, res){
    const { accessToken, userID} = req.body
    let user
    const response = await fetch(`https://graph.facebook.com/v2.11/${userID}?fields=email,first_name,last_name,picture&access_token=${accessToken}`, {
        method: 'GET'
    })
    if(!response.ok) return res.json({msg: 'something went very wrong'})
    const { first_name, last_name, email, picture } = await response.json()
  
    const hashedPassword = bcrypt.hashSync(process.env.SECRET, 10);
    user = {
        name: `${first_name} ${last_name}`,
        user_password: hashedPassword,
        email: email,
        oauth : true,
        oauthtype : 'fb'
    }
    conn.getConnection((err, connection) => {
        connection.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if(err) return res.json({msg: 'error'})
            if(result.length > 0){
                if(!result[0].oauth) return res.json({msg: 'please login with your email and password'})
                if(result[0].oauthtype !== 'fb') return res.json({msg: `this user use ${result[0].oauthtype} to athenticate`})
                const token = jwtFuncs.createAuthToken(result[0]);
                    res.send({
                        logged: true,
                        msg: 'log in successfully',
                        type: result[0].type,
                        token: token,
                    });
            }else{
                connection.query("INSERT INTO users SET ?", user ,(err, userResult) => {
                    connection.query("INSERT INTO players (user_id, profile_image) VALUES (?,?)", [userResult.insertId, picture.data.url] ,(err, result) => {
                        connection.release();
                        const user = {id : userResult.insertId}
                        const token = jwtFuncs.createAuthToken(user);
                        res.send({
                            logged: true,
                            msg: 'log in successfully',
                            type: 0,
                            token: token,
                        });
                    }); 
                });
            }

        })
        
    });
}


function PlayerRegisterTiktok (req, res){
    const csrfState = Math.random().toString(36).substring(2);
    let url = 'https://www.tiktok.com/auth/authorize/';

    url += '?client_key=aw04cjmdo7dcxkjg';
    url += '&scope=user.info.basic,video.list';
    url += '&response_type=code';
    url += '&redirect_uri='+ process.env.TIKTOK_URI;
    url += '&state=' + csrfState;

    res.redirect(url);
}

// function PlayerRegisterDiscordGet (req, res){
//     res.redirect([
//         'https://discordapp.com/oauth2/authorize',
//         `?client_id=${process.env.DISCORD_CLIENT}`,
//         '&scope=identify+email',
//         '&response_type=code',
//         `&callback_uri=${process.env.DISCORD_URI}`
//       ].join(''));
// }

async function PlayerRegisterDiscord (req, res){ 
    const code = req.body.code
    if(!code) return res.json({msg: 'err'})
    const data = new formData();
    data.append("client_id", process.env.DISCORD_CLIENT)
    data.append("client_secret", process.env.DISCORD_SECRET)
    data.append("grant_type", "authorization_code")
    data.append("redirect_uri", process.env.DISCORD_URI)
    data.append("scope",'identify email')
    data.append("code",code)

    const tokenGet =  await fetch("https://discordapp.com/api/oauth2/token",{
        method: 'POST',
        body: data
    })
    const tokenResponse = await tokenGet.json()
    const userGet = await fetch("https://discordapp.com/api/users/@me",{
        method: 'GET',
        headers:{
          authorization: `${tokenResponse.token_type} ${tokenResponse.access_token}`
        }
    })
    let user;
    const { username, avatar, email } = await userGet.json()
    const hashedPassword = bcrypt.hashSync(process.env.SECRET, 10);
    user = {
        name: username,
        user_password: hashedPassword,
        email: email,
        oauth : true,
        oauthtype : 'discord'
    }
    if(!user.email) return res.json({msg: 'something went very wrong!'})
    conn.getConnection((err, connection) => {
        connection.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if(err) return res.json({msg: 'error'})
            if(result.length > 0){
                if(!result[0].oauth) return res.json({msg: 'please login with your email and password'})
                if(result[0].oauthtype !== 'discord') return res.json({msg: `this user use ${result[0].oauthtype} to athenticate`})
                const token = jwtFuncs.createAuthToken(result[0]);
                    res.send({
                        logged: true,
                        msg: 'log in successfully',
                        type: result[0].type,
                        token: token,
                    });
            }else{
                connection.query("INSERT INTO users SET ?", user ,(err, userResult) => {
                    connection.query("INSERT INTO players (user_id, profile_image) VALUES (?,?)", [userResult.insertId, avatar? avatar : 'https://res.cloudinary.com/ddu6qxlpy/image/upload/v1627168233/iafh6yj3q0bdpthswtu3.jpg'] ,(err, result) => {
                        connection.release();
                        const user = {id : userResult.insertId}
                        const token = jwtFuncs.createAuthToken(user);
                        res.send({
                            logged: true,
                            msg: 'log in successfully',
                            type: 0,
                            token: token,
                        });
                    }); 
                });
            }

        })
        
    });
};


function PlayerAll(req, res){

    const limit = 20;
    // page number
    const page = req.query.page;
    // calculate offset
    const offset = (page - 1) * limit;
    // query for fetching data with page number and offset
    const paginatedPlayersQuery = `
        SELECT p.*, u.name, u.email, u.id AS user_id , (SELECT count(*) FROM players_competitions pc WHERE p.id = pc.player_id) AS comps
        FROM players p JOIN users u ON u.id = p.user_id 
        LIMIT ${limit} OFFSET ${offset}`;

    const countQuery = 'SELECT COUNT(*) AS count FROM players';

    conn.getConnection((err, connection) => {
        // we need to join the table user(type 0) with player *later*
        connection.query(paginatedPlayersQuery, function (error, results) {
            connection.query(countQuery, function (err, countResult){
                connection.release();
                if (error) throw error;
                var jsonResult = {
                    'pages': Math.ceil(countResult[0].count/limit),
                    'current_number':page,
                    'players':results,
                }
                res.json(jsonResult);
            });
        });
    });
}

function PlayerDelete(req, res){
    const id = req.params.id;
    const deletePlayersQuery = `DELETE FROM users WHERE id=?`;
    conn.getConnection((err, connection) => {
        connection.query(deletePlayersQuery, id, function (error, results) {
            connection.release();
            if (error) throw error;
            var jsonResult = {
                msg: "Player Has Been Deleted Successfully",
            }
            res.json(jsonResult);
        });
    });

}

function PlayerJoin(req, res){


    const player_id = req.params.player_id;
    const competition_id = req.params.competition_id;
 
    conn.getConnection((err, connection) => {

        const playerQuery = 'SELECT * FROM players WHERE id=?';
        const competitionQuery = 'SELECT * FROM competitions WHERE id=?';

        connection.query(playerQuery, player_id, function (error, presult) {
            connection.query(competitionQuery, competition_id, function (err, cresult){
                if (presult[0].diamonds >= cresult[0].price_diamond && presult[0].golds >= cresult[0].price_gold){
                    if (!IsFullCompetition(cresult[0].id, cresult[0].max_players)){
                        // logic here 
                        connection.query('INSERT INTO players_competitions VALUES (?, ?)', [player_id, competition_id], function(err, res){
                            console.log(err)
                        });
                        const reduceQuery = `UPDATE players p SET p.diamonds = p.diamonds - ${cresult[0].price_diamond}, p.golds = p.golds - ${cresult[0].price_gold} WHERE p.id = ?`;
                        connection.query(reduceQuery, player_id);
                        connection.release();
                        res.json({
                            join: true,
                            message: "You Joined Successfully",
                        });
                    } else {
                        res.json({
                            join: false,
                            message: "This Competition is Already Full We Are Very Sorry!",
                        });
                    }
                } else {
                    res.json({
                        join: false,
                        message: "You Don't Have Enough Tokens To Join This Competition You Need To Charge Some Tokens Before You Try Again",
                    });
                }

            });
        });
    });
}

function IsAlreadyJoined(req, res){

    const player_id = req.params.player_id;
    const competition_id = req.params.competition_id;

    conn.getConnection((err, connection) => {
        const query = 'SELECT 1 FROM players_competitions WHERE player_id = ? AND competition_id = ?'
        connection.query(query, [player_id, competition_id], function (error, results) {
            connection.release();
            if (error) throw error;
            res.json(results);
        });
    });
}

function IsFullCompetition(id, max){
    conn.getConnection((err, connection) => {
        const competitionQuery = 'SELECT COUNT(*) AS players FROM players_competitions WHERE competition_id=?';
        connection.query(competitionQuery, id, function (error, result) {
            connection.release();
            if(result[0].players > max){
                return false;
            } else {
                return true;
            }
        });
    });
}

function GetPlayerInfo(req, res){
    const user  = req.user;

    conn.getConnection((err, connection) => {

        const getUserQuery =`SELECT p.*, u.name, u.phone, u.email, u.id AS user_id,
            (SELECT count(*) FROM players_competitions pc WHERE p.id = pc.player_id) AS comps
            FROM players p JOIN users u ON u.id = p.user_id
            WHERE u.id = ?`;

        connection.query(getUserQuery, user.id, function (error, results) {
            connection.release();
            if (error) throw error;
            res.json(results[0]);
        });
    });
}

async function ChangeProfilePicture(req, res){
    const user  = req.user;
    if (req.file){
        let picture
        try{
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'egor',
                use_filename: true
            });
            picture = result.secure_url;
            conn.getConnection((err, connection) => {
                const profilePictureQuery =`UPDATE players SET profile_image = ? WHERE user_id = ?`;
                connection.query(profilePictureQuery, [picture, user.id], function (error, results) {
                    connection.release();
                    if (error) throw error;
                    res.json({
                        msg: 'Profile has been changed successfully',
                        picture: profileImage,
                    });
                });
            });
        }catch(err){
            console.log(err)
        }
    } else {
        return res.json('no file was uploaded');
    }
}

function GetPlayerBalance (req, res){
    const user  = req.user;

    conn.getConnection((err, connection) => {

        const getUserQuery =`SELECT p.golds, p.diamonds 
            FROM players p JOIN users u ON u.id = p.user_id
            WHERE u.id = ?`;

        connection.query(getUserQuery, user.id, function (error, results) {
            connection.release();
            if (error) throw error;
            res.json({
                golds: results[0].golds,
                diamonds: results[0].diamonds,
            });
        });
    });
}


function GetAuthPlayer(req, res){

    const user = req.user;

    conn.getConnection((err, connection) => {
        const query = 'SELECT * FROM players WHERE user_id = ?'
        connection.query(query, user.id, function (error, results) {
            connection.release();
            if (error) throw error;
            res.json(results[0]);
        });
    });
}

function GetPlayerAdmin (req, res) {
    const id = req.params.id;
    conn.getConnection((err, connection) => {

        const playerQuery = `
            SELECT *
            FROM players p JOIN users u ON u.id = p.user_id
            WHERE p.id = ?
        `;

        const competitionsQuery = `
            SELECT c.name, c.icon
            FROM competitions c JOIN players_competitions pc ON c.id = pc.competition_id JOIN players p ON pc.player_id = p.id
            WHERE pc.player_id = ?
        `;


        connection.query(playerQuery, id, function (error, playerResult) {
            connection.query(competitionsQuery, id, function (error, compsResult) {
                connection.release();
                res.json({
                    player: playerResult[0],
                    competitions: compsResult,
                });
            });
        });
    });
}

function EditPassword (req, res) {
    const user = req.user;
    conn.getConnection((err, connection) => {

        const playerQuery = `
            SELECT * FROM users WHERE id = ?
        `;

        const {oldPassword, newPassword} = req.body;

        connection.query(playerQuery, user.id, function (error, playerResult) {
            const isCorrect = bcrypt.compareSync(oldPassword, playerResult[0].user_password);
            
            if (isCorrect === true){

                const hashedPassword = bcrypt.hashSync(newPassword, 10);

                const query = `
                    UPDATE users 
                    SET user_password = ?
                    WHERE id = ?
                `;

                connection.query(query, [hashedPassword, user.id], function (error, results) {
                    connection.release();
                    return res.json({ 
                        isCorrect: isCorrect,
                        msg: 'Password Changed',
                    });
                });
            } else {
                return res.json({ 
                    isCorrect: isCorrect,
                    msg: "Password Inccorect",
                });
            }
        });
    });
}

function EditInfos (req, res) {
    const user = req.user;
    conn.getConnection((err, connection) => {

        const {name, desc} = req.body;

        if (name.length > 2){

            const query1 = `
                UPDATE users 
                SET name = ?
                WHERE id = ?
            `;

            const query2 = `
                UPDATE players
                SET bio = ?
                WHERE user_id = ?
            `;

            connection.query(query1, [name, user.id]);
            connection.query(query2, [desc, user.id]);

            return res.json({ 
                isValid: true,
                msg: 'Data Has Been Changed',
            });
        } else {
            return res.json({ 
                isValid: false,
                msg: "Name Must Be At Least 3 Characters",
            });
        }
    });
}

module.exports.PlayerRegister = PlayerRegister;
module.exports.PlayerRegisterG = PlayerRegisterG;
module.exports.PlayerRegisterFB = PlayerRegisterFB;
module.exports.PlayerRegisterDiscord = PlayerRegisterDiscord;
// module.exports.PlayerRegisterDiscordGet = PlayerRegisterDiscordGet;
module.exports.PlayerRegisterTiktok = PlayerRegisterTiktok;
module.exports.PlayerAll = PlayerAll;
module.exports.PlayerDelete = PlayerDelete;
module.exports.PlayerJoin = PlayerJoin;
module.exports.IsAlreadyJoined = IsAlreadyJoined;
module.exports.GetPlayerInfo = GetPlayerInfo;
module.exports.ChangeProfilePicture = ChangeProfilePicture;
module.exports.GetPlayerBalance = GetPlayerBalance;
module.exports.GetAuthPlayer = GetAuthPlayer;
module.exports.GetPlayerAdmin = GetPlayerAdmin;
module.exports.EditPassword = EditPassword;
module.exports.EditInfos = EditInfos;
