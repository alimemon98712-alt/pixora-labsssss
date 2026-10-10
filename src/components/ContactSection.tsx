import React, { useState } from 'react';
import { AgencyContactInfo } from '../data/portfolioData';
import { createWhatsAppUrl } from '../utils/helpers';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  HardDrive,
  FileCheck
} from 'lucide-react';

interface ContactSectionProps {
  agencyInfo: AgencyContactInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ agencyInfo }) => {
  const [brandName, setBrandName] = useState('');
  const [adService, setAdService] = useState('E-Commerce Video Reel (9:16)');
  const [industry, setIndustry] = useState('Food & Restaurant');
  const [driveLink, setDriveLink] = useState('');
  const [timeline, setTimeline] = useState('Rush 24 Hours');
  const [notes, setNotes] = useState('');
  const [selectedPhone, setSelectedPhone] = useState<'line1' | 'line2'>('line1');
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const activePhoneNumber = selectedPhone === 'line1' ? agencyInfo.phone1 : agencyInfo.phone2;
  const activeFormattedNumber = selectedPhone === 'line1' ? agencyInfo.phone1Formatted : agencyInfo.phone2Formatted;

  const constructFormattedMessage = () => {
    return [
      `*NEW AD PROJECT BRIEF - PIXORA LABS*`,
      `---------------------------------`,
      `*Brand / Business:* ${brandName || 'Not specified'}`,
      `*Service Required:* ${adService}`,
      `*Industry:* ${industry}`,
      `*Timeline:* ${timeline}`,
      driveLink ? `*Google Drive Link:* ${driveLink}` : null,
      notes ? `*Project Notes:* ${notes}` : null,
      `---------------------------------`,
      `_Sent from Pixora Labs Official Portfolio_`
    ].filter(Boolean).join('\n');
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = constructFormattedMessage();
    const url = createWhatsAppUrl(activePhoneNumber, message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  const handleCopyBrief = () => {
    const message = constructFormattedMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="border-b border-zinc-800 bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <MessageSquare className="h-3.5 w-3.5 text-white" />
            <span>Direct Commercial Booking</span>
          </div>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
            Start Your Next Winning Campaign
          </h2>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
            Connect directly with PIXORA LABS. Available 24/7 on WhatsApp for urgent turnarounds, custom quotations, and creative consultations.
          </p>
        </div>

        {/* Dual Phone Numbers - Big Showcase */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Line 1: Primary Line */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Primary Direct Line · E-Com Ads
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="mt-3">
              <a 
                href={`tel:${agencyInfo.phone1}`}
                className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-zinc-200"
              >
                {agencyInfo.phone1Formatted}
              </a>
              <p className="mt-1 text-xs text-zinc-400">
                WhatsApp Chat & Instant Voice Calls · Response time &lt; 15 mins
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={createWhatsAppUrl(agencyInfo.phone1, `Hi Pixora Labs! I want to start an e-commerce ads project.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-black hover:bg-zinc-200"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${agencyInfo.phone1}`}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs font-medium text-zinc-200 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Direct Call</span>
              </a>
            </div>
          </div>

          {/* Line 2: Production Team */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Commercials & Video Production Desk
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="mt-3">
              <a 
                href={`tel:${agencyInfo.phone2}`}
                className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-zinc-200"
              >
                {agencyInfo.phone2Formatted}
              </a>
              <p className="mt-1 text-xs text-zinc-400">
                Food Commercials, Sizzle Reels & Post-Production Inquiries
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={createWhatsAppUrl(agencyInfo.phone2, `Hi Pixora Labs! I want to discuss commercial reels & banner concepts.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-black hover:bg-zinc-200"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${agencyInfo.phone2}`}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs font-medium text-zinc-200 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Direct Call</span>
              </a>
            </div>
          </div>

        </div>

        {/* Interactive Instant WhatsApp Quotation & Project Brief Form */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Custom Ad Brief Generator
              </span>
              <h3 className="mt-1 font-heading text-xl font-bold text-white sm:text-2xl">
                Send Your Project Details Directly to WhatsApp
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Fill in what you need, and we’ll format an instant message ready for direct WhatsApp dispatch.
              </p>
            </div>

            {/* Target Line Selector */}
            <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-black p-1 text-xs">
              <span className="text-zinc-500 pl-2">Send To:</span>
              <button
                type="button"
                onClick={() => setSelectedPhone('line1')}
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  selectedPhone === 'line1' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Line 1 ({agencyInfo.phone1Formatted})
              </button>
              <button
                type="button"
                onClick={() => setSelectedPhone('line2')}
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  selectedPhone === 'line2' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Line 2 ({agencyInfo.phone2Formatted})
              </button>
            </div>
          </div>

          <form onSubmit={handleSendWhatsApp} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              
              {/* Brand Name */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Brand or Restaurant Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. McDonald's, Al-Faisal, GlowCosmetics, or My Shopify Brand"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-black px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none"
                />
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Ad Creative Service
                </label>
                <select
                  value={adService}
                  onChange={(e) => setAdService(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-black px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                >
                  <option value="E-Commerce Video Reel (9:16)">E-Commerce Video Reel (9:16 vertical)</option>
                  <option value="Commercial Food Sizzle Reel">Commercial Food Sizzle Reel</option>
                  <option value="Campaign Key Visual Banner / Poster">Campaign Key Visual Banner / Poster</option>
                  <option value="Full E-Com Launch Creative Suite (Reels + Banners)">Full E-Com Launch Creative Suite (Reels + Banners)</option>
                  <option value="Monthly Creative Retainer">Monthly Creative Retainer</option>
                  <option value="Custom Ad Package">Custom Ad Package</option>
                </select>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Industry / Niche
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-black px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                >
                  <option value="Food & Restaurant / Fast Food">Food & Restaurant / Fast Food</option>
                  <option value="E-Commerce / Direct-to-Consumer Brand">E-Commerce / Direct-to-Consumer Brand</option>
                  <option value="Fashion, Fragrance & Cosmetics">Fashion, Fragrance & Cosmetics</option>
                  <option value="Electronics & Tech Gadgets">Electronics & Tech Gadgets</option>
                  <option value="Real Estate & Local Business">Real Estate & Local Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Turnaround Speed */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Required Turnaround
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-black px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                >
                  <option value="Rush 24 Hours">Rush 24 Hours (Urgent Launch)</option>
                  <option value="Standard 48 Hours">Standard 48 Hours</option>
                  <option value="Within This Week">Within This Week</option>
                  <option value="Ongoing Monthly Project">Ongoing Monthly Project</option>
                </select>
              </div>

              {/* Google Drive Link */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Google Drive Link for Assets / Footage (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/drive/folders/..."
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-black px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-zinc-500">
                  If you have product photos, logos, or raw footage in Google Drive, paste the link here.
                </p>
              </div>

              {/* Specific Notes */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Campaign Goals & Creative Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details like target audience, preferred style (e.g., similar to KFC crispy reel or McDonald's burger concept), special offers, or hashtags..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-zinc-800 bg-black px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none"
                />
              </div>

            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800 pt-6">
              <div className="text-xs text-zinc-400">
                Sending directly to WhatsApp line: <span className="text-white font-semibold">{activeFormattedNumber}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-zinc-300 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Brief Copied' : 'Copy Brief'}</span>
                </button>

                <button
                  type="submit"
                  className="flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-lg bg-white px-6 py-2.5 text-xs font-bold text-black hover:bg-zinc-200 transition-all shadow-lg shadow-white/10"
                >
                  <Send className="h-4 w-4" />
                  <span>Send to WhatsApp Now</span>
                </button>
              </div>
            </div>

            {sentSuccess && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-950/60 border border-emerald-800/80 p-3 text-xs text-emerald-300">
                <FileCheck className="h-4 w-4 text-emerald-400" />
                <span>Opening WhatsApp with your formatted brief. If popups are blocked, check your WhatsApp application directly!</span>
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
};
