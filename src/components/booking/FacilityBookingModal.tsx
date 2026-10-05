import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  CreditCard, 
  Sparkles,
  QrCode,
  ArrowRight,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { Facility, FacilitySlot, Booking } from '../../types';
import { useSportsStore } from '../../lib/sportsStore';

interface FacilityBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  facility: Facility | null;
}

export const FacilityBookingModal: React.FC<FacilityBookingModalProps> = ({
  isOpen,
  onClose,
  facility,
}) => {
  const { bookFacilitySlot, currentUser } = useSportsStore();

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<FacilitySlot | null>(null);
  const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');

  // Form input state
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  
  // Pending and error state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Initialize dates
  useEffect(() => {
    if (facility && facility.slots.length > 0) {
      const dates = Array.from(new Set(facility.slots.map((s) => s.date)));
      if (dates.length > 0) {
        setSelectedDate(dates[0]);
      }
      setSelectedSlot(null);
      setStep('select');
      setBookingError(null);
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
    }
  }, [facility, isOpen, currentUser]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen || !facility) return null;

  const uniqueDates = Array.from(new Set(facility.slots.map((s) => s.date)));
  const visibleSlots = facility.slots.filter((s) => s.date === selectedDate);

  const handleSlotSelect = (slot: FacilitySlot) => {
    if (slot.status !== 'available') return;
    setSelectedSlot(slot);
    setBookingError(null);
  };

  const handleProceedToConfirm = () => {
    if (!selectedSlot) return;
    setStep('confirm');
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setBookingError('Please provide your full name, email, and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setBookingError(null);

    const result = await bookFacilitySlot({
      facilityId: facility.id,
      slotId: selectedSlot.id,
      userName: name,
      userEmail: email,
      userPhone: phone,
    });

    setIsSubmitting(false);

    if (result.success && result.booking) {
      setConfirmedBooking(result.booking);
      setStep('success');
    } else {
      setBookingError(result.error || 'Unable to complete reservation. Please try another slot.');
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
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
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#CDFF00]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Facility Booking Engine</span>
              </div>
              <h2 id="booking-modal-title" className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
                {facility.name}
              </h2>
              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#CDFF00]" />
                  {facility.area}, {facility.city}
                </span>
                <span>·</span>
                <span>{facility.surface}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 max-h-[75vh] overflow-y-auto">
            {/* STEP 1: SELECT DATE & TIME SLOT */}
            {step === 'select' && (
              <div className="space-y-6">
                {/* Date Picker Ribbon */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2.5">
                    Select Reservation Date
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {uniqueDates.map((dateStr) => {
                      const d = new Date(dateStr + 'T00:00:00');
                      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                      const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      const isSelected = selectedDate === dateStr;

                      return (
                        <button
                          key={dateStr}
                          type="button"
                          onClick={() => {
                            setSelectedDate(dateStr);
                            setSelectedSlot(null);
                          }}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#222222] text-[#CDFF00] border-[#222222] shadow-sm ring-2 ring-[#CDFF00]/30'
                              : 'bg-[#F2F3F7] hover:bg-[#E5EAED] text-[#4B5563] border-[#E5EAED]'
                          }`}
                        >
                          <div className="text-[11px] font-bold uppercase tracking-wider">{dayName}</div>
                          <div className="text-sm font-extrabold mt-0.5">{monthDay}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Slots Matrix */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                      Available Court Slots ({visibleSlots.length})
                    </label>
                    <div className="flex items-center gap-3 text-[11px] text-[#6B7280]">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Open
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Reserved
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Maintenance
                      </span>
                    </div>
                  </div>

                  {visibleSlots.length === 0 ? (
                    <div className="p-8 text-center bg-[#F2F3F7] rounded-xl text-sm text-[#6B7280]">
                      No timetable slots configured for this date.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {visibleSlots.map((slot) => {
                        const isSelected = selectedSlot?.id === slot.id;
                        const isAvailable = slot.status === 'available';

                        return (
                          <button
                            key={slot.id}
                            type="button"
                            disabled={!isAvailable}
                            onClick={() => handleSlotSelect(slot)}
                            className={`p-3.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                              !isAvailable
                                ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed opacity-60'
                                : isSelected
                                ? 'bg-[#CDFF00] text-[#0A0D14] border-[#9ECC00] shadow-md ring-2 ring-[#0A0D14]/20 font-bold'
                                : 'bg-[#FFFFFF] hover:bg-[#F8FFD9]/60 text-[#222222] border-[#E5EAED] cursor-pointer'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5 text-xs font-bold">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{slot.time}</span>
                              </div>
                              <div className="text-[11px] opacity-75">{slot.court}</div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-black">${slot.price}/hr</div>
                              <span
                                className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                                  slot.status === 'available'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : slot.status === 'reserved'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {slot.status}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-[#E5EAED] flex items-center justify-between">
                  <div className="text-xs text-[#6B7280]">
                    {selectedSlot ? (
                      <span className="font-semibold text-[#222222]">
                        Selected: {selectedSlot.time} (${selectedSlot.price})
                      </span>
                    ) : (
                      <span>Select an open slot to continue</span>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={!selectedSlot}
                    onClick={handleProceedToConfirm}
                    className="px-6 py-2.5 bg-[#222222] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Confirm</span>
                    <ArrowRight className="w-4 h-4 text-[#CDFF00]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CONFIRMATION & PARTICIPANT DETAILS */}
            {step === 'confirm' && selectedSlot && (
              <form onSubmit={handleConfirmBooking} className="space-y-5">
                {/* Summary banner */}
                <div className="p-4 bg-[#F8FFD9] border border-[#CDFF00] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[#222222]">{facility.name}</div>
                    <div className="text-[#4B5563] mt-0.5">
                      {selectedSlot.date} · {selectedSlot.time} ({selectedSlot.court})
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-[#222222]">${selectedSlot.price}.00</div>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase">Ready to Reserve</span>
                  </div>
                </div>

                {/* Conflict/Error alert */}
                {bookingError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{bookingError}</span>
                  </div>
                )}

                {/* Form fields */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                      Lead Player / Team Captain Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-[#9CA3AF]" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 bg-[#F2F3F7] border border-[#E5EAED] rounded-xl text-sm font-medium text-[#222222] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#222222]"
                        placeholder="e.g. Kai Sterling"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                        Confirmation Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3 text-[#9CA3AF]" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 bg-[#F2F3F7] border border-[#E5EAED] rounded-xl text-sm font-medium text-[#222222] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#222222]"
                          placeholder="kai@sportshub.net"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                        Contact Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3 text-[#9CA3AF]" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 bg-[#F2F3F7] border border-[#E5EAED] rounded-xl text-sm font-medium text-[#222222] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#222222]"
                          placeholder="+1 (555) 019-2831"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Idempotent Action Row */}
                <div className="pt-4 border-t border-[#E5EAED] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setStep('select')}
                    className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-[#4B5563] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Back to Slots
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#CDFF00] hover:bg-[#9ECC00] text-[#0A0D14] text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-[#0A0D14] border-t-transparent rounded-full animate-spin" />
                        <span>Securing Slot...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Confirm &amp; Issue Digital Pass</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: SUCCESS STATE & DIGITAL ENTRY PASS */}
            {step === 'success' && confirmedBooking && (
              <div className="space-y-6 text-center py-2">
                <div className="w-14 h-14 rounded-2xl bg-[#CDFF00] text-[#0A0D14] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-black font-display text-[#222222]">
                    Slot Confirmed &amp; Secured!
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Your entry pass has been issued and locked in the Sports Hub ledger.
                  </p>
                </div>

                {/* Digital Ticket Card */}
                <div className="max-w-md mx-auto p-5 bg-[#0A0D14] text-white rounded-2xl border border-neutral-800 text-left space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#CDFF00]">Verified Digital Match Pass</div>
                      <div className="text-sm font-black">{confirmedBooking.facilityName}</div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-[#CDFF00]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase">Date &amp; Time</span>
                      <div className="font-bold text-white">{confirmedBooking.date}</div>
                      <div className="text-neutral-300">{confirmedBooking.time}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase">Pitch / Court</span>
                      <div className="font-bold text-white">{confirmedBooking.court}</div>
                      <div className="text-emerald-400 font-bold">Floodlights Included</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase">Pass Code</span>
                      <div className="font-mono font-bold text-[#CDFF00] tracking-wider">{confirmedBooking.passCode}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 uppercase">Registered Lead</span>
                      <div className="font-bold text-white">{confirmedBooking.userName}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 bg-[#222222] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Done &amp; Return
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
