import mongoose from 'mongoose'
import normalize from 'normalize-mongoose';

export const logSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    // required: true
  },
  startTime: {
    type: Date,
    // required: true
  },
  finishTime: {
    type: Date,
    // required: true
  },
  posted: {
    type: Date,
    // required: true
  }
})

logSchema.plugin(normalize);

export const Log = mongoose.model("Log", logSchema)