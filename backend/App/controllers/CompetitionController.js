const conn = require('../database/connection').pool;
const cloudinary = require('../utils/cloudinary')


async function CreateCompetition(req, res){

    if (!req.file){
        return res.json({msg: 'No File Is Here'});
    }

    let picture
    try {
        const {name, description, maxPlayers, golds, diamonds, date, game, organizer, location, status} = req.body;
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'egor',
                use_filename: true
            });
            picture = result.secure_url;
        }
        const competition = {
            game_id: game,
            name: name,
            description: description,
            max_players: maxPlayers,
            price_gold: golds,
            price_diamond: diamonds,
            // Icon
            icon: picture,
            location: location,
            competition_status: status,
            organizer_id: organizer,
            competition_date: date
        };
        
        conn.getConnection((err, connection) => {
            connection.query('INSERT INTO competitions SET ?', competition, (err, result) => {
                connection.release();
                console.log(result, err)
                res.json({
                    success: true,
                    msg: 'data has been inserted successfully',
                });
            });
        });
    } catch (error) {
        res.json({msg: 'something went very wrong'})
    }
}

async function UpdateCompetition(req, res){

    const id = req.params.id;

    try {
        const {name, description, maxPlayers, golds, diamonds, date, game, organizer, location, status} = req.body;

        if (req.file){
            let picture
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'egor',
                use_filename: true
            });
            picture = result.secure_url;

            conn.getConnection((err, connection) => {
                const query = `UPDATE competitions SET 
                        game_id = ?,
                        name = ?,
                        description = ?, 
                        max_players = ?,
                        price_gold = ?,
                        price_diamond = ?,
                        icon = ?, 
                        location = ?,
                        competition_status = ?,
                        organizer_id = ?,
                        competition_date = ?
                    WHERE id = ?`;
                connection.query(query, [game, name, description, maxPlayers, golds, diamonds, picture, location, status, organizer, date, id], (err, result) => {
                    connection.release();
                    console.log(err)
                    res.json({
                        success: true,
                        msg: 'Data has been updated successfully',
                    });
                });
            });
        } else {
            conn.getConnection((err, connection) => {
                const query = `UPDATE competitions SET 
                        game_id = ?,
                        name = ?,
                        description = ?, 
                        max_players = ?,
                        price_gold = ?,
                        price_diamond = ?,
                        location = ?,
                        competition_status = ?,
                        organizer_id = ?,
                        competition_date = ?
                    WHERE id = ?`;
                connection.query(query, [game, name, description, maxPlayers, golds, diamonds, location, status, organizer, date, id], (err, result) => {
                    connection.release();
                    console.log(err)
                    res.json({
                        success: true,
                        msg: 'Data has been updated successfully',
                    });
                });
            });
        }
    } catch (error) {
        res.json({msg: 'something went very wrong'})
    }
}

function ValidateCompetition(req, res){
    const limit = 10;
    const page = req.query.page;
    const offset = (page - 1) * limit;
    const paginatedGamesQuery = "SELECT * FROM games LIMIT " + limit + " OFFSET " + offset;
    const countQuery = 'SELECT COUNT(*) AS count FROM games';

    conn.getConnection((err, connection) => {
        connection.query(paginatedGamesQuery, function (error, results) {
            connection.query(countQuery, function (err, countResult){
                connection.release();
                if (error) throw error;
                var jsonResult = {
                    'pages': Math.ceil(countResult[0].count/limit),
                    'current_number':page,
                    'games':results,
                }
                res.json(jsonResult);
            });
        });
    });
}

function GetCompetitions(req, res){
    // const limit = 10;
    // const page = req.query.page;
    // const offset = (page - 1) * limit;

    const game_id = req.query.game_id;

    let paginatedGamesQuery;

    if(game_id !== undefined && game_id !==''){
        // paginatedGamesQuery = "SELECT c.*, (SELECT count(*) FROM players_competitions WHERE c.id = players_competitions.competition_id)AS players, org.name as organizer FROM competitions c JOIN (SELECT name , organizers.id FROM organizers JOIN users ON users.id = organizers.user_id) AS org ON org.id = c.organizer_id WHERE c.game_id =" + game_id + " LIMIT " + limit + " OFFSET " + offset;
        paginatedGamesQuery = "SELECT c.*, (SELECT count(*) FROM players_competitions WHERE c.id = players_competitions.competition_id)AS players, org.name as organizer FROM competitions c JOIN (SELECT name , organizers.id FROM organizers JOIN users ON users.id = organizers.user_id) AS org ON org.id = c.organizer_id WHERE c.game_id =" + game_id ;
    } else {
        // paginatedGamesQuery = "SELECT c.*, org.name as organizer, (SELECT count(*) FROM players_competitions WHERE c.id = players_competitions.competition_id) AS players FROM competitions c  JOIN (SELECT name , organizers.id FROM users JOIN organizers ON users.id = organizers.user_id) AS org ON org.id = c.organizer_id LIMIT " + limit + " OFFSET " + offset;
        paginatedGamesQuery = "SELECT c.*, org.name as organizer, (SELECT count(*) FROM players_competitions WHERE c.id = players_competitions.competition_id) AS players FROM competitions c  JOIN (SELECT name , organizers.id FROM users JOIN organizers ON users.id = organizers.user_id) AS org ON org.id = c.organizer_id";
    }

    const countQuery = 'SELECT COUNT(*) AS count FROM competitions';
    conn.getConnection((err, connection) => {
        connection.query(paginatedGamesQuery, function (error, results) {
            connection.query(countQuery, function (err, countResult){
                connection.release();
                if (error) throw error;
                var jsonResult = {
                    // 'pages': Math.ceil(countResult[0].count/limit),
                    // 'current_number': page,
                    'competitions':results,
                }
                res.json(jsonResult);
            });
        });
    });
}

