import express from 'express';
import { BuildingController } from './building.controller';
const router = express.Router();
router.get('/', BuildingController.getAllData);
router.post('/create', BuildingController.insertData);
router.get('/:id', BuildingController.getDataById);
router.patch('/:id', BuildingController.updateDataById);
router.delete('/:id', BuildingController.deleteDataById);

export const BuildingRoutes = router;
