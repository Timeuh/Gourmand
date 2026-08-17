-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletion_requested_at" TIMESTAMP(3),
ADD COLUMN     "deletion_scheduled_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
