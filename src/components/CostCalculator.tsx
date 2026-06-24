import React, { useState, useEffect } from 'react';
import { TargetCountry, CreativePreset } from '../types';
import { COUNTRIES, CALCULATOR_BASE_PRICING } from '../data';
import { Check, Calculator, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CostCalculatorProps {
  selectedCountry: TargetCountry;
  creativePreset?: CreativePreset;
}

type ServiceKey = 'video' | '3d' | 'cgi';

export default function CostCalculator({ selectedCountry }: CostCalculatorProps) {
  const [service, setService] = useState<ServiceKey>('video');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [durationValue, setDurationValue] = useState(1);
  const [urgencyIndex, setUrgencyIndex] = useState(1);

  const country = COUNTRIES[selectedCountry];

  useEffect(() => { setSelectedOptions([]); }, [service]);

  const pricingData = CALCULATOR_BASE_PRICING[service];

  const calculateCost = () => {
    let price = pricingData.base;
    pricingData.options.forEach(opt => {
      if (selectedOptions.includes(opt.id)) price += opt.price;
    });
    price = price * (1 + (durationValue - 1) * 0.15);
    const urgencyMul = [0.9, 1.0, 1.35];
    price = price * urgencyMul[urgencyIndex];
    return Math.round(price * country.rateMultiplier);
  };

  const toggleOption = (id: string) =>
    setSelectedOptions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const finalPrice = calculateCost();

  const serviceTabs = [
    { id: 'video' as ServiceKey, label: 'Video Editing' },
    { id: '3d'    as ServiceKey, label: '3D Rendering'  },
    { id: 'cgi'   as ServiceKey, label: 'CGI & VFX'     },
  ];

  const urgencyOptions = [
    { index: 0, label: 'Relaxed',  detail: '0.9× rate'    },
    { index: 1, label: 'Standard', detail: 'Regular rate'  },
    { index: 2, label: 'Rush',     detail: '+35% priority' },
  ];

  return (
    <section className="py-24 bg-[#F7F7F7]" id="cost-calculator-section-main">
      <div className="section-wrap">

        {/* Header */}
        <div className="max-w-2xl mb-14 space-y-4">
          <span className="section-kicker block">Cost Estimator</span>
          <h2 className="section-title text-[#0A0A0A]">
            Build your quote in seconds.
          </h2>
          <p className="t-body text-[#888888] leading-relaxed">
            Customize your project scope and get an instant estimate in{' '}
            <strong className="text-[#0A0A0A] font-semibold">{country.name} ({country.currencySymbol} {country.currencyCode})</strong>.
            No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="calculator-split-box">

          {/* Controls — 7 cols */}
          <div className="lg:col-span-7 pin-card p-8 space-y-8 bg-white">

            {/* Step 1 */}
            <div className="space-y-3">
              <span className="t-body font-semibold text-[#888888] uppercase tracking-wider block" style={{ fontSize: '11px' }}>
                Step 1 — Service
              </span>
              <div className="flex flex-wrap gap-2">
                {serviceTabs.map(s => (
                  <button
                    key={s.id}
                    id={`btn-calc-cat-${s.id}`}
                    onClick={() => setService(s.id)}
                    className={`px-5 py-2.5 rounded-full border font-medium transition-all ${
                      service === s.id
                        ? 'bg-[#FFD600] text-[#0A0A0A] border-[#FFD600]'
                        : 'bg-white text-[#888888] border-[#E5E5E5] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                    }`}
                    style={{ fontSize: 'var(--fs-body)' }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <span className="t-body font-semibold text-[#888888] uppercase tracking-wider block" style={{ fontSize: '11px' }}>
                Step 2 — Add-ons
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pricingData.options.map(opt => {
                  const active = selectedOptions.includes(opt.id);
                  const price = Math.round(opt.price * country.rateMultiplier);
                  return (
                    <button
                      key={opt.id}
                      id={`btn-opt-addon-${opt.id}`}
                      onClick={() => toggleOption(opt.id)}
                      className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all ${
                        active
                          ? 'border-[#0A0A0A] bg-[#F7F7F7]'
                          : 'border-[#E5E5E5] bg-white hover:border-[#BBBBBB]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${active ? 'bg-[#0A0A0A] border-[#0A0A0A]' : 'border-[#DDDDDD]'}`}>
                          {active && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                        <span className="t-body text-[#0A0A0A] font-medium leading-tight">{opt.name}</span>
                      </div>
                      <span className="t-body font-semibold text-[#0A0A0A] ml-2 shrink-0">
                        +{country.currencySymbol}{price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="t-body font-semibold text-[#888888] uppercase tracking-wider" style={{ fontSize: '11px' }}>
                  Step 3 — Project Scale
                </span>
                <span className="t-body font-semibold text-[#0A0A0A]" style={{ fontSize: '11px' }}>
                  {durationValue.toFixed(1)}× multiplier
                </span>
              </div>
              <div className="bg-[#F7F7F7] rounded-xl p-4 space-y-3">
                <input
                  type="range" min="1" max="5" step="0.5"
                  value={durationValue}
                  onChange={e => setDurationValue(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
                <div className="flex justify-between t-body text-[#888888]" style={{ fontSize: '12px' }}>
                  <span>15–30s ad</span>
                  <span>60s promo</span>
                  <span>3min+ film</span>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-3">
              <span className="t-body font-semibold text-[#888888] uppercase tracking-wider block" style={{ fontSize: '11px' }}>
                Step 4 — Urgency
              </span>
              <div className="grid grid-cols-3 gap-3">
                {urgencyOptions.map(opt => (
                  <button
                    key={opt.index}
                    id={`btn-urgency-${opt.index}`}
                    onClick={() => setUrgencyIndex(opt.index)}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      urgencyIndex === opt.index
                        ? 'border-[#0A0A0A] bg-[#F7F7F7]'
                        : 'border-[#E5E5E5] bg-white hover:border-[#BBBBBB]'
                    }`}
                  >
                    <span className="t-body font-semibold text-[#0A0A0A] block">{opt.label}</span>
                    <span className="t-body text-[#888888] block mt-0.5" style={{ fontSize: '12px' }}>{opt.detail}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Receipt — 5 cols */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 pin-card p-7 space-y-7 bg-white">
              {/* Receipt top strip */}
              <div className="h-1 -mx-7 -mt-7 rounded-t-2xl bg-[#0A0A0A]" />

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="t-body text-[#888888] uppercase tracking-wider block" style={{ fontSize: '11px' }}>Estimate</span>
                  <span className="t-body font-semibold text-[#0A0A0A] block" style={{ fontSize: 'var(--fs-body)' }}>The Editing Kart</span>
                </div>
                <Calculator className="w-5 h-5 text-[#888888]" />
              </div>

              {/* Line items */}
              <div className="space-y-3 border-y border-[#E5E5E5] py-5">
                <div className="flex justify-between t-body text-[#444444]">
                  <span>Base fee</span>
                  <span className="font-medium text-[#0A0A0A]">{country.currencySymbol}{Math.round(pricingData.base * country.rateMultiplier)}</span>
                </div>
                {selectedOptions.length > 0 && pricingData.options.filter(o => selectedOptions.includes(o.id)).map(o => (
                  <div key={o.id} className="flex justify-between t-body text-[#444444]">
                    <span className="truncate pr-4">+ {o.name}</span>
                    <span className="font-medium text-[#0A0A0A] shrink-0">{country.currencySymbol}{Math.round(o.price * country.rateMultiplier)}</span>
                  </div>
                ))}
                <div className="flex justify-between t-body text-[#444444]">
                  <span>Scale multiplier</span>
                  <span className="font-medium text-[#0A0A0A]">{durationValue.toFixed(1)}×</span>
                </div>
                <div className="flex justify-between t-body text-[#444444]">
                  <span>Urgency</span>
                  <span className="font-medium text-[#0A0A0A]">{['Relaxed', 'Standard', 'Rush'][urgencyIndex]}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-end justify-between">
                <div>
                  <span className="t-body text-[#888888] uppercase tracking-wider block" style={{ fontSize: '11px' }}>Estimated Total</span>
                  <motion.span
                    key={finalPrice}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif font-bold text-[#0A0A0A] block"
                    style={{ fontSize: 'clamp(2.4rem,5vw,3.4rem)' }}
                  >
                    {country.currencySymbol}{finalPrice}
                  </motion.span>
                </div>
                <span className="pill" style={{ fontSize: '11px' }}>Estimate</span>
              </div>

              <p className="t-body text-[#888888] leading-relaxed" style={{ fontSize: '12px' }}>
                This estimate is illustrative. Contact us for a precise quote based on your specific brief.
              </p>

              <button
                id="calc-submit-brief"
                className="btn-primary w-full justify-center"
                onClick={() => (document.getElementById('nav-item-contact') as HTMLButtonElement | null)?.click()}
              >
                Confirm & Build Brief <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
