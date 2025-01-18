require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Auth = require("./router/Auth");
const Users = require("./router/User");

const DB_URL =process.env.DB_URL
const PORT = process.env.PORT||5000


app.use(express.json());
app.use(cors());

// Add the leading "/" to the API path
app.use("/api/auth", Auth);
app.use("/api", Users);

mongoose.connect(DB_URL)
  .then(res => console.log("connected db"))
  .catch(err => console.error("Error connecting to DB:", err));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
