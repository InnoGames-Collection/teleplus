/**
 * TelePlus - Official Subscription Page
 * 
 * Strict Requirements:
 * - Single subscription option: DAILY SUBSCRIPTION (2 Birr/day)
 * - Service shortcode: 9898 (replacing 9402)
 * - Required SMS keyword: OK
 * - Action: Send OK to 9898 (using SMS link `sms:9898?body=OK`)
 * - NO weekly/monthly packages, NO coin packages, NO 9402
 */

import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { 
  CreditCard, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  MessageSquare
} from 'lucide-react';

interface SubscriptionPageProps {
  onBack?: () => void;
  showHeader?: boolean;
  profile?: UserProfile;
  onProfileUpdate?: (updated: UserProfile) => void;
}

export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({
  onBack,
  showHeader = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleSubscribeClick = () => {
    // Attempt standard mobile SMS URI scheme: sms:9898?body=OK
    if (typeof window !== 'undefined') {
      try {
        window.location.href = 'sms:9898?body=OK';
      } catch {
        // Fallback to clipboard copy
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white text-[#17202A] pb-24 max-w-md md:max-w-xl lg:max-w-3xl mx-auto px-3.5 pt-3 select-none space-y-4">
      {/* 1. Header with Back Button */}
      {showHeader && (
        <div className="flex items-center justify-between gap-3 bg-[#1688C9] text-white p-3.5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                id="subscription-back-btn"
                onClick={onBack}
                className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 flex items-center gap-1.5 text-white transition-colors cursor-pointer shrink-0 text-xs font-bold"
                aria-label="Go Back"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Go Back</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#8BCB3D] shrink-0" />
              <h1 className="text-base font-black tracking-tight">Subscription</h1>
            </div>
          </div>
        </div>
      )}

      {/* 2. Instruction Banner */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-[#1688C9] space-y-1">
        <div className="font-black text-sm">DAILY SUBSCRIPTION</div>
        <p className="text-slate-700">
          Subscribe for full unlimited access to all 8 TelePlus games:
        </p>
        <div className="font-extrabold text-[#17202A] text-sm pt-1">
          Send <span className="px-2 py-0.5 rounded bg-white font-mono font-black text-[#1688C9] border border-blue-200">OK</span> to <span className="px-2 py-0.5 rounded bg-white font-mono font-black text-[#1688C9] border border-blue-200">9898</span>
        </div>
      </div>

      {/* 3. The ONLY Subscription Package: Daily 2 Birr/day */}
      <div className="p-5 rounded-3xl border-2 border-[#8BCB3D] bg-white shadow-sm space-y-3.5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#8BCB3D] text-white">
              OFFICIAL PLAN
            </span>
            <h2 className="text-xl font-black text-[#17202A] mt-1.5">
              Daily Subscription
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Unlimited access to all skill-based games
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black font-mono text-[#1688C9]">
              2 Birr
            </div>
            <div className="text-[11px] font-bold text-slate-400">per day</div>
          </div>
        </div>

        <ul className="space-y-1.5 text-xs text-slate-700 font-medium pt-2 border-t border-slate-100">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#8BCB3D] shrink-0" />
            <span>Full game access for 24 hours</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#8BCB3D] shrink-0" />
            <span>Participate in Color Switch 7-Day Weekly Competition</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#8BCB3D] shrink-0" />
            <span>Billed directly via SMS shortcode 9898</span>
          </li>
        </ul>

        {/* Action Button */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={handleSubscribeClick}
            className="w-full py-3.5 rounded-2xl bg-[#8BCB3D] hover:bg-[#7cb934] active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Subscribe — 2 Birr/day</span>
          </button>

          <p className="text-[11px] text-center text-slate-500 font-medium">
            Tapping opens your SMS composer to send <strong>OK</strong> to <strong>9898</strong>.
          </p>
        </div>

        {copied && (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center font-bold">
            SMS Keyword "OK" and Shortcode "9898" ready! Send OK to 9898 from your phone.
          </div>
        )}
      </div>

      {/* Instructions details */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
        <div className="flex items-center gap-2 text-[#17202A] font-bold">
          <MessageSquare className="w-4 h-4 text-[#1688C9]" />
          <span>How To Subscribe:</span>
        </div>
        <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1 font-medium">
          <li>Open your phone's SMS messaging app</li>
          <li>Enter recipient number: <strong className="font-mono text-[#17202A]">9898</strong></li>
          <li>Type text: <strong className="font-mono text-[#17202A]">OK</strong></li>
          <li>Press Send</li>
        </ol>
      </div>

      {/* Footer */}
      <div className="pt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-[#8BCB3D] shrink-0" />
        <span>Official TelePlus VAS Service • Shortcode 9898 • 2 Birr/day</span>
      </div>
    </div>
  );
};
