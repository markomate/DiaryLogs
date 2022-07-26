import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
  },
  hash_password: {
    type: String,
    required: true
  }
})

export const User = mongoose.model("User", userSchema)