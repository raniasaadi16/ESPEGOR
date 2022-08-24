const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv');

dotenv.config({path: __dirname + './../../.env'});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRERT,
});

module.exports = cloudinary; 