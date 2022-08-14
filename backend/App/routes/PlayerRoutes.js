const express = require('express');
const playerRoutes = express.Router();
const playerController = require('../controllers/playerController');
const { CheckPlayer } = require('../middlewares/Player_middleware');
const { checkAuthToken } = require('../services/jwt');


playerRoutes.post('/register', playerController.PlayerRegister);
playerRoutes.get('/all', playerController.PlayerAll);
playerRoutes.get('/delete/:id', playerController.PlayerDelete);
playerRoutes.get('/join/:player_id/:competition_id', [checkAuthToken, CheckPlayer], playerController.PlayerJoin);
playerRoutes.get('/check/:player_id/:competition_id', checkAuthToken, playerController.IsAlreadyJoined);
playerRoutes.get('/profile', checkAuthToken, playerController.GetPlayerInfo);
playerRoutes.post('/change/picture', checkAuthToken, playerController.ChangeProfilePicture);
playerRoutes.get('/balance', checkAuthToken, playerController.GetPlayerBalance);
playerRoutes.post('/change/password', checkAuthToken, playerController.EditPassword);
playerRoutes.post('/change/infos', checkAuthToken, playerController.EditInfos);
playerRoutes.get('/auth', checkAuthToken, playerController.GetAuthPlayer);
playerRoutes.get('/admin/:id', checkAuthToken, playerController.GetPlayerAdmin);

module.exports = playerRoutes;