const conn = require('../database/connection').pool;
const cloudinary = require('../utils/cloudinary')
async function CreateOffer(req, res){
    const {name, description, oldPrice, newPrice, golds, diamonds} = req.body;
    let picture
    console.log(req.file)
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
    const offer = {
        name: name,
        description: description,
        old_price: oldPrice,
        new_price: newPrice,
        gold_amount: golds,
        diamonds_amount: diamonds,
        picture: picture
    };

    conn.getConnection((err, connection) => {
        connection.query('INSERT INTO offers SET ?', offer, (err, result) => {
            connection.release();
            res.json({
                msg: 'data has been inserted successfully',
            });
        });
    });
}

function UpdateOffer(req, res){
    const id = req.params.id;
    const {name, description, oldPrice, newPrice, golds, diamonds} = req.body;

    conn.getConnection((err, connection) => {
        const query = 'UPDATE offers SET name = ?, description = ?, old_price = ?, new_price = ?, gold_amount = ?, diamonds_amount = ?  WHERE id = ?'
        
        connection.query(query, [name, description, oldPrice, newPrice, golds, diamonds, id], (err, result) => {
            connection.release();
            res.json({
                msg: 'data has been updated successfully',
            });
        });
    });
}

function GetOffers(req, res){
    conn.getConnection((err, connection) => {
        connection.query('SELECT * FROM offers', (err, result) => {
            connection.release();
            res.json({
                msg: 'Get All Data ...',
                offers: result,
            });
        });
    });
}

function DeleteOffer(req, res){
    const id = req.params.id;
    conn.getConnection((err, connection) => {
        connection.query('DELETE FROM offers WHERE id = ?', id, (err, result) => {
            connection.release();
            res.json({
                msg: 'data has been deleted successfully',
            });
        });
    });
}




module.exports.CreateOffer = CreateOffer;
module.exports.UpdateOffer = UpdateOffer;
module.exports.GetOffers = GetOffers;
module.exports.DeleteOffer = DeleteOffer;