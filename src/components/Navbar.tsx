import React, { useState, useEffect } from 'react';
import { TargetCountry, TabPage, ServicePageKey } from '../types';
import { COUNTRIES, SERVICE_PAGES } from '../data';
import { Globe, Menu, X, ArrowRight, Film, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: TabPage;
  setActiveTab: (tab: TabPage) => void;
  selectedService: ServicePageKey;
  setSelectedService: (service: ServicePageKey) => void;
  selectedCountry: TargetCountry;
  setSelectedCountry: (country: TargetCountry) => void;
}

export default function Navbar({ activeTab, setActiveTab, selectedService, setSelectedService, selectedCountry, setSelectedCountry }: NavbarProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const countryInfo = COUNTRIES[selectedCountry];
  const currentService = SERVICE_PAGES.find(service => service.id === selectedService) ?? SERVICE_PAGES[0];

  const openService = (service: ServicePageKey) => {
    setSelectedService(service);
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navItems: { id: TabPage; label: string }[] = [
    { id: 'home',       label: 'Home'      },
    { id: 'portfolio',  label: 'Work'      },
    { id: 'calculator', label: 'Pricing'   },
    { id: 'about',      label: 'About'     },
    { id: 'contact',    label: 'Contact'   },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-[0_2px_16px_rgba(0,0,0,0.08)]' : 'border-b border-[#E5E5E5]'}`}>
      <div className="section-wrap">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2.5 group" id="nav-logo-btn">
            <div className="w-9 h-9 rounded-xl bg-[#0A0A0A] flex items-center justify-center transition-opacity group-hover:opacity-80">
              <Film className="w-4 h-4 text-white" />
            </div>
            {/* Logo name uses display font at body size — the brand wordmark */}
            <span className="font-serif font-bold text-[#0A0A0A] leading-none t-body" style={{ fontFamily: '"Playfair Display", serif' }}>
              The Editing Kart
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            <div className="relative">
              <button
                id="nav-item-services"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="t-body px-4 py-2 rounded-full transition-colors duration-200 font-medium flex items-center gap-1.5"
                style={{
                  color: activeTab === 'services' ? '#0A0A0A' : '#888888',
                  background: activeTab === 'services' ? '#FFD600' : 'transparent',
                }}
              >
                Services <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isServicesOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsServicesOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-2 w-72 bg-white border border-[#E5E5E5] rounded-2xl shadow-xl z-50 p-2 grid grid-cols-1 gap-0.5"
                    >
                      {SERVICE_PAGES.map(service => {
                        const isActive = selectedService === service.id && activeTab === 'services';
                        return (
                          <button
                            key={service.id}
                            onClick={() => openService(service.id)}
                            className="t-body w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-colors hover:bg-[#F7F7F7]"
                            style={{ color: isActive ? '#0A0A0A' : '#444444', fontWeight: isActive ? '600' : '400' }}
                          >
                            <span>{service.navLabel}</span>
                            {isActive && <span className="w-2 h-2 rounded-full bg-[#FFD600]" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className="t-body px-4 py-2 rounded-full transition-colors duration-200 font-medium"
                  style={{
                    color: isActive ? '#0A0A0A' : '#888888',
                    background: isActive ? '#FFD600' : 'transparent',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: country + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button
                id="country-selector-btn"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="t-body flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#E5E5E5] hover:border-[#BBBBBB] transition-colors font-medium text-[#444444]"
              >
                <Globe className="w-3.5 h-3.5 text-[#888888]" />
                {countryInfo.flag} {countryInfo.currencyCode}
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-white border border-[#E5E5E5] rounded-2xl shadow-xl z-50 p-2 space-y-0.5"
                    >
                      {Object.values(COUNTRIES).map(c => (
                        <button
                          key={c.code}
                          id={`country-opt-${c.code}`}
                          onClick={() => { setSelectedCountry(c.code as TargetCountry); setIsLangOpen(false); }}
                          className="t-body w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors hover:bg-[#F7F7F7]"
                          style={{ color: selectedCountry === c.code ? '#0A0A0A' : '#444444', fontWeight: selectedCountry === c.code ? '600' : '400' }}
                        >
                          <span className="flex items-center gap-2">
                            <span>{c.flag}</span>
                            <span>{c.name}</span>
                          </span>
                          <span className="t-body text-[#888888]">{c.currencyCode}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button id="nav-cta-btn" onClick={() => setActiveTab('contact')} className="btn-primary">
              Get a Quote <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="t-body flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#E5E5E5] text-[#444444]">
              {countryInfo.flag}
            </button>
            <button
              id="mobile-nav-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E5E5E5] text-[#0A0A0A]"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile country dropdown */}
      <AnimatePresence>
        {isLangOpen && (
          <div className="md:hidden absolute top-16 right-4 z-50">
            <div className="fixed inset-0 bg-transparent" onClick={() => setIsLangOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-52 bg-white border border-[#E5E5E5] rounded-2xl shadow-xl p-2 space-y-0.5"
            >
              {Object.values(COUNTRIES).map(c => (
                <button
                  key={c.code}
                  onClick={() => { setSelectedCountry(c.code as TargetCountry); setIsLangOpen(false); }}
                  className="t-body w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between hover:bg-[#F7F7F7] transition-colors text-[#444444]"
                >
                  <span className="flex items-center gap-2"><span>{c.flag}</span><span>{c.name}</span></span>
                  <span className="t-body text-[#888888]">{c.currencyCode}</span>
                </button>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[#E5E5E5] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className="t-body block w-full text-left px-4 py-3 rounded-xl transition-colors font-medium"
                    style={{ color: isActive ? '#0A0A0A' : '#888888', background: isActive ? '#FFD600' : 'transparent' }}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="px-4 pt-3 pb-2">
                <span className="t-body text-[#888888] uppercase tracking-wider font-semibold block" style={{ fontSize: '11px' }}>
                  Services
                </span>
                <span className="t-body text-[#0A0A0A] font-semibold block mt-1">{currentService.navLabel}</span>
              </div>
              <div className="grid grid-cols-1 gap-1 px-2 pb-3">
                {SERVICE_PAGES.map(service => {
                  const isActive = selectedService === service.id && activeTab === 'services';
                  return (
                    <button
                      key={service.id}
                      onClick={() => openService(service.id)}
                      className="t-body block w-full text-left px-4 py-2.5 rounded-xl transition-colors font-medium"
                      style={{ color: isActive ? '#0A0A0A' : '#888888', background: isActive ? '#FFD600' : 'transparent' }}
                    >
                      {service.navLabel}
                    </button>
                  );
                })}
              </div>
              <div className="pt-3 border-t border-[#E5E5E5]">
                <button
                  id="mobile-nav-cta"
                  onClick={() => { setActiveTab('contact'); setIsMobileMenuOpen(false); }}
                  className="btn-primary w-full justify-center"
                >
                  Get a Quote <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
