-- CreateTable
CREATE TABLE "student-semester-registration" (
    "id" TEXT NOT NULL,
    "isConfirmed" BOOLEAN,
    "totalCreditsToken" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "student-semester-registration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student-semester-registration" ADD CONSTRAINT "student-semester-registration_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student-semester-registration" ADD CONSTRAINT "student-semester-registration_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
