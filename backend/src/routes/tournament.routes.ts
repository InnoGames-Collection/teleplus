import { FastifyInstance } from 'fastify';
import { pool } from '../config/database.js';

export async function tournamentRoutes(fastify: FastifyInstance) {
  fastify.get('/active', async () => {
    const tournsRes = await pool.query(
      `SELECT t.*, g.title as game_title, g.category as game_category
       FROM tournaments t
       JOIN games g ON t.game_id = g.game_id
       WHERE t.status = 'ACTIVE'
       ORDER BY t.start_date DESC`
    );

    const tournaments = [];
    for (const tourn of tournsRes.rows) {
      const lbRes = await pool.query(
        `SELECT rank, masked_msisdn, score, prize_etb 
         FROM tournament_entries 
         WHERE tournament_id = $1 
         ORDER BY rank ASC 
         LIMIT 10`,
        [tourn.id]
      );
      tournaments.push({
        ...tourn,
        leaderboard: lbRes.rows,
      });
    }

    return { tournaments };
  });
}
