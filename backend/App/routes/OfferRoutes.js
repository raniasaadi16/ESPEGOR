const express = require('express');
const offerRoutes = express.Router();
const offerController = require('../controllers/OfferController');


offerRoutes.get('/all', offerController.GetOffers);
offerRoutes.post('/create', offerController.CreateOffer);
offerRoutes.post('/update/:id', offerController.UpdateOffer);
offerRoutes.get('/delete/:id', offerController.DeleteOffer);



module.exports = offerRoutes;