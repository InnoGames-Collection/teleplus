-- ==============================================================================
-- TelePlus — Baseline Seeds
-- Catalog of 20+ Games, Admin Users, Active Tournaments & Contenders
-- ==============================================================================

-- 1. Default Telecom Admin Users
INSERT INTO admin_users (id, username, email, password_hash, role)
VALUES 
    ('b0000000-0000-0000-0000-000000000001', 'superadmin', 'admin@teleplus.innopulseplatform.com', '$2b$10$7Z/l8K9QZg4e1oU6Qk7sNuR1aLzBvY7p0oQY6dZtLw6oVqZl9rQeS', 'SUPER_ADMIN'),
    ('b0000000-0000-0000-0000-000000000002', 'telecom_auditor', 'auditor@teleplus.innopulseplatform.com', '$2b$10$7Z/l8K9QZg4e1oU6Qk7sNuR1aLzBvY7p0oQY6dZtLw6oVqZl9rQeS', 'AUDITOR')
ON CONFLICT (username) DO NOTHING;

-- 2. Baseline Games Catalog (20+ Games)
INSERT INTO games (game_id, title, category, is_free, requires_coins, is_enabled, max_score_per_sec, max_score)
VALUES
    ('candy-blast', 'Candy Blast', 'casual', true, false, true, 80, 50000),
    ('color-rush', 'Color Rush', 'arcade', false, true, true, 20, 2000),
    ('dama', 'Ethiopian Dama', 'board', true, false, true, 50, 10000),
    ('fruit-slice', 'Fruit Slice', 'action', false, true, true, 60, 5000),
    ('knife-madness', 'Knife Madness', 'action', false, true, true, 40, 10000),
    ('pop-piano', 'Pop Piano Rhythms', 'music', true, false, true, 100, 30000),
    ('royal-water-sort', 'Royal Water Sort', 'puzzle', true, false, true, 50, 5000),
    ('soccer-ping-pong', 'Soccer Ping Pong 3D', 'sports', false, true, true, 30, 2500),
    ('solitaire', 'Classic Solitaire', 'cards', true, false, true, 50, 10000),
    ('helix-jump', 'Helix Jump 3D', 'arcade', false, true, true, 50, 10000),
    ('emoji-iq', 'Emoji IQ Trivia', 'knowledge', true, false, true, 25, 1000),
    ('pop-balloon', 'Balloon Pop Carnival', 'casual', true, false, true, 45, 8000),
    ('bubble-shooter', 'Bubble Shooter Classic', 'casual', true, false, true, 60, 15000),
    ('emoji-fun', 'Emoji Fun Match', 'casual', true, false, true, 35, 3000),
    ('crazy-colors', 'Crazy Color Switch', 'arcade', false, true, true, 25, 2000),
    ('puzzle-block', 'Wood Block Puzzle', 'puzzle', true, false, true, 50, 12000),
    ('world-legends', 'World Legends Historical Trivia', 'knowledge', true, false, true, 30, 5000),
    ('hill-rider', 'Hill Rider 3D', 'racing', false, true, true, 80, 20000),
    ('moto-race', 'Neon Moto Race', 'racing', false, true, true, 90, 25000),
    ('soccer-shooter', 'Penalty Shootout', 'sports', false, true, true, 50, 5000),
    ('sorting-balls', 'Ball Sort Color Tubes', 'puzzle', true, false, true, 40, 4000),
    ('memory-match', 'Brain Memory Challenge', 'knowledge', true, false, true, 30, 3000),
    ('button-soccer', 'Button Soccer Derby', 'sports', true, false, true, 20, 1000)
ON CONFLICT (game_id) DO NOTHING;

-- 3. Active Weekly Tournaments
INSERT INTO tournaments (id, title, game_id, start_date, end_date, prize_pool_etb, status)
VALUES
    ('tourn_color_rush_w39', 'Color Rush Weekly Championship', 'color-rush', NOW() - INTERVAL '2 days', NOW() + INTERVAL '5 days', 25000, 'ACTIVE'),
    ('tourn_knife_madness_w39', 'Knife Madness 3D Showdown', 'knife-madness', NOW() - INTERVAL '2 days', NOW() + INTERVAL '5 days', 15000, 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Contenders for Tournament
INSERT INTO tournament_entries (tournament_id, player_msisdn, masked_msisdn, score, rank, prize_etb)
VALUES
    ('tourn_color_rush_w39', '251911998877', '091*****877', 1240, 1, 10000),
    ('tourn_color_rush_w39', '251922334455', '092*****455', 1180, 2, 6000),
    ('tourn_color_rush_w39', '251933445566', '093*****566', 1050, 3, 3000),
    ('tourn_color_rush_w39', '251944556677', '094*****677', 980, 4, 1000),
    ('tourn_color_rush_w39', '251955667788', '095*****788', 920, 5, 1000)
ON CONFLICT (tournament_id, player_msisdn) DO NOTHING;
