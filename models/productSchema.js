const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String, 
    required: true, 
    default: 'name'
  }, 
  imageOne: {
    type: String, 
    required: true, 
    default: 'imageOne'
  }, 
  imageTwo: {
    type: String, 
    required: true,
    default: 'imageTwo'
  }, 
  imageThree: {
    type: String, 
    required: true,
    default: 'imageThree'
  }, 
  imageFour: {
    type: String, 
    required: true,
    default: 'imageFour'
  }, 
  description: {
    type: String, 
    required: true,
    default: 'description'
  },  
  price: {
    type: Number, 
    required: true, 
    default: 0
  }, 
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)