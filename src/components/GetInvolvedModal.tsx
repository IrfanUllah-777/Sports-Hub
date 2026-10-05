import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Copy, Check } from 'lucide-react';
import { StakeholderRole } from '../types';

interface GetInvolvedModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: StakeholderRole;
}

const ROLES: { id: StakeholderRole; label: string; description: string; detailLabel: string }[] = [
  {
    id: 'athlete',
    label: 'Athlete & Player',
    description: 'Discover tournaments, open trials, facilities, and local teams.',
    detailLabel: 'Primary Sport & Skill Level',
  },
  {
    id: 'facility_owner',
    label: 'Facility Owner / Operator',
    description: 'Increase venue visibility, manage bookings, and list courts or grounds.',
    detailLabel: 'Venue Name & Turf / Court Types',
  },
  {
    id: 'academy_coach',
    label: 'Academy & Coach',
    description: 'Showcase training programs, camps, and attract emerging talent.',
    detailLabel: 'Academy Name & Age Groups Coached',
  },
  {
    id: 'organizer',
    label: 'Tournament Organiser',
    description: 'Promote competitions, manage team registrations, and schedule events.',
    detailLabel: 'Tournament Name & Typical Squads Count',
  },
  {
    id: 'community_leader',
    label: 'Sports Community / Club',
    description: 'Connect recreational players, organize weekly games, and build squads.',
    detailLabel: 'Club / Group Name & Match Frequency',
  },
  {
    id: 'enthusiast',
    label: 'Sports Enthusiast',
    description: 'Stay informed on local sporting events and casual opportunities.',
    detailLabel: 'Sports of Interest & Neighborhood',
  },
];

export const GetInvolvedModal: React.FC<GetInvolvedModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'athlete',
}) => {
  const [selectedRole, setSelectedRole] = useState<StakeholderRole>(defaultRole);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roleDetail, setRoleDetail] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [refId, setRefId] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync role and reset state whenever modal opens or defaultRole changes
  useEffect(() => {
    if (isOpen) {
      setSelectedRole(defaultRole);
      setSubmitted(false);
      setErrorMsg('');
      setCopied(false);
      setIsSubmitting(false);
    }
  }, [isOpen, defaultRole]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  const activeRoleObj = ROLES.find((r) => r.id === selectedRole) || ROLES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name and a valid email address.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please provide a valid email format.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Simulate async network dispatch
    setTimeout(() => {
      const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
      setRefId(`SH-2026-${randomHex}`);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 350);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setRoleDetail('');
    setLocation('');
    setNotes('');
    setSubmitted(false);
    onClose();
  };

  const copyRefId = () => {
    if (refId) {
      navigator.clipboard.writeText(refId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white border border-[#E5EAED] rounded-2xl shadow-xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5EAED] bg-[#F2F3F7]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#CDFF00] border border-[#222222]" />
                  <span className="text-[11px] font-bold tracking-wider text-[#6B7280] uppercase">
                    Sports Hub Early Ecosystem
                  </span>
                </div>
                <h2 className="text-xl font-black text-[#222222] font-display mt-0.5">
                  Get Involved with Sports Hub
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="p-2 text-[#6B7280] hover:text-[#222222] hover:bg-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="submission-success"
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.32,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="py-6 text-center space-y-5"
                  >
                    <motion.div
                      initial={{ scale: 0.65, rotate: -6, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{
                        delay: 0.06,
                        duration: 0.36,
                        type: 'spring',
                        stiffness: 280,
                        damping: 18,
                      }}
                      className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F8FFD9] text-[#222222] border-2 border-[#CDFF00] shadow-xs"
                    >
                      <CheckCircle2 className="w-7 h-7 text-[#222222]" />
                    </motion.div>

                    <div className="space-y-1.5">
                      <h3 className="text-2xl font-black text-[#222222] font-display">
                        Expression of Interest Logged
                      </h3>
                      <p className="text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="font-bold text-[#222222]">{fullName}</span>. Your registration under{' '}
                        <span className="font-bold text-[#222222] bg-[#F8FFD9] px-1.5 py-0.5 rounded border border-[#CDFF00]/60">
                          {activeRoleObj.label}
                        </span>{' '}
                        has been registered in our pilot cohort queue.
                      </p>
                    </div>

                    {/* Reference Ticket Card with subtle delayed entrance */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, duration: 0.28, ease: 'easeOut' }}
                      className="max-w-md mx-auto bg-[#F2F3F7] border border-[#E5EAED] rounded-xl p-4 text-left space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs text-[#6B7280] border-b border-[#E5EAED] pb-2">
                        <span className="font-semibold uppercase tracking-wider">Registration Reference</span>
                        <button
                          onClick={copyRefId}
                          className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#222222] hover:text-[#9ECC00] cursor-pointer"
                        >
                          {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          {copied ? 'Copied' : 'Copy Ref'}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-black text-[#222222]">{refId}</span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Active Priority Queue
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Our ecosystem partnership coordinator will review your profile and contact{' '}
                        <strong className="text-[#222222]">{email}</strong> before rollout in your region.
                      </p>
                    </motion.div>

                    <div className="pt-2 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2.5 bg-[#222222] hover:bg-neutral-800 text-white font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        Done &amp; Continue Exploring
                        <ArrowRight className="w-3.5 h-3.5 text-[#CDFF00]" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="interest-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                  <div className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    Select your primary stakeholder role to receive tailored onboarding updates,
                    slot configuration tools, or priority access to local sporting leagues.
                  </div>

                  {/* Role Selector Grid */}
                  <div>
                    <label className="block text-xs font-bold text-[#222222] mb-2 uppercase tracking-wider">
                      1. Select Your Stakeholder Role
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ROLES.map((role) => {
                        const isSelected = selectedRole === role.id;
                        return (
                          <button
                            type="button"
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={`text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#222222] bg-[#F8FFD9] ring-2 ring-[#CDFF00] shadow-xs'
                                : 'border-[#E5EAED] bg-white hover:border-[#CBD5E1] hover:bg-[#F2F3F7]/50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-[#222222]">{role.label}</span>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-[#CDFF00] ring-2 ring-[#222222]" />
                              )}
                            </div>
                            <div className="text-[#6B7280] leading-snug">{role.description}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4 pt-1">
                    <div className="text-xs font-bold text-[#222222] uppercase tracking-wider">
                      2. Contact &amp; Role Details
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#222222] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5EAED] rounded-lg focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#222222] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@domain.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5EAED] rounded-lg focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#222222] mb-1">
                          {activeRoleObj.detailLabel}
                        </label>
                        <input
                          type="text"
                          value={roleDetail}
                          onChange={(e) => setRoleDetail(e.target.value)}
                          placeholder="e.g. Football / 5-a-side Turf / U14s"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5EAED] rounded-lg focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#222222] mb-1">
                          Target City / Metro Hub
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Melbourne, London, Austin"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5EAED] rounded-lg focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222222] mb-1">
                        How can Sports Hub best support your goals? (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Details about your court slots, squad recruitment, tournament dates, or pilot trial feedback..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5EAED] rounded-lg focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] resize-none"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="text-xs font-semibold text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div className="pt-3 flex items-center justify-between border-t border-[#E5EAED]">
                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Zero spam · Verified pilot onboarding</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#222222] transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2.5 text-xs font-bold text-[#222222] bg-[#CDFF00] hover:bg-[#9ECC00] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-3 h-3 border-2 border-[#222222] border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Expression</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
