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
            className="relative w-full max-w-xl h-full bg-white dark:bg-[#12171F] text-[#222222] dark:text-[#F3F4F6] shadow-2xl flex flex-col border-l border-[#E5EAED] dark:border-[#2A313C]"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Top Bar */}
          <div className="bg-[#0A0D14] text-white p-5 flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#CDFF00] text-[#0A0D14] flex items-center justify-center font-black">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#CDFF00]">
                  Ground Owner Operations Panel
                </div>
                <h2 id="owner-drawer-title" className="text-base font-black font-display text-white">
                  Facility &amp; Slot Management
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close owner panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Facility Selector */}
          <div className="p-4 bg-[#F2F3F7] dark:bg-[#161B22] border-b border-[#E5EAED] dark:border-[#2A313C] flex items-center gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#A4ABB6]">
              Active Ground:
            </label>
            <select
              value={selectedFacilityId}
              onChange={(e) => setSelectedFacilityId(e.target.value)}
              className="px-3 py-1.5 bg-white dark:bg-[#161B22] border border-[#E5EAED] dark:border-[#2A313C] rounded-lg text-xs font-bold text-[#222222] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#222222] dark:focus:ring-[#CDFF00]"
            >
              {facilities.map((fac) => (
                <option key={fac.id} value={fac.id}>
                  {fac.name}
                </option>
              ))}
            </select>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-[#F3F4F6]">
                  Slot Availability &amp; Rate Controls
                </h3>
                <span className="text-[11px] text-[#6B7280] dark:text-[#A4ABB6]">Tap status to toggle blackout</span>
              </div>

              <div className="space-y-2">
                {currentFacility.slots.slice(0, 10).map((slot) => {
                  const isEditingThis = editingSlotId === slot.id;

                  return (
                    <div
                      key={slot.id}
                      className="p-3 bg-white dark:bg-[#161B22] border border-[#E5EAED] dark:border-[#2A313C] rounded-xl flex items-center justify-between text-xs hover:border-[#222222] dark:hover:border-[#CDFF00] transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#222222] dark:text-[#F3F4F6] flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#6B7280] dark:text-[#A4ABB6]" />
                          <span>{slot.time}</span>
                        </div>
                        <div className="text-[11px] text-[#6B7280] dark:text-[#A4ABB6]">
                          {slot.date} · {slot.court}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Price editor */}
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

                        {/* Status Toggle Button */}
                        <button
                          type="button"
                          onClick={() => toggleSlotStatus(currentFacility.id, slot.id)}
                          disabled={slot.status === 'reserved'}
                          className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-extrabold transition-all cursor-pointer ${
                            slot.status === 'available'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 hover:bg-emerald-200 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300'
                              : slot.status === 'maintenance'
                              ? 'bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 dark:hover:bg-amber-900/80 text-amber-800 dark:text-amber-300'
                              : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 cursor-not-allowed opacity-80'
                          }`}
                        >
                          {slot.status}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Confirmed Bookings Feed */}
            <div className="pt-4 border-t border-[#E5EAED] dark:border-[#2A313C]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-[#F3F4F6] mb-3 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#CDFF00]" />
                <span>Confirmed Ground Reservations ({facilityBookings.length})</span>
              </h3>

              {facilityBookings.length === 0 ? (
                <div className="p-6 text-center bg-[#F2F3F7] dark:bg-[#161B22] border border-[#E5EAED] dark:border-[#2A313C] rounded-xl text-xs text-[#6B7280] dark:text-[#A4ABB6]">
                  No player bookings recorded for this facility yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {facilityBookings.map((b) => (
                    <div key={b.id} className="p-3 bg-[#F8FFD9] dark:bg-[#162014] border border-[#CDFF00] dark:border-[#CDFF00]/40 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#222222] dark:text-[#F3F4F6]">
                        <span>{b.userName}</span>
                        <span className="font-mono text-[10px] text-neutral-800 dark:text-[#CDFF00]">{b.passCode}</span>
                      </div>
                      <div className="text-[#4B5563] dark:text-[#D5D8DD] text-[11px]">
                        {b.date} at {b.time} · {b.court}
                      </div>
                      <div className="text-[10px] text-[#6B7280] dark:text-[#A4ABB6]">Contact: {b.userPhone}</div>
                    </div>
                  ))}
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
