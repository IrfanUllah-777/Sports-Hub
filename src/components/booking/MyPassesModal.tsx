import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  QrCode, 
  Calendar, 
  Clock, 
  MapPin, 
  AlertCircle, 
  Trash2, 
  ShieldCheck,
  Ticket,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';
import { useSportsStore } from '../../lib/sportsStore';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface MyPassesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyPassesModal: React.FC<MyPassesModalProps> = ({ isOpen, onClose }) => {
  const { bookings, cancelBooking } = useSportsStore();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  useBodyScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="passes-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl max-h-[92dvh] flex flex-col bg-white dark:bg-[#12171F] rounded-2xl shadow-2xl border border-[#E5EAED] dark:border-[#2A313C] overflow-hidden text-[#222222] dark:text-[#F3F4F6]"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Header */}
          <div className="bg-[#0A0D14] text-white p-4 sm:p-6 flex items-start justify-between border-b border-neutral-800 shrink-0">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#CDFF00]">
                <Ticket className="w-3.5 h-3.5" />
                <span>My Active Reservations &amp; Match Passes</span>
              </div>
              <h2 id="passes-modal-title" className="text-lg sm:text-2xl font-black font-display text-white">
                Player Match Passes
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close passes modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex-1 space-y-4">
            {bookings.length === 0 ? (
              <div className="p-12 text-center bg-[#F2F3F7] dark:bg-[#161B22] border border-[#E5EAED] dark:border-[#2A313C] rounded-2xl space-y-3">
                <Ticket className="w-10 h-10 text-[#9CA3AF] dark:text-[#64748B] mx-auto" />
                <div className="font-bold text-sm text-[#222222] dark:text-[#F3F4F6]">No Active Passes Yet</div>
                <p className="text-xs text-[#6B7280] dark:text-[#A4ABB6] max-w-sm mx-auto">
                  Browse verified sports facilities or tournaments to reserve your first court or register your squad!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* View Mode Switcher Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#A4ABB6]">
                    Total Passes ({bookings.length})
                  </div>

                  <div className="inline-flex items-center bg-[#F2F3F7] dark:bg-[#161B22] border border-[#E5EAED] dark:border-[#2A313C] rounded-lg p-0.5">
                    <button
                      type="button"
                      onClick={() => setViewMode('cards')}
                      className={`p-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        viewMode === 'cards'
                          ? 'bg-white dark:bg-[#222222] text-[#222222] dark:text-[#CDFF00] shadow-2xs'
                          : 'text-[#6B7280] dark:text-[#A4ABB6] hover:text-[#222222] dark:hover:text-[#F3F4F6]'
                      }`}
                      title="Pass Cards View"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Cards</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('table')}
                      className={`p-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        viewMode === 'table'
                          ? 'bg-white dark:bg-[#222222] text-[#222222] dark:text-[#CDFF00] shadow-2xs'
                          : 'text-[#6B7280] dark:text-[#A4ABB6] hover:text-[#222222] dark:hover:text-[#F3F4F6]'
                      }`}
                      title="Passes Table View"
                    >
                      <TableIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Table</span>
                    </button>
                  </div>
                </div>

                {viewMode === 'cards' ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          booking.status === 'confirmed'
                            ? 'bg-[#0A0D14] text-white border-neutral-800 shadow-md'
                            : 'bg-neutral-100 dark:bg-[#161B22] text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between border-b border-neutral-800 pb-3 mb-3">
                          <div>
                            <div className="text-[10px] uppercase font-bold text-[#CDFF00]">
                              {booking.status === 'confirmed' ? 'Verified Entry Pass' : 'Cancelled Reservation'}
                            </div>
                            <div className="text-base font-black text-white">{booking.facilityName}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-[11px] font-mono text-[#CDFF00] font-bold">
                              {booking.passCode}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-3">
                          <div>
                            <span className="text-[10px] text-neutral-400 uppercase">Date &amp; Time</span>
                            <div className="font-bold text-white">{booking.date}</div>
                            <div className="text-neutral-300">{booking.time}</div>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 uppercase">Court / Pitch</span>
                            <div className="font-bold text-white">{booking.court}</div>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 uppercase">Registered Lead</span>
                            <div className="font-bold text-white">{booking.userName}</div>
                          </div>
                        </div>

                        {booking.status === 'confirmed' && (
                          <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              Guaranteed Slot Reservation
                            </span>

                            <button
                              type="button"
                              onClick={() => cancelBooking(booking.id)}
                              className="px-3 py-1.5 min-h-[44px] bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/60 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Cancel &amp; Release Slot</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* Mobile horizontal scroll hint badge */}
                    <div className="sm:hidden flex items-center justify-between text-[11px] text-[#6B7280] dark:text-[#A4ABB6] px-1">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CDFF00] animate-pulse" />
                        Swipe passes table horizontally
                      </span>
                      <span className="font-mono text-[10px] tracking-wider uppercase bg-[#F2F3F7] dark:bg-[#1E2530] px-1.5 py-0.5 rounded font-bold">
                        ⟷ Scroll
                      </span>
                    </div>

                    <div className="table-scroll-container w-full overflow-x-auto overscroll-x-contain rounded-xl border border-[#E5EAED] dark:border-[#2A313C] bg-white dark:bg-[#161B22] shadow-xs">
                      <table className="w-full min-w-[520px] text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#E5EAED] dark:border-[#2A313C] bg-[#F2F3F7] dark:bg-[#12171F]">
                            <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Pass Code</th>
                            <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Facility Venue</th>
                            <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Date &amp; Time</th>
                            <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Court / Pitch</th>
                            <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Status</th>
                            <th className="py-2.5 px-3 text-right font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5EAED] dark:divide-[#2A313C]">
                          {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-[#F8FFD9]/30 dark:hover:bg-[#1E2530]/50 transition-colors">
                              <td className="py-2.5 px-3">
                                <span className="font-mono text-[10px] font-bold bg-[#0A0D14] text-[#CDFF00] px-2 py-0.5 rounded border border-neutral-700">
                                  {booking.passCode}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 font-bold text-[#222222] dark:text-[#F3F4F6]">
                                {booking.facilityName}
                              </td>
                              <td className="py-2.5 px-3 text-[11px] text-[#4B5563] dark:text-[#D5D8DD]">
                                {booking.date} · {booking.time}
                              </td>
                              <td className="py-2.5 px-3 text-[11px] text-[#6B7280] dark:text-[#A4ABB6]">
                                {booking.court}
                              </td>
                              <td className="py-2.5 px-3">
                                <span
                                  className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-extrabold ${
                                    booking.status === 'confirmed'
                                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                                      : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300'
                                  }`}
                                >
                                  {booking.status}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                {booking.status === 'confirmed' ? (
                                  <button
                                    type="button"
                                    onClick={() => cancelBooking(booking.id)}
                                    className="px-2.5 py-1 text-[10px] font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded transition-colors cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-neutral-400">Cancelled</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
