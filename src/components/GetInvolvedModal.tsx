import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Copy, 
  Check,
  Building2,
  Trophy,
  GraduationCap,
  Users,
  Activity,
  HeartHandshake
} from 'lucide-react';
import { StakeholderRole } from '../types';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface GetInvolvedModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: StakeholderRole;
}

interface RoleOption {
  id: StakeholderRole;
  label: string;
  icon: React.ElementType;
  quickNeeds: string[];
}

const ROLES: RoleOption[] = [
  {
    id: 'athlete',
    label: 'Player / Athlete',
    icon: Activity,
    quickNeeds: ['Book courts & turfs', 'Find a team / squad', 'Join tournaments', 'Find coaching'],
  },
  {
    id: 'facility_owner',
    label: 'Venue / Turf Owner',
    icon: Building2,
    quickNeeds: ['Fill empty slots', 'Automate bookings', 'List my facility', 'Floodlight control'],
  },
  {
    id: 'academy_coach',
    label: 'Coach / Academy',
    icon: GraduationCap,
    quickNeeds: ['Promote clinics', 'Get new students', 'Reserve group slots', 'Scout talent'],
  },
  {
    id: 'organizer',
    label: 'Tournament Organizer',
    icon: Trophy,
    quickNeeds: ['Team registration', 'Live brackets', 'Book tournament venues', 'Referee coordination'],
  },
  {
    id: 'community_leader',
    label: 'Club / Community',
    icon: Users,
    quickNeeds: ['Host weekly games', 'Recruit players', 'Manage team funds', 'Book home pitch'],
  },
  {
    id: 'enthusiast',
    label: 'Fan / Supporter',
    icon: HeartHandshake,
    quickNeeds: ['Follow local matches', 'Volunteer at events', 'Casual pickup games', 'Get city updates'],
  },
];

