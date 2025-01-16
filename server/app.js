const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Auth = require("./router/Auth");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://3b006998:ZYCMhfqBQkx1EY0I@cluster0.nsqut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(res => console.log("connected db"));

app.use("api/auth",Auth);


app.listen(3000,()=>{
  console.log("server is runing on port 3000");
});
