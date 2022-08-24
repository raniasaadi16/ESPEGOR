const express = require('express');
const offerRoutes = express.Router();
const offerController = require('../controllers/OfferController');
const upload = require('../utils/uploadPhotos')

offerRoutes.get('/all', offerController.GetOffers);
offerRoutes.post('/create', upload, offerController.CreateOffer);
offerRoutes.post('/update/:id', offerController.UpdateOffer);
offerRoutes.get('/delete/:id', offerController.DeleteOffer);



module.exports = offerRoutes;