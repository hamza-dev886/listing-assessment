import { Request, Response } from 'express';
import listingService from '../services/listingService.js';
import errorResponse from '../utils/errorResponse.js';
import { ListingInputClass } from '../types/listingInput.js';

class ListingController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const input = new ListingInputClass(req.body);
            const listing = await listingService.createListing(input);
            res.status(201).json(listing);
        } catch (err: any) {
            errorResponse(res, err.message);
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const listings = await listingService.getAllListings();
            res.json(listings);
        } catch (err: any) {
            errorResponse(res, "Something went wrong");
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const listing = await listingService.getListingById(req.params.id);
            if (!listing) {
                errorResponse(res, "Listing not found", 404);
                return;
            }
            res.json(listing);
        } catch (err: any) {
            errorResponse(res, "Something went wrong");
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const input = new ListingInputClass(req.body);
            const listing = await listingService.updateListing(req.params.id, input);
            res.json(listing);
        } catch (err: any) {
            errorResponse(res, err.message);
        }
    }

    async remove(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await listingService.deleteListing(req.params.id, req.body.agentId);
            res.json({ success: true });
        } catch (err: any) {
            errorResponse(res, err.message);
        }
    }
}

export default new ListingController();