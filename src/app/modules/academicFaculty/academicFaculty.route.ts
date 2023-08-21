import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.post('/create', AcademicFacultyController.createFaculty);
router.get('/:id', AcademicFacultyController.getSingleAllFaculty);
router.get('/', AcademicFacultyController.getAllFaculty);
// router.patch('/:id', () => {});
// router.delete('/:id', () => {});

export const AcademicFacultyRoute = router;