function DeleteCompetition(req, res){
    const id = req.params.id;
    conn.getConnection((err, connection) => {
        connection.query('DELETE FROM competitions WHERE id = ?', id, (err, result) => {
            connection.release();
            res.json({
                msg: 'data has been deleted successfully',
            });
        });
    });
}

function GetTopAndRecentCompetitions(req, res){
    const event = 0;
    const accepted = 2;
    const query = 'SELECT c.*, g.name as game_name, org.name as organizer FROM competitions c LEFT OUTER JOIN games g ON c.game_id = g.id JOIN (SELECT name, organizers.id as orgId FROM organizers JOIN users On users.id = organizers.user_id) AS org ON org.orgId = c.organizer_id WHERE c.event = ? AND c.competition_status = ? ORDER BY c.competition_status DESC LIMIT 10';
    conn.getConnection((err, connection) => {
        connection.query(query, [event, accepted], (err, result) => {
            connection.release();
            res.json(result);
        });
    });
}

function GetCompetition(req, res) {
    const id = req.params.id;

    const compQquery = `
        SELECT c.*, g.name as game_name, org.name as organizer
        FROM competitions c LEFT OUTER JOIN games g ON c.game_id = g.id JOIN (SELECT name, organizers.id as orgId FROM users JOIN organizers ON organizers.user_id = users.id) AS org ON org.orgId = c.organizer_id
        WHERE c.id= ? LIMIT 1
    `;

    conn.getConnection((err, connection) => {
        connection.query(compQquery, id, (err, result) => {
            connection.query('SELECT COUNT(*) AS players FROM players_competitions WHERE competition_id = ?', id, (err, resl)=> {
                connection.release();
                result[0].player_joined = resl[0].players
                res.json(result[0]);
            })
        });
    });
}

function GetCompetitionAdmin(req, res) {
    const id = req.params.id;

    const compQquery = `
        SELECT c.*, g.name as game_name
        FROM competitions c LEFT OUTER JOIN games g ON c.game_id = g.id 
        WHERE c.id=? LIMIT 1
    `;

    const playersQuery = `
        SELECT p.profile_image,u.phone, u.name, u.email, p.id as player_id, u.id as user_id
        FROM players_competitions pc JOIN players p ON pc.player_id = p.id JOIN users u ON u.id = p.user_id
        WHERE pc.competition_id = ? 
    `;


    conn.getConnection((err, connection) => {
        connection.query(compQquery, id, (err, compResult) => {
            connection.query(playersQuery, id, (err, playersResult) => {
                connection.release();
                res.json({
                    competition: compResult[0], 
                    players: playersResult,
                });
            });
        });
    });
}

function GetAuthCompetitions(req, res){

    const player_id = req.params.player_id;
    
    conn.getConnection((err, connection) => {

        const query = `SELECT c.*, org.name as organizer FROM players_competitions pc
        INNER JOIN competitions c ON pc.competition_id = c.id JOIN (SELECT name, organizers.id as orgId FROM organizers JOIN users WHERE users.id = organizers.user_id) AS org ON org.orgId = c.organizer_id WHERE pc.player_id = ?
        `;

        connection.query(query, player_id, (err, result) => {
            connection.release();
            console.log(result)
            res.json(result);
        });
    });
}



module.exports.CreateCompetition = CreateCompetition;
module.exports.UpdateCompetition = UpdateCompetition;
module.exports.DeleteCompetition = DeleteCompetition;
module.exports.ValidateCompetition = ValidateCompetition;
module.exports.GetCompetitions = GetCompetitions;
module.exports.GetTopAndRecentCompetitions = GetTopAndRecentCompetitions;
module.exports.GetCompetition = GetCompetition;
module.exports.GetCompetitionAdmin = GetCompetitionAdmin;
module.exports.GetAuthCompetitions = GetAuthCompetitions;