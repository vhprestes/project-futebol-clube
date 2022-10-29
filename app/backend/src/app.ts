import * as express from 'express';
import LoginRouter from './routers/loginRouter';
import TeamRouter from './routers/teamsRouter';
import matchesRouter from './routers/matchesRouter';
// import loginMiddleware from './middlewares/loginMiddleware';
// import LoginController from './controllers/loginController';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    // const loginController = new LoginController();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(LoginRouter);
    // this.app.post('/login', loginMiddleware, loginController.login);
    this.app.use('/teams', TeamRouter);
    this.app.use('/matches', matchesRouter);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    // this.app.use('/login', LoginRouter);

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };
// comentario p commit
// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
