import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import authRouter from './auth-routes.js';
import apiRouter from './api/index.js';
import tripadvRouter from './api/tripadv.js';
import userRouter from './api/index.js';
import savedRoutes from '../routes/saved.js';

const router = Router();

// auth routes (login, signup, etc.)
router.use('/auth', authRouter);

// user routes
router.use('/users', authenticateToken, userRouter);

router.use('/api', apiRouter);

// tripadvisor routes
router.use('/tripadvisor', tripadvRouter);

router.use('/saved', savedRoutes);

export default router;
