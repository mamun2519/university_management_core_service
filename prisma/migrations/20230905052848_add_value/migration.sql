/*
  Warnings:

  - Added the required column `semesterRegistrationId` to the `offered-course-section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offered-course-section" ADD COLUMN     "semesterRegistrationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "offered-course-section" ADD CONSTRAINT "offered-course-section_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
