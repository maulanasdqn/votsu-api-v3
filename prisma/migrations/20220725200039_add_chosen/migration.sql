-- CreateTable
CREATE TABLE "Elections" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "candidate_id" INTEGER,

    CONSTRAINT "Elections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Elections" ADD CONSTRAINT "Elections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Elections" ADD CONSTRAINT "Elections_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
