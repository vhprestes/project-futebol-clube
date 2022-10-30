import { Request, Response } from 'express';
import MatchesServices from '../services/matchesService';
import TeamService from '../services/teamService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesServices(),
    private teamService = new TeamService(),
  ) {}

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const boo = inProgress === 'true'; // damm
      const filter = await this.matchesService.getAll({ where: { inProgress: boo } });
      return res.status(200).json(filter);
    }
    const getAllConst = await this.matchesService.getAll();
    return res.status(200).json(getAllConst);
  };

  insert = async (req: Request, res: Response) => {
    const match = req.body;
    if (match.homeTeam === match.awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const teamsValidation = await this.teamService.findById([match.homeTeam, match.awayTeam]);
    if (teamsValidation && 'statusCode' in teamsValidation) {
      const { message } = teamsValidation;
      return res.status(teamsValidation.statusCode).json({ message });
    }
    const insertConst = await this.matchesService.insert(match);
    return res.status(201).json(insertConst);
  };

  finish = async (req: Request, res: Response) => {
    const finishMatch = await this.matchesService.finish(req.params.id);
    return res.status(200).json(finishMatch);
  };

  update = async (req: Request, res: Response) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const update = await this.matchesService.update(+req.params.id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json(update);
  };
}
