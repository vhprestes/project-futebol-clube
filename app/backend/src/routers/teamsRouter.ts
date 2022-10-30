import { Router } from 'express';
import TeamController from '../controllers/teamController';

const router = Router();
const teamController = new TeamController();

router.get('/', teamController.getAll);
// router.get('/:id', teamController.getById);
router.get('/:id', teamController.getTeam);

export default router;
