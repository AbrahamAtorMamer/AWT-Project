const express = require('express');
const router = express.Router();
const fundingController = require('./funding.controller');

// Define routes
router.post('/', fundingController.create);
router.get('/:id', fundingController.getById);
router.put('/:id', fundingController.update);
router.get('/', fundingController.getAll);
router.delete('/:id', fundingController.delete);

module.exports = router;
