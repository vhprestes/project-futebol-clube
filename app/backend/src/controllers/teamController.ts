import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  getAll = async (req: Request, res: Response) => {
    const getAllTeams = await this.teamService.getAll();
    return res.status(200).json(getAllTeams);
  };

  getById = async (req: Request, res: Response) => {
    const team = await this.teamService.findById([Number(req.params.id)]);
    return res.status(200).json(team);
  };
}
