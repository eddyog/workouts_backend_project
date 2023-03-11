const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('workouts')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({
          message: err
        });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};


const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid workoout id to find a workout.');
  }
  const workoutId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('workouts')
    .find({
      _id: workoutId
    })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({
          message: err
        });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createWorkout = async (req, res) => {
  const workout = {
    name: req.body.name,
    muscle: req.body.muscle,
    type: req.body.type,
    times: req.body.times,
    days: req.body.days,
    sets: req.body.sets,
    explination: req.body.explination
  };
  const response = await mongodb.getDb().db().collection('workouts').insertOne(workout);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the workout.');
  }
};

const updateWorkout = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Workout id to update a workout.');
  }
  const workoutId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const workout = {
    name: req.body.name,
    muscle: req.body.muscle,
    type: req.body.type,
    times: req.body.times,
    days: req.body.days,
    sets: req.body.sets,
    explination: req.body.explination
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection('workouts')
    .replaceOne({ _id: workoutId }, workout);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the workout.');
  }
};

const deleteWorkout = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Workout id to delete a workout.');
  }
  const workoutId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('workouts').remove({ _id: workoutId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the workout.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createWorkout,
  updateWorkout,
  deleteWorkout
};
