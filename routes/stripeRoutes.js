const express = require('express')
const router = express.Router()

const stripe = require('stripe')('sk_test_51MPF6BGMgQtLI79Vke2qA5psRAQL3uChje6RF3xAyCQgkZd5tOMP9NoHaMdvNy9rgQg5xQYF1xV36P26HyUgIKmf005sjvEhQZ');

const Product = require('../models/productSchema')

router.post('/checkout', async (req, res) => {
  const { cart } = req.body
  console.log(cart)

  let lineItems = []

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
    payment_method_types: ['card'],
    shipping_address_collection: {allowed_countries: ['US', 'CA']},
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: 500, currency: 'usd'},
          display_name: '$5 shipping',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      },
    ],
    line_items: lineItems, 
    mode: 'payment', 
    success_url: "http://localhost:3000/order/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: 'http://localhost:3000/cancel'
  })

  res.json({ "url": session.url })
})

router.get('/order/success', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const listItems = await stripe.checkout.sessions.listLineItems(req.query.session_id)
  
  const shippingDetails = session.shipping_details
  const customerDetails = session.customer_details
  const orderDetails = listItems.data
  
  res.json({
    shippingDetails: shippingDetails,
    customerDetails: customerDetails,
    orderDetails: orderDetails
  })
});

module.exports = router