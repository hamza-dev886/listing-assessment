import mongoose, { Schema } from 'mongoose';
import { IAgent } from '../types/index.js';

const agentSchema: Schema<IAgent> = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: false,
  _id: false,
  collection: 'agent'
});

export default mongoose.model<IAgent>('Agent', agentSchema);