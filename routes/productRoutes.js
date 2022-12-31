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
router.patch('/products/:id', async (req, res, next) => {
  let data = req.body.product
  let id = req.params.id
  
  try {
    let product = await Product.findById(id)
  
    if (data.name) {
      product.name = data.name
    }
  
    if (data.price) {
      product.price = data.price
    }
  
    if (data.imageOne) {
      product.imageOne = data.imageOne
    }
  
    if (data.imageTwo) {
      product.imageTwo = data.imageTwo
    }
  
    if (data.imageThree) {
      product.imageThree = data.imageThree
    }
  
    if (data.imageFour) {
      product.imageFour = data.imageFour
    }
  
    if (data.price) {
      product.price = data.price
    }
    
    if (data.decription) {
      product.decription = data.decription
    }
  
    let newProduct = await product.save()
  
    res.json({ newProduct })
  } catch (error) {
    console.error(`Error msg: ${error.message}`)
  }
})

// delete 
router.delete('/products/:id', async (req, res, next) => {
  let id = req.params.id

  try {
    await Product.findByIdAndDelete(id)
    let products = await Product.find()
    res.json({ products })
  } catch (error) {
    console.error(`Error msg: ${error.message}`)
  }
})



module.exports = router