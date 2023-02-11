const express = require('express')
const router = express.Router()
const dotenv = require("dotenv");

dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_KEY);

const Product = require('../models/productSchema')

router.post('/checkout', async (req, res) => {

  let host = req.get("host")
  console.log("host:", host)

  let apiUrl 

  const apiUrls = {
    production: "https://gallacticcat.com", 
    development: "http://localhost:3000"
  }

  if (host === 'localhost:5000') {
    apiUrl = apiUrls.development
  } else {
    apiUrl = apiUrls.production
  }
  const { cart } = req.body

  let lineItems = []

  for (const item of cart) {
    const { id, quantity } = item
    let product = await Product.findById({_id: id})
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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {allowed_countries: ['US', 'CA']},
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: 400, currency: 'usd'},
          display_name: '$4 shipping',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      },
    ],
    line_items: lineItems, 
    mode: 'payment', 
    success_url: `${apiUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${apiUrl}/`
  })

  res.json({ "url": session.url })
})

router.get('/order/success', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const listItems = await stripe.checkout.sessions.listLineItems(req.query.session_id)
  
  console.log(session)

  const shippingDetails = session.shipping_details
  const customerDetails = session.customer_details
  const orderDetails = listItems.data
  
  res.json({
    shippingDetails: shippingDetails,
    customerDetails: customerDetails,
    orderDetails: orderDetails, 
    subTotal: session.amount_subtotal,
    total: session.amount_total,
    shippingCost: session.shipping_cost.amount_total
  })
});

module.exports = router