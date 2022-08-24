const express = require('express');
const gameRoutes = express.Router();
const gameController = require('../controllers/GameController');
const upload = require('../utils/uploadPhotos')

gameRoutes.get('/all', gameController.GetGames);
gameRoutes.get('/paginate', gameController.GetGamesPaginate);
gameRoutes.post('/create',upload, gameController.CreateGame);
gameRoutes.post('/update/:id',upload , gameController.UpdateGame);
gameRoutes.get('/delete/:id', gameController.DeleteGame);
gameRoutes.get('/top', gameController.GetTopGames);
gameRoutes.get('/admin/:id', gameController.GetGameAdmin);




module.exports = gameRoutes;