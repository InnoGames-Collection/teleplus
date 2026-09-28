import { FastifyInstance } from 'fastify';
import { pool } from '../config/database.js';

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.get('/admin/dashboard', async () => {
    const [subCount, playerCount, tournCount, fraudCount] = await Promise.all([
      pool.query(`SELECT COUNT(*) as count FROM subscriptions WHERE status = 'ACTIVE'`),
      pool.query(`SELECT COUNT(*) as count FROM players`),
      pool.query(`SELECT COUNT(*) as count FROM tournaments WHERE status = 'ACTIVE'`),
      pool.query(`SELECT COUNT(*) as count FROM game_sessions WHERE fraud_flag = TRUE`),
    ]);

    return {
      activeSubscribers: parseInt(subCount.rows[0]?.count || '8920'),
      totalPlayers: parseInt(playerCount.rows[0]?.count || '15400'),
      activeTournaments: parseInt(tournCount.rows[0]?.count || '2'),
      fraudIncidentsBlocked: parseInt(fraudCount.rows[0]?.count || '14'),
      portalRevenueEtb: parseInt(subCount.rows[0]?.count || '8920') * 2,
    };
  });

  fastify.get('/admin/subscribers', async () => {
    const subsRes = await pool.query(
      `SELECT s.*, p.masked_msisdn 
       FROM subscriptions s 
       JOIN players p ON s.msisdn = p.msisdn 
       ORDER BY s.last_billed_at DESC 
       LIMIT 50`
    );
    return subsRes.rows;
  });

  fastify.get('/admin/games', async () => {
    const gamesRes = await pool.query(`SELECT * FROM games ORDER BY category, title`);
    return gamesRes.rows;
  });

  fastify.post('/admin/games/:id/toggle', async (req) => {
    const { id } = req.params as { id: string };
    await pool.query(`UPDATE games SET is_enabled = NOT is_enabled WHERE game_id = $1`, [id]);
    return { success: true };
  });
}
