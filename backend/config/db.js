const mongoose = require("mongoose");

const mongoURL = process.env.MONGOURL;

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Database connected successfully");
});

db.on("error", (err) => {
    console.log("Database connection error:", err);
});

db.on("disconnected", () => {
    console.log("Database disconnected");
});

module.exports = db;