const cloudinary = require("cloudinary").v2;
require('dotenv').config({path: __dirname + '*/**/.env'});

//console.log(process.env.CLOUDINARY_KEY, __dirname)
cloudinary.config({
  cloud_name: 'ddu6qxlpy',
  api_key: '633878313745772',
  api_secret: 'hSeciRWSeYzda3-T9-adPNKiElE',
});

module.exports = cloudinary; 
