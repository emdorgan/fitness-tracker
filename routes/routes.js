const router = require("express").Router();
const {Workout, Exercise} = require("../models");
var path = require("path");

//HTML routes

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
})

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
})

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
   
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: '$exercises.duration'}
            }
        }
    ])
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

//GET route that gets all workouts within a given time range
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: '$exercises.duration'},
            }
        }
    ])
    .sort({_id: -1})
    .limit(7)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
})

module.exports = router;