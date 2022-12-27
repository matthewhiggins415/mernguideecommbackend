const express = require('express')
const mongoose = require('mongoose')
const color = require('colors')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require("dotenv");

dotenv.config();


const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: `here's process.env.NODE_ENV: ${process.env.NODE_ENV}` })
})

let port = process.env.PORT || 5000

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold))
