import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();
router.post('/create', FacultyController.insertFaculty);
router.get('/:id', FacultyController.getByIdFaculty);
router.get('/', FacultyController.getAllFaculty);
export const FacultyRoute = router;
