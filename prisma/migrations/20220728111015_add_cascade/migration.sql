-- DropForeignKey
ALTER TABLE "Elections" DROP CONSTRAINT "Elections_candidate_id_fkey";

-- DropForeignKey
ALTER TABLE "Elections" DROP CONSTRAINT "Elections_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Elections" ADD CONSTRAINT "Elections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Elections" ADD CONSTRAINT "Elections_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
