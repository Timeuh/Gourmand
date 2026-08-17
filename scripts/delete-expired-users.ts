import { unlink } from "node:fs/promises";
import { prisma } from "./db.js";

async function main() {
  // set today's date
  const today = new Date();

  // find all foods images for users to delete
  const foods = await prisma.food.findMany({
    where: {
      user: {
        deletion_scheduled_at: {
          lte: today,
        },
      },
    },
    select: {
      image: true,
    },
  });

  // delete all foods images relative to users to delete
  for (const food of foods) {
    console.log("[account-deletion] Food image:", food.image);
    console.log(
      "[account-deletion] Food image deletion path:",
      "../../.data" + food.image,
    );
    if (!food.image) continue;

    try {
      await unlink("../../.data" + food.image);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
  }

  // delete the users from database
  const result = await prisma.user.deleteMany({
    where: {
      deletion_scheduled_at: {
        lte: today,
      },
    },
  });

  console.log(`[account-deletion] ${result.count} account(s) deleted`);
}

main()
  .catch((error) => {
    console.error("[account-deletion] Failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
