require("dotenv").config();

const express = require("express");
const session = require("express-session");
const { PrismaClient, Prisma } = require("@prisma/client");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { cookieJwtAuth } = require("./cookieJwtAuth");
// const { access } = require("fs");
// const { cookieJwtAuth } = require("./cookieJwtAuth");

const app = express();
const prisma = new PrismaClient();

//----------------------------END OF IMPORTS------------------------

const loginGetRoute = require("./routes/login/loginGetRoute");
const loginPostRoute = require("./routes/login/loginPostRoute");

const signupRoute = require("./routes/signup/signupPostRoute");

const levelSelectorGetRoute = require("./routes/levelSelector/levelSelectorGetRoute");
const levelSelectorPostRoute = require("./routes/levelSelector/levelSelectorPostRoute");

//-----------------------------END OF ROUTE IMPORTS------------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", //location of the react app were connected to
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(passport.initialize());
app.use(passport.session());

require("./passportConfig")(passport);

//----------------------------END OF MIDDLEWARE------------------------

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token === null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403)
//     req.user = user
//     next()
//   })
// }

// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
// }

//----------------------------END OF FUNCTIONS------------------------

app.route("/login").get(loginGetRoute).post(loginPostRoute);

//----------------------------END OF /LOGIN------------------------

app.route("/signup").post(signupRoute);

//----------------------------END OF /SIGNUP------------------------

app
  .route("/level-selector")
  .get(cookieJwtAuth, levelSelectorGetRoute)
  .post(cookieJwtAuth, levelSelectorPostRoute);

//----------------------------END OF /LEVEL-SELECTOR------------------------

// app.post("/token", async (req, res) => {
//   //TOKENS NEED TO BE STORED IN A DATABASE
//   const refreshToken = req.body.token;
//   if (refreshToken === null) return res.sendStatus(401);
//   if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     const accessToken = generateAccessToken({ accessToken: user.name });
//     res.json({ accessToken: accessToken });
//   });
// });

//----------------------------END OF /TOKEN------------------------

// app.delete("/logout", (req, res) => {
//   refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
//   res.sendStatus(204);
// });

//----------------------------END OF /LOGOUT------------------------

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//----------------------------END OF THE WORLD------------------------
