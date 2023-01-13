const express = require('express')
const router = express.Router()

const stripe = require('stripe')('sk_test_51MPF6BGMgQtLI79Vke2qA5psRAQL3uChje6RF3xAyCQgkZd5tOMP9NoHaMdvNy9rgQg5xQYF1xV36P26HyUgIKmf005sjvEhQZ');

const Product = require('../models/productSchema')

router.post('/checkout', async (req, res) => {
  const { cart } = req.body
  console.log(cart)

  let lineItems = []

  // line_item: {
//       price_data: {
//         currency: 'usd', 
//         product_data: {
//         name: "name", 
//         images: ["src"]
//       }, 
//       unit_amount: price * 100,
//      }, 
//       quantity: 2
//  }

  for (const item of cart) {
    console.log(item)
    const { id, quantity } = item
    let product = await Product.findById({_id: id})
    console.log(product)
    const { name, price, imageOne } = product

    const lineItem = {
      price_data: {
        currency: 'usd', 
        product_data: {
          name: name,
          images: [imageOne]
        },
        unit_amount: price * 100
      },
      quantity: quantity
    }

    lineItems.push(lineItem)


  }

  console.log(lineItems)

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems, 
    mode: 'payment', 
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel'
  })

  res.json({ "url": session.url })

})

module.exports = router