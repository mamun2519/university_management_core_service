import express from 'express';
import { OfferdCourseClassScheduleController } from './offerdCourseClassSchedule.controller';
const router = express.Router();

router.post('/', OfferdCourseClassScheduleController.insertIntoDB);
router.delete('/:id', OfferdCourseClassScheduleController.deleteByIdFromDB);
router.get('/:id', OfferdCourseClassScheduleController.getByIdFromDB);
router.patch('/:id', OfferdCourseClassScheduleController.updateByIdIntoDB);
router.get('/', OfferdCourseClassScheduleController.getAllFromDB);

export const OfferdCourseClassScheduleRoutes = router;
