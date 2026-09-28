/**
 * TelePlus - Color Switch 7-Day Weekly Competition Leaderboard
 * 
 * Strict Requirements:
 * - Dedicated ONLY to the active Color Switch 7-day competition
 * - NO other game leaderboards here (they remain inside individual game menus)
 * - Public identity strictly masked: e.g. 2519*****22
 * - NO player names, NO full MSISDNs
 * - Displays: Rank, Masked MSISDN, 7-Day Score
 */

import React, { useMemo } from 'react';
import { UserProfile, GameDefinition } from '../types';
import { ColorSwitchCompetitionService } from '../services/colorSwitchCompetitionService';
import { GameCatalog } from '../services/gameCatalog';
import { catalogGameToDefinition } from '../games/registry';
import { 
  Trophy, 
  Play, 
  Crown, 
  Medal,
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface LeaderboardPageProps {
  profile: UserProfile;
  games?: GameDefinition[];
  onPlayGame?: (game: GameDefinition) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({
  profile,
  games = [],
  onPlayGame,
}) => {
  const leaderboardData = useMemo(() => {
    return ColorSwitchCompetitionService.getLeaderboard(profile);
  }, [profile]);

  const colorSwitchGame = useMemo(() => {
    const fromList = games.find((g) => g.id === 'crazy-colors');
    if (fromList) return fromList;
    const fromCat = GameCatalog.getById('crazy-colors');
    return fromCat ? catalogGameToDefinition(fromCat) : null;
  }, [games]);

  const handlePlayChallenge = () => {
    if (colorSwitchGame && onPlayGame) {
      onPlayGame({
        ...colorSwitchGame,
        launchContext: 'weekly-challenge',
      });
    }
  };

  const { competition, entries, userRank, userScore } = leaderboardData;

  return (
    <div className="min-h-screen bg-white text-[#17202A] pb-24 select-none">
      <div className="max-w-md md:max-w-xl lg:max-w-3xl mx-auto px-3.5 sm:px-4 pt-3 space-y-4">
        
        {/* =========================================================================
            1. HEADER BANNER: COLOR SWITCH 7-DAY LEADERBOARD
           ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#1688C9] to-[#0e6395] text-white shadow-md space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider">
              <Trophy className="w-3 h-3 text-[#8BCB3D]" />
              <span>7-DAY COMPETITION</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-extrabold text-blue-100 bg-black/15 px-2.5 py-0.5 rounded-full">
              <Calendar className="w-3 h-3" />
              <span>{competition.formattedTimeRemaining}</span>
            </div>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
              COLOR SWITCH
            </h1>
            <div className="text-xs sm:text-sm font-extrabold text-blue-100 uppercase tracking-wider">
              7-DAY LEADERBOARD
            </div>
          </div>

          <p className="text-xs text-blue-100/90 leading-relaxed pt-1">
            Top rankings based on accumulated 7-day competition scores.
          </p>
        </div>

        {/* =========================================================================
            2. USER STANDING CARD
           ========================================================================= */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1688C9] text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
              #{userRank}
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Your 7-Day Standing
              </div>
              <div className="text-sm font-black text-[#17202A] font-mono">
                {leaderboardData.competition ? 'Active Competitor' : 'Unranked'}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              7-Day Score
            </div>
            <div className="text-base sm:text-lg font-black font-mono text-[#1688C9]">
              {userScore.toLocaleString()} <span className="text-xs text-slate-400 font-sans font-bold">pts</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. TOP RANKINGS TABLE (Rank | Masked MSISDN | 7-Day Score)
           ========================================================================= */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 px-3">
            <span>Rank & Player</span>
            <span>7-Day Score</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden divide-y divide-slate-100">
            {entries.map((entry) => {
              const isFirst = entry.rank === 1;
              const isSecond = entry.rank === 2;
              const isThird = entry.rank === 3;

              return (
                <div
                  key={entry.playerId}
                  className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors ${
                    entry.isCurrentUser
                      ? 'bg-blue-50/80 border-l-4 border-l-[#1688C9]'
                      : 'hover:bg-slate-50/70'
                  }`}
                >
                  {/* Left: Rank & Masked MSISDN */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Badge */}
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 font-mono shadow-2xs">
                      {isFirst ? (
                        <div className="w-full h-full rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-xs">
                          <Crown className="w-4 h-4 fill-current" />
                        </div>
                      ) : isSecond ? (
                        <div className="w-full h-full rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
                          <Medal className="w-4 h-4" />
                        </div>
                      ) : isThird ? (
                        <div className="w-full h-full rounded-xl bg-amber-700 text-amber-100 flex items-center justify-center">
                          <Medal className="w-4 h-4" />
                        </div>
                      ) : (
                        <span className="text-slate-500 font-bold">{entry.rank}</span>
                      )}
                    </div>

                    {/* Masked MSISDN (NO NAMES) */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-[#17202A]">
                          {entry.maskedMsisdn}
                        </span>
                        {entry.isCurrentUser && (
                          <span className="px-1.5 py-0.5 rounded bg-[#1688C9] text-white text-[8px] font-black uppercase tracking-wider">
                            YOU
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: 7-Day Score */}
                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-black font-mono text-[#1688C9]">
                      {entry.sevenDayScore.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 ml-1">pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            4. QUICK CALL-TO-ACTION: PLAY COLOR SWITCH CHALLENGE
           ========================================================================= */}
        {onPlayGame && (
          <div className="pt-2">
            <button
              type="button"
              onClick={handlePlayChallenge}
              className="w-full py-3 rounded-2xl bg-[#8BCB3D] hover:bg-[#7cb934] active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play Color Switch Weekly Challenge</span>
            </button>
          </div>
        )}

        {/* Privacy verification notice */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8BCB3D] shrink-0" />
          <span>telebirr Verified Competition • Masked MSISDN Privacy Protected</span>
        </div>

      </div>
    </div>
  );
};
