import express from 'express';
import listingController from '../controllers/listingController.js';
import { validateListing, handleValidationErrors } from '../validators/listingValidator.js';

const router = express.Router();

console.log('✅ listingRoutes.ts loaded');

router.post('/', validateListing, handleValidationErrors, listingController.create);
router.get('/:id', listingController.getById);
router.get('/', listingController.getAll);
router.put('/:id', validateListing, handleValidationErrors, listingController.update);
router.delete('/:id', listingController.remove);

export default router;