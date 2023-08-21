import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.get('/:id', AcademicSemesterController.gelAllSemester);
router.get('/', AcademicSemesterController.gelAllSemester);
router.delete('/:id', AcademicSemesterController.deleteSemester);
router.patch('/:id', AcademicSemesterController.updatedSemester);
router.post('/create', AcademicSemesterController.createSemester);

export const AcademicSemesterRoutes = router;
