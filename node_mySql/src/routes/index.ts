import { Router } from 'express';
import listingRoutes from './listingRoutes.js';

const router = Router();

router.use('/listings', listingRoutes);

export default router;