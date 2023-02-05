const express = require('express')
const router = express.Router()
const passport = require('passport')

const Product = require('../models/productSchema')

const requireToken = passport.authenticate('bearer', { session: false })


// create
router.post('/product', requireToken, async (req, res, next) => {
  try {
    let newProduct = await Product.create({})
    let products = await Product.find()
    res.json({ products: products })
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
router.patch('/products/:id', requireToken, async (req, res, next) => {
  console.log(req.body)
  const { imageOne, imageTwo, imageThree, imageFour, name, description, price } = req.body
  let id = req.params.id
  
  try {
    let product = await Product.findById(id)
  
    if (name) {
      product.name = name
    }
  
    if (price) {
      product.price = price
    }
  
    if (imageOne) {
      product.imageOne = imageOne
    }
  
    if (imageTwo) {
      product.imageTwo = imageTwo
    }
  
    if (imageThree) {
      product.imageThree = imageThree
    }
  
    if (imageFour) {
      product.imageFour = imageFour
    }
  
    if (price) {
      product.price = price
    }
    
    if (description) {
      product.description = description
    }
  
    let newProduct = await product.save()
    let products = await Product.find()
    res.json({ products: products })
  } catch (error) {
    console.error(`Error msg: ${error.message}`)
  }
})

// delete 
router.delete('/products/:id', requireToken, async (req, res, next) => {
  let id = req.params.id

  try {
    await Product.findByIdAndDelete(id)
    let products = await Product.find()
    res.json({ products: products })
  } catch (error) {
    console.error(`Error msg: ${error.message}`)
  }
})



module.exports = router