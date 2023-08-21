import express from 'express';
import { RoomController } from './room.controller';
const router = express.Router();
router.get('/', RoomController.getAllData);
router.post('/create', RoomController.insertData);
router.get('/:id', RoomController.getDataById);
router.patch('/:id', RoomController.updateDataById);
router.delete('/:id', RoomController.deleteDataById);

export const RoomRoutes = router;
