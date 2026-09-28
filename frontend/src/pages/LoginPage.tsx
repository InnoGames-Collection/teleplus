/**
 * TelePlus - Official Mobile Login Screen
 * 
 * Quality & Structural Reference: EthioFantasy Login Page
 * 
 * Strict Specification:
 * - Pure White Background (#FFFFFF)
 * - Header: [ TELEPLUS LOGO ] on Left, [ ☰ ] on Top Right
 * - Promotional Area
 * - Login Card (white, rounded-3xl, subtle border & shadow, clean inputs)
 * - Phone Number field
 * - OTP 6-digit code + Get code button (functional)
 * - Sign in button (prominent, centered, rounded)
 * - Subscribe button below card (EXACT wording: "Subscribe")
 *   Tapping opens SMS composer to recipient 9898 with body "OK"
 * - Supporting information below Subscribe
 */

import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { AuthService } from '../services/authService';
import { TelePlusLogo } from '../components/GoPlayLogo';
import { 
  Menu, 
  Phone, 
  KeyRound, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (profile: UserProfile) => void;
  onOpenMenu?: () => void;
  showToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, desc?: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onOpenMenu,
  showToast,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('0911428890');
  const [otpCode, setOtpCode] = useState('');
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [demoCodeHint, setDemoCodeHint] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  const [showSmsFallback, setShowSmsFallback] = useState(false);

  // Timer countdown for resending code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleGetCode = async () => {
    if (!phoneNumber || phoneNumber.trim().length < 9) {
      showToast('error', 'Invalid Phone', 'Please enter a valid EthioTelecom mobile number.');
      return;
    }

    setIsRequestingOtp(true);
    const res = await AuthService.requestOtp(phoneNumber);
    setIsRequestingOtp(false);

    if (res.success) {
      setOtpSent(true);
      setDemoCodeHint(res.demoOtp || '123456');
      setCountdown(60);
      showToast('info', 'Verification Code Sent', res.message);
    } else {
      showToast('error', 'Request Failed', res.message);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim().length !== 6) {
      showToast('warning', 'Invalid OTP', 'Please enter the complete 6-digit verification code.');
      return;
    }

    setIsVerifying(true);
    const res = await AuthService.verifyOtp(phoneNumber, otpCode.trim());
    setIsVerifying(false);

    if (res.success && res.profile) {
      showToast('success', 'Authentication Successful', res.message);
      onLoginSuccess(res.profile);
    } else {
      showToast('error', 'Authentication Failed', res.message);
    }
  };

  const triggerSmsComposer = () => {
    const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const smsUrl = isIOS ? 'sms:9898&body=OK' : 'sms:9898?body=OK';

    try {
      // Create hidden anchor to trigger SMS scheme safely without leaving page
      const link = document.createElement('a');
      link.href = smsUrl;
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.location.href = smsUrl;
    }
  };

  const handleSubscribeClick = () => {
    triggerSmsComposer();
    // Open fallback details sheet for non-SMS browsers/tablets or clarification
    setShowSmsFallback(true);
  };

  const isSignInDisabled = isVerifying || otpCode.trim().length !== 6;

  return (
    <div className="min-h-screen bg-white text-[#17202A] flex flex-col justify-between p-4 sm:p-6 font-['Plus_Jakarta_Sans',sans-serif] select-none">
      
      {/* =========================================================================
          1. TOP HEADER: [ TELEPLUS LOGO ] on Left, [ ☰ ] on Top Right
         ========================================================================= */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between py-2 min-h-[48px]">
        <div className="flex items-center">
          <TelePlusLogo size="sm" />
        </div>

        {onOpenMenu && (
          <button
            id="login-main-menu-btn"
            type="button"
            onClick={onOpenMenu}
            aria-label="Open Menu"
            className="p-2 rounded-xl text-[#17202A] hover:bg-slate-100 active:scale-95 transition-colors cursor-pointer border border-slate-200/80 shadow-2xs"
            title="Menu"
          >
            <Menu className="w-5 h-5 stroke-[2.2]" />
          </button>
        )}
      </header>

      {/* =========================================================================
          2. MAIN CONTENT AREA
         ========================================================================= */}
      <div className="w-full max-w-md mx-auto my-auto space-y-4 py-2">
        
        {/* Promotional Banner */}
        <div 
          id="login-promo-banner"
          className="relative rounded-3xl bg-gradient-to-br from-[#1688C9] via-[#1276ae] to-[#0e5c89] text-white p-5 shadow-sm overflow-hidden border border-blue-200/20"
        >
          <div className="relative z-10 space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8BCB3D] text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3 h-3" />
              <span>OFFICIAL ETHIOTELECOM GAMING</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Play & Win TeleBirr & Airtime Prizes
            </h1>

            <p className="text-xs text-blue-100 leading-relaxed max-w-xs font-medium">
              Compete in weekly competitions, climb the 7-day leaderboards and claim verified rewards.
            </p>
          </div>

          <div className="absolute -right-6 -bottom-8 w-28 h-28 bg-[#8BCB3D]/20 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* =========================================================================
            3. LOGIN CARD (Pure White, Rounded-3xl, Subtle Border & Shadow)
           ========================================================================= */}
        <div 
          id="login-signin-card"
          className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-md space-y-4"
        >
          <div className="space-y-1">
            <h2 className="text-lg font-black text-[#17202A] tracking-tight">Sign In</h2>
            <p className="text-xs text-slate-500 font-medium">
              Enter your EthioTelecom phone number to access your account.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-3.5">
            {/* Phone Number Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-500 font-bold text-xs pointer-events-none">
                  <Phone className="w-4 h-4 text-[#1688C9]" />
                  <span>+251</span>
                </div>
                <input
                  id="login-phone-input"
                  type="tel"
                  value={phoneNumber.replace(/^\+251\s?/, '')}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="91 123 4567"
                  required
                  className="w-full pl-20 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[#17202A] font-mono text-sm font-semibold focus:border-[#1688C9] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* OTP / 6-digit code Field with GET CODE button */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  OTP / 6-Digit Code
                </label>
                {otpSent && countdown > 0 && (
                  <span className="text-[10px] text-slate-400 font-mono font-bold">
                    Resend in {countdown}s
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="login-otp-input"
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="6-digit code"
                    className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[#17202A] font-mono text-sm font-bold tracking-widest focus:border-[#1688C9] focus:bg-white focus:outline-none transition-colors text-center"
                  />
                </div>

                <button
                  id="login-get-code-btn"
                  type="button"
                  onClick={handleGetCode}
                  disabled={isRequestingOtp || countdown > 0}
                  className="px-4 py-3 bg-[#1688C9] hover:bg-[#1276ae] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs rounded-2xl transition-all shrink-0 active:scale-95 cursor-pointer shadow-2xs"
                >
                  {isRequestingOtp ? 'Sending...' : countdown > 0 ? `${countdown}s` : 'Get code'}
                </button>
              </div>

              {/* Demo Quick Hint */}
              {demoCodeHint && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between">
                  <span>Demo Code: <strong>{demoCodeHint}</strong></span>
                  <button
                    type="button"
                    onClick={() => setOtpCode(demoCodeHint)}
                    className="text-[#8BCB3D] underline text-[11px] font-black hover:text-[#7cb934] cursor-pointer"
                  >
                    Auto-Fill
                  </button>
                </div>
              )}
            </div>

            {/* Primary Action: SIGN IN */}
            <button
              id="login-signin-submit-btn"
              type="submit"
              disabled={isSignInDisabled}
              className="w-full py-3.5 rounded-2xl bg-[#1688C9] hover:bg-[#1276ae] disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-sm active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>{isVerifying ? 'Verifying...' : 'Sign in'}</span>
            </button>
          </form>
        </div>

        {/* =========================================================================
            4. SUBSCRIBE BUTTON (Below Login Card, EXACT wording: "Subscribe")
           ========================================================================= */}
        <div className="pt-1 space-y-3">
          <button
            id="login-subscribe-btn"
            type="button"
            onClick={handleSubscribeClick}
            className="w-full py-3.5 rounded-2xl bg-[#8BCB3D] hover:bg-[#7cb934] active:scale-[0.98] text-white font-black text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 stroke-[2.5]" />
            <span>Subscribe</span>
          </button>

          {/* Supporting Information */}
          <div className="flex flex-col items-center gap-1 text-[11px] text-slate-400 text-center font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8BCB3D]" />
              <span>Secured via EthioTelecom Mobile ID Gateway</span>
            </div>
            <div>Direct telebirr billing • Send OK to 9898</div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          5. BOTTOM FOOTER
         ========================================================================= */}
      <footer className="w-full max-w-md mx-auto text-center py-2 text-[10px] text-slate-400 font-bold">
        <span>TelePlus v2.0 • Gaming Edition</span>
      </footer>

      {/* =========================================================================
          6. GRACEFUL SMS FALLBACK MODAL
         ========================================================================= */}
      {showSmsFallback && (
        <div
          id="sms-subscribe-fallback-modal"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowSmsFallback(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl p-5 border border-slate-200 shadow-2xl space-y-4 text-[#17202A] animate-in zoom-in-95 duration-150 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#8BCB3D] flex items-center justify-center shrink-0 border border-emerald-100">
                  <MessageSquare className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#17202A]">Subscribe via SMS</h3>
                  <p className="text-[11px] text-slate-500 font-medium">TelePlus Daily Subscription (2 Birr/day)</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/80">
                <span className="text-slate-500 font-medium">Recipient Number:</span>
                <span className="font-mono font-black text-sm text-[#1688C9]">9898</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">SMS Message:</span>
                <span className="font-mono font-black text-sm text-[#8BCB3D]">OK</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              We opened your device's SMS composer. Please review the recipient (<strong>9898</strong>) and message (<strong>OK</strong>) and press <strong>Send</strong> to confirm your subscription.
            </p>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={triggerSmsComposer}
                className="w-full py-3 rounded-2xl bg-[#8BCB3D] hover:bg-[#7cb934] active:scale-98 text-white font-black text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open SMS Composer Again</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSmsFallback(false)}
                className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
