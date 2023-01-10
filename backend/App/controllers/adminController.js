const conn = require('../database/connection').pool;
const bcrypt = require('bcrypt');

const saltRounds = 10;

function AdminRegister(req, res){
    conn.getConnection((err, connection)=>{
        const { name, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const type = 2;

        connection.query("SELECT email FROM users WHERE email = ?", [email], (err, result) => {
            if (err) throw err;
            if (result.length > 0){
                return {msg: "This Email Has Already Been Used"};
            } else {
                connection.query("INSERT INTO users (name, email, user_password, type) VALUES (?,?,?,?)", [name, email, hashedPassword, type] ,(err, userResult) => {
                    connection.release();
                    res.json({
                        msg: "Admin Created Successfully",
                    })
                }); 
            }
        });
    });
};


function DashboardInfo(req, res){
    conn.getConnection((err, connection)=>{
        const playerssCountQuery = `SELECT COUNT(*) AS count FROM players`;
        const gamesCountQuery = `SELECT COUNT(*) AS count FROM games`;
        const competitionsCountQuery = `SELECT COUNT(*) AS count FROM competitions`;
        const organizersCountQuery = `SELECT COUNT(*) AS count FROM organizers`;
        const diamondsCountQuery = `SELECT SUM(diamonds) AS count FROM players`;


        connection.query(playerssCountQuery, (err, presult) => {
            connection.query(gamesCountQuery, (err, gresult) => {
                connection.query(competitionsCountQuery, (err, cresult) => {
                    connection.query(organizersCountQuery, (err, oresult) => {
                        connection.query(diamondsCountQuery, (err, dresult) => {
                            connection.release();
                            const results = {
                                players: presult[0].count,
                                games: gresult[0].count,
                                competitons: cresult[0].count,
                                organizers: oresult[0].count,
                                diamonds: dresult[0].count,
                            };
                            res.json(results);
                        });
                    });
                });
            });
        });
    });
}


function TopRankedGames(req, res){
    conn.getConnection((err, connection)=>{
        const query = `SELECT *, (SELECT COUNT(*) FROM competitions WHERE competitions.game_id = games.id) AS comps FROM games ORDER BY comps DESC LIMIT 7`;
        connection.query(query, (err, result) => {
            connection.release();
            res.json(result);
        });
    });
}


function TopRecentCompetitions(req, res){
    conn.getConnection((err, connection)=>{
        //const query = `SELECT c.*, (SELECT count(*) FROM players_competitions pc WHERE c.id = pc.competition_id) FROM competitions c`;
        const query = `SELECT * FROM competitions ORDER BY competition_date DESC LIMIT 7 `;
        connection.query(query, (err, result) => {
            connection.release();
            res.json(result);
        });
    });
}

function GiveTokens(req, res){
    const user = req.params.user_id;
    const {golds, diamonds} = req.body
    console.log(req.body)
    conn.getConnection((err, connection) => {
        const query = `UPDATE players SET golds = ?, diamonds = ? WHERE user_id = ?`
        connection.query(query,[golds, diamonds, user], (err, result) => {
            connection.release()
            if(err) throw err
            res.json({success: true, msg: 'balance updated successfully'})
        })
    })
}

module.exports.AdminRegister = AdminRegister;
module.exports.DashboardInfo = DashboardInfo;
module.exports.TopRankedGames = TopRankedGames;
module.exports.TopRecentCompetitions = TopRecentCompetitions;
module.exports.GiveTokens = GiveTokens;

