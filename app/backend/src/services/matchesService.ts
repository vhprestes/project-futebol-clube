import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamModel';

type Item<T> = { [key: string]: T; };

export default class MatchesService {
  getAll = async <T>(item?: Item<T>) => {
    const getAllConst = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
      ...item,
    });
    return getAllConst;
  };

  insert = async (match: Matches) => {
    const check = await Matches.create({ ...match, inProgress: true });
    console.log('check insert =>', check);
    return check;
  };

  update = async (id:number, homeTeamGoals:number, awayTeamGoals:number) => {
    await Matches.update({ awayTeamGoals, homeTeamGoals }, { where: { id } });
    const updated = await this.getById(id);
    console.log('updated! id:', updated);
    return updated;
  };

  getById = async (id: number) => {
    const ID = await Matches.findOne({ where: { id } });
    return ID;
  };

  finish = async (id: string) => {
    await Matches.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };
}
