/*
  Warnings:

  - You are about to drop the column `userId` on the `Group` table. All the data in the column will be lost.
  - Added the required column `groupBy` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_userId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "userId",
ADD COLUMN     "groupBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_groupBy_fkey" FOREIGN KEY ("groupBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
