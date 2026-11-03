import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Building2, 
  Clock, 
  Pencil, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  ShieldCheck,
  Calendar,
  Users
} from 'lucide-react';
import { useSportsStore } from '../../lib/sportsStore';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface GroundOwnerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroundOwnerDrawer: React.FC<GroundOwnerDrawerProps> = ({ isOpen, onClose }) => {
  const { facilities, toggleSlotStatus, updateSlotPrice, bookings } = useSportsStore();
  const [selectedFacilityId, setSelectedFacilityId] = useState(facilities[0]?.id || 'fac-1');
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(4500);

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

  const currentFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];
  const facilityBookings = bookings.filter((b) => b.facilityId === currentFacility?.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="owner-drawer-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-full sm:max-w-xl h-full bg-white dark:bg-[#12171F] text-[#222222] dark:text-[#F3F4F6] shadow-2xl flex flex-col border-l border-[#E5EAED] dark:border-[#2A313C]"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Top Bar */}
          <div className="bg-[#0A0D14] text-white p-4 sm:p-5 flex items-center justify-between border-b border-neutral-800 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#CDFF00] text-[#0A0D14] flex items-center justify-center font-black shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#CDFF00]">
                  Ground Owner Operations Panel
                </div>
                <h2 id="owner-drawer-title" className="text-sm sm:text-base font-black font-display text-white">
                  Facility &amp; Slot Management
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close owner panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Facility Selector */}
          <div className="p-3 sm:p-4 bg-[#F2F3F7] dark:bg-[#161B22] border-b border-[#E5EAED] dark:border-[#2A313C] flex items-center gap-2 shrink-0 flex-wrap">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#A4ABB6]">
              Active Ground:
            </label>
            <select
              value={selectedFacilityId}
              onChange={(e) => setSelectedFacilityId(e.target.value)}
              className="px-3 py-1.5 bg-white dark:bg-[#161B22] border border-[#E5EAED] dark:border-[#2A313C] rounded-lg text-xs font-bold text-[#222222] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#222222] dark:focus:ring-[#CDFF00] max-w-full"
            >
              {facilities.map((fac) => (
                <option key={fac.id} value={fac.id}>
                  {fac.name}
                </option>
              ))}
            </select>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-[#F8FFD9] dark:bg-[#162014] border border-[#CDFF00] dark:border-[#CDFF00]/40 rounded-xl">
                <div className="text-lg font-black text-[#222222] dark:text-[#CDFF00]">
                  {currentFacility.slots.filter((s) => s.status === 'reserved').length}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280] dark:text-[#A4ABB6]">Booked Slots</div>
              </div>
              <div className="p-3 bg-[#F2F3F7] dark:bg-[#161B22] border border-[#E5EAED] dark:border-[#2A313C] rounded-xl">
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {currentFacility.slots.filter((s) => s.status === 'available').length}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280] dark:text-[#A4ABB6]">Open Slots</div>
              </div>
              <div className="p-3 bg-[#F2F3F7] dark:bg-[#161B22] border border-[#E5EAED] dark:border-[#2A313C] rounded-xl">
                <div className="text-lg font-black text-amber-600 dark:text-amber-400">
                  {currentFacility.slots.filter((s) => s.status === 'maintenance').length}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280] dark:text-[#A4ABB6]">Blackouts</div>
              </div>
            </div>

            {/* Slots Inventory Table */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-[#F3F4F6]">
                  Slot Availability &amp; Rate Controls
                </h3>
                <span className="text-[11px] text-[#6B7280] dark:text-[#A4ABB6]">Tap status to toggle blackout</span>
              </div>

              {/* Mobile horizontal scroll hint badge */}
              <div className="sm:hidden flex items-center justify-between text-[11px] text-[#6B7280] dark:text-[#A4ABB6] mb-2 px-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CDFF00] animate-pulse" />
                  Swipe table horizontally to view all controls
                </span>
                <span className="font-mono text-[10px] tracking-wider uppercase bg-[#F2F3F7] dark:bg-[#1E2530] px-1.5 py-0.5 rounded font-bold">
                  ⟷ Scroll
                </span>
              </div>

              {/* Responsive Horizontal Scroll Container */}
              <div className="table-scroll-container w-full overflow-x-auto overscroll-x-contain rounded-xl border border-[#E5EAED] dark:border-[#2A313C] bg-white dark:bg-[#161B22] shadow-xs">
                <table className="w-full min-w-[540px] text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5EAED] dark:border-[#2A313C] bg-[#F2F3F7] dark:bg-[#12171F]">
                      <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Slot Time</th>
                      <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Date &amp; Pitch</th>
                      <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Hourly Rate</th>
                      <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Availability</th>
                      <th className="py-2.5 px-3 text-right font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Blackout Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5EAED] dark:divide-[#2A313C]">
                    {currentFacility.slots.slice(0, 10).map((slot) => {
                      const isEditingThis = editingSlotId === slot.id;

                      return (
                        <tr
                          key={slot.id}
                          className="hover:bg-[#F8FFD9]/30 dark:hover:bg-[#1E2530]/50 transition-colors"
                        >
                          <td className="py-2.5 px-3 font-bold text-[#222222] dark:text-[#F3F4F6]">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#6B7280] dark:text-[#A4ABB6] shrink-0" />
                              <span>{slot.time}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-[11px] text-[#6B7280] dark:text-[#A4ABB6]">
                            {slot.date} · {slot.court}
                          </td>
                          <td className="py-2.5 px-3">
                            {isEditingThis ? (
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-[#6B7280] dark:text-[#A4ABB6]">PKR</span>
                                <input
                                  type="number"
                                  step="100"
                                  min="500"
                                  value={tempPrice}
                                  onChange={(e) => setTempPrice(Number(e.target.value))}
                                  className="w-20 px-2 py-0.5 bg-white dark:bg-[#1E2530] border border-[#222222] dark:border-[#2A313C] text-[#222222] dark:text-[#F3F4F6] rounded text-xs font-bold text-center"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    updateSlotPrice(currentFacility.id, slot.id, tempPrice);
                                    setEditingSlotId(null);
                                  }}
                                  className="px-2 py-0.5 bg-[#222222] dark:bg-[#CDFF00] text-[#CDFF00] dark:text-[#0A0D14] rounded text-[10px] font-bold cursor-pointer"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingSlotId(slot.id);
                                  setTempPrice(slot.price);
                                }}
                                className="font-bold text-[#222222] dark:text-[#F3F4F6] hover:text-[#9ECC00] dark:hover:text-[#CDFF00] flex items-center gap-1 cursor-pointer"
                                title="Edit slot rate"
                              >
                                <span>PKR {slot.price.toLocaleString()}/hr</span>
                                <Pencil className="w-3 h-3 text-[#6B7280] dark:text-[#A4ABB6]" />
                              </button>
                            )}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-extrabold ${
                                slot.status === 'available'
                                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                                  : slot.status === 'maintenance'
                                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                                  : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300'
                              }`}
                            >
                              {slot.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => toggleSlotStatus(currentFacility.id, slot.id)}
                              disabled={slot.status === 'reserved'}
                              className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-extrabold transition-all cursor-pointer ${
                                slot.status === 'available'
                                  ? 'bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 dark:hover:bg-amber-900/80 text-amber-800 dark:text-amber-300'
                                  : slot.status === 'maintenance'
                                  ? 'bg-emerald-100 dark:bg-emerald-950/60 hover:bg-emerald-200 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300'
                                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed opacity-60'
                              }`}
                            >
                              {slot.status === 'available' ? 'Blackout Slot' : slot.status === 'maintenance' ? 'Reopen Slot' : 'Reserved'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Confirmed Bookings Feed */}
            <div className="pt-4 border-t border-[#E5EAED] dark:border-[#2A313C]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-[#F3F4F6] mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#CDFF00]" />
                <span>Confirmed Ground Reservations ({facilityBookings.length})</span>
              </h3>

              {facilityBookings.length === 0 ? (
                <div className="p-6 text-center bg-[#F2F3F7] dark:bg-[#161B22] border border-[#E5EAED] dark:border-[#2A313C] rounded-xl text-xs text-[#6B7280] dark:text-[#A4ABB6]">
                  No player bookings recorded for this facility yet.
                </div>
              ) : (
                <div>
                  {/* Mobile swipe hint banner */}
                  <div className="sm:hidden flex items-center justify-between text-[11px] text-[#6B7280] dark:text-[#A4ABB6] mb-2 px-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CDFF00] animate-pulse" />
                      Swipe reservations horizontally
                    </span>
                    <span className="font-mono text-[10px] tracking-wider uppercase bg-[#F2F3F7] dark:bg-[#1E2530] px-1.5 py-0.5 rounded font-bold">
                      ⟷ Scroll
                    </span>
                  </div>

                  <div className="table-scroll-container w-full overflow-x-auto overscroll-x-contain rounded-xl border border-[#E5EAED] dark:border-[#2A313C] bg-white dark:bg-[#161B22] shadow-xs">
                    <table className="w-full min-w-[500px] text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#E5EAED] dark:border-[#2A313C] bg-[#F2F3F7] dark:bg-[#12171F]">
                          <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Lead Booker</th>
                          <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Pass Code</th>
                          <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Date &amp; Time</th>
                          <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Court / Pitch</th>
                          <th className="py-2.5 px-3 text-right font-bold uppercase tracking-wider text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Contact Phone</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5EAED] dark:divide-[#2A313C]">
                        {facilityBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-[#F8FFD9]/30 dark:hover:bg-[#1E2530]/50 transition-colors">
                            <td className="py-2.5 px-3 font-bold text-[#222222] dark:text-[#F3F4F6]">{b.userName}</td>
                            <td className="py-2.5 px-3">
                              <span className="font-mono text-[10px] font-bold bg-[#F8FFD9] dark:bg-[#162014] text-neutral-900 dark:text-[#CDFF00] px-2 py-0.5 rounded border border-[#CDFF00]/40">
                                {b.passCode}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-[11px] text-[#4B5563] dark:text-[#D5D8DD]">
                              {b.date} · {b.time}
                            </td>
                            <td className="py-2.5 px-3 text-[11px] text-[#6B7280] dark:text-[#A4ABB6]">{b.court}</td>
                            <td className="py-2.5 px-3 text-right text-[11px] font-mono text-[#6B7280] dark:text-[#A4ABB6]">{b.userPhone}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
