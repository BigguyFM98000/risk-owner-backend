const express = require('express');
const RiskownerController = require('../controllers/risk_owner_controller');
const router = express.Router();

router.get('/', RiskownerController.findAll);
router.get('/:id', RiskownerController.findOne);
router.post('/', RiskownerController.create);
router.put('/:id', RiskownerController.update);
router.delete('/:id', RiskownerController.destroy);

module.exports = router;