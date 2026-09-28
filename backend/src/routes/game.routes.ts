import { FastifyInstance } from 'fastify';
import { pool } from '../config/database.js';
import { GameAntiCheat, normalizeMsisdn } from '../services/gameAntiCheat.js';

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.post('/session/start', async (req, reply) => {
    const { msisdn, gameId } = req.body as { msisdn: string; gameId: string };
    if (!msisdn || !gameId) return reply.status(400).send({ error: 'Missing msisdn or gameId' });

    const norm = normalizeMsisdn(msisdn);
    const now = Date.now();
    const token = GameAntiCheat.generateSessionToken(norm, gameId, now);
    const sessionId = `sess_${now}_${Math.floor(Math.random() * 1000)}`;

    await pool.query(
      `INSERT INTO game_sessions (session_id, player_msisdn, game_id, session_token, started_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [sessionId, norm, gameId, token]
    );

    return reply.send({ success: true, sessionId, sessionToken: token });
  });

  fastify.post('/session/submit-score', async (req, reply) => {
    const { sessionId, score, durationSeconds } = req.body as {
      sessionId: string;
      score: number;
      durationSeconds: number;
    };

    if (!sessionId) return reply.status(400).send({ error: 'sessionId is required' });

    const sessRes = await pool.query(
      `SELECT * FROM game_sessions WHERE session_id = $1`,
      [sessionId]
    );

    const session = sessRes.rows[0];
    if (!session) return reply.status(404).send({ error: 'Session not found' });

    const check = await GameAntiCheat.validateScore(session.game_id, score, durationSeconds || 10);
    const isFraud = !check.valid;

    await pool.query(
      `UPDATE game_sessions 
       SET score = $1, completed_at = NOW(), verified = $2, fraud_flag = $3
       WHERE session_id = $4`,
      [score, !isFraud, isFraud, sessionId]
    );

    return reply.send({ success: !isFraud, verified: !isFraud, reason: check.reason });
  });
}
