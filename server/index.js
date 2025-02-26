const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const regModel = require("./regModel/regModel.js");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/authForm", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  regModel
    .findOne({ email: email })
    // Check if user exists
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });
      // Check if password matches
      if (user.password !== password)
        return res.status(401).json({ message: "Incorrect password" });
      res.json({ message: "Logged in successfully" });
    })
    // If user doesn't exist or password is incorrect
    .catch((error) => res.status(500).json(error));
});

app.post("/register", (req, res) => {
  regModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
