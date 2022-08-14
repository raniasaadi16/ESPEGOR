const express = require('express');
const organizerRoutes = express.Router();
const organizerController = require('../controllers/organizerController');


organizerRoutes.post('/register', organizerController.OrganizerRegister);
organizerRoutes.get('/all/paginate', organizerController.OrganizerAllPaginate);
organizerRoutes.get('/all', organizerController.OrganizerAll);
organizerRoutes.get('/:id', organizerController.GetOrganizer);



module.exports = organizerRoutes;