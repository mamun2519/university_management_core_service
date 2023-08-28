/*
  Warnings:

  - You are about to drop the `CourseFaculty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseFaculty" DROP CONSTRAINT "CourseFaculty_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseFaculty" DROP CONSTRAINT "CourseFaculty_facultyId_fkey";

-- DropTable
DROP TABLE "CourseFaculty";

-- CreateTable
CREATE TABLE "course_faculty" (
    "courseId" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "course_faculty_pkey" PRIMARY KEY ("courseId","facultyId")
);

-- CreateTable
CREATE TABLE "semester_registration" (
    "id" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "minCredit" TEXT NOT NULL,
    "maxCredit" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,

    CONSTRAINT "semester_registration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "course_faculty" ADD CONSTRAINT "course_faculty_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_faculty" ADD CONSTRAINT "course_faculty_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_registration" ADD CONSTRAINT "semester_registration_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic-semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
