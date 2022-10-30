import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamsModel from '../models/teamModelSequelize';

chai.use(chaiHttp);

const { expect } = chai;

const ARR_TEAMS = [
  { id: 1, teamName: 'Avaí/Kindermann' },
  { id: 2, teamName: 'Bahia' }
];

describe('Testando o /teams', () => {
  describe( 'GET /teams', () => {
    it('Caso de sucesso', async () => {
      const result = await chai.request(app).get('/teams');
      expect(result.status).to.be.equal(200);
      expect(result.body[1]).to.deep.equal(ARR_TEAMS[1]);
      expect(result.body).to.be.an('array');
      expect(result.body[0]).to.have.property('id');
      expect(result.body[0]).to.have.property('teamName');
    });
    // it('Caso de falha', async () => {
    //   const result = await chai.request(app).get('/teams/id/999');
    //   expect(result.status).to.be.equal(404);
    //   expect(result.body).to.be.a('object');
    //   expect(result.body).to.have.property('message');
    // }
    // );
  });
});

describe('Rota GET /:id', () => {

  it('Caso de sucesso', async () => {
    const result = await chai.request(app).get('/teams/1');    
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.a('object');
    expect(result.body).to.have.property('id');
    expect(result.body).to.have.property('teamName');
  });
  it('Caso de falha', async () => {
    const result = await chai.request(app).get('/teams/999');
    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.a('object');
    expect(result.body).to.have.property('message');
  });
});