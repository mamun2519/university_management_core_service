-- CreateTable
CREATE TABLE "student-semester-registration-course" (
    "semesterRegistrationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "offeredCourseSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student-semester-registration-course_pkey" PRIMARY KEY ("semesterRegistrationId","studentId","offeredCourseId")
);

-- AddForeignKey
ALTER TABLE "student-semester-registration-course" ADD CONSTRAINT "student-semester-registration-course_semesterRegistrationI_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student-semester-registration-course" ADD CONSTRAINT "student-semester-registration-course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student-semester-registration-course" ADD CONSTRAINT "student-semester-registration-course_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offerd-course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student-semester-registration-course" ADD CONSTRAINT "student-semester-registration-course_offeredCourseSectionI_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered-course-section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
