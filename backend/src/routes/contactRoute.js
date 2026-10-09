const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

router.get('/', contactController.getAll)
router.get('/:id', contactController.getById)
router.post('/', contactController.create)
router.delete('/:id', contactController.remove)

module.exports = router