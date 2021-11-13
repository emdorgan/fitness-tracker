//all dependencies

const express = require("express");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();
const Workout = require('./models/workoutModel.js')

//Middleware
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// tells the app to use the public directory for client-side html/css/js
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(require("./routes/api.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  