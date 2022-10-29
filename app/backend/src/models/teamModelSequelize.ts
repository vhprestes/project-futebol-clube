import { ITeam } from '../interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';

class TeamModelSequelize {
  protected _model = TeamModel;

  findAll = async (): Promise<ITeam[] | null> => this._model.findAll();

  getById = async (id: number): Promise<ITeam | null> => this._model
    .findByPk(id);
}

export default TeamModelSequelize;
