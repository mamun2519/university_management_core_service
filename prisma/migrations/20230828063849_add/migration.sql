/*
  Warnings:

  - Added the required column `updatedAt` to the `course_faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `semester_registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course_faculty" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "semester_registration" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
