const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const levels = async (req, res) => {
  try {
    const levels = await prisma.level.findMany({
      orderBy: [{ levelSequence: "asc" }, { type: "asc" }],
    });

    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: "Error fetching levels" });
  }
};

module.exports = levels;
