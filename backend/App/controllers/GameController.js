const conn = require('../database/connection').pool;
const path = require('path');
const cloudinary = require('../utils/cloudinary')


async function CreateGame(req, res){

    if (!req.file || Object.keys(req.file).length === 0){
        return res.json({msg: 'No File Is Here'});
    }
    const {name, description, status} = req.body;
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
    const game = {
        name: name,
        description: description,
        game_status: status,
        icon: picture,
    };
    conn.getConnection((err, connection) => {
        connection.query('INSERT INTO games SET ?', game, (err, result) => {
            connection.release();
            res.json({
                game,
                msg: 'data has been inserted successfully',
            });
        });
    });
}

async function UpdateGame(req, res){
    
    const {name, description, status} = req.body;
    const id = req.params.id;
    let picture
    try {
        if (req.file){
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'egor',
                use_filename: true
            });
            picture = result.secure_url;

            conn.getConnection((err, connection) => {
                const query = `UPDATE games SET name = ?, description = ?, icon = ?, game_status = ?  WHERE id = ?`
                connection.query(query, [name, description, picture, status, id], (err, result) => {
                    connection.release();
                    res.json({
                        msg: 'Data has been updated successfully',
                    });
                });
            });
        } else {
            conn.getConnection((err, connection) => {
                const query = `UPDATE games SET name = ?, description = ?, game_status = ?  WHERE id = ?`
                connection.query(query, [name, description, status, id], (err, result) => {
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

function GetGames(req, res){
    conn.getConnection((err, connection) => {
        connection.query('SELECT *, (SELECT count(*) FROM competitions c WHERE c.game_id = g.id) AS competitions FROM games g', (err, result) => {
            connection.release();
            res.json({
                msg: 'Get All Data ...',
                games: result,
            });
        });
    });
}

function GetGamesPaginate(req, res){
    const limit = 10;
    const page = req.query.page;
    const offset = (page - 1) * limit;
    const paginatedGamesQuery = "SELECT g.*, (SELECT count(*) FROM competitions c WHERE c.game_id = g.id) AS comps FROM games g LIMIT " + limit + " OFFSET " + offset;
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

function DeleteGame(req, res){
    const id = req.params.id;
    conn.getConnection((err, connection) => {
        connection.query('DELETE FROM games WHERE id = ?', id, (err, result) => {
            connection.release();
            res.json({
                msg: 'data has been deleted successfully',
            });
        });
    });
}

function GetTopGames(req, res){
    const active = 2;
    const soon = 1;
    conn.getConnection((err, connection) => {
        const query = "SELECT g.*, (SELECT count(*) FROM competitions c WHERE c.game_id = g.id) AS comps FROM games g Where game_status IN (?, ?) LIMIT 8";

        connection.query(query, [active, soon], (err, result) => {
            connection.release();
            res.json(result);
        });
    });
}

function GetGameAdmin(req, res){
    const id = req.params.id;
    conn.getConnection((err, connection) => {

        const gameQuery = `
            SELECT * FROM games WHERE id = ?
        `;

        const competitionsQuery = `
            SELECT c.name, c.icon
            FROM competitions c JOIN games g ON c.game_id = g.id
            WHERE c.game_id = ?
        `;

        connection.query(gameQuery, id, (err, gameResult) => {
            connection.query(competitionsQuery, id, (err, compResult) => {
                connection.release();
                res.json({
                    game: gameResult[0],
                    competitions: compResult,
                });
            });
        });
    });
}

module.exports.CreateGame = CreateGame;
module.exports.UpdateGame = UpdateGame;
module.exports.GetGames = GetGames;
module.exports.GetGamesPaginate = GetGamesPaginate;
module.exports.DeleteGame = DeleteGame;
module.exports.GetTopGames = GetTopGames;
module.exports.GetGameAdmin = GetGameAdmin;