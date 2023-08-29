-- CreateTable
CREATE TABLE "offerd-course" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,
    "academicDepartmentId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "offerd-course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offerd-course" ADD CONSTRAINT "offerd-course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offerd-course" ADD CONSTRAINT "offerd-course_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic-department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offerd-course" ADD CONSTRAINT "offerd-course_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
