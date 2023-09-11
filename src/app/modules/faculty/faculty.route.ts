import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FacultyController } from './faculty.controller';

const router = express.Router();
router.get(
  '/my-courses',
  auth(ENUM_USER_ROLE.FACULTY),
  FacultyController.myCourses
);
router.post('/create', FacultyController.insertFaculty);
router.get('/:id', FacultyController.getByIdFaculty);
router.post('/:id/assign-courses', FacultyController.assignCourse);
router.delete('/:id/remove-courses', FacultyController.removeCourse);
router.delete('/:id', FacultyController.deleteFromDB);
router.patch('/:id', FacultyController.updateIntoDB);
router.get('/', FacultyController.getAllFaculty);
export const FacultyRoute = router;
