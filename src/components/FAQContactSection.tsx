import React, { useState } from 'react';
import { TargetCountry, FAQItem, BollywoodPreset } from '../types';
import { COUNTRIES, INITIAL_FAQS, TESTIMONIALS } from '../data';
import { ArrowRight, CheckCircle2, ChevronRight, FolderDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQContactSectionProps {
  selectedCountry: TargetCountry;
  bollywoodPreset?: BollywoodPreset;
}

export default function FAQContactSection({ selectedCountry }: FAQContactSectionProps) {
  const country = COUNTRIES[selectedCountry];

  const [faqCategory, setFaqCategory] = useState<'all' | 'general' | 'process' | 'pricing'>('all');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [formError, setFormError] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '',
    serviceChosen: 'video', targetBudget: '1500',
    footageStorage: '', urgencyPriority: 'standard', creativeBrief: '',
  });

  const filteredFaqs = INITIAL_FAQS.filter(f => faqCategory === 'all' || f.category === faqCategory);
  const localTestimonials = TESTIMONIALS.filter(t => t.country === selectedCountry || t.country === 'usa').slice(0, 2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (formError) setFormError(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) { setFormError('Please fill in Name and Email.'); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionReceipt({
        id: `ETK-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Private',
        budgetFormatted: `${country.currencySymbol}${Math.round(Number(formData.targetBudget) * country.rateMultiplier)}`,
        urgency: formData.urgencyPriority.toUpperCase(),
        estimatedHandoffDate: new Date(Date.now() + (formData.urgencyPriority === 'rush' ? 2 : 5) * 86400000).toLocaleDateString(),
      });
    }, 1200);
  };

  const faqCats = [
    { id: 'all', label: 'All' },
    { id: 'general', label: 'General' },
    { id: 'process', label: 'Process' },
    { id: 'pricing', label: 'Pricing' },
  ] as const;

  return (
    <section className="py-24 bg-white" id="faq-contact-master">
      <div className="section-wrap space-y-20">

        {/* ── Testimonials ── */}
        <div className="space-y-10">
          <div className="space-y-3">
            <span className="section-kicker block">Client Reviews</span>
            <h3 className="panel-title text-[#0A0A0A]">What studios say about us.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localTestimonials.map(t => (
              <div key={t.id} className="pin-card p-7 space-y-5">
                <p className="t-body text-[#444444] leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E5]">
                  <div>
                    <span className="t-body font-semibold text-[#0A0A0A] block">{t.name}</span>
                    <span className="t-body text-[#888888] block" style={{ fontSize: '12px' }}>{t.role} — {t.company}</span>
                  </div>
                  <span className="t-body text-[#0A0A0A]" style={{ fontSize: '16px' }}>{'★'.repeat(t.rating)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ + Contact ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* FAQ */}
          <div className="space-y-7">
            <div className="space-y-3">
              <span className="section-kicker block">FAQ</span>
              <h3 className="panel-title text-[#0A0A0A]">Common questions.</h3>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {faqCats.map(c => (
                <button
                  key={c.id}
                  id={`faq-cat-${c.id}`}
                  onClick={() => { setFaqCategory(c.id as any); setExpandedFaqIndex(null); }}
                  className={`px-4 py-2 rounded-full border transition-all font-medium ${
                    faqCategory === c.id
                      ? 'bg-[#FFD600] text-[#0A0A0A] border-[#FFD600]'
                      : 'bg-white text-[#888888] border-[#E5E5E5] hover:border-[#BBBBBB]'
                  }`}
                  style={{ fontSize: 'var(--fs-body)' }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Accordions */}
            <div className="space-y-2" id="faq-accordions-list">
              {filteredFaqs.map((faq, i) => {
                const isOpen = expandedFaqIndex === i;
                return (
                  <div key={i} className="pin-card overflow-hidden">
                    <button
                      id={`btn-faq-q-${i}`}
                      onClick={() => setExpandedFaqIndex(isOpen ? null : i)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#F7F7F7] transition-colors"
                    >
                      <span className="t-body font-semibold text-[#0A0A0A] leading-snug">{faq.question}</span>
                      <ChevronRight className={`w-4 h-4 text-[#888888] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden border-t border-[#E5E5E5]"
                        >
                          <p className="px-5 py-4 t-body text-[#444444] leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="pin-card p-5 space-y-2">
              <span className="t-body font-semibold text-[#0A0A0A] block">Direct contact</span>
              <span className="t-body text-[#888888] block">
                Email: <a href="mailto:direct@theeditingkart.com" className="text-[#0A0A0A] underline underline-offset-2 font-medium">direct@theeditingkart.com</a>
              </span>
            </div>
          </div>

          {/* Contact form */}
          <div className="pin-card p-8 bg-white space-y-6">
            <div className="space-y-2">
              <h3 className="panel-title text-[#0A0A0A]">Start a Project</h3>
              <p className="t-body text-[#888888] leading-relaxed">
                Tell us about your brief and we'll get back to you within your {country.name} business hours.
              </p>
            </div>

            {formError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl t-body text-red-700">
                {formError}
              </div>
            )}

            <AnimatePresence mode="wait">
              {!submissionReceipt ? (
                <form onSubmit={handleFormSubmit} className="space-y-5" id="brief-builder-form">
                  {formStep === 1 ? (
                    <motion.div key="step1" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} className="space-y-4">
                      <span className="t-body text-[#888888] uppercase tracking-wider font-semibold block" style={{ fontSize: '11px' }}>Step 1 of 2 — About you</span>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="t-body text-[#888888] block mb-1.5 font-medium" style={{ fontSize: '12px' }}>Full Name *</label>
                          <input type="text" name="name" required placeholder="Liam Sterling" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl" />
                        </div>
                        <div>
                          <label className="t-body text-[#888888] block mb-1.5 font-medium" style={{ fontSize: '12px' }}>Email *</label>
                          <input type="email" name="email" required placeholder="you@brand.com" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl" />
                        </div>
                      </div>
                      <div>
                        <label className="t-body text-[#888888] block mb-1.5 font-medium" style={{ fontSize: '12px' }}>Company</label>
                        <input type="text" name="company" placeholder="Sterling Creative" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl" />
                      </div>
                      <div>
                        <label className="t-body text-[#888888] block mb-1.5 font-medium" style={{ fontSize: '12px' }}>Service</label>
                        <select name="serviceChosen" value={formData.serviceChosen} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl">
                          <option value="video">Video Editing</option>
                          <option value="3d">3D Modeling / Rendering</option>
                          <option value="cgi">CGI / VFX Compositing</option>
                        </select>
                      </div>
                      <button type="button" id="btn-form-next" onClick={() => { if (!formData.name || !formData.email) { setFormError('Please fill Name and Email.'); return; } setFormStep(2); }} className="btn-primary w-full justify-center">
                        Continue <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="step2" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} className="space-y-4">
                      <span className="t-body text-[#888888] uppercase tracking-wider font-semibold block" style={{ fontSize: '11px' }}>Step 2 of 2 — Project details</span>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="t-body text-[#888888] block mb-1.5 font-medium" style={{ fontSize: '12px' }}>Budget ({country.currencySymbol})</label>
                          <select name="targetBudget" value={formData.targetBudget} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl">
                            <option value="500">Starter ({country.currencySymbol}{Math.round(500 * country.rateMultiplier)})</option>
                            <option value="1500">Premium ({country.currencySymbol}{Math.round(1500 * country.rateMultiplier)})</option>
                            <option value="5000">Retainer ({country.currencySymbol}{Math.round(5000 * country.rateMultiplier)})</option>
                          </select>
                        </div>
                        <div>
                          <label className="t-body text-[#888888] block mb-1.5 font-medium" style={{ fontSize: '12px' }}>Urgency</label>
                          <select name="urgencyPriority" value={formData.urgencyPriority} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl">
                            <option value="standard">Standard ~5 days</option>
                            <option value="relaxed">Flexible</option>
                            <option value="rush">Rush ~48 hours</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="t-body text-[#888888] block mb-1.5 font-medium" style={{ fontSize: '12px' }}>Footage link (Drive / Frame.io)</label>
                        <input type="url" name="footageStorage" placeholder="https://drive.google.com/…" value={formData.footageStorage} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl" />
                      </div>
                      <div>
                        <label className="t-body text-[#888888] block mb-1.5 font-medium" style={{ fontSize: '12px' }}>Brief</label>
                        <textarea name="creativeBrief" rows={4} placeholder="Describe your project goals…" value={formData.creativeBrief} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl resize-none" />
                      </div>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setFormStep(1)} className="btn-ghost">← Back</button>
                        <button type="submit" id="btn-form-submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center">
                          {isSubmitting ? 'Submitting…' : <>Submit Brief <ArrowRight className="w-4 h-4" /></>}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              ) : (
                <motion.div key="receipt" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5" id="brief-receipt-outcome">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="t-body font-semibold text-green-800 block">Brief submitted!</span>
                      <span className="t-body text-green-700 block" style={{ fontSize: '12px' }}>
                        Your {country.name} project coordinator has been notified.
                      </span>
                    </div>
                  </div>
                  <div className="pin-card p-5 space-y-3 bg-[#F7F7F7]">
                    <div className="flex justify-between t-body">
                      <span className="text-[#888888]">Ticket ID</span>
                      <span className="font-semibold text-[#0A0A0A]">{submissionReceipt.id}</span>
                    </div>
                    <div className="flex justify-between t-body">
                      <span className="text-[#888888]">Name</span>
                      <span className="font-medium text-[#0A0A0A]">{submissionReceipt.name}</span>
                    </div>
                    <div className="flex justify-between t-body">
                      <span className="text-[#888888]">Budget</span>
                      <span className="font-semibold text-[#0A0A0A]">{submissionReceipt.budgetFormatted}</span>
                    </div>
                    <div className="flex justify-between t-body">
                      <span className="text-[#888888]">Est. handoff</span>
                      <span className="font-medium text-[#0A0A0A]">{submissionReceipt.estimatedHandoffDate}</span>
                    </div>
                  </div>
                  {downloadSuccess && (
                    <div className="p-3 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl t-body text-[#0A0A0A] text-center">
                      ✓ Certificate saved to session.
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button id="btn-return-form" onClick={() => { setSubmissionReceipt(null); setFormStep(1); setFormData({ name: '', email: '', company: '', serviceChosen: 'video', targetBudget: '1500', footageStorage: '', urgencyPriority: 'standard', creativeBrief: '' }); }} className="btn-ghost">
                      New Brief
                    </button>
                    <button id="btn-print-mock" onClick={() => { setDownloadSuccess(true); setTimeout(() => setDownloadSuccess(false), 3000); }} className="btn-primary flex-1 justify-center">
                      <FolderDown className="w-4 h-4" /> Download
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
