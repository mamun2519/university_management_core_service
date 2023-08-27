import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();
router.post('/create', FacultyController.insertFaculty);
router.get('/:id', FacultyController.getByIdFaculty);
router.post('/:id/assign-courses', FacultyController.assignCourse);
router.delete('/:id/remove-courses', FacultyController.removeCourse);
router.delete('/:id', FacultyController.deleteFromDB);
router.patch('/:id', FacultyController.updateIntoDB);
router.get('/', FacultyController.getAllFaculty);
export const FacultyRoute = router;
