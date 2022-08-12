// request -> routes -> controller -> model
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import logsRoutes from "./routes/logs.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const dbConn = process.env.MONGODB_ATLAS;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/logs", logsRoutes);

mongoose.connect(dbConn, {}, (err) => {
  if (err) {
    console.log(err, "Database error!");
  } else {
    console.log("Connected to the database!");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});
