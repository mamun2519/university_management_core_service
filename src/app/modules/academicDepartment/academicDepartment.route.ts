import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
const router = express.Router();
router.post('/create', AcademicDepartmentController.createDepartment);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.get('/', AcademicDepartmentController.getAllDepartment);
export const AcademicDepartmentRoute = router;
