import { ITeam } from '../interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  getAll = async (): Promise<ITeam[] | null> => {
    const teams = await TeamModel.findAll();
    return teams as unknown as ITeam[];
  };

  findById = async (ids: number[]) => {
    const teams = await Promise.all(ids.map((id) => TeamModel.findOne({ where: { id } })));
    console.log('ln 12 team service chegou =>', teams);
    const checkTeams = teams.some((team) => !team);
    console.log('ln 14 pega se a team existe papai =>', checkTeams);
    if (checkTeams) return { statusCode: 404, message: 'There is no team with such id!' };
  };

  getTeam = async (id: number) => {
    const team = await TeamModel.findOne({ where: { id } });
    if (!team) return { statusCode: 404, message: 'There is no team with such id!' };
    return { statusCode: 200, data: team };
  };
}
