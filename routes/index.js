const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/workouts', require('./workouts'));

module.exports = router;