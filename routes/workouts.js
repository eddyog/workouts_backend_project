const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/workouts');
const validation = require('../middleware/validate');

router.get('/', workoutController.getAll);

router.get('/:id', workoutController.getSingle);

// router.post('/', workoutController.createWorkout);
router.post('/', validation.saveWorkout, workoutController.createWorkout);

// router.put('/:id', workoutController.updateContact);
router.put('/:id', validation.saveWorkout, workoutController.updateWorkout);

router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;
