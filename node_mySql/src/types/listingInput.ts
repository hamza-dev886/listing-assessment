import { Listing, Agent } from '@prisma/client';

export interface ListingInput {
    title: string;
    city: string;
    price: number;
    bedrooms: number;
    agentId: number;
}

export interface ListingWithAgent extends Listing {
    agent?: Agent;
}

export interface FormattedListing {
    id: number;
    title: string;
    city: string;
    price: string;
    bedrooms: number;
    agentId: number;
    agent?: {
        id: number;
        name: string;
        active: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}

export class ListingInputClass implements ListingInput {
    title: string;
    city: string;
    price: number;
    bedrooms: number;
    agentId: number;

    constructor({ title, city, price, bedrooms, agentId }: ListingInput) {
        this.title = title;
        this.city = city;
        this.price = price;
        this.bedrooms = bedrooms;
        this.agentId = agentId;
    }
}