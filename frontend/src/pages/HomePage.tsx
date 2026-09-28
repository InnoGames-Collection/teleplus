/**
 * TelePlus - Official Customer Home Portal
 * 
 * Home Tab Features:
 * - Top Competition Score Area (DAILY SCORE & 7-DAY TOTAL SCORE)
 * - Prominent Color Switch Weekly Challenge section (with daily score, 7-day total, remaining days, Play button)
 * - Featured Carousel of the 8 active games
 * - Category strips & discovery for the 8 official games
 * - Zero coins
 */

import React, { useMemo } from 'react';
import { GameDefinition, UserProfile } from '../types';
import { GameCatalog } from '../services/gameCatalog';
import { EntitlementService } from '../services/entitlementService';
import { catalogGameToDefinition } from '../games/registry';
import { ColorSwitchCompetitionService } from '../services/colorSwitchCompetitionService';
import { FeaturedHeroCarousel } from '../components/FeaturedHeroCarousel';
import { RecentlyPlayedSection } from '../components/RecentlyPlayedSection';
import { GameCategorySection } from '../components/GameCategorySection';
import { Play, Trophy, Calendar, Sparkles, ChevronRight, Flame } from 'lucide-react';

interface HomePageProps {
  games?: GameDefinition[];
  profile: UserProfile;
  onLaunchGame: (game: GameDefinition) => void;
  onOpenDetails?: (game: GameDefinition) => void;
  onOpenBuyCoins?: () => void;
  onNavigateToGames?: (category?: string) => void;
  activeEntitlements?: Record<string, boolean>;
}

