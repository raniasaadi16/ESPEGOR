const conn = require('../database/connection').pool;
const cloudinary = require('../utils/cloudinary')

async function CreateTransiiton(req, res){

    const isPlayer = req.user.type === 0;

    if (!isPlayer){
        const msg = 'You Are Not a Gamer You Cannot Buy Tokens';
        return res.json({msg});
    }
    const {offer_id, price, golds, diamonds} = req.body;
    const user_id = req.user.id;
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
        return res.json({msg: 'Error sending the picture please check your internet connetion or try again'})
    }
    if(!picture){
        return res.json({msg: 'Please insert a picture'})
    }
    const transition = {
        user_id,
        offer_id: parseInt(offer_id), 
        price: parseInt(price), 
        golds: parseInt(golds), 
        diamonds: parseInt(diamonds), 
        photo: picture,
    };
    const transitionquery = 'INSERT INTO transitions SET ?';
    conn.getConnection((err, connection) => {
        // get data then post it      
            connection.query(transitionquery, transition, (err, result) => {
                connection.release();
                res.json({
                    transition,
                    msg: 'data has been inserted successfully',
                });
            });
    });
}

function CheckTransition(req, res){
    const {status} = req.body;
    const id = req.params.id;
    const user  = req.params.user;
    // one is rejected two is accepted
    // 1 ====> reject
    // 2 ====> accept
    const updateBalanceQuery =`UPDATE players p JOIN (SELECT SUM(golds) golds_s , SUM(diamonds) diamonds_s, user_id FROM transitions WHERE status = 2 GROUP BY user_id) t ON p.user_id = t.user_id SET p.golds = golds_s, p.diamonds = diamonds_s WHERE p.user_id = ?`;
    console.log(status, user)
    if(status === 2 && user){
        conn.getConnection((err, connection) => {
            connection.query('UPDATE transitions SET status=? where id=? ', [status, id] ,(err, result) => {
                connection.query(updateBalanceQuery, user ,(err, upresult) => {
                    connection.release();
                    console.log('balance')
                    res.json({
                        msg: 'data has been updated successfully',
                    });
                });

            });
        });    
    }else{
        conn.getConnection((err, connection) => {
            connection.query('UPDATE transitions SET status=? where id=? ', [status, id] ,(err, result) => {
                connection.release();
                console.log('no balance')
                res.json({
                    msg: 'data has been updated successfully',
                });
            });
        });
    }
}

function UpdatePlayerBalance (req, res){
    const user  = req.params.user;

    conn.getConnection((err, connection) => {

        const updateBalanceQuery =`UPDATE players p JOIN (SELECT SUM(golds) golds_s , SUM(diamonds) diamonds_s, user_id FROM transitions WHERE status = 2 GROUP BY user_id) t ON p.user_id = t.user_id SET p.golds = golds_s, p.diamonds = diamonds_s WHERE p.user_id = ?`;

        connection.query(updateBalanceQuery, user, function (error, results) {
            connection.release();
            if (error) throw error;
            console.log(results)
            res.json({
                msg: 'balance updated succussfully'
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
        const paginatedTransitionsQuery = "SELECT users.name, offers.name offer_name, transitions.id, transitions.price,transitions.user_id, transitions.photo FROM transitions JOIN users ON users.id = transitions.user_id JOIN offers ON transitions.offer_id = offers.id WHERE status= ? LIMIT " + limit + " OFFSET " + offset;
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
        console.log(id)
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
module.exports.UpdatePlayerBalance = UpdatePlayerBalance;
