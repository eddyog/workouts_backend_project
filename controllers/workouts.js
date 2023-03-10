const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('workouts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const workoutId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('workouts').find({ _id: workoutId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
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
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  const workoutId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
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
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('workouts').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createWorkout
  // updateContact,
  // deleteContact
};
