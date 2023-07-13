const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

const axios = require("axios");
const router = require("./controllers/Controll");
const cors = require("cors");
const { Modelproduct } = require("./model/model");

dotenv.config();

const app = express();

try {
  mongoose.connect(process.env.MONGODB_URL);
} catch (error) {
  console.log(error);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.listen(3000);
