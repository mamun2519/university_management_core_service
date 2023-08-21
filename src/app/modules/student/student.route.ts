import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();
router.post('/create', StudentController.insertStudent);
router.get('/:id', StudentController.getByIdStudent);
router.delete('/:id', StudentController.deleteFromDB);
router.patch('/:id', StudentController.updateIntoDB);
router.get('/', StudentController.getAllStudent);
export const StudentRoute = router;
