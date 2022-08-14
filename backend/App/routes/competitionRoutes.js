const express = require('express');
const competitionRoute = express.Router();
const competitionController = require('../controllers/CompetitionController');
const {checkAuthToken} = require('./../services/jwt');


competitionRoute.post('/create', competitionController.CreateCompetition);
competitionRoute.post('/update/:id', competitionController.UpdateCompetition);
competitionRoute.get('/delete/:id', competitionController.DeleteCompetition);
competitionRoute.get('/all', competitionController.GetCompetitions);
competitionRoute.get('/recent', competitionController.GetTopAndRecentCompetitions);
competitionRoute.get('/auth/:player_id', checkAuthToken, competitionController.GetAuthCompetitions);
competitionRoute.get('/:id', competitionController.GetCompetition);
competitionRoute.get('/admin/:id', competitionController.GetCompetitionAdmin);
competitionRoute.post('/validate', competitionController.ValidateCompetition);



module.exports = competitionRoute;