const express = require('express');
const gameRoutes = express.Router();
const gameController = require('../controllers/GameController');


gameRoutes.get('/all', gameController.GetGames);
gameRoutes.get('/paginate', gameController.GetGamesPaginate);
gameRoutes.post('/create', gameController.CreateGame);
gameRoutes.post('/update/:id', gameController.UpdateGame);
gameRoutes.get('/delete/:id', gameController.DeleteGame);
gameRoutes.get('/top', gameController.GetTopGames);
gameRoutes.get('/admin/:id', gameController.GetGameAdmin);




module.exports = gameRoutes;