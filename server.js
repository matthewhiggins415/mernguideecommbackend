const express = require('express')
const mongoose = require('mongoose')
const color = require('colors')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require("dotenv");
const auth = require('./lib/auth')

// get our routes
const productRoutes = require('./routes/productRoutes')
const stripeRoutes = require('./routes/stripeRoutes')
const userRoutes = require('./routes/userRoutes')

dotenv.config();

//connect to database 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true
    })
    console.log(`Mongo Connected: ${conn.connection.host}`.cyan.underline)
  } catch(error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
  }
}

mongoose.set('strictQuery', true);

connectDB()

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: `here's process.env.NODE_ENV: ${process.env.NODE_ENV}` })
})

app.use(auth)
app.use(productRoutes)
app.use(stripeRoutes)
app.use(userRoutes)

let port = process.env.PORT || 5000

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold))
