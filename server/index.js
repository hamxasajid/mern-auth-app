const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const regModel = require("./regModel/regModel.js");
const bcrypt = require("bcrypt"); // Import bcrypt

// Connect to MongoDB
const db = mongoose
  .connect("mongodb://127.0.0.1:27017/authForm")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await regModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({ message: "Logged in successfully" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  regModel.findOne({ email: email }).then((user) => {
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err)
        return res.status(500).json({ message: "Error hashing password" });

      // Create new user
      const newUser = new regModel({ name, email, password: hash });
      newUser
        .save()
        .then(() => res.json({ message: "User registered successfully" }))
        .catch((error) => res.status(500).json(error));
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
