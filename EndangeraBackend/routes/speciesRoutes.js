const express = require('express');
const router = express.Router();
const speciesController = require('../controllers/speciesController');

// Routes
router.get('/', speciesController.getAllSpecies);
router.get('/check', speciesController.checkSpecies);
router.post('/', speciesController.addSpecies);

module.exports = router;
