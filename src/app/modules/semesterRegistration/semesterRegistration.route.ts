import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
const router = express.Router();
router.get('/:id', SemesterRegistrationController.getByIdFromDB);
router.patch(
  '/:id',
  validateRequest(SemesterRegistrationValidation.update),
  SemesterRegistrationController.updateOneIntoDB
);
router.delete('/:id', SemesterRegistrationController.deleteByIdFromDB);
router.post(
  '/',
  validateRequest(SemesterRegistrationValidation.create),
  SemesterRegistrationController.insertIntoDB
);
router.get('/', SemesterRegistrationController.getAllFromDB);
router.post(
  '/start-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.startMyRegistration
);

export const SemesterRegistrationRoutes = router;
