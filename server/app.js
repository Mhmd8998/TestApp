require('dotenv').config();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");



const Auth = require("./router/Auth");
const Users = require("./router/User");
const bodyParser = require('body-parser');
const DB_URL =process.env.DB_URL
const PORT = process.env.PORT||5000



const uploadsDir = path.join(__dirname, 'images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// جعل مجلد "uploads" متاحًا للوصول عبر HTTP
app.use('/images', express.static(uploadsDir)); // <-- تقديم الملفات من مجلد "uploads"


app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); 

// Add the leading "/" to the API path
app.use("/api/auth", Auth);
app.use("/api", Users);

mongoose.connect(DB_URL)
  .then(res => console.log("connected db"))
  .catch(err => console.error("Error connecting to DB:", err));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
