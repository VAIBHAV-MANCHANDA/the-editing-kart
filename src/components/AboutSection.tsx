import React from 'react';
import { TargetCountry, BollywoodPreset } from '../types';
import { COUNTRIES } from '../data';
import { Workflow } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  selectedCountry: TargetCountry;
  bollywoodPreset?: BollywoodPreset;
}

const MILESTONES = [
  { year: '2021', title: 'Studio Founded', desc: 'Formed by three veterans of elite London and LA broadcast agencies.' },
  { year: '2022', title: 'Remote Pipeline v2', desc: 'Built proprietary frame-level feedback integration via custom fiber gateways.' },
  { year: '2024', title: 'Redshift Expansion', desc: 'Expanded rendering farms for hyper-realistic 3D fluid rendering in 24 hours.' },
  { year: '2026', title: 'Global Coverage', desc: 'Active nodes in North America, UK, Europe, and Oceania.' },
];

const LOCATIONS = [
  { name: 'USA', city: 'Los Angeles / NY', email: 'la@theeditingkart.com' },
  { name: 'UK', city: 'London, Soho', email: 'soho@theeditingkart.com' },
  { name: 'Europe', city: 'Berlin Mitte', email: 'berlin@theeditingkart.com' },
  { name: 'Canada', city: 'Vancouver East', email: 'vc@theeditingkart.com' },
  { name: 'Australia', city: 'Sydney Harbour', email: 'syd@theeditingkart.com' },
  { name: 'New Zealand', city: 'Auckland Central', email: 'nz@theeditingkart.com' },
];

export default function AboutSection({ selectedCountry }: AboutSectionProps) {
  const country = COUNTRIES[selectedCountry];

  return (
    <section className="py-24 bg-white" id="about-section-view">
      <div className="section-wrap space-y-24">

        {/* ── Row 1: Story + Milestones ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <span className="section-kicker block">Our Studio</span>
            <h2 className="section-title text-[#0A0A0A]">
              A remote post-production house built for speed.
            </h2>
            <p className="t-body text-[#444444] leading-relaxed">
              We founded <strong className="text-[#0A0A0A] font-semibold">The Editing Kart</strong> because modern agencies were tired of bloated post-production bureaucracies. High-end video, 3D and CGI shouldn't take three months and endless Zoom calls to align on a cut.
            </p>
            <p className="t-body text-[#888888] leading-relaxed">
              By hiring dedicated specialists and standardizing pipelines across North America, Europe, and Oceania, we support your timezones. When you pack up in NYC or London, our Oceanic nodes edit overnight and deliver a revised cut before you clock in at 9 AM.
            </p>
            <div className="pin-card p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] flex items-center justify-center shrink-0">
                <Workflow className="w-5 h-5 text-[#0A0A0A]" />
              </div>
              <div>
                <span className="t-body font-semibold text-[#0A0A0A] block">
                  {country.flag} {country.name} — Average delivery ~48–72 hours
                </span>
                <span className="t-body text-[#888888]" style={{ fontSize: '12px' }}>
                  Active pipeline node online
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="pin-card p-5 space-y-2 hover:border-[#0A0A0A] transition-colors"
              >
                <span className="t-body font-bold text-[#0A0A0A] block uppercase tracking-widest" style={{ fontSize: '12px' }}>{m.year}</span>
                <span className="t-body font-semibold text-[#0A0A0A] block">{m.title}</span>
                <p className="t-body text-[#888888] leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Row 2: Directors ── */}
        {/* ── Row 3: Locations ── */}
        <div className="pin-card p-8 space-y-8">
          <div className="space-y-3">
            <span className="section-kicker block">Regions</span>
            <h3 className="panel-title text-[#0A0A0A]">Active nodes across 6 markets.</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {LOCATIONS.map(loc => {
              const isActive = loc.name.toLowerCase().includes(
                selectedCountry === 'newzealand' ? 'zealand'
                  : selectedCountry === 'uk' ? 'uk'
                  : selectedCountry === 'europe' ? 'europe'
                  : selectedCountry
              );
              return (
                <div
                  key={loc.name}
                  className={`p-4 rounded-xl border space-y-3 transition-all duration-200 ${
                    isActive ? 'border-[#FFD600] bg-[#FFD600]' : 'border-[#E5E5E5] bg-white'
                  }`}
                >
                  <div>
                    <span className={`t-body font-bold block ${isActive ? 'text-[#0A0A0A]' : 'text-[#0A0A0A]'}`}>
                      {loc.name}
                    </span>
                    <span className={`t-body block ${isActive ? 'text-[#0A0A0A]/70' : 'text-[#888888]'}`} style={{ fontSize: '12px' }}>
                      {loc.city}
                    </span>
                  </div>
                  <span className={`t-body block truncate ${isActive ? 'text-[#0A0A0A]/60' : 'text-[#888888]'}`} style={{ fontSize: '11px' }}>
                    {loc.email}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
