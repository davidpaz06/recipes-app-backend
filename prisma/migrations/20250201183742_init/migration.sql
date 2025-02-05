/*
  Warnings:

  - You are about to drop the column `prepTimeMinutes` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `steps` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `prepTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "prepTimeMinutes",
DROP COLUMN "steps",
ADD COLUMN     "prepTime" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Steps" (
    "id" SERIAL NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "stepDescription" TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Steps" ADD CONSTRAINT "Steps_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
