import { Router } from 'express';
import userRouter from './user-routes.js';
import savedLocationsRouter from '../saved.js';


const router = Router();

router.use('/users', userRouter);
router.use('/saved', savedLocationsRouter);


export default router;