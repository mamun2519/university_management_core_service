import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
const router = express.Router();
router.post('/create', AcademicDepartmentController.createDepartment);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.get('/', AcademicDepartmentController.getAllDepartment);
router.patch('/:id', AcademicDepartmentController.updateIntoDB);
router.delete('/:id', AcademicDepartmentController.deleteFromDB);
export const AcademicDepartmentRoute = router;
