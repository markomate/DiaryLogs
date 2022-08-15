import mongoose from 'mongoose'
import normalize from 'normalize-mongoose';

export const logSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  startTime: {
    type: Object,
    required: true
  },
  finishTime: {
    type: Object,
    required: true
  },
  posted: {
    type: Date,
    // required: true
  }
})

logSchema.plugin(normalize);

export const Log = mongoose.model("Log", logSchema)