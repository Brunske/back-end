const jwt = require("jsonwebtoken");

const loginGetRoute = (req, res) => {
  const token = req.cookies.token;
  try {
    console.log("HERE");
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.send(user);
    console.log(req.cookies.token);
  } catch (err) {
    res.clearCookie("token");
    return res.status(403).send({ Message: "session has expired" });
  }
};

module.exports = loginGetRoute;
