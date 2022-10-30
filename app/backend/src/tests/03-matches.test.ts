import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('get no /matches retorna os matches =>', async () => {
  const ADM_LOGIN_FAKE = {
    email: 'user@com',
    password: 'seret_user',
  };

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
  it('get no /matches sem token recebe erro =>', async () => {
    const result = await chai.request(app).get('/matches').send({ADM_LOGIN_FAKE});
    expect(result.status).to.be.equal(401);
    expect(result.body).to.have.property('message');
  });
});

