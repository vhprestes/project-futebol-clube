import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.getLeaderboardHome);
router.get('/away', leaderboardController.getLeaderboardAway);
router.get('/', leaderboardController.getLeaderboard);

export default router;
