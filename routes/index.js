const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('ooklklkl')
})
router.use('/', require('./swagger'));
router.use('/workouts', require('./workouts'));

module.exports = router;