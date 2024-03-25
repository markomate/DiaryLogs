import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

    const user = await newUser.save();

    const token = jwt.sign(
      { username: user.username, email: user.email, id: user._id },
      process.env.SECRET_KEY
    );
    res.status(201);
    return res.json({ username: user.username, jwt: token });
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !bcrypt.compareSync(req.body.password, user.hash_password)) {
      res.status(400);
      return res.json({ error: "Authentication failed" });
    }

    const token = jwt.sign(
      { username: user.username, email: user.email, id: user._id },
      process.env.SECRET_KEY
    );

    res.status(200);
    return res.json({ username: user.username, jwt: token });
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
};

export const loginRequired = (req, res, next) => {
  if (req.user) {
    console.log(req.user.id);
    next();
  } else {
    res.status(401);
    return res.json({ error: "Unauthorised operation" });
  }
};