export const HomePage: React.FC<HomePageProps> = ({
  games = [],
  profile,
  onLaunchGame,
  onOpenDetails,
  onNavigateToGames,
  activeEntitlements = {},
}) => {
  // 1. Color Switch 7-Day Competition Data
  const compInfo = useMemo(() => {
    return ColorSwitchCompetitionService.getCurrentCompetitionInfo();
  }, []);

  const userScores = useMemo(() => {
    return ColorSwitchCompetitionService.getUserScores(profile);
  }, [profile]);

  // 2. Color Switch Game Definition for Weekly Challenge launch
  const colorSwitchGame = useMemo(() => {
    const fromList = games.find((g) => g.id === 'crazy-colors');
    if (fromList) return fromList;
    const fromCat = GameCatalog.getById('crazy-colors');
    return fromCat ? catalogGameToDefinition(fromCat) : null;
  }, [games]);

  const handleLaunchWeeklyChallenge = () => {
    if (colorSwitchGame) {
      onLaunchGame({
        ...colorSwitchGame,
        launchContext: 'weekly-challenge',
      });
    }
  };

  // 3. Featured & Recommended Games (Strictly from the 8 official games)
  const featuredCatalog = GameCatalog.getFeatured();
  const featuredGames: GameDefinition[] = featuredCatalog.map(catalogGameToDefinition);

  const recommendedCatalog = GameCatalog.getRecommended();
  const recommendedGames: GameDefinition[] = recommendedCatalog.map(catalogGameToDefinition);

  // 4. Recently Played (filtered to the 8 official games)
  const recentlyPlayedIds = EntitlementService.getRecentlyPlayedIds();
  const recentlyPlayedGames = GameCatalog.getRecentlyPlayed(recentlyPlayedIds).map(catalogGameToDefinition);

  // 5. Categories with active games (except "All Games")
  const availableCategories = GameCatalog.getCategoriesWithGames().filter((c) => c !== 'All Games');

  return (
    <div className="min-h-screen bg-white text-[#17202A] pb-24 select-none">
      <div className="max-w-md md:max-w-xl lg:max-w-3xl mx-auto space-y-5 pt-3">
        
        {/* =========================================================================
            1. HOME TOP SCORE AREA (DAILY SCORE | 7-DAY TOTAL)
           ========================================================================= */}
        <div className="px-3.5 sm:px-4">
          <div className="p-4 rounded-2xl bg-[#1688C9] text-white shadow-sm">
            <div className="grid grid-cols-2 divide-x divide-white/20">
              {/* Daily Score */}
              <div className="pr-3 flex flex-col justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-100">
                  DAILY SCORE
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black font-mono">
                    {userScores.todayScore.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-blue-200">pts</span>
                </div>
              </div>

              {/* 7-Day Total Score */}
              <div className="pl-4 flex flex-col justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-100">
                  7-DAY TOTAL
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#8BCB3D]">
                    {userScores.sevenDayTotalScore.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-blue-200">pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. COLOR SWITCH WEEKLY CHALLENGE (Prominent Competition Card)
           ========================================================================= */}
        <div className="px-3.5 sm:px-4">
          <div className="p-4.5 sm:p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white shadow-md relative overflow-hidden border border-slate-700/70">
            {/* Subtle Neon Glow Accents */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#1688C9]/20 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#8BCB3D]/15 blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-3.5">
              {/* Header Badge & Remaining Days */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-[#8BCB3D] fill-current" />
                  <span>WEEKLY CHALLENGE</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#8BCB3D] bg-[#8BCB3D]/10 px-2.5 py-0.5 rounded-full border border-[#8BCB3D]/30">
                  <Calendar className="w-3 h-3" />
                  <span>{compInfo.formattedTimeRemaining}</span>
                </div>
              </div>

              {/* Title & Prompt */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                  COLOR SWITCH
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  Play daily and build your 7-day score.
                </p>
              </div>

              {/* Daily / 7-Day Stats Comparison Strip */}
              <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Today's Score
                  </div>
                  <div className="text-base sm:text-lg font-black font-mono text-white mt-0.5">
                    {userScores.todayScore > 0 ? `${userScores.todayScore.toLocaleString()} pts` : 'Not Played Yet'}
                  </div>
                </div>
                <div className="border-l border-white/10 pl-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    7-Day Total Score
                  </div>
                  <div className="text-base sm:text-lg font-black font-mono text-[#8BCB3D] mt-0.5">
                    {userScores.sevenDayTotalScore.toLocaleString()} pts
                  </div>
                </div>
              </div>

              {/* Competition Status */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-0.5">
                <span>Status: <strong className="text-white">Active (Day {compInfo.currentDayIndex} of 7)</strong></span>
                <span>Contributes to 7-Day Leaderboard</span>
              </div>

              {/* Play Color Switch Challenge Button */}
              <button
                type="button"
                onClick={handleLaunchWeeklyChallenge}
                className="w-full py-3 rounded-2xl bg-[#8BCB3D] hover:bg-[#7cb934] active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play Color Switch Challenge</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. HERO / FEATURED BANNER CAROUSEL
           ========================================================================= */}
        <div className="px-3.5 sm:px-4">
          <FeaturedHeroCarousel
            featuredGames={featuredGames}
            onPlayGame={onLaunchGame}
            onClickDetails={onOpenDetails}
            activeEntitlements={activeEntitlements}
          />
        </div>

        {/* =========================================================================
            4. RECENTLY PLAYED
           ========================================================================= */}
        {recentlyPlayedGames.length > 0 && (
          <div className="px-3.5 sm:px-4">
            <RecentlyPlayedSection
              games={recentlyPlayedGames}
              onPlayGame={onLaunchGame}
            />
          </div>
        )}

        {/* =========================================================================
            5. QUICK CATEGORY PILLS STRIP
           ========================================================================= */}
        <div className="px-3.5 sm:px-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Browse Categories
            </span>
            {onNavigateToGames && (
              <button
                onClick={() => onNavigateToGames('All Games')}
                className="text-xs font-bold text-[#1688C9] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>View All Games</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div 
            className="flex gap-2 overflow-x-auto scrollbar-none pb-1 snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onNavigateToGames?.(cat)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#17202A] font-extrabold text-xs shrink-0 snap-start transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            6. RECOMMENDED SECTION
           ========================================================================= */}
        {recommendedGames.length > 0 && (
          <GameCategorySection
            category="Recommended For You"
            games={recommendedGames}
            onPlayGame={onLaunchGame}
            onClickDetails={onOpenDetails}
            activeEntitlements={activeEntitlements}
          />
        )}

        {/* =========================================================================
            7. CATEGORY HORIZONTAL CAROUSELS
           ========================================================================= */}
        <div className="space-y-6">
          {availableCategories.map((cat) => {
            const catGames = GameCatalog.getByCategory(cat).map(catalogGameToDefinition);
            return (
              <GameCategorySection
                key={cat}
                category={cat}
                games={catGames}
                onPlayGame={onLaunchGame}
                onClickDetails={onOpenDetails}
                activeEntitlements={activeEntitlements}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};
