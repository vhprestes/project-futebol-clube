import { Router } from 'express';
import LoginController from '../controllers/loginController';
import loginMiddleware from '../middlewares/loginMiddleware';
// import authenticator from '../middlewares/authenticator';

const router = Router();
const loginController = new LoginController();

router.post('/login', loginMiddleware, (req, res) => loginController.login(req, res));
router.get('/login/validate', (req, res) => loginController.getRole(req, res));

export default router;

// docker rmi $(docker images -q)
// lsof -i tcp:3001
