const passport = require("passport");
const jwt = require("jsonwebtoken");

const loginPostRoute = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error occurred during authentication" });
    }
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    } else {
      req.login(user, async (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send({ message: "An error occurred during login" });
        }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("token", accessToken, {
          httpOnly: true,
        });
        return res.status(200).send({
          message: "Login successful",
        });
      });
    }
  })(req, res, next);
};

module.exports = loginPostRoute;
