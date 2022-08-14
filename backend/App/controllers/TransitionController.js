const conn = require('../database/connection').pool;

function CreateTransiiton(req, res){

    const isPlayer = req.user.type === 0;

    if (!isPlayer){
        const msg = 'You Are Not a Gamer You Cannot Buy Tokens';
        return res.json(msg);
    }

    conn.getConnection((err, connection) => {
        // get data then post it
        if (req.files && Object.keys(req.files).length > 0){
            const file = req.files.photo;
            const photo = file.name;
            var uploadDir = './assets/transitions/' + photo;
            file.mv(uploadDir);

            const {offer_id, price, golds, diamonds} = req.body;
            const user_id = req.user.id;

            const transition = {
                user_id,
                offer_id: parseInt(offer_id), 
                price: parseInt(price), 
                golds: parseInt(golds), 
                diamonds: parseInt(diamonds), 
                photo,
            };

            const transitionquery = 'INSERT INTO transitions SET ?';
            connection.query(transitionquery, transition, (err, result) => {
                connection.release();
                res.json({
                    msg: 'data has been inserted successfully',
                });
            });
        } else {
            return res.json({
                msg: "You Have To Upload An Image"
            });
        }
    });
}

function CheckTransition(req, res){
    const {status} = req.body;
    const id = req.params.id;

    // one is rejected two is accepted
    // 1 ====> reject
    // 2 ====> accept

    conn.getConnection((err, connection) => {
        connection.query('UPDATE transitions SET status=? where id=?', [status, id] ,(err, result) => {
            connection.release();
            res.json({
                msg: 'data has been updated successfully',
            });
        });
    });
}

function DeleteTransition(req, res){
    const id = req.params.id;
    conn.getConnection((err, connection) => {
        connection.query('DELETE FROM transitions where id=?', id, (err, result) => {
            connection.release();
            res.json({
                msg: 'data has been deleted successfully',
            });
        });
    });
}

function GetTransitionsType(req, res){
    conn.getConnection((err, connection) => {

        const {status} = req.body;

        const limit = 15;
        // page number
        const page = req.query.page;
        // calculate offset
        const offset = (page - 1) * limit;
        // query for fetching data with page number and offset
        const paginatedTransitionsQuery = "SELECT * FROM transitions WHERE status=? LIMIT " + limit + " OFFSET " + offset;
        const countQuery = `SELECT COUNT(*) AS count FROM transitions WHERE status=${status}`;

        connection.query(paginatedTransitionsQuery, status, (err, result) => {
            connection.query(countQuery, function (err, countResult){
                connection.release();
                if (err) throw err;
                var jsonResult = {
                    'pages': Math.ceil(countResult[0].count/limit),
                    'current_number':page,
                    'transitions':result,
                }
                res.json(jsonResult);
            });
        });
    });
}

function GetAuthTransitions(req, res){
    conn.getConnection((err, connection) => {
        const id = req.user.id;
        connection.query('SELECT t.*, o.name FROM transitions t LEFT JOIN offers o ON o.id = t.offer_id where t.user_id=?', id, (err, result) => {
            connection.release();
            res.json({
                transitions: result,
            });
        });
    });
}

module.exports.CreateTransiiton = CreateTransiiton;
module.exports.CheckTransition = CheckTransition;
module.exports.DeleteTransition = DeleteTransition;
module.exports.GetTransitionsType = GetTransitionsType;
module.exports.GetAuthTransitions = GetAuthTransitions;