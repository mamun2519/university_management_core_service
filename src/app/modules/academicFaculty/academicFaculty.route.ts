import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.post('/create', AcademicFacultyController.createFaculty);
router.get('/:id', AcademicFacultyController.getSingleAllFaculty);
router.get('/', AcademicFacultyController.getAllFaculty);
router.delete('/:id', AcademicFacultyController.deleteFromDB);
router.patch('/:id', AcademicFacultyController.updateIntoDB);

export const AcademicFacultyRoute = router;
