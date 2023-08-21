import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();
router.post('/create', StudentController.insertStudent);
router.get('/:id', StudentController.getByIdStudent);
router.get('/', StudentController.getAllStudent);
export const StudentRoute = router;
