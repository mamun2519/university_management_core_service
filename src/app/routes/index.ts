import express from 'express';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { FacultyRoute } from '../modules/faculty/faculty.route';
import { StudentRoute } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/student',
    route: StudentRoute,
  },
  {
    path: '/faculty',
    route: FacultyRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;