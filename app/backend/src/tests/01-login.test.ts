// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('teste da rota /login', () => {
  it('Caso de sucesso => Login permitindo acesso com dados válidos pelo front end', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });
    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.property('token');
  });
});
describe('Rota POST /', () => {
  it('Caso de falha => Campo email vazio', async () => {
    const result = await chai.request(app).post('/login').send({
      email: '',
      password: 'secret_admin',
    });
    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.a('object');
    expect(result.body).to.have.property('message');
    expect(result.body.message).to.be.equal('All fields must be filled');
  });

  it('Caso de falha => Campo password vazio', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: '',
    });
    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.a('object');
    expect(result.body).to.have.property('message');
    expect(result.body.message).to.be.equal('All fields must be filled');
  });
  it('Caso de falha => Campo email e password vazio', async () => {
    const result = await chai.request(app).post('/login').send({
      email: '',
      password: '',
    });
    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.a('object');
    expect(result.body).to.have.property('message');
    expect(result.body.message).to.be.equal('All fields must be filled');
  });

  it('Caso de falha => Campo email errado', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'ximbinha@calipso.com',
      password: 'secret_admin',
    });
    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.a('object');
    expect(result.body).to.have.property('message');
    expect(result.body.message).to.be.equal('Incorrect email or password');
  });
  it('Caso de falha => Caso password errado', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'biruleibe',
    });
    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.a('object');
    expect(result.body).to.have.property('message');
    expect(result.body.message).to.be.equal('Incorrect email or password');
  });


  describe("Testando a validação do Token =>", () => {
    it("Testando se volta erro 401 e mensagem 'Token not found' quando o token não é encontrado ", async () => {
      const response = await chai.request(app).get("/login/validate");
      const { status, body } = response;
      expect(status).to.be.eq(401);
      expect(body).to.have.property("message");
      expect(body).to.deep.eq({ message: "Token not found" });
    });
  
    it("retorna status 200 ao enviar token válido", async () => {
      const ADM_LOGIN = {
        email: "admin@admin.com",
        password: "secret_admin",
      }
      const response = await chai.request(app).post("/login").send(ADM_LOGIN);
      const token = response.body.token;
      const newResponse = await chai.request(app).get("/login/validate").set("authorization", token);
      const { status, body } = newResponse;
      expect(status).to.be.equal(200);
      expect(body).to.have.property("role");
      expect(body).to.be.equal({ role: "admin" });
    });
  });
});