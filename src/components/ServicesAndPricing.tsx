import React from 'react';
import { AgencyContactInfo, servicesList } from '../data/portfolioData';
import { createWhatsAppUrl } from '../utils/helpers';
import { Check, Sparkles, MessageSquare, Clock, Zap, Flame } from 'lucide-react';

interface ServicesAndPricingProps {
  agencyInfo: AgencyContactInfo;
}

export const ServicesAndPricing: React.FC<ServicesAndPricingProps> = ({ agencyInfo }) => {
  const packages = [
    {
      id: 'pkg-reel',
      name: 'Single Commercial Reel',
      badge: 'Fast Turnaround',
      description: 'Single high-impact 9:16 video ad designed for Meta Ads & TikTok to skyrocket conversions.',
      turnaround: '24 Hours',
      features: [
        '1x 9:16 4K Commercial Video Reel',
        'Aggressive 3-second scroll-stopping hook',
        'Sound design, crunch/sizzle audio effects',
        'Kinetic captions & typography motion',
        '1 Free Revision round included',
        'Master Google Drive download'
      ],
      recommended: false
    },
    {
      id: 'pkg-banner-pack',
      name: 'Key Visual Banner Pack',
      badge: 'Poster & Feed',
      description: 'Ultra-crisp commercial key visual posters inspired by KFC & McDonald’s level craftsmanship.',
      turnaround: '12-24 Hours',
      features: [
        '3x High-Definition Commercial Banners',
        'Master Retouching & Compositing',
        'Story (9:16) + Feed (1:1 & 4:5) Ratios',
        'Custom 3D typography & slogan lockup',
        'Layered PSD source files in Drive',
        'Commercial print & billboard ready'
      ],
      recommended: false
    },
    {
      id: 'pkg-ecommerce-suite',
      name: 'Full E-Com Launch Suite',
      badge: 'Best Value for Ad Sellers',
      description: 'Everything an e-commerce brand or food franchise needs for profitable paid advertising campaigns.',
      turnaround: '48-72 Hours',
      features: [
        '3x Video Commercial Reels (3 Unique Hooks)',
        '6x High-Impact Display Banners',
        '2x High-Converting Carousel Sets',
        'Ad copy angles & headline variations',
        'Color grading, CGI particles & steam fx',
        'Dedicated VIP Google Drive Vault',
        'Priority direct line to creative director'
      ],
      recommended: true
    }
  ];

  return (
    <section id="services" className="border-b border-zinc-800 bg-zinc-950/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <Zap className="h-3.5 w-3.5 text-white" />
            <span>Tailored for E-Commerce Sellers & Brand Owners</span>
          </div>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
            Commercial Production Packages
          </h2>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
            Transparent, rapid creative production. Direct delivery to your Google Drive within 24 to 48 hours.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((pkg) => {
            const pkgMsg = `Hi Pixora Labs, I want to book the "${pkg.name}" package for my brand. Please provide exact pricing quote and starting process.`;
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
                  pkg.recommended
                    ? 'border-white bg-black shadow-2xl shadow-white/5'
                    : 'border-zinc-800 bg-zinc-950/90 hover:border-zinc-700'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-zinc-700 bg-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                    Recommended for Ad Sellers
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-semibold text-zinc-300">{pkg.badge}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {pkg.turnaround}
                    </span>
                  </div>

                  <h3 className="mt-2 font-heading text-xl font-bold text-white">
                    {pkg.name}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="mt-6 border-t border-zinc-800/80 pt-5 space-y-2.5">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-white flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-zinc-800 pt-5">
                  <a
                    href={createWhatsAppUrl(agencyInfo.phone1, pkgMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full rounded-lg px-4 py-2.5 text-xs font-bold transition-all ${
                      pkg.recommended
                        ? 'bg-white text-black hover:bg-zinc-200'
                        : 'border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800'
                    }`}
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Order via WhatsApp ({agencyInfo.phone1Formatted})</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Agency Capability Pillars */}
        <div className="mt-16 border-t border-zinc-800/80 pt-12">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 text-center mb-8">
            How Pixora Labs Scales Your Ad Performance
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((svc) => (
              <div key={svc.id} className="rounded-xl border border-zinc-800/80 bg-black/60 p-5">
                <span className="font-heading text-lg font-bold text-zinc-500">
                  {svc.number}
                </span>
                <h4 className="mt-1 font-heading text-base font-semibold text-white">
                  {svc.title}
                </h4>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  {svc.description}
                </p>
                <div className="mt-4 border-t border-zinc-800/60 pt-3 text-[11px] text-zinc-500">
                  <p><span className="text-zinc-400">Deliverables:</span> {svc.deliverables}</p>
                  <p className="mt-1"><span className="text-zinc-400">Turnaround:</span> {svc.turnaround}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
