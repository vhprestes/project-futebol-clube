import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Matches from '../database/models/MatchesModel';
import * as jwt from "jsonwebtoken";


import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';
import Users from '../database/models/UserModel';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

const IN_PROGRESS = {
  id: 1,
  teamName: "corinthians",
  inProgress: true
}

const NOT_IN_PROGRESS = {
  id: 1,
  teamName: "corinthians",
  inProgress: false
}

const INEXISTENT = {
  homeTeam: 12345,
  awayTeam: 3,
  homeTeamGoals: 1,
  awayTeamGoals: 3,
}

describe('get no /matches retorna os matches =>', async () => {
  beforeEach(sinon.restore);

it('Testando partidas em progresso =>', async () => {
  sinon.stub(Matches, "findAll").resolves([IN_PROGRESS as unknown as Users]);
  const response = await chai.request(app).get("/matches?inProgress=false");
  expect(response.status).to.equal(200);
  expect(response.body[0]).to.have.property("teamName").equal("corinthians");
});

it('Testando partidas que não estão em progresso =>', async () => {
  sinon.stub(Matches, "findAll").resolves([NOT_IN_PROGRESS as unknown as Users]);
const response = await chai.request(app).get("/matches?inProgress=false");
expect(response.status).to.equal(200);
expect(response.body[0]).to.have.property("teamName").equal("corinthians");
});

it('Testando o finalizar partida', async () => {
  sinon.stub(Matches, "update").resolves();
  const response = await await chai.request(app).patch('/matches/1/finish').set('params', 'id');
  const { status } = response;
  expect(status).to.be.equal(200);
  expect(response.body).to.have.property("message").equal('Finished');
});

it("Testando passar dados inválidos", async () => {
  sinon.stub(jwt, "verify").resolves({ email: "oi@vcai.com" });
  sinon.stub(Team, "findOne").resolves();
  sinon.stub(Matches, "create").resolves(NOT_IN_PROGRESS as unknown as Users);
  const response = await chai.request(app).post("/matches").set("authorization", "sarapateu").send(INEXISTENT);
  expect(response.status).to.equal(404);
  expect(response.body).to.have.property("message").equal("There is no team with such id!");
});



  const result = await chai.request(app).get('/matches');

  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('get no /matches retorna status 200 =>', () => {
    expect(result.status).to.be.equal(200);
});
  it('get no /matches retorna um array =>', () => {
    expect(result.body).to.be.a('array');
  });



  
});

