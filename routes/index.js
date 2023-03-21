const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/workouts', require('./workouts'));

const { requiresAuth } = require('express-openid-connect');


const app = express();

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


module.exports = router;