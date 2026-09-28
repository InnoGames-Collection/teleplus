import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Gamepad2, 
  Trophy, 
  Receipt, 
  ShieldCheck, 
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'SUBSCRIBERS' | 'GAMES' | 'TOURNAMENTS'>('DASHBOARD');
  const [metrics, setMetrics] = useState({
    activeSubscribers: 8920,
    totalPlayers: 15400,
    activeTournaments: 2,
    fraudIncidentsBlocked: 14,
    portalRevenueEtb: 17840,
  });
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/dashboard');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
      const subsRes = await fetch('/api/admin/subscribers');
      if (subsRes.ok) {
        const data = await subsRes.json();
        setSubscribers(data);
      }
      const gamesRes = await fetch('/api/admin/games');
      if (gamesRes.ok) {
        const data = await gamesRes.json();
        setGames(data);
      }
    } catch {
      // Fallback to sample data in dev
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const toggleGame = async (gameId: string) => {
    try {
      await fetch(`/api/admin/games/${gameId}/toggle`, { method: 'POST' });
      setGames(games.map(g => g.game_id === gameId ? { ...g, is_enabled: !g.is_enabled } : g));
    } catch {
      setGames(games.map(g => g.game_id === gameId ? { ...g, is_enabled: !g.is_enabled } : g));
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-sky-500/20">
              TP
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-wide text-white">TelePlus Admin</h1>
              <p className="text-[11px] text-slate-400 font-medium">Telecom Operations Console</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('DASHBOARD')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'DASHBOARD' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab('SUBSCRIBERS')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'SUBSCRIBERS' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Users size={18} /> Subscribers (Shortcode 9898)
            </button>
            <button
              onClick={() => setActiveTab('GAMES')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'GAMES' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Gamepad2 size={18} /> Games Catalog (20+ Titles)
            </button>
            <button
              onClick={() => setActiveTab('TOURNAMENTS')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'TOURNAMENTS' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Trophy size={18} /> Tournaments & Leaderboards
            </button>
          </nav>
        </div>

        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
            <ShieldCheck size={14} /> SP Gateway Connected
          </div>
          <p className="text-[11px]">Shortcode: 9898 | 2 ETB/day</p>
          <p className="text-[10px] text-slate-500 mt-1">Host: 168.119.53.26:8484</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white capitalize">{activeTab.toLowerCase()}</h2>
            <p className="text-xs text-slate-400 mt-1">Ethio Telecom VAS Enterprise Management Portal</p>
          </div>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Probes
          </button>
        </header>

        {activeTab === 'DASHBOARD' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Subscribers</span>
                <div className="text-3xl font-black text-white mt-2">{metrics.activeSubscribers.toLocaleString()}</div>
                <span className="inline-block mt-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Shortcode 9898 (2 ETB/day)
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Registered Players</span>
                <div className="text-3xl font-black text-white mt-2">{metrics.totalPlayers.toLocaleString()}</div>
                <span className="inline-block mt-2 text-xs font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
                  MSISDN OTP Verified
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Tournaments</span>
                <div className="text-3xl font-black text-white mt-2">{metrics.activeTournaments}</div>
                <span className="inline-block mt-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  Weekly Prize Pools
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Anti-Cheat Fraud Blocked</span>
                <div className="text-3xl font-black text-white mt-2">{metrics.fraudIncidentsBlocked}</div>
                <span className="inline-block mt-2 text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                  Zero Tampering Rate
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Telecom VAS Service Overview</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                TelePlus operates as an Ethio Telecom Value-Added Service (VAS). Subscriptions are initiated via SMS shortcode 9898, automatically renewed daily against customer mobile airtime balances, and reported to the game platform via the SP Messaging & Webhook Gateway.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'GAMES' && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Catalog Controller (20+ Titles)</h3>
              <span className="text-xs text-slate-400">{games.length || 23} Available Games</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3.5 font-semibold">Game Title</th>
                  <th className="p-3.5 font-semibold">Category</th>
                  <th className="p-3.5 font-semibold">Max Score/Sec</th>
                  <th className="p-3.5 font-semibold">Max Score</th>
                  <th className="p-3.5 font-semibold">Status</th>
                  <th className="p-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {(games.length > 0 ? games : [
                  { game_id: 'candy-blast', title: 'Candy Blast', category: 'casual', max_score_per_sec: 80, max_score: 50000, is_enabled: true },
                  { game_id: 'color-rush', title: 'Color Rush', category: 'arcade', max_score_per_sec: 20, max_score: 2000, is_enabled: true },
                  { game_id: 'dama', title: 'Ethiopian Dama', category: 'board', max_score_per_sec: 50, max_score: 10000, is_enabled: true },
                  { game_id: 'fruit-slice', title: 'Fruit Slice', category: 'action', max_score_per_sec: 60, max_score: 5000, is_enabled: true },
                  { game_id: 'knife-madness', title: 'Knife Madness', category: 'action', max_score_per_sec: 40, max_score: 10000, is_enabled: true },
                ]).map((g) => (
                  <tr key={g.game_id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5 font-bold text-white">{g.title}</td>
                    <td className="p-3.5 text-slate-400 capitalize">{g.category}</td>
                    <td className="p-3.5 text-slate-400">{g.max_score_per_sec}/s</td>
                    <td className="p-3.5 text-slate-400">{g.max_score.toLocaleString()}</td>
                    <td className="p-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        g.is_enabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {g.is_enabled ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {g.is_enabled ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => toggleGame(g.game_id)}
                        className="text-slate-400 hover:text-white transition"
                      >
                        {g.is_enabled ? <ToggleRight size={22} className="text-sky-400" /> : <ToggleLeft size={22} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'SUBSCRIBERS' && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Subscribers (Shortcode 9898)</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3.5 font-semibold">Masked MSISDN</th>
                  <th className="p-3.5 font-semibold">Tariff Plan</th>
                  <th className="p-3.5 font-semibold">Renewals</th>
                  <th className="p-3.5 font-semibold">Status</th>
                  <th className="p-3.5 font-semibold">Last Billed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { msisdn: '091*****890', plan: 'daily (2 ETB/day)', renews: 14, status: 'ACTIVE', lastBilled: 'Today 08:30' },
                  { msisdn: '092*****122', plan: 'daily (2 ETB/day)', renews: 8, status: 'ACTIVE', lastBilled: 'Today 08:30' },
                  { msisdn: '093*****455', plan: 'daily (2 ETB/day)', renews: 21, status: 'ACTIVE', lastBilled: 'Today 08:30' },
                  { msisdn: '094*****788', plan: 'daily (2 ETB/day)', renews: 2, status: 'ACTIVE', lastBilled: 'Today 08:30' },
                ].map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-3.5 font-mono text-white">{s.msisdn}</td>
                    <td className="p-3.5 text-slate-400">{s.plan}</td>
                    <td className="p-3.5 text-slate-400">{s.renews} days</td>
                    <td className="p-3.5"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">{s.status}</span></td>
                    <td className="p-3.5 text-slate-400">{s.lastBilled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'TOURNAMENTS' && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Color Rush Weekly Championship</h3>
                  <p className="text-xs text-slate-400">Prize Pool: 25,000 ETB | 5 Days Remaining</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">Active</span>
              </div>
              <div className="border-t border-slate-800 pt-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Top Contenders</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs py-1 px-3 bg-slate-950/40 rounded-lg">
                    <span className="font-mono text-white">1. 091*****877</span>
                    <span className="font-bold text-amber-400">1,240 pts — 10,000 ETB</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 px-3 bg-slate-950/40 rounded-lg">
                    <span className="font-mono text-white">2. 092*****455</span>
                    <span className="font-bold text-slate-300">1,180 pts — 6,000 ETB</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 px-3 bg-slate-950/40 rounded-lg">
                    <span className="font-mono text-white">3. 093*****566</span>
                    <span className="font-bold text-amber-600">1,050 pts — 3,000 ETB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
