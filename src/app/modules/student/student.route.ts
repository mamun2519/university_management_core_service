import express from 'express';
import { StudentController } from './student.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();
router.get(
  '/my-courses',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.myCourses
);

router.get(
  '/my-course-schedules',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.getMyCourseSchedules
);
router.get(
  '/my-academic-info',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.myAcademicInfo
);
router.post('/create', StudentController.insertStudent);
router.get('/:id', StudentController.getByIdStudent);
router.delete('/:id', StudentController.deleteFromDB);
router.patch('/:id', StudentController.updateIntoDB);
router.get('/', StudentController.getAllStudent);
export const StudentRoute = router;
