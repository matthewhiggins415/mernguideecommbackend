const express = require('express')
const router = express.Router()

const Product = require('../models/productSchema')

// create
router.post('/product', async (req, res, next) => {
  try {
    let newProduct = new Product()
    await newProduct.save()
    res.json({ product: newProduct })
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

// update 

// delete 

module.exports = router