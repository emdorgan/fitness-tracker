const router = require("express").Router();
const {Workout, Exercise} = require("../models");

// GET route that fetches the last workout


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

module.exports = router;