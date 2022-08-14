const express = require('express');
const transitionRoute = express.Router();
const transitionController = require('../controllers/TransitionController');
const {checkAuthToken} = require('./../services/jwt');

transitionRoute.post('/create', checkAuthToken, transitionController.CreateTransiiton);
transitionRoute.get('/delete/:id', transitionController.DeleteTransition);
transitionRoute.get('/auth', checkAuthToken, transitionController.GetAuthTransitions);
transitionRoute.post('/type', transitionController.GetTransitionsType);
transitionRoute.post('/check/:id', transitionController.CheckTransition);


module.exports = transitionRoute;