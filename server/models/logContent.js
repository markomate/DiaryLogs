import mongoose from "mongoose";

const logSchema = mongoose.Schema({
  creator: String,
  content: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const logContent = mongoose.model('logContent', logSchema);

export default logContent;
