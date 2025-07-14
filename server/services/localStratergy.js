import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.js";
import bcrypt from "bcrypt"

export const localSignin = new LocalStrategy(
  {
    session: false,
    usernameField: "email",
  },
  async (email, password, done) => {
    try {
      //find user with email
      const user = await User.findOne({ email: email });

      //if not handle it
      if (!user) {
        console.log("That email does not exist.");
        return done(null, {
          status: false,
          message: "That email does not exist.",
        });
      }

      //try to match password
      if (!bcrypt.compareSync(password, user.hash_password)) {
        console.log("Invalid email and password.");
        return done(null, {
          status: false,
          message: "Invalid email and password.",
        });
      }

      //otherwise return user
      console.log("User authenitcated");
      done(null, {
        status: true,
        data: user,
      });
    } catch (error) {
      console.log(error);
      done(error, {
        status: false,
        message: error,
      });
    }
  }
);
