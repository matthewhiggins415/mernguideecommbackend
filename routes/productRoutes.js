const express = require('express')
const router = express.Router()

const Product = require('../models/productSchema')

// create
router.post('/product', async (req, res, next) => {
  try {
    let newProduct = await Product.create({})
    res.json({ newProduct })
  } catch(error) {
    console.error(`Error msg: ${error.message}`)
  }
})

// get all products 
router.get('/products', async (req, res, next) => {
  try {
    let products = await Product.find()
    res.json({ products })
  } catch(error) {
    console.error(`Error msg: ${error.message}`)
  }
})

// get a single product 
router.get('/products/:id', async (req, res, next) => {
  let id = req.params.id
  try {
    let product = await Product.findById(id)
    res.json({ product })
  } catch(error) {
    console.error(`Error msg: ${error.message}`)
  }
})

// update 

// delete 

module.exports = router