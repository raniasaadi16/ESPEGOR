const conn = require('../database/connection').pool;
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary')

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
    const saveUser = {
        name, 
        email,
        user_password: hashedPassword,
        phone
    }
    console.log(saveUser)
    conn.getConnection((err, connection) => {
        connection.query("SELECT email FROM users WHERE email = ?", [email], (err, result) => {
            if (err) return res.json({msg: 'something went very wrong'});
            if (result.length > 0){
                return res.json({msg: "This Email Has Already Been Used"});
            } else {
                connection.query("INSERT INTO users SET ?", saveUser ,(err, userResult) => {
                    console.log('err',err)
                    console.log(userResult)
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
