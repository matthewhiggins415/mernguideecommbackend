const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String, 
    required: true,
    unique: true
  }, 
  hashedPassword: {
    type: String, 
    required: true
  }, 
  isAdmin: {
    type: Boolean, 
    default: true
  }, 
  token: String
}, {
  timestamps: true,
  toJSON: {
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

module.exports = mongoose.model('User', userSchema)