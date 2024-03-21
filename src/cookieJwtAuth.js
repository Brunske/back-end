require("dotenv").config();
const jwt = require("jsonwebtoken");

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).send({ Message: "session has expired" });
    } else {
      return res.status(403).send({ Message: "invalid token" });
    }
  }
};

module.exports = { cookieJwtAuth };
