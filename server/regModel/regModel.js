const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

module.exports = mongoose.model("regusers", regSchema);