import express from 'express';
import listingController from '../controllers/listingController.js';
import { validateListing, handleValidationErrors } from '../validators/listingValidator.js';

const router = express.Router();

router.post('/create', validateListing, handleValidationErrors, listingController.create);
router.get('/get', listingController.getAll);
router.get('/get/:id', listingController.getById);
router.put('/update/:id', validateListing, handleValidationErrors, listingController.update);
router.delete('/delete/:id', listingController.remove);

export default router;