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
  describe('Testando o Update ? =>', () => {
      it('retorna status 200', async () => {
      const response = await chai.request(app).patch('/matches/1').send({ homeTeamGoals: 1, awayTeamGoals: 0 });
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Match updated');
    });

  
});

describe('Testando os posts do match =>', () => {

  // it('Testando se volta 401 e mensagem "Token not found" quando não há token', async () => {
  //   const response = await chai.request(app).post('/matches');
  //   const { status, body } = response;
  //   expect(status).to.be.equal(401);
  //   expect(body).to.have.property("message").equal("Token not found");
  // });

//   it('Testando se volta 401 quando o token é inválido', async () => {
//     const response = await chai.request(app)
//     .post('/matches')
//     .set('authorization', 'biruleibeleibeibelibeibeleibe');
//     const { status, body } = response;
//     expect(status).to.be.eq(401);
//     expect(body).to.have.property("message").equal("Token must be a valid token");
//   });

  const EQUAL_TEAMS = {
    "homeTeam": 16, 
    "awayTeam": 16,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"

  it('retorna status 422 para partidas com times iguais', async () => {
    const response = await chai.request(app)
    .post('/matches')
    .set('authorization', token)
    .send(EQUAL_TEAMS);
    const { status, body } = response;
    expect(status).to.be.eq(422);
    expect(body).to.have.property("message").equal("It is not possible to create a match with two equal teams");
  });


  const CREATE = {
    "homeTeam": 1, 
    "awayTeam": 2,
    "homeTeamGoals": 3,
    "awayTeamGoals": 4
  }

  it('retorna status 201 ao criar partida', async () => {
    const response = await chai.request(app).post('/matches').set('authorization', token).send(CREATE);
    const { status, body } = response;
    expect(status).to.be.equal(201);
  });
});
