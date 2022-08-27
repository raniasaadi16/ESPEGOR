const cloudinary = require("cloudinary").v2;
require('dotenv').config({path: __dirname + '*/**/.env'});

//console.log(process.env.CLOUDINARY_KEY, __dirname)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRERT,
});

module.exports = cloudinary; 
