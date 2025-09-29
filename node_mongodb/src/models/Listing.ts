import mongoose, { Schema } from 'mongoose';
import { IListing } from '../types/index.js';

const listingSchema: Schema<IListing> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  agentId: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: false,
  collection: 'listings'
});

export default mongoose.model<IListing>('Listing', listingSchema);