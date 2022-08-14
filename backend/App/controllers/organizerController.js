const conn = require('../database/connection').pool;
const bcrypt = require('bcrypt');

const saltRounds = 10;

function OrganizerRegister(req, res){
    conn.getConnection((err, connection)=>{
        const { name, email, password, bio } = req.body;
        const type = 1;
        let profileImage = 'defaultOrganizerProfile.png';
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        if (req.files && Object.keys(req.files).length > 0){
            const file = req.files.profile;
            profileImage = file.name;
            var uploadDir = './assets/profiles/' + profileImage;
            file.mv(uploadDir);
        }

        connection.query("SELECT email FROM users WHERE email = ?", [email], (err, result) => {
            if (err) throw err;
            if (result.length > 0){
                return {msg: "This Email Has Already Been Used"};
            } else {
                connection.query("INSERT INTO users (name, email, user_password, type) VALUES (?,?,?,?)", [name, email, hashedPassword, type] ,(err, userResult) => {
                    connection.query("INSERT INTO organizers (user_id, profile_image, bio) VALUES (?,?,?)", [userResult.insertId, profileImage, bio] ,(err, result) => {
                        connection.release();
                        res.send('User Has Register Successfully');
                    }); 
                }); 
            }
        });
    });
};

function OrganizerAll(req, res){
    const query = "SELECT o.*, u.name, u.email, u.id AS user_id FROM organizers o JOIN users u ON u.id = o.user_id";
    conn.getConnection((err, connection) => {
        // we need to join the table user(type 1) with organizers *later*
        connection.query(query, function (error, results) {
                connection.release();
                if (error) throw error;
                var jsonResult = {
                    'organizers':results,
                }
                res.json(jsonResult);
            });
    });
}

function OrganizerAllPaginate(req, res){

    const limit = 20;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const paginatedOrganizersQuery = "SELECT o.*, u.name, u.email, u.id AS user_id FROM organizers o  JOIN users u ON u.id = o.user_id LIMIT " + limit + " OFFSET " + offset;
    const countQuery = 'SELECT COUNT(*) AS count FROM organizers';

    conn.getConnection((err, connection) => {
        // we need to join the table user(type 1) with organizers *later*
        connection.query(paginatedOrganizersQuery, function (error, results) {
            connection.query(countQuery, function (err, countResult){
                connection.release();
                if (error) throw error;
                var jsonResult = {
                    'pages': Math.ceil(countResult[0].count/limit),
                    'current_number':page,
                    'organizers':results,
                }
                res.json(jsonResult);
            });
        });
    });
}

function GetOrganizer(req, res) {
    const id = req.params.id;
    const query = "SELECT o.*, u.name, u.email FROM organizers o JOIN users u ON u.id = o.user_id WHERE o.id = ? ";
    conn.getConnection((err, connection) => {
        // we need to join the table user(type 1) with organizers *later*
        connection.query(query, id, function (error, result) {
                connection.release();
                if (error) throw error;
                res.json(result[0]);
            });
    });

}

module.exports.OrganizerRegister = OrganizerRegister;
module.exports.OrganizerAllPaginate = OrganizerAllPaginate;
module.exports.OrganizerAll = OrganizerAll;
module.exports.GetOrganizer = GetOrganizer;