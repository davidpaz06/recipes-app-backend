/*
  Warnings:

  - You are about to drop the `User_Recipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User_Recipe" DROP CONSTRAINT "User_Recipe_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "User_Recipe" DROP CONSTRAINT "User_Recipe_userId_fkey";

-- DropTable
DROP TABLE "User_Recipe";
