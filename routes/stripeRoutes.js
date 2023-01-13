const express = require('express')
const router = express.Router()

const stripe = require('stripe')('pk_test_51MPF6BGMgQtLI79Vs1hM0pOZClykWig8rLLlhsEkv8IkQ26GBCCVPWW91wbkTqefhk8dDkwRdCA3JtIzIXjCGn6x00OACyHmWr')

const Product = require('../models/productSchema')

router.post('/checkout', async (req, res) => {
  const { cart } = req.body
  console.log(cart)
})

module.exports = router