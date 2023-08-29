import express from 'express';
import { OfferedCourseController } from './offeredCourse.controller';
const router = express.Router();

router.get('/:id', OfferedCourseController.getByIdFromDB);
router.patch('/:id', OfferedCourseController.updateOneIntoDB);
router.delete('/:id', OfferedCourseController.deleteByIdFromDB);
router.get('/', OfferedCourseController.getAllFromDB);
router.post('/', OfferedCourseController.insertIntoDB);

export const OfferedCourseRoutes = router;
