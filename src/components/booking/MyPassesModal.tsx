import React from 'react';
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
  Ticket
} from 'lucide-react';
import { useSportsStore } from '../../lib/sportsStore';

interface MyPassesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyPassesModal: React.FC<MyPassesModalProps> = ({ isOpen, onClose }) => {
  const { bookings, cancelBooking } = useSportsStore();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs"
        role="dialog"
        aria-modal="true"
        aria-labelledby="passes-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E5EAED] overflow-hidden text-[#222222]"
        >
          {/* Header */}
          <div className="bg-[#0A0D14] text-white p-5 sm:p-6 flex items-start justify-between border-b border-neutral-800">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#CDFF00]">
                <Ticket className="w-3.5 h-3.5" />
                <span>My Active Reservations &amp; Match Passes</span>
              </div>
              <h2 id="passes-modal-title" className="text-xl sm:text-2xl font-black font-display text-white">
                Player Match Passes
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close passes modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
            {bookings.length === 0 ? (
              <div className="p-12 text-center bg-[#F2F3F7] rounded-2xl space-y-3">
                <Ticket className="w-10 h-10 text-[#9CA3AF] mx-auto" />
                <div className="font-bold text-sm text-[#222222]">No Active Passes Yet</div>
                <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
                  Browse verified sports facilities or tournaments to reserve your first court or register your squad!
                </p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    booking.status === 'confirmed'
                      ? 'bg-[#0A0D14] text-white border-neutral-800 shadow-md'
                      : 'bg-neutral-100 text-neutral-500 border-neutral-200 opacity-60'
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
                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Guaranteed Slot Reservation
                      </span>

                      <button
                        type="button"
                        onClick={() => cancelBooking(booking.id)}
                        className="px-3 py-1 bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/60 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel &amp; Release Slot</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
