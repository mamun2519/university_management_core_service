import express from 'express';
import { CourseController } from './course.controller';
const router = express.Router();
router.get('/:id', CourseController.getByIdFromDB);
router.get('/:id', CourseController.updateOneIntoDB);
router.post('/', CourseController.insertIntoDB);
router.get('/', CourseController.getAllFromDB);
export const CourseRoutes = router;
