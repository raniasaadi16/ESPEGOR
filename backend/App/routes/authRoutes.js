const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController');
const { checkAuthToken } = require('../services/jwt');


authRoutes.post('/signin', authController.Login);
authRoutes.get('/get/auth/user', checkAuthToken, authController.GetAuthUser);


module.exports = authRoutes;