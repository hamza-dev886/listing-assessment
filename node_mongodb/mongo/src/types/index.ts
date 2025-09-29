import { Document } from 'mongoose';

export interface IAgent extends Document {
  _id: number;
  name: string;
  active: boolean;
}

export interface IListing extends Document {
  title: string;
  city: string;
  agentId: number;
  price: number;
}

export interface IView extends Document {
  listingId: number;
  date: string;
  views: number;
}

export interface AgentStats {
  agent: string;
  listings: number;
  totalViews: number;
}

export interface AgentStatsDebug extends AgentStats {
  debug_agentListings?: any[];
  debug_filteredListings?: any[];
  debug_listingIds?: number[];
  debug_matchedViews?: any[];
}