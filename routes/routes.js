const router = require("express").Router();
const {Workout, Exercise} = require("../models");
var path = require("path");



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

//PUT route that creates a new exercise (by updating a workout in progress)
router.put("/api/workouts/:id", (req, res) => {
    const id = req.params.id;
    Workout.findOneAndUpdate({_id: id}, {$push: {exercises: req.body}} )
    .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
})

module.exports = router;