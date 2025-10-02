import { Router } from 'express';
import listingRoutes from './listingRoutes.js';

const router = Router();

console.log('✅ Routes/index.ts loaded');

router.use('/listings', (req, res, next) => {
    console.log('✅ Hit /api/listings route');
    next();
}, listingRoutes);

export default router;