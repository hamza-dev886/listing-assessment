import Agent from '../models/Agent.js';
import { AgentStats, AgentStatsDebug } from '../types/index.js';
import { PipelineStage } from 'mongoose';

class StatsService {
  static async getActiveAgentsStats(): Promise<AgentStats[]> {
    try {
      const pipeline: PipelineStage[] = [
        {
          $match: { active: true }
        },
        {
          $lookup: {
            from: 'listings',
            localField: '_id',
            foreignField: 'agentId',
            as: 'agentListings'
          }
        },
        {
          $addFields: {
            debug_agentListings: '$agentListings',
            filteredListings: {
              $filter: {
                input: '$agentListings',
                cond: { $gt: ['$$this.price', 300000] }
              }
            }
          }
        },
        {
          $addFields: {
            listingIds: {
              $map: {
                input: '$filteredListings',
                as: 'listing',
                in: '$$listing._id'
              }
            }
          }
        },
        {
          $lookup: {
            from: 'views',
            let: { listingIds: '$listingIds' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$listingId', '$$listingIds']
                  }
                }
              }
            ],
            as: 'matchedViews'
          }
        },
        {
          $project: {
            _id: 0,
            agent: '$name',
            listings: { $size: '$filteredListings' },
            totalViews: { 
              $ifNull: [{ $sum: '$matchedViews.views' }, 0] 
            },
            debug_agentListings: 1,
            debug_filteredListings: '$filteredListings',
            debug_listingIds: '$listingIds',
            debug_matchedViews: '$matchedViews'
          }
        },
        {
          $sort: { totalViews: -1 as -1 }
        }
      ];

      const result = await Agent.aggregate<AgentStatsDebug>(pipeline);
      
      const cleanResult: AgentStats[] = result.map(item => ({
        agent: item.agent,
        listings: item.listings,
        totalViews: item.totalViews
      }));
      
      return cleanResult;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error in aggregation:', error);
      throw new Error(`Error fetching active agents stats: ${errorMessage}`);
    }
  }
}

export default StatsService;