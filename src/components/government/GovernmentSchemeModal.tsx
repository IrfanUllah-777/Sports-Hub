import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Building, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Send,
  Calendar,
  DollarSign
} from 'lucide-react';
import { GovernmentScheme } from '../../types';
import { useSportsStore } from '../../lib/sportsStore';

interface GovernmentSchemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  scheme: GovernmentScheme | null;
}

export const GovernmentSchemeModal: React.FC<GovernmentSchemeModalProps> = ({
  isOpen,
  onClose,
  scheme,
}) => {
  const { applyToScheme, currentUser } = useSportsStore();

  const [applicantName, setApplicantName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [organization, setOrganization] = useState(currentUser.clubName || 'Metropolitan Youth Sports Academy');
  const [projectProposal, setProjectProposal] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen || !scheme) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !email.trim()) {
      setErrorMsg('Please complete required contact details.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const res = await applyToScheme(scheme.id, {
      name: applicantName,
      email,
      organization,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || 'Failed to submit scheme application.');
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gov-scheme-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E5EAED] overflow-hidden text-[#222222]"
        >
          {/* Header */}
          <div className="bg-[#0A0D14] text-white p-5 sm:p-6 flex items-start justify-between border-b border-neutral-800">
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#CDFF00]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Public Department Initiative</span>
              </div>
              <h2 id="gov-scheme-title" className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
                {scheme.title}
              </h2>
              <div className="text-xs text-neutral-400">
                {scheme.department}
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 max-h-[75vh] overflow-y-auto">
            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#CDFF00] text-[#0A0D14] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#222222]">Application Dispatched</h3>
                  <p className="text-xs text-[#6B7280] max-w-md mx-auto">
                    Your application for <strong>{scheme.title}</strong> has been logged with the Department. Reference ID: <strong>GOV-2026-SH{Math.floor(1000 + Math.random() * 9000)}</strong>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#222222] text-[#CDFF00] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Return to Programs
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Scheme Highlights */}
                <div className="p-4 bg-[#F2F3F7] rounded-xl space-y-2 text-xs">
                  {scheme.grantAmount && (
                    <div className="flex items-center justify-between font-bold text-[#222222]">
                      <span className="text-[#6B7280]">Grant / Subsidy Value:</span>
                      <span className="text-emerald-700 font-extrabold">{scheme.grantAmount}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[#6B7280]">
                    <span>Filing Deadline:</span>
                    <span className="font-bold text-[#222222]">{scheme.deadline}</span>
                  </div>
                  <div className="pt-2 border-t border-[#E5EAED] text-[#4B5563] leading-relaxed">
                    <strong>Eligibility:</strong> {scheme.eligibility}
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                      Applicant Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F2F3F7] border border-[#E5EAED] rounded-xl text-sm font-medium text-[#222222] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#222222]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                      Club / Facility / Academy Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F2F3F7] border border-[#E5EAED] rounded-xl text-sm font-medium text-[#222222] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#222222]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                      Official Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F2F3F7] border border-[#E5EAED] rounded-xl text-sm font-medium text-[#222222] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#222222]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                      Brief Statement of Need / Squad Overview
                    </label>
                    <textarea
                      rows={3}
                      value={projectProposal}
                      onChange={(e) => setProjectProposal(e.target.value)}
                      placeholder="Outline how these sports resources or grant funds will impact your youth players..."
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
                      <span>Submitting to Department...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Official Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