export const GetInvolvedModal: React.FC<GetInvolvedModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'athlete',
}) => {
  useBodyScrollLock(isOpen);

  // Form State
  const [selectedRole, setSelectedRole] = useState<StakeholderRole>(defaultRole);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [sport, setSport] = useState('');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  // Status & Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [refId, setRefId] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync role and reset state when opening
  useEffect(() => {
    if (isOpen) {
      setSelectedRole(defaultRole);
      setSubmitted(false);
      setErrorMsg('');
      setCopied(false);
      setIsSubmitting(false);

      // Initialize default needs for the role
      const initialRole = ROLES.find((r) => r.id === defaultRole) || ROLES[0];
      setSelectedNeeds([initialRole.quickNeeds[0]]);
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

  const handleRoleChange = (roleId: StakeholderRole) => {
    setSelectedRole(roleId);
    const targetRole = ROLES.find((r) => r.id === roleId) || ROLES[0];
    setSelectedNeeds([targetRole.quickNeeds[0]]);
  };

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need)
        ? prev.filter((item) => item !== need)
        : [...prev, need]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!fullName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Simulate fast, reliable server submission
    setTimeout(() => {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setRefId(`SH-${randomCode}`);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 350);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setCity('');
    setSport('');
    setNotes('');
    setSubmitted(false);
    onClose();
  };

  const copyRefCode = () => {
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
          transition={{ duration: 0.15 }}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-white dark:bg-[#12171F] border border-[#E5EAED] dark:border-[#2A313C] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5EAED] dark:border-[#2A313C] bg-[#F8FAFC] dark:bg-[#161D26]">
              <div>
                <h2 className="text-xl font-black text-[#11161B] dark:text-white font-display">
                  Get Early Access to Sports Hub
                </h2>
                <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
                  Join athletes, venue operators, coaches, and organizers across your city.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-2 text-[#6B7280] dark:text-[#94A3B8] hover:text-[#11161B] dark:hover:text-white hover:bg-[#E5EAED]/60 dark:hover:bg-[#202836] rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* SUCCESS STATE */}
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="py-6 text-center space-y-5"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#CDFF00]/20 text-[#11161B] dark:text-[#CDFF00] border-2 border-[#CDFF00] shadow-sm">
                      <CheckCircle2 className="w-7 h-7 text-[#11161B] dark:text-[#CDFF00]" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-2xl font-black text-[#11161B] dark:text-white font-display">
                        You&apos;re on the list!
                      </h3>
                      <p className="text-sm text-[#4B5563] dark:text-[#CBD5E1] max-w-sm mx-auto leading-relaxed">
                        Thanks, <strong className="text-[#11161B] dark:text-white font-bold">{fullName}</strong>. We saved your spot for{' '}
                        <strong className="text-[#11161B] dark:text-[#CDFF00] font-bold">{activeRoleObj.label}</strong>.
                      </p>
                    </div>

                    {/* Reference Box */}
                    <div className="max-w-xs mx-auto bg-[#F8FAFC] dark:bg-[#18202B] border border-[#E2E8F0] dark:border-[#2A313C] rounded-xl p-3.5 text-center space-y-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                        Your Access Code
                      </span>
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-mono text-2xl font-black text-[#11161B] dark:text-[#CDFF00]">
                          {refId}
                        </span>
                        <button
                          type="button"
                          onClick={copyRefCode}
                          className="p-1 text-[#64748B] dark:text-[#94A3B8] hover:text-[#11161B] dark:hover:text-[#CDFF00] transition-colors cursor-pointer"
                          title="Copy code"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Simple Next Steps */}
                    <div className="text-xs text-[#64748B] dark:text-[#94A3B8] space-y-1 text-center max-w-sm mx-auto">
                      <p>✓ Confirmation sent to <strong className="text-[#11161B] dark:text-white">{email}</strong></p>
                      <p>✓ We will notify you as soon as early access opens in your area.</p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2.5 bg-[#CDFF00] hover:bg-[#b8e600] text-[#11161B] font-black text-xs rounded-xl transition-all cursor-pointer shadow-sm inline-flex items-center gap-1.5"
                      >
                        <span>Got It, Thanks</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* SIMPLE ONE-PAGE FORM */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* 1. I am a: (Role Selector) */}
                    <div>
                      <label className="block text-xs font-bold text-[#11161B] dark:text-white uppercase tracking-wider mb-2">
                        1. I am a...
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {ROLES.map((r) => {
                          const isSelected = selectedRole === r.id;
                          const IconComp = r.icon;
                          return (
                            <button
                              type="button"
                              key={r.id}
                              onClick={() => handleRoleChange(r.id)}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                                isSelected
                                  ? 'bg-[#F8FFD9] dark:bg-[#1E2836] border-[#11161B] dark:border-[#CDFF00] text-[#11161B] dark:text-[#CDFF00] ring-1 ring-[#11161B] dark:ring-[#CDFF00] shadow-sm font-bold'
                                  : 'bg-white dark:bg-[#151C25] border-[#E2E8F0] dark:border-[#2A313C] text-[#475569] dark:text-[#CBD5E1] hover:border-[#CBD5E1] dark:hover:border-[#4B5563] dark:hover:bg-[#1C2532]'
                              }`}
                            >
                              <IconComp className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#11161B] dark:text-[#CDFF00]' : 'text-[#64748B] dark:text-[#94A3B8]'}`} />
                              <span className="text-xs truncate">{r.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Contact Details (Clean 2-Column Grid) */}
                    <div className="space-y-3 pt-1">
                      <label className="block text-xs font-bold text-[#11161B] dark:text-white uppercase tracking-wider">
                        2. Your Details
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-[#374151] dark:text-[#CBD5E1] mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Alex Morgan"
                            className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#18202B] border border-[#CBD5E1] dark:border-[#2E3846] text-[#11161B] dark:text-white placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] rounded-xl focus:outline-none focus:border-[#11161B] dark:focus:border-[#CDFF00] focus:ring-1 focus:ring-[#11161B] dark:focus:ring-[#CDFF00] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-[#374151] dark:text-[#CBD5E1] mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="alex@example.com"
                            className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#18202B] border border-[#CBD5E1] dark:border-[#2E3846] text-[#11161B] dark:text-white placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] rounded-xl focus:outline-none focus:border-[#11161B] dark:focus:border-[#CDFF00] focus:ring-1 focus:ring-[#11161B] dark:focus:ring-[#CDFF00] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-[#374151] dark:text-[#CBD5E1] mb-1">
                            City / Location
                          </label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Melbourne, London, Austin"
                            className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#18202B] border border-[#CBD5E1] dark:border-[#2E3846] text-[#11161B] dark:text-white placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] rounded-xl focus:outline-none focus:border-[#11161B] dark:focus:border-[#CDFF00] focus:ring-1 focus:ring-[#11161B] dark:focus:ring-[#CDFF00] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-[#374151] dark:text-[#CBD5E1] mb-1">
                            Primary Sport
                          </label>
                          <input
                            type="text"
                            value={sport}
                            onChange={(e) => setSport(e.target.value)}
                            placeholder="e.g. Football, Tennis, Padel"
                            className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#18202B] border border-[#CBD5E1] dark:border-[#2E3846] text-[#11161B] dark:text-white placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] rounded-xl focus:outline-none focus:border-[#11161B] dark:focus:border-[#CDFF00] focus:ring-1 focus:ring-[#11161B] dark:focus:ring-[#CDFF00] transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3. Quick Goals / Needs (Optional 1-click checkboxes) */}
                    <div className="space-y-2 pt-1">
                      <label className="block text-xs font-bold text-[#11161B] dark:text-white uppercase tracking-wider">
                        3. What are you looking to do? (Select any)
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {activeRoleObj.quickNeeds.map((need) => {
                          const isChecked = selectedNeeds.includes(need);
                          return (
                            <button
                              type="button"
                              key={need}
                              onClick={() => toggleNeed(need)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                                isChecked
                                  ? 'bg-[#11161B] dark:bg-[#CDFF00] text-white dark:text-[#0B0E14] font-black border border-transparent dark:border-[#CDFF00] shadow-sm'
                                  : 'bg-[#F1F5F9] dark:bg-[#18202B] border border-transparent dark:border-[#2A313C] text-[#475569] dark:text-[#CBD5E1] hover:bg-[#E2E8F0] dark:hover:bg-[#202937] dark:hover:border-[#3D4754]'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 text-[#CDFF00] dark:text-[#0B0E14] stroke-[3]" />}
                              <span>{need}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 4. Optional Note */}
                    <div className="space-y-1 pt-1">
                      <label className="block text-xs font-semibold text-[#475569] dark:text-[#CBD5E1]">
                        Anything else you&apos;d like to tell us? (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. We have 4 floodlit pitches looking for an automated booking integration..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#18202B] border border-[#CBD5E1] dark:border-[#2E3846] text-[#11161B] dark:text-white placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] rounded-xl focus:outline-none focus:border-[#11161B] dark:focus:border-[#CDFF00] focus:ring-1 focus:ring-[#11161B] dark:focus:ring-[#CDFF00] transition-colors resize-none"
                      />
                    </div>

                    {/* Error Notice */}
                    {errorMsg && (
                      <div className="text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-xl border border-red-200 dark:border-red-900/50">
                        {errorMsg}
                      </div>
                    )}

                    {/* Submit Bar */}
                    <div className="pt-3 flex items-center justify-between border-t border-[#E5EAED] dark:border-[#2A313C]">
                      <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#CDFF00]" />
                        <span>Free to join · Zero spam</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-3.5 py-2 text-xs font-bold text-[#64748B] dark:text-[#94A3B8] hover:text-[#11161B] dark:hover:text-white transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-5 py-2.5 text-xs font-black text-[#11161B] bg-[#CDFF00] hover:bg-[#b8e600] active:scale-98 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-[#11161B] border-t-transparent rounded-full animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <span>Join Early Access</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GetInvolvedModal;
