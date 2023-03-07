const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/workouts');

router.get('/', workoutController.getAll);

router.get('/:id', workoutController.getSingle);

router.post('/', workoutController.createWorkout);

// router.put('/:id', workoutController.updateContact);

router.delete('/:id', workoutController.deleteContact);

module.exports = router;
