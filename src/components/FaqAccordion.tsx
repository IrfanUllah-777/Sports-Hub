import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquarePlus, Sparkles, Search, X } from 'lucide-react';
import { StakeholderRole } from '../types';

export interface FaqItem {
  id: string;
  question: string;
  category: string;
  answer: string;
  details?: string[];
}

interface FaqAccordionProps {
  items: FaqItem[];
  onOpenGetInvolved?: (role?: StakeholderRole) => void;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, onOpenGetInvolved }) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [items, activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Category selector & live search bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.03, y: -1, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                whileTap={{ scale: 0.97 }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#222222] text-[#CDFF00] font-bold shadow-xs'
                    : 'bg-white text-[#6B7280] border border-[#E5EAED] hover:text-[#222222] hover:border-[#CDFF00]'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter questions..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#E5EAED] rounded-lg focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#222222]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center bg-white border border-[#E5EAED] rounded-xl text-xs text-[#6B7280] space-y-2">
            <p>No questions matched &ldquo;{searchQuery}&rdquo; in {activeCategory}.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="text-[#222222] font-bold underline hover:text-[#9ECC00] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isOpen = openIds.includes(item.id);
            const controlId = `faq-answer-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -2, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                className={`group relative bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-[#222222] ring-1 ring-[#CDFF00]/60 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06),0_0_0_1px_#CDFF00]'
                    : 'border-[#E5EAED] hover:border-[#CDFF00] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06),0_0_0_1px_#CDFF00]'
                }`}
              >
                {/* Animated top lime highlight bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <h3>
                  <button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={controlId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00] rounded-xl"
                  >
                    <div className="space-y-1 pr-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#9ECC00] block">
                        {item.category}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-[#222222] group-hover:text-black font-display block leading-snug transition-colors">
                        {item.question}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 group-hover:scale-105 ${
                        isOpen
                          ? 'bg-[#CDFF00] text-[#222222]'
                          : 'bg-[#F2F3F7] group-hover:bg-[#CDFF00] text-[#6B7280] group-hover:text-[#222222]'
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={controlId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="overflow-hidden border-t border-[#E5EAED] bg-[#F2F3F7]/40"
                    >
                      <div className="p-5 sm:p-6 pt-4 space-y-4">
                        <p className="text-sm text-[#4B5563] leading-relaxed">
                          {item.answer}
                        </p>

                        {item.details && item.details.length > 0 && (
                          <div className="pt-2 pl-3 border-l-2 border-[#CDFF00] space-y-1.5 text-xs text-[#222222]">
                            {item.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="text-[#9ECC00] font-bold">·</span>
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Still have questions banner */}
      <motion.div
        whileHover={{ y: -2, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
        className="group relative p-5 sm:p-6 bg-[#F8FFD9] border border-[#CDFF00]/70 hover:border-[#CDFF00] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden transition-all duration-300 shadow-2xs hover:shadow-[0_8px_20px_-4px_rgba(205,255,0,0.25)]"
      >
        {/* Animated top lime highlight bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#CDFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#9ECC00] group-hover:scale-110 transition-transform duration-200" />
            <h4 className="text-sm font-bold text-[#222222]">Have a specific inquiry about your community or venue?</h4>
          </div>
          <p className="text-xs text-[#6B7280]">
            Our ecosystem development team discusses tailored pilot integrations with regional sports bodies, venues, and academies.
          </p>
        </div>

        {onOpenGetInvolved && (
          <button
            onClick={() => onOpenGetInvolved('enthusiast')}
            className="px-4.5 py-2.5 bg-[#222222] hover:bg-neutral-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs active:scale-98"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-[#CDFF00]" />
            Submit Your Inquiry
          </button>
        )}
      </motion.div>
    </div>
  );
};
