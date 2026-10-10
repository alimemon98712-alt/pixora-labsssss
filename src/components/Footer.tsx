import React from 'react';
import { AgencyContactInfo } from '../data/portfolioData';
import { createWhatsAppUrl } from '../utils/helpers';
import { MessageSquare, Phone, HardDrive, SlidersHorizontal, ArrowUp } from 'lucide-react';

interface FooterProps {
  agencyInfo: AgencyContactInfo;
  onOpenAdmin: () => void;
  onNavigateSection: (sectionId: string) => void;
  onSelectFilter: (filter: 'all' | 'video' | 'banner' | 'drive') => void;
}

export const Footer: React.FC<FooterProps> = ({
  agencyInfo,
  onOpenAdmin,
  onNavigateSection,
  onSelectFilter
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800 bg-black py-14 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950 p-0.5">
                <img src={agencyInfo.logo} alt={agencyInfo.name} className="h-full w-full object-cover" />
              </div>
              <span className="font-heading text-lg font-bold tracking-wider text-white">
                {agencyInfo.name}
              </span>
            </div>
            
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-zinc-400">
              High-impact commercial video reels & high-converting promotional banners engineered for food brands, e-commerce ad sellers, and modern retailers.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500">
              <span>{agencyInfo.location}</span>
            </div>
          </div>

          {/* Quick Portfolio Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Creative Folders
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectFilter('video');
                    onNavigateSection('portfolio');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Commercial Video Reels (9:16)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectFilter('banner');
                    onNavigateSection('portfolio');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Banner & Poster Concepts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectFilter('drive');
                    onNavigateSection('drive-vault');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Google Drive Asset Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors"
                >
                  Production Packages & Rates
                </button>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp Contact Lines */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact Lines
            </h4>
            <div className="mt-3 space-y-2">
              <a
                href={createWhatsAppUrl(agencyInfo.phone1, `Hi Pixora Labs! I want to start a project.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-300 hover:border-zinc-700 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{agencyInfo.phone1Formatted}</span>
                </span>
                <span className="text-[11px] text-zinc-500">Primary WhatsApp</span>
              </a>

              <a
                href={createWhatsAppUrl(agencyInfo.phone2, `Hi Pixora Labs! I want to discuss commercial reels.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-300 hover:border-zinc-700 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{agencyInfo.phone2Formatted}</span>
                </span>
                <span className="text-[11px] text-zinc-500">Commercial Production</span>
              </a>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Admin Studio</span>
              </button>

              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white"
              >
                <ArrowUp className="h-3.5 w-3.5" />
                <span>Top</span>
              </button>
            </div>
          </div>

        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-900 pt-6 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} PIXORA LABS. All rights reserved. Creative Concepts & Commercial Production.</p>
          <p className="mt-2 sm:mt-0">Vercel Ready · Ultra Fast Monochrome Architecture</p>
        </div>

      </div>
    </footer>
  );
};
