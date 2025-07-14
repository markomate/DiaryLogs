import express from "express";
import { signUp, signIn } from "../controllers/authController.js";
import localAuth from "../middleware/passportLocal.js";

export const authRouter = express.Router();

authRouter.post("/signup", signUp);
// authRouter.post("/signin", signIn)

authRouter.post("/signin", localAuth, signIn);
