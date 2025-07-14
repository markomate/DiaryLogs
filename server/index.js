// request -> routes -> controller -> model
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from './routes/logsRoutes.js'
import { authRouter } from "./routes/authRoutes.js"
import jwt from 'jsonwebtoken'
import passport from "passport";
import { localSignin } from "./services/localStratergy.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const dbConn = process.env.MONGODB_ATLAS;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
passport.use(localSignin)

mongoose.set('strictQuery', false);
try {
  await mongoose.connect(dbConn);
  console.log("Connected to the database!");
} catch (error) {
  console.log(error, "Database error!");
}

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