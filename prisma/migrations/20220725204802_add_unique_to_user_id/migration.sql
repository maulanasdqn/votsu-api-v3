/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Elections` will be added. If there are existing duplicate values, this will fail.
  - Made the column `user_id` on table `Elections` required. This step will fail if there are existing NULL values in that column.
  - Made the column `candidate_id` on table `Elections` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Elections" DROP CONSTRAINT "Elections_candidate_id_fkey";

-- DropForeignKey
ALTER TABLE "Elections" DROP CONSTRAINT "Elections_user_id_fkey";

-- AlterTable
ALTER TABLE "Elections" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "candidate_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Elections_user_id_key" ON "Elections"("user_id");

-- AddForeignKey
ALTER TABLE "Elections" ADD CONSTRAINT "Elections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Elections" ADD CONSTRAINT "Elections_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
