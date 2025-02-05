-- CreateTable
CREATE TABLE "Group_Recipe" (
    "group_recipe_id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Group_Recipe_pkey" PRIMARY KEY ("group_recipe_id")
);

-- AddForeignKey
ALTER TABLE "Group_Recipe" ADD CONSTRAINT "Group_Recipe_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Recipe" ADD CONSTRAINT "Group_Recipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
