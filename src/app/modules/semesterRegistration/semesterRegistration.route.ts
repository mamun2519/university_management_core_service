import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();
router.get('/:id', SemesterRegistrationController.getByIdFromDB);
router.patch('/:id', SemesterRegistrationController.updateOneIntoDB);
router.delete('/:id', SemesterRegistrationController.deleteByIdFromDB);
router.post('/', SemesterRegistrationController.insertIntoDB);
router.get('/', SemesterRegistrationController.getAllFromDB);

export const SemesterRegistrationRoutes = router;
