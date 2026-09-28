import { cleanEnv, str, port, num } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  PORT: port({ default: 3502 }),
  ADMIN_PORT: port({ default: 3503 }),
  HOST: str({ default: '0.0.0.0' }),
  DOMAIN: str({ default: 'innopulseplatform.com' }),

  // PostgreSQL
  DATABASE_URL: str({ default: 'postgresql://postgres:postgres@localhost:5432/teleplus' }),
  DB_MAX_CONNECTIONS: num({ default: 20 }),

  // Valkey / Redis
  VALKEY_URL: str({ default: 'redis://localhost:6379' }),

  // Security & Secrets
  JWT_SECRET: str({ default: 'teleplus-telecom-jwt-secret-key-prod-2026' }),
  JWT_ACCESS_EXPIRES_IN: str({ default: '24h' }),
  GAME_TOKEN_SECRET: str({ default: 'teleplus-anti-cheat-round-token-secret-2026' }),

  // Telecom SP Gateway (SDP)
  SP_GATEWAY_URL: str({ default: 'http://168.119.53.26:8484' }),
  SP_API_KEY: str({ default: 'teleplus-sp-api-key-2026' }),
  SP_WEBHOOK_SECRET: str({ default: 'teleplus-hmac-webhook-secret-2026' }),
  SP_SERVICE_ID: str({ default: 'srv_teleplus_daily' }),
  SHORTCODE: str({ default: '9898' }),
});
