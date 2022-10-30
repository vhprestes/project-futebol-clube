import models from '../database/models';

const RAW_QUERY_HOME = `SELECT
team.team_name AS name, ((SUM(matches.home_team_goals > matches.away_team_goals) * 3)
+ SUM(matches.home_team_goals = matches.away_team_goals)) AS totalPoints,
COUNT(matches.home_team) AS totalGames,
SUM(matches.home_team_goals > matches.away_team_goals) AS totalVictories,
SUM(matches.home_team_goals = matches.away_team_goals) AS totalDraws,
SUM(matches.home_team_goals < matches.away_team_goals) AS totalLosses,
SUM(matches.home_team_goals) AS goalsFavor, 
SUM(matches.away_team_goals) AS goalsOwn,
(SUM(matches.home_team_goals) - SUM(matches.away_team_goals)) AS goalsBalance,
FORMAT((((SUM(matches.home_team_goals > matches.away_team_goals) * 3)
+ SUM(matches.home_team_goals 
= matches.away_team_goals))
/ (COUNT(matches.home_team) 
* 3) 
* 100), 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS team
JOIN TRYBE_FUTEBOL_CLUBE.matches AS matches ON team.id = matches.home_team
WHERE matches.in_progress = 0
GROUP BY team.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;`;

const RAW_QUERY_AWAY = `SELECT
team.team_name AS name, ((SUM(matches.away_team_goals > matches.home_team_goals) * 3)
+ SUM(matches.away_team_goals = matches.home_team_goals)) AS totalPoints,
COUNT(matches.away_team) AS totalGames,
SUM(matches.away_team_goals > matches.home_team_goals) AS totalVictories,
SUM(matches.away_team_goals = matches.home_team_goals) AS totalDraws,
SUM(matches.away_team_goals < matches.home_team_goals) AS totalLosses,
SUM(matches.away_team_goals) AS goalsFavor,
SUM(matches.home_team_goals) AS goalsOwn,
(SUM(matches.away_team_goals) - SUM(matches.home_team_goals)) AS goalsBalance,
FORMAT((((SUM(matches.away_team_goals > matches.home_team_goals) * 3)
+ SUM(matches.away_team_goals
= matches.home_team_goals))
/ (COUNT(matches.away_team)
* 3)
* 100), 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS team
JOIN TRYBE_FUTEBOL_CLUBE.matches AS matches ON team.id = matches.away_team
WHERE matches.in_progress = 0
GROUP BY team.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;`;

const RAW_QUERY_BASE = `SELECT
team.team_name AS name, ((SUM(matches.home_team_goals > matches.away_team_goals) * 3)
+ SUM(matches.home_team_goals = matches.away_team_goals)
+ (SUM(matches.away_team_goals > matches.home_team_goals) * 3)
+ SUM(matches.away_team_goals = matches.home_team_goals)) AS totalPoints,
(COUNT(matches.home_team) + COUNT(matches.away_team)) AS totalGames,
(SUM(matches.home_team_goals > matches.away_team_goals)
+ SUM(matches.away_team_goals > matches.home_team_goals)) AS totalVictories,
(SUM(matches.home_team_goals = matches.away_team_goals)
+ SUM(matches.away_team_goals = matches.home_team_goals)) AS totalDraws,
(SUM(matches.home_team_goals < matches.away_team_goals)
+ SUM(matches.away_team_goals < matches.home_team_goals)) AS totalLosses,
(SUM(matches.home_team_goals) + SUM(matches.away_team_goals)) AS goalsFavor,
(SUM(matches.away_team_goals) + SUM(matches.home_team_goals)) AS goalsOwn,
((SUM(matches.home_team_goals) + SUM(matches.away_team_goals))
- (SUM(matches.away_team_goals) + SUM(matches.home_team_goals))) AS goalsBalance,
FORMAT((((SUM(matches.home_team_goals > matches.away_team_goals) * 3)
+ SUM(matches.home_team_goals = matches.away_team_goals)
+ (SUM(matches.away_team_goals > matches.home_team_goals) * 3)
+ SUM(matches.away_team_goals = matches.home_team_goals))
/ ((COUNT(matches.home_team) + COUNT(matches.away_team)) * 3) * 100), 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS team
JOIN TRYBE_FUTEBOL_CLUBE.matches AS matches ON team.id = matches.home_team
OR team.id = matches.away_team
WHERE matches.in_progress = 0
GROUP BY team.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;`;

class LeaderboardServices {
  public getLeaderboardHome = async () => {
    const [homeLeaderboard] = await models.query(RAW_QUERY_HOME);
    return homeLeaderboard;
  };

  public getLeaderboardAway = async () => {
    const [awayLeaderboard] = await models.query(RAW_QUERY_AWAY);
    return awayLeaderboard;
  };

  public getLeaderboard = async () => {
    const [leaderboard] = await models.query(RAW_QUERY_BASE);
    return leaderboard;
  };
}

export default LeaderboardServices;

// fonte: https://sequelize.org/docs/v6/core-concepts/raw-queries/ <- Danilo no slack
// https://www.youtube.com/watch?v=NdJ87XOcRBM
