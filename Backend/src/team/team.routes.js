const express = require('express');
const router = express.Router();
const teamController = require('./team.controller');

// Define routes
router.post('/', teamController.create);
router.get('/:id', teamController.getById);
router.put('/:id', teamController.update);
router.get('/', teamController.getAll);
router.delete('/:id', teamController.delete);

module.exports = router;
