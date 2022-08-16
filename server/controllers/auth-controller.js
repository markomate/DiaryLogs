import {User} from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp = (req, res) => {
  const newUser = new User(req.body)

  newUser.hash_password = bcrypt.hashSync(req.body.password, 10)

  newUser.save((err, user) => {
    if (err) {
      res.status(500)
      return res.json({error: err.message})
    } else {
      res.status(201)
      const token = jwt.sign({username: user.username, email: user.email, id: user._id}, process.env.SECRET_KEY)
      return res.json({username: user.username, jwt: token})
    }
  })
}

export const signIn = (req, res) => {
  User.findOne({email: req.body.email}, (err,user) => {
    if (err) {
      res.status(500)
      return res.json({error: err.message})
    }
    if (!user || !bcrypt.compareSync(req.body.password, user.hash_password)) {
      res.status(400)
      return res.json({error: "Authentication failed"})
    } else {
      res.status(200)
      const token = jwt.sign({username: user.username, email: user.email, id: user._id}, process.env.SECRET_KEY)
      return res.json({username: user.username, jwt: token})
    }
  })
}

export const loginRequired = (req, res, next) => {
  if (req.user) {
    console.log(req.user.id)
    next()
  } else {
    res.status(401)
    return res.json({error: "Unauthorised operation"})
  }
}