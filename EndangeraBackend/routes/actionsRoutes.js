const express = require('express');
const router = express.Router();
const actionsController = require('../controllers/actionsController');

// Route to fetch all actions
router.get('/', actionsController.getAllActions);

// Route to add a new action
router.post('/', actionsController.addAction);

// Route to update an action by ID
router.put('/:id', actionsController.updateAction);

// Route to delete an action by ID
router.delete('/:id', actionsController.deleteAction);

module.exports = router;
