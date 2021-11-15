const router = require("express").Router();
const {Workout, Exercise} = require("../models");



// POST route that creates a new workout
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
      });
})

// GET route that sorts the workouts created and grabs the last one created
router.get("/api/workouts", (req, res) => {
    Workout.find({})
    .sort({ day: 1 })
    .populate("exercises") 
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

module.exports = router;