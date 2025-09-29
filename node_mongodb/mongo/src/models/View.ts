import mongoose, { Schema } from 'mongoose';
import { IView } from '../types/index.js';

const viewSchema: Schema<IView> = new mongoose.Schema({
  listingId: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: false,
  collection: 'views' 
});

export default mongoose.model<IView>('View', viewSchema);