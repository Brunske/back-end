const bcrypt = require("bcrypt");
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const signupRoute = async (req, res) => {
  const { username, email, password } = req.body;

  const emailSearch = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  const usernameSearch = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  if (emailSearch != null && usernameSearch != null) {
    return res.status(409).send({ message: "Email and Username are in use" });
  } else if (emailSearch != null) {
    return res.status(409).send({ message: "Email is already in use" });
  } else if (usernameSearch != null) {
    return res.status(409).send({ message: "Username is already in use" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });
    console.log(user);
    return res.status(200).send({ message: "Signup successful" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(error.message);
      return res.status(500).send({ message: error.message });
    } else {
      console.error(error);
      return res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

module.exports = signupRoute;
