const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

// module exports first way
/* 
module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await prisma.user.findUnique({
        where: { username: username },
      });
      if (user === null) return done(null, false);
      else {
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) return done(null, false);
        return done(null, user);
      }
    })
  );
  */

//module exports second way

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await prisma.user
        .findUnique({
          where: { username: username },
        })
        .then((user) => {
          if (!user) return done(null, false, { message: "User not found" });

          //Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    // console.log((user.id))
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await prisma.user
      .findFirst({ where: { id: id } })
      .then((user) => {
        const userInformation = { username: user.username };
        done(null, userInformation);
      });
  });

  // passport.deserializeUser(async (id, cb) => {
  //   await prisma.user
  //     .findFirst({ where: { id: id } })
  //     .then((user) => {
  //       //WRITE WHAT THE SERVER SENDS TO THE FRONTEND
  //       const userInformation = {
  //         username: user.userName,
  //       };
  //       console.log(userInformation)
  //       cb(err, userInformation);
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // });
};
