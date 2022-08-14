const conn = require('../database/connection').pool;


function CreateCompetition(req, res){

    if (!req.files || Object.keys(req.files).length === 0){
        return res.json({msg: 'No File Is Here'});
    }


    try {
        const {name, description, maxPlayers, golds, diamonds, date, game, organizer, location, status} = req.body;
        const file = req.files.icon;
        const icon = file.name;
        const competition = {
            game_id: game,
            name: name,
            description: description,
            max_players: maxPlayers,
            price_gold: golds,
            price_diamond: diamonds,
            // Icon
            icon: icon,
            location: location,
            competition_status: status,
            organizer_id: organizer,
            competition_date: date
        };

        var uploadDir = './assets/competitions/' + icon;
        file.mv(uploadDir);
        
        conn.getConnection((err, connection) => {
            connection.query('INSERT INTO competitions SET ?', competition, (err, result) => {
                connection.release();
                res.json({
                    msg: 'data has been inserted successfully',
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
}

function UpdateCompetition(req, res){

    const id = req.params.id;

    try {
        const {name, description, maxPlayers, golds, diamonds, date, game, organizer, location, status} = req.body;

        if (req.files && Object.keys(req.files).length !== 0){

            const file = req.files.icon;
            var uploadDir = './assets/competitions/' + file.name;
            file.mv(uploadDir);

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
                        competition_date = ?,
                    WHERE id = ?`;
                connection.query(query, [game, name, description, maxPlayers, golds, diamonds, file.name, location, status, organizer, date, id], (err, result) => {
                    connection.release();
                    res.json({
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
                        competition_date = ?,
                    WHERE id = ?`;
                connection.query(query, [game, name, description, maxPlayers, golds, diamonds, location, status, organizer, date, id], (err, result) => {
                    connection.release();
                    res.json({
                        msg: 'Data has been updated successfully',
                    });
                });
            });
        }
    } catch (error) {
        console.log(error);
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
    const limit = 10;
    const page = req.query.page;
    const offset = (page - 1) * limit;

    const game_id = req.query.game_id;

    let paginatedGamesQuery;

    if(game_id !== undefined && game_id !==''){
        paginatedGamesQuery = "SELECT c.*, (SELECT count(*) FROM players_competitions WHERE c.id = players_competitions.competition_id) AS players FROM competitions c WHERE c.game_id =" + game_id + " LIMIT " + limit + " OFFSET " + offset;
    } else {
        paginatedGamesQuery = "SELECT c.*, (SELECT count(*) FROM players_competitions WHERE c.id = players_competitions.competition_id) AS players FROM competitions c LIMIT " + limit + " OFFSET " + offset;
    }

    const countQuery = 'SELECT COUNT(*) AS count FROM competitions';
    conn.getConnection((err, connection) => {
        connection.query(paginatedGamesQuery, function (error, results) {
            connection.query(countQuery, function (err, countResult){
                connection.release();
                if (error) throw error;
                var jsonResult = {
                    'pages': Math.ceil(countResult[0].count/limit),
                    'current_number': page,
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
    const query = 'SELECT c.*, g.name as game_name FROM competitions c LEFT OUTER JOIN games g ON c.game_id = g.id WHERE c.event = ? AND c.competition_status = ? ORDER BY c.competition_status DESC LIMIT 10';
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
        SELECT c.*, g.name as game_name
        FROM competitions c LEFT OUTER JOIN games g ON c.game_id = g.id 
        WHERE c.id=? LIMIT 1
    `;

    conn.getConnection((err, connection) => {
        connection.query(compQquery, id, (err, result) => {
            connection.release();
            res.json(result[0]);
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
        SELECT p.profile_image, u.name, p.id as player_id, u.id as user_id
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

        const query = `SELECT c.* FROM players_competitions pc
            INNER JOIN competitions c WHERE pc.player_id = ?
        `;

        connection.query(query, player_id, (err, result) => {
            connection.release();
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