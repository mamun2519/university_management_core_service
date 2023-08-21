/*
  Warnings:

  - Added the required column `academicFacultyId` to the `academic-department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicDepartmentId` to the `faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicFcaultyId` to the `faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicDepartmentId` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicFcaultyId` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicSemesterId` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "academic-department" ADD COLUMN     "academicFacultyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "faculty" ADD COLUMN     "academicDepartmentId" TEXT NOT NULL,
ADD COLUMN     "academicFcaultyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "academicDepartmentId" TEXT NOT NULL,
ADD COLUMN     "academicFcaultyId" TEXT NOT NULL,
ADD COLUMN     "academicSemesterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "academic-department" ADD CONSTRAINT "academic-department_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic-faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic-semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic-department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_academicFcaultyId_fkey" FOREIGN KEY ("academicFcaultyId") REFERENCES "academic-faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculty" ADD CONSTRAINT "faculty_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic-department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculty" ADD CONSTRAINT "faculty_academicFcaultyId_fkey" FOREIGN KEY ("academicFcaultyId") REFERENCES "academic-faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
