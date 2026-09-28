/**
 * TelePlus Subscription Modal
 * 
 * Strict Requirements:
 * - Single subscription: DAILY SUBSCRIPTION (2 Birr/day)
 * - Shortcode: 9898
 * - SMS keyword: OK
 * - Action: Send OK to 9898
 * - No coins
 */

import React, { useState } from 'react';
import { UserProfile, SubscriptionPlan } from '../types';
import { SUBSCRIPTION_PLANS } from '../services/subscriptionService';
import { 
  X, 
  MessageSquare, 
  Check, 
  ShieldCheck, 
  Send,
  Sparkles,
  Zap
} from 'lucide-react';

interface SubscriptionModalProps {
  profile: UserProfile;
  onClose: () => void;
  onSubscribe: (plan: SubscriptionPlan) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  profile,
  onClose,
  onSubscribe,
}) => {
  const [smsTriggered, setSmsTriggered] = useState<boolean>(false);
  const currentPlan = SUBSCRIPTION_PLANS[0];

  const handleOpenSmsComposer = () => {
    setSmsTriggered(true);
    onSubscribe('daily');
    
    try {
      const smsUri = `sms:9898?body=${encodeURIComponent('OK')}`;
      window.location.href = smsUri;
    } catch (e) {
      console.warn('SMS link dispatch fallback', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        id="subscription-modal"
        className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 sm:p-6 relative my-6 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]"
      >
        {/* Close Button */}
        <button
          id="close-subscription-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1688C9] text-white mx-auto mb-2.5 flex items-center justify-center shadow-md">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            TelePlus Gaming Pass
          </h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto mt-0.5">
            Billed via SMS to <strong className="text-[#1688C9] font-bold">9898</strong>.
          </p>
        </div>

        <div className="space-y-4">
          {/* Active Subscription Banner if user is active */}
          {profile.subscription?.isActive && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8BCB3D]" />
                <div>
                  <span className="font-bold text-slate-900">Current Plan: </span>
                  <span className="uppercase font-black text-[#1688C9]">
                    DAILY PASS (2 Birr/day)
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-black text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                ACTIVE
              </span>
            </div>
          )}

          {/* Single Daily Pass Card */}
          <div className="p-4.5 rounded-2xl border-2 border-[#8BCB3D] bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-black text-slate-900">
                  Daily Subscription
                </h4>
                <div className="text-xs text-slate-500 font-medium">
                  24 Hours Unlimited Access
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-[#1688C9] font-mono">
                  2 Birr
                </div>
                <div className="text-[10px] text-slate-400 font-bold">per day</div>
              </div>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200/80 pt-2.5">
              {currentPlan.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#8BCB3D] shrink-0 stroke-[3]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SMS Instruction Prompt */}
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-center space-y-1">
            <div className="text-[#1688C9] font-bold">To Subscribe:</div>
            <div className="text-[#17202A] font-extrabold text-sm">
              Send <span className="px-2 py-0.5 bg-white rounded font-mono border border-blue-200 text-[#1688C9]">OK</span> to <span className="px-2 py-0.5 bg-white rounded font-mono border border-blue-200 text-[#1688C9]">9898</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={handleOpenSmsComposer}
            className="w-full py-3.5 rounded-2xl bg-[#8BCB3D] hover:bg-[#7cb934] active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Subscribe — 2 Birr/day</span>
          </button>

          {smsTriggered && (
            <p className="text-[11px] text-emerald-800 text-center font-medium">
              SMS composer opened to send <strong>OK</strong> to <strong>9898</strong>.
            </p>
          )}

          {/* Trust Footer */}
          <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8BCB3D]" />
            <span>Official TelePlus Service • Shortcode 9898</span>
          </div>
        </div>
      </div>
    </div>
  );
};
