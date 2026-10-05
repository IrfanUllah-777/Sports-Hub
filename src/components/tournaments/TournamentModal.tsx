import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trophy, 
  Users, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldAlert,
  Medal,
  Swords
} from 'lucide-react';
import { Tournament } from '../../types';
import { useSportsStore } from '../../lib/sportsStore';

interface TournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournament: Tournament | null;
}

export const TournamentModal: React.FC<TournamentModalProps> = ({
  isOpen,
  onClose,
  tournament,
}) => {
  const { registerTeamForTournament, currentUser } = useSportsStore();

  const [activeTab, setActiveTab] = useState<'fixtures' | 'register'>('fixtures');
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState(currentUser.name);
  const [contact, setContact] = useState(currentUser.phone);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab('fixtures');
      setTeamName('');
      setCaptainName(currentUser.name);
      setContact(currentUser.phone);
      setFormError(null);
      setSuccessMsg(null);
    }
  }, [isOpen, currentUser]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen || !tournament) return null;

  const isFull = tournament.registeredTeams.length >= tournament.squadCapacity;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !captainName.trim() || !contact.trim()) {
      setFormError('Please enter team name, captain name, and valid phone number.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const res = await registerTeamForTournament({
      tournamentId: tournament.id,
      teamName,
      captainName,
      contact,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSuccessMsg(`Team "${teamName}" registered! You are squad #${tournament.registeredTeams.length + 1} of ${tournament.squadCapacity}.`);
    } else {
      setFormError(res.error || 'Failed to register squad.');
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tournament-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#E5EAED] overflow-hidden text-[#222222]"
        >
          {/* Header */}
          <div className="bg-[#0A0D14] text-white p-5 sm:p-6 flex items-start justify-between border-b border-neutral-800">
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#CDFF00]">
                <Trophy className="w-3.5 h-3.5" />
                <span>Sanctioned Tournament &amp; Championship Hub</span>
              </div>
              <h2 id="tournament-modal-title" className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
                {tournament.name}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#CDFF00]" />
                  {tournament.venueName}, {tournament.city}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#CDFF00]" />
                  {tournament.startDate} to {tournament.endDate}
                </span>
                <span>·</span>
                <span className="text-[#CDFF00] font-bold">{tournament.prizePool}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close tournament modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center border-b border-[#E5EAED] bg-[#F2F3F7] px-6">
            <button
              type="button"
              onClick={() => setActiveTab('fixtures')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'fixtures'
                  ? 'border-[#222222] text-[#222222] bg-white'
                  : 'border-transparent text-[#6B7280] hover:text-[#222222]'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Fixtures &amp; Brackets</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'border-[#222222] text-[#222222] bg-white'
                  : 'border-transparent text-[#6B7280] hover:text-[#222222]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Squad Registration ({tournament.registeredTeams.length}/{tournament.squadCapacity})</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {/* TAB 1: FIXTURES & BRACKETS */}
            {activeTab === 'fixtures' && (
              <div className="space-y-6">
                {/* Status Bar */}
                <div className="p-3.5 bg-[#F8FFD9] border border-[#CDFF00] rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#222222]">
                    <Medal className="w-4 h-4 text-[#9ECC00]" />
                    <span className="font-bold">Format: Single Elimination Knockout Bracket</span>
                  </div>
                  <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-[#CDFF00] font-bold">
                    Official Seedings
                  </span>
                </div>

                {/* Brackets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tournament.brackets.map((round) => (
                    <div key={round.roundName} className="space-y-3">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[#222222] pb-1 border-b border-[#E5EAED]">
                        {round.roundName}
                      </div>
                      <div className="space-y-2.5">
                        {round.matches.map((m) => (
                          <div 
                            key={m.matchId} 
                            className="p-3 bg-[#F2F3F7] rounded-xl border border-[#E5EAED] space-y-1.5 text-xs hover:border-[#222222] transition-colors"
                          >
                            <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                              <span>{m.timeSlot || 'Scheduled'}</span>
                              <span className="font-mono text-[10px] font-bold">Match #{m.matchId.replace('m-', '')}</span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between font-bold text-[#222222] bg-white p-1.5 rounded border border-[#E5EAED]">
                                <span className="truncate">{m.teamA}</span>
                                <span className="font-mono text-xs">{m.scoreA !== undefined ? m.scoreA : '-'}</span>
                              </div>
                              <div className="flex items-center justify-between font-bold text-[#222222] bg-white p-1.5 rounded border border-[#E5EAED]">
                                <span className="truncate">{m.teamB}</span>
                                <span className="font-mono text-xs">{m.scoreB !== undefined ? m.scoreB : '-'}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Registered Squads List */}
                <div className="pt-4 border-t border-[#E5EAED]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2.5">
                    Confirmed Registered Squads ({tournament.registeredTeams.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tournament.registeredTeams.map((team, idx) => (
                      <div 
                        key={team.teamName}
                        className="p-2.5 bg-white border border-[#E5EAED] rounded-lg text-xs flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[10px] bg-[#F2F3F7] w-5 h-5 rounded flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-[#222222]">{team.teamName}</span>
                        </div>
                        <span className="text-[11px] text-[#6B7280]">Capt. {team.captain}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SQUAD REGISTRATION */}
            {activeTab === 'register' && (
              <div className="space-y-6">
                {isFull ? (
                  <div className="p-8 text-center bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                    <ShieldAlert className="w-8 h-8 text-amber-600 mx-auto" />
                    <div className="text-sm font-bold text-amber-900">Tournament Capacity Full</div>
                    <p className="text-xs text-amber-700 max-w-md mx-auto">
                      All {tournament.squadCapacity} squad spots have been claimed. You can join the reserve waitlist by contacting the tournament director.
                    </p>
                  </div>
                ) : successMsg ? (
                  <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <div className="text-base font-extrabold text-emerald-950">Registration Complete!</div>
                    <p className="text-xs text-emerald-800">{successMsg}</p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('fixtures')}
                      className="px-5 py-2 bg-[#222222] text-[#CDFF00] text-xs font-bold rounded-lg cursor-pointer"
                    >
                      View in Tournament Fixtures
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* Capacity Indicator */}
                    <div className="p-3 bg-[#F2F3F7] rounded-xl flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#4B5563]">Registration Fee: ${tournament.entryFee} per squad</span>
                      <span className="font-bold text-[#222222]">
                        {tournament.squadCapacity - tournament.registeredTeams.length} Spots Remaining
                      </span>
                    </div>

                    {formError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                        Squad / Club Team Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. Northern Wolves FC"
                        className="w-full px-3.5 py-2.5 bg-[#F2F3F7] border border-[#E5EAED] rounded-xl text-sm font-medium text-[#222222] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#222222]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                          Team Captain Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={captainName}
                          onChange={(e) => setCaptainName(e.target.value)}
                          placeholder="e.g. Tariq Vance"
                          className="w-full px-3.5 py-2.5 bg-[#F2F3F7] border border-[#E5EAED] rounded-xl text-sm font-medium text-[#222222] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#222222]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                          Captain Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          placeholder="+1 (555) 345-6789"
                          className="w-full px-3.5 py-2.5 bg-[#F2F3F7] border border-[#E5EAED] rounded-xl text-sm font-medium text-[#222222] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#222222]"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E5EAED] flex items-center justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-[#CDFF00] hover:bg-[#9ECC00] text-[#0A0D14] text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-[#0A0D14] border-t-transparent rounded-full animate-spin" />
                            <span>Verifying Roster...</span>
                          </>
                        ) : (
                          <>
                            <span>Register Squad &amp; Lock Seed</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
