import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import validation from '../middlewares/authGambi';

const router = Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAll);
router.post('/', validation, matchesController.insert);
router.patch('/:id', matchesController.update);
router.patch('/:id/finish', matchesController.finish);

export default router;
