import passport from "passport";

const localAuth = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      next(err);
    }
    if (user.status == false) {
      return res.json({ error: user.message });
      // console.log(user)
      // return res.status(422);
    } else {
      next();
    }
  })(req, res, next);
};

export default localAuth;
