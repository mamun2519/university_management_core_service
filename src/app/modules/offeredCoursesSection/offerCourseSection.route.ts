import express from 'express';

import { OfferedCourseSectionController } from './offeredCourseSection.controller';
const router = express.Router();

router.get('/:id', OfferedCourseSectionController.getByIdFromDB);
router.patch('/:id', OfferedCourseSectionController.updateOneIntoDB);
router.delete('/:id', OfferedCourseSectionController.deleteByIdFromDB);
router.get('/', OfferedCourseSectionController.getAllFromDB);
router.post('/', OfferedCourseSectionController.insertIntoDB);

export const OfferedCourseSectionRoutes = router;
