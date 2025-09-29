import { PrismaClient } from '@prisma/client';
import { ListingInput, ListingWithAgent, FormattedListing } from '../types/listingInput.js';

const prisma = new PrismaClient();

class ListingService {
    formatListing(listing: ListingWithAgent | null): FormattedListing | null {
        if (!listing) return null;
        const formatted: FormattedListing = {
            ...listing,
            price: Number(listing.price).toFixed(2),
            city: listing.city.charAt(0).toUpperCase() + listing.city.slice(1)
        };
        if (listing.agent) {
            formatted.agent = {
                id: listing.agent.id,
                name: listing.agent.name,
                phone_number: listing.agent.phone_number
            };
        }
        return formatted;
    }

    async createListing(payload: ListingInput): Promise<FormattedListing | null> {
        const agent = await prisma.agent.findUnique({ where: { id: payload.agentId } });
        if (!agent) {
            const error = new Error("Agent not found") as any;
            error.isCustom = true;
            throw error;
        }
        const listing = await prisma.listing.create({
            data: {
                ...payload,
                city: payload.city.toLowerCase()
            },
            include: { agent: true }
        });
        return this.formatListing(listing);
    }

    async getAllListings(): Promise<(FormattedListing | null)[]> {
        const listings = await prisma.listing.findMany({ include: { agent: true } });
        return listings.map(listing => this.formatListing(listing));
    }

    async getListingById(id: string): Promise<FormattedListing | null> {
        const listing = await prisma.listing.findUnique({
            where: { id: Number(id) },
            include: { agent: true }
        });
        return this.formatListing(listing);
    }

    async updateListing(id: string, payload: ListingInput): Promise<FormattedListing | null> {
        const listing = await prisma.listing.findUnique({ where: { id: Number(id) } });
        if (!listing) {
            const error = new Error("Listing not found") as any;
            error.isCustom = true;
            throw error;
        }
        if (listing.agentId !== payload.agentId) {
            const error = new Error("You are not allowed to update this listing") as any;
            error.isCustom = true;
            throw error;
        }
        if (payload.agentId) {
            const agent = await prisma.agent.findUnique({ where: { id: payload.agentId } });
            if (!agent) {
                const error = new Error("Agent not found") as any;
                error.isCustom = true;
                throw error;
            }
        }
        const updated = await prisma.listing.update({
            where: { id: Number(id) },
            data: {
                ...payload,
                city: payload.city ? payload.city.toLowerCase() : undefined
            },
            include: { agent: true }
        });
        return this.formatListing(updated);
    }

    async deleteListing(id: string, agentId: number): Promise<boolean> {
        const listing = await prisma.listing.findUnique({ where: { id: Number(id) } });
        if (!listing) {
            const error = new Error("Listing not found") as any;
            error.isCustom = true;
            throw error;
        }
        if (listing.agentId !== agentId) {
            const error = new Error("You are not allowed to delete this listing") as any;
            error.isCustom = true;
            throw error;
        }
        await prisma.listing.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new ListingService();