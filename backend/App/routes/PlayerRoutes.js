const express = require('express');
const playerRoutes = express.Router();
const playerController = require('../controllers/playerController');
const { CheckPlayer } = require('../middlewares/Player_middleware');
const { checkAuthToken } = require('../services/jwt');
const upload = require('../utils/uploadPhotos')


playerRoutes.post('/register',upload,  playerController.PlayerRegister);
playerRoutes.post('/register/google',  playerController.PlayerRegisterG);
playerRoutes.post('/register/fb',  playerController.PlayerRegisterFB);
// playerRoutes.get('/register/discord/get',  playerController.PlayerRegisterDiscordGet);
playerRoutes.post('/register/discord',  playerController.PlayerRegisterDiscord);
playerRoutes.get('/register/tiktok',  playerController.PlayerRegisterTiktok);
playerRoutes.get('/all', playerController.PlayerAll);
playerRoutes.get('/delete/:id', playerController.PlayerDelete);
playerRoutes.get('/join/:player_id/:competition_id', [checkAuthToken, CheckPlayer], playerController.PlayerJoin);
playerRoutes.get('/check/:player_id/:competition_id', checkAuthToken, playerController.IsAlreadyJoined);
playerRoutes.get('/profile', checkAuthToken, playerController.GetPlayerInfo);
playerRoutes.post('/change/picture',upload, checkAuthToken, playerController.ChangeProfilePicture);
playerRoutes.get('/balance', checkAuthToken, playerController.GetPlayerBalance);
playerRoutes.post('/change/password', checkAuthToken, playerController.EditPassword);
playerRoutes.post('/change/infos', checkAuthToken, playerController.EditInfos);
playerRoutes.get('/auth', checkAuthToken, playerController.GetAuthPlayer);
playerRoutes.get('/admin/:id', checkAuthToken, playerController.GetPlayerAdmin);


module.exports = playerRoutes;