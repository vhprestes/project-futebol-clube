import { Request, Response } from 'express';
import LeaderboardServices from '../services/leaderboardService';

class LeaderboardController {
  leaderboardServices: LeaderboardServices;

  constructor() {
    this.leaderboardServices = new LeaderboardServices();
  }

  getLeaderboardHome = async (_req: Request, res: Response) => {
    const leaderboardHome = await this.leaderboardServices.getLeaderboardHome();
    return res.status(200).json(leaderboardHome);
  };

  getLeaderboardAway = async (_req: Request, res: Response) => {
    const leaderboardHome = await this.leaderboardServices.getLeaderboardAway();
    return res.status(200).json(leaderboardHome);
  };

  getLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardServices.getLeaderboard();
    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
