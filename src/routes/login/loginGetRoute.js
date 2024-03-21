const jwt = require("jsonwebtoken");

const loginGetRoute = (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(req.cookies.token);
    console.log(user.userid);
    res.send(user);
  } catch (err) {
    res.clearCookie("token");
    return res.status(403).send({ Message: "session has expired" });
  }
};

module.exports = loginGetRoute;
