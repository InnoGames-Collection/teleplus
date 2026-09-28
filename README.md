# TelePlus — Telecom VAS Casual & Hyper-Casual Portal

Enterprise Tier-0 Telecom VAS Service featuring 20+ casual game titles, integrating with Ethio Telecom Shortcode `9898` (2 ETB/day) and the SP Messaging Gateway.

## Topology & Ports (`innoserver-serv001: 34.41.116.217`)
- **Player Web Portal (`3500`)**: `https://teleplus.innopulseplatform.com`
- **Fastify Anti-Cheat API (`3502`)**: `https://teleplus-api.innopulseplatform.com`
- **Telecom Operations Console (`3503`)**: `https://teleplus-admin.innopulseplatform.com`
- **PostgreSQL 16 (`5438`)**: `teleplus` database
- **Valkey 8 (`6388`)**: Session, rate-limiting & OTP cache

## Directory Structure
```text
teleplus/
├── frontend/                     # 20+ casual games player portal
├── admin/                        # Telecom operations console (Subscribers, Catalog, Tournaments)
├── backend/                      # Fastify 5 REST API + SP Shortcode 9898 engine
├── db/migrations/                # PostgreSQL schema migrations
├── deploy/nginx/                 # Host NGINX configuration
├── scripts/                      # server-deploy.sh & remote-deploy.sh
└── docker-compose.server.yml     # Complete 5-service isolated Docker stack
```
