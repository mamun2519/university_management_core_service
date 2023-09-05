/*
  Warnings:

  - Added the required column `semesterRegistrationId` to the `offer-course-class-schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offer-course-class-schedule" ADD COLUMN     "semesterRegistrationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "offer-course-class-schedule" ADD CONSTRAINT "offer-course-class-schedule_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
