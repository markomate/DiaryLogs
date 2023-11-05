// request -> routes -> controller -> model
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from './routes/logs-routes.js'
import { authRouter } from "./routes/auth-routes.js"
import jwt from 'jsonwebtoken'

dotenv.config();

const PORT = process.env.PORT || 5000;
const dbConn = process.env.MONGODB_ATLAS;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set('strictQuery', false);
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

app.use((req, res, next) => {
  if(req.headers && req.headers.authorization) {
    // verifies bearer token 
    jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET_KEY, (err, user) => {
      if (err) {
        req.user = undefined
      } else {
        req.user = user
      }
      next()
    })
  } else {
    req.user = undefined
    next()
  }
})

app.use("/auth", authRouter)
app.use("/", router)