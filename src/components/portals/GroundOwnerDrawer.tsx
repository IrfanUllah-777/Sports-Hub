import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Building2, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  ShieldCheck,
  Calendar,
  Users
} from 'lucide-react';
import { useSportsStore } from '../../lib/sportsStore';

interface GroundOwnerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroundOwnerDrawer: React.FC<GroundOwnerDrawerProps> = ({ isOpen, onClose }) => {
  const { facilities, toggleSlotStatus, updateSlotPrice, bookings } = useSportsStore();
  const [selectedFacilityId, setSelectedFacilityId] = useState(facilities[0]?.id || 'fac-1');
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(45);

  if (!isOpen) return null;

  const currentFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];
  const facilityBookings = bookings.filter((b) => b.facilityId === currentFacility?.id);

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
        role="dialog"
        aria-modal="true"
        aria-labelledby="owner-drawer-title"
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-xl h-full bg-white text-[#222222] shadow-2xl flex flex-col border-l border-[#E5EAED]"
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
          <div className="p-4 bg-[#F2F3F7] border-b border-[#E5EAED] flex items-center gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Active Ground:
            </label>
            <select
              value={selectedFacilityId}
              onChange={(e) => setSelectedFacilityId(e.target.value)}
              className="px-3 py-1.5 bg-white border border-[#E5EAED] rounded-lg text-xs font-bold text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#222222]"
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
              <div className="p-3 bg-[#F8FFD9] border border-[#CDFF00] rounded-xl">
                <div className="text-lg font-black text-[#222222]">
                  {currentFacility.slots.filter((s) => s.status === 'reserved').length}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280]">Booked Slots</div>
              </div>
              <div className="p-3 bg-[#F2F3F7] border border-[#E5EAED] rounded-xl">
                <div className="text-lg font-black text-emerald-600">
                  {currentFacility.slots.filter((s) => s.status === 'available').length}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280]">Open Slots</div>
              </div>
              <div className="p-3 bg-[#F2F3F7] border border-[#E5EAED] rounded-xl">
                <div className="text-lg font-black text-amber-600">
                  {currentFacility.slots.filter((s) => s.status === 'maintenance').length}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280]">Blackouts</div>
              </div>
            </div>

            {/* Slots Inventory Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#222222]">
                  Slot Availability &amp; Rate Controls
                </h3>
                <span className="text-[11px] text-[#6B7280]">Tap status to toggle blackout</span>
              </div>

              <div className="space-y-2">
                {currentFacility.slots.slice(0, 10).map((slot) => {
                  const isEditingThis = editingSlotId === slot.id;

                  return (
                    <div
                      key={slot.id}
                      className="p-3 bg-white border border-[#E5EAED] rounded-xl flex items-center justify-between text-xs hover:border-[#222222] transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#222222] flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
                          <span>{slot.time}</span>
                        </div>
                        <div className="text-[11px] text-[#6B7280]">
                          {slot.date} · {slot.court}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Price editor */}
                        {isEditingThis ? (
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold">$</span>
                            <input
                              type="number"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(Number(e.target.value))}
                              className="w-14 px-1.5 py-0.5 border border-[#222222] rounded text-xs font-bold text-center"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                updateSlotPrice(currentFacility.id, slot.id, tempPrice);
                                setEditingSlotId(null);
                              }}
                              className="px-2 py-0.5 bg-[#222222] text-[#CDFF00] rounded text-[10px] font-bold"
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
                            className="font-bold text-[#222222] hover:text-[#9ECC00] flex items-center gap-0.5 cursor-pointer"
                            title="Edit slot rate"
                          >
                            <span>${slot.price}/hr</span>
                            <DollarSign className="w-3 h-3 text-[#6B7280]" />
                          </button>
                        )}

                        {/* Status Toggle Button */}
                        <button
                          type="button"
                          onClick={() => toggleSlotStatus(currentFacility.id, slot.id)}
                          disabled={slot.status === 'reserved'}
                          className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-extrabold transition-all cursor-pointer ${
                            slot.status === 'available'
                              ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                              : slot.status === 'maintenance'
                              ? 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                              : 'bg-red-100 text-red-800 cursor-not-allowed opacity-80'
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
            <div className="pt-4 border-t border-[#E5EAED]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#222222] mb-3 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#CDFF00]" />
                <span>Confirmed Ground Reservations ({facilityBookings.length})</span>
              </h3>

              {facilityBookings.length === 0 ? (
                <div className="p-6 text-center bg-[#F2F3F7] rounded-xl text-xs text-[#6B7280]">
                  No player bookings recorded for this facility yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {facilityBookings.map((b) => (
                    <div key={b.id} className="p-3 bg-[#F8FFD9] border border-[#CDFF00] rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#222222]">
                        <span>{b.userName}</span>
                        <span className="font-mono text-[10px] text-neutral-800">{b.passCode}</span>
                      </div>
                      <div className="text-[#4B5563] text-[11px]">
                        {b.date} at {b.time} · {b.court}
                      </div>
                      <div className="text-[10px] text-[#6B7280]">Contact: {b.userPhone}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
