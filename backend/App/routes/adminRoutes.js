const express = require('express');
const adminRoutes = express.Router();
const adminController = require('../controllers/adminController');


adminRoutes.post('/register', adminController.AdminRegister);
adminRoutes.get('/dashboard', adminController.DashboardInfo);
adminRoutes.get('/dashboard/games', adminController.TopRankedGames);
adminRoutes.get('/dashboard/competitions', adminController.TopRecentCompetitions);
adminRoutes.post('/givetokens/:user_id', adminController.GiveTokens);


module.exports = adminRoutes;