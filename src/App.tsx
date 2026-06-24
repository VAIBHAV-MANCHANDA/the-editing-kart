/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TargetCountry, TabPage, CreativePreset, ServicePageKey } from './types';
import { COUNTRIES } from './data';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import CostCalculator from './components/CostCalculator';
import AboutSection from './components/AboutSection';
import FAQContactSection from './components/FAQContactSection';
import CreativeDirectionPanel from './components/CreativeDirectionPanel';
import StudioMotionStrip from './components/StudioMotionStrip';
import ServicePage from './components/ServicePage';
import { ArrowRight, Film, Heart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<TargetCountry>('usa');
  const [activeTab, setActiveTab] = useState<TabPage>('home');
  const [selectedService, setSelectedService] = useState<ServicePageKey>('video-editing');
  const [creativePreset, setCreativePreset] = useState<CreativePreset>('precision');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedService]);

  const handleServiceSelect = (service: ServicePageKey) => {
    setSelectedService(service);
    setActiveTab('services');
  };

  const activeCountryData = COUNTRIES[selectedCountry];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <HeroSection
              selectedCountry={selectedCountry}
              setActiveTab={setActiveTab}
              creativePreset={creativePreset}
            />
            <StudioMotionStrip setActiveTab={setActiveTab} />
            <ServicesSection
              selectedCountry={selectedCountry}
              setActiveTab={setActiveTab}
              setSelectedService={handleServiceSelect}
              creativePreset={creativePreset}
            />
            <div className="bg-[#F7F7F7] py-20">
              <PortfolioSection selectedCountry={selectedCountry} creativePreset={creativePreset} />
              <div className="text-center mt-10">
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="btn-ghost"
                >
                  View all works <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <FAQContactSection selectedCountry={selectedCountry} creativePreset={creativePreset} />
          </motion.div>
        );

      case 'services':
        return (
          <motion.div key="services" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
            <ServicePage
              selectedCountry={selectedCountry}
              serviceId={selectedService}
              setActiveTab={setActiveTab}
              setSelectedService={setSelectedService}
            />
          </motion.div>
        );

      case 'portfolio':
        return (
          <motion.div key="portfolio" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
            <PortfolioSection selectedCountry={selectedCountry} creativePreset={creativePreset} />
          </motion.div>
        );

      case 'calculator':
        return (
          <motion.div key="calculator" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
            <CostCalculator selectedCountry={selectedCountry} creativePreset={creativePreset} />
          </motion.div>
        );

      case 'about':
        return (
          <motion.div key="about" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
            <AboutSection selectedCountry={selectedCountry} creativePreset={creativePreset} />
          </motion.div>
        );

      case 'contact':
        return (
          <motion.div key="contact" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
            <FAQContactSection selectedCountry={selectedCountry} creativePreset={creativePreset} />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] flex flex-col antialiased" id="studio-app-root">

      {/* Top announcement bar */}
      <div className="bg-[#0A0A0A] text-white text-center py-2.5 px-4" style={{ fontSize: 'var(--fs-body)' }}>
        <span className="font-sans font-medium tracking-wide">
          {activeCountryData.flag} Serving {activeCountryData.name} — Quotes in {activeCountryData.currencyCode}
        </span>
      </div>

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedService={selectedService}
        setSelectedService={handleServiceSelect}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      <CreativeDirectionPanel currentPreset={creativePreset} onPresetChange={setCreativePreset} />

      <main className="flex-grow bg-white">
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-white pt-16 pb-8" id="studio-footer-block">
        <div className="section-wrap">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">

            {/* Brand */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                  <Film className="w-5 h-5 text-[#0A0A0A]" />
                </div>
                <div>
                  <span className="font-serif font-bold text-lg text-white block leading-none">The Editing Kart</span>
                  <span className="t-body text-white/50 block mt-1 uppercase tracking-widest" style={{ fontSize: '11px' }}>Cinema & CGI Studio</span>
                </div>
              </div>
              <p className="t-body text-white/60 max-w-sm leading-relaxed">
                Cinema-tier color grading, DaVinci mastering, surgical sound design, and photorealistic CGI — for brands across USA, UK, Europe, Canada and Oceania.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-white/60" />
                <span className="t-body text-white/60 uppercase tracking-wider" style={{ fontSize: '11px' }}>100% Secure NDA Contracts</span>
              </div>
            </div>

            {/* Nav */}
            <div className="md:col-span-3 space-y-4">
              <span className="t-body font-semibold text-white/40 uppercase tracking-widest block" style={{ fontSize: '11px' }}>Navigation</span>
              <ul className="space-y-2.5">
                {[
                  { id: 'home', label: 'Overview' },
                  { id: 'services', label: 'Services' },
                  { id: 'portfolio', label: 'Portfolio' },
                  { id: 'calculator', label: 'Cost Estimator' },
                  { id: 'about', label: 'Our Studio' },
                  { id: 'contact', label: 'Contact' }
                ].map(link => (
                  <li key={link.id}>
                    <button
                      onClick={() => setActiveTab(link.id as TabPage)}
                      className="t-body text-white/60 hover:text-white transition-colors text-left font-medium"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regions */}
            <div className="md:col-span-4 space-y-4">
              <span className="t-body font-semibold text-white/40 uppercase tracking-widest block" style={{ fontSize: '11px' }}>Active Regions</span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {['🇺🇸 USA', '🇬🇧 UK', '🇪🇺 Europe', '🇨🇦 Canada', '🇦🇺 Australia', '🇳🇿 New Zealand'].map(r => (
                  <span key={r} className="t-body text-white/50 font-medium">{r}</span>
                ))}
              </div>
              <div className="pt-3 border-t border-white/10">
                <span className="t-body text-white/40">
                  Current: <strong className="text-white font-semibold">{activeCountryData.name}</strong>
                </span>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="t-body text-white/40">© 2026 The Editing Kart. All rights reserved.</span>
            <span className="t-body text-white/40 flex items-center gap-1.5">
              Made with <Heart className="w-3.5 h-3.5 text-white/40 fill-current" /> by The Editing Kart Co.
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
