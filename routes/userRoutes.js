const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const User = require('../models/userSchema')

const bcryptSaltRounds = 10

router.post('/register', async (req, res, next) => {
  const { credentials } = req.body
  const { email, password, password_confirmation } = credentials
  console.log(email, password, password_confirmation)

  if (!email || !password || password !== password_confirmation) {
    res.json({msg: "registration failed"})
  }

  const hash = await bcrypt.hash(password, bcryptSaltRounds)

  const userObj = {
    email: email,
    hashedPassword: hash
  }


  let user = await User.create(userObj)
  
  const token = crypto.randomBytes(16).toString('hex')
  user.token = token 
  await user.save()

  res.json({ user: user })
})

//login route 
router.post('/login', async (req, res, next) => {
  const { credentials } = req.body
  const { email, password } = credentials

  let user = await User.findOne({ email: email })

  if (!user) {
    res.json({ msg: "Login Failed" })
  }

  let correctPassword = await bcrypt.compare(password, user.hashedPassword)

  if (!correctPassword) {
    res.json({ msg: "Login Failed" })
  }

  const token = crypto.randomBytes(16).toString('hex')
  user.token = token 
  await user.save()

  res.json({ user: user })
})

module.exports = router