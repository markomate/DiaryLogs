import mongoose from 'mongoose'
// import normalize from 'normalize-mongoose';

export const logSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  posted: {
    type: Date,
    // required: true
  }
})

// logSchema.plugin(normalize);

export const Log = mongoose.model("Log", logSchema)