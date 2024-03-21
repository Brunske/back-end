require("dotenv").config();
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

const levelSelectorGetRoute = async (req, res) => {
  if (req.user) {
    const newToken = jwt.sign(
      { user: req.user },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", newToken, { httpOnly: true });

    res.status(200).send({ message: "Access granted to level selector" });
  } else {
    res.status(403).send({ message: "Access denied" });
  }
  // const write = await prisma.level.create({
  //   data: {
  //     name: "Level 3",
  //     type: "REGULAR",
  //     category: "COMPLEX",
  //     difficulty: "MEDIUM",
  //     levelData: { ilgis: 5, sunkumas: "sunku" },
  //     levelSequence: 3,
  //     Score: 100,
  //   },
  // });
};

module.exports = levelSelectorGetRoute;
