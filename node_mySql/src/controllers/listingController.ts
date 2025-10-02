import { Request, Response } from 'express';
import listingService from '../services/listingService.js';
import { ListingInputClass } from '../types/listingInput.js';
import { AppError } from '../utils/AppError.js';

class ListingController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const input = req.body;
            const listing = await listingService.createListing(input);
            res.status(201).json(listing);
        } catch (err: any) {
            if (err.isCustom) {
                res.status(400).json({ error: true, message: err.message });
            } else if (err instanceof AppError) {
                res.status(err.statusCode).json({ error: true, message: err.message });
            } else {
                res.status(500).json({ error: true, message: 'Something went wrong' });
            }
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const listings = await listingService.getAllListings();
            res.json(listings);
        } catch (err: any) {
            if (err.isCustom) {
                res.status(400).json({ error: true, message: err.message });
            } else if (err instanceof AppError) {
                res.status(err.statusCode).json({ error: true, message: err.message });
            } else {
                res.status(500).json({ error: true, message: 'Something went wrong' });
            }
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const listing = await listingService.getListingById(req.params.id);
            if (!listing) {
                res.status(404).json({ error: true, message: 'Listing not found' });
                return;
            }
            res.json(listing);
        } catch (err: any) {
            if (err.isCustom) {
                res.status(400).json({ error: true, message: err.message });
            } else if (err instanceof AppError) {
                res.status(err.statusCode).json({ error: true, message: err.message });
            } else {
                res.status(500).json({ error: true, message: 'Something went wrong' });
            }
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const input = req.body;
            const listing = await listingService.updateListing(req.params.id, input);
            res.json(listing);
        } catch (err: any) {
            if (err.isCustom) {
                res.status(400).json({ error: true, message: err.message });
            } else if (err instanceof AppError) {
                res.status(err.statusCode).json({ error: true, message: err.message });
            } else {
                res.status(500).json({ error: true, message: 'Something went wrong' });
            }
        }
    }

    async remove(req: Request, res: Response): Promise<void> {
        try {
            const { agentId } = req.body;
            if (!agentId) {
                res.status(400).json({ error: true, message: 'agentId is required' });
                return;
            }
            await listingService.deleteListing(req.params.id, agentId);
            res.json({ success: true, message: 'Listing deleted successfully' });
        } catch (err: any) {
            if (err.isCustom) {
                res.status(400).json({ error: true, message: err.message });
            } else if (err instanceof AppError) {
                res.status(err.statusCode).json({ error: true, message: err.message });
            } else {
                res.status(500).json({ error: true, message: 'Something went wrong' });
            }
        }
    }
}

export default new ListingController();