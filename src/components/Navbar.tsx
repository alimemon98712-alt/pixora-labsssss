import React, { useState } from 'react';
import { AgencyContactInfo } from '../data/portfolioData';
import { createWhatsAppUrl } from '../utils/helpers';
import { 
  PlaySquare, 
  Image as ImageIcon, 
  FolderGit2, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  SlidersHorizontal,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  agencyInfo: AgencyContactInfo;
  onOpenAdmin: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeFilter: 'all' | 'video' | 'banner' | 'drive';
  setActiveFilter: (filter: 'all' | 'video' | 'banner' | 'drive') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  agencyInfo,
  onOpenAdmin,
  onNavigateSection,
  activeFilter,
  setActiveFilter
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultWaMsg = `Hi Pixora Labs! I saw your e-commerce ads and commercial portfolio and I want to discuss a project.`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-black/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => {
            onNavigateSection('hero');
            setActiveFilter('all');
          }}
          className="group flex cursor-pointer items-center gap-3.5 transition-opacity hover:opacity-90"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950 p-0.5 shadow-md shadow-white/5 transition-transform duration-300 group-hover:scale-105">
            <img 
              src={agencyInfo.logo} 
              alt={agencyInfo.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-wider text-white">
              {agencyInfo.name}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-400">
              Creative Ads Studio
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <button
            onClick={() => {
              setActiveFilter('all');
              onNavigateSection('portfolio');
            }}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === 'all' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Work
          </button>
          <button
            onClick={() => {
              setActiveFilter('video');
              onNavigateSection('portfolio');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === 'video' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <PlaySquare className="h-3.5 w-3.5" />
            Video Commercials
          </button>
          <button
            onClick={() => {
              setActiveFilter('banner');
              onNavigateSection('portfolio');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === 'banner' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            Banner Concepts
          </button>
          <button
            onClick={() => {
              setActiveFilter('drive');
              onNavigateSection('drive-vault');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === 'drive' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FolderGit2 className="h-3.5 w-3.5" />
            Drive Vault
          </button>
          <button
            onClick={() => onNavigateSection('services')}
            className="px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Pricing & Services
          </button>
          <button
            onClick={() => onNavigateSection('contact')}
            className="px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Get In Touch
          </button>
        </nav>

        {/* Action Controls & Contact Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* WhatsApp Primary */}
          <a
            href={createWhatsAppUrl(agencyInfo.phone1, defaultWaMsg)}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat with Primary Contact"
            className="group flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-900/90 px-2.5 py-1.5 text-xs font-medium text-zinc-200 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>{agencyInfo.phone1Formatted}</span>
          </a>

          {/* WhatsApp Secondary */}
          <a
            href={createWhatsAppUrl(agencyInfo.phone2, defaultWaMsg)}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat with Video Production Team"
            className="group flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-900/90 px-2.5 py-1.5 text-xs font-medium text-zinc-200 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>{agencyInfo.phone2Formatted}</span>
          </a>

          {/* Admin Studio Trigger */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 rounded-md border border-white/20 bg-white px-3 py-1.5 text-xs font-semibold text-black transition-all hover:bg-zinc-200 hover:shadow-sm"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Admin Studio</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenAdmin}
            className="rounded border border-zinc-700 bg-zinc-900 p-1.5 text-zinc-300"
            title="Admin Studio"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveFilter('all');
                onNavigateSection('portfolio');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between py-2 text-left text-sm font-medium text-zinc-200 hover:text-white"
            >
              <span>All Portfolio Works</span>
              <span className="text-xs text-zinc-500">View</span>
            </button>
            <button
              onClick={() => {
                setActiveFilter('video');
                onNavigateSection('portfolio');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between py-2 text-left text-sm font-medium text-zinc-200 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <PlaySquare className="h-4 w-4" /> Video Commercials
              </span>
              <span className="text-xs text-zinc-500">Reels</span>
            </button>
            <button
              onClick={() => {
                setActiveFilter('banner');
                onNavigateSection('portfolio');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between py-2 text-left text-sm font-medium text-zinc-200 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Banner Concepts
              </span>
              <span className="text-xs text-zinc-500">Posters</span>
            </button>
            <button
              onClick={() => {
                setActiveFilter('drive');
                onNavigateSection('drive-vault');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between py-2 text-left text-sm font-medium text-zinc-200 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <FolderGit2 className="h-4 w-4" /> Google Drive Vault
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
            </button>
            <button
              onClick={() => {
                onNavigateSection('services');
                setMobileMenuOpen(false);
              }}
              className="py-2 text-left text-sm font-medium text-zinc-200 hover:text-white"
            >
              Services & Pricing Rates
            </button>
            <button
              onClick={() => {
                onNavigateSection('contact');
                setMobileMenuOpen(false);
              }}
              className="py-2 text-left text-sm font-medium text-zinc-200 hover:text-white"
            >
              Order & Contact
            </button>
          </div>

          <div className="mt-4 border-t border-zinc-800 pt-3">
            <p className="mb-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Instant WhatsApp Support
            </p>
            <div className="grid grid-cols-1 gap-2">
              <a
                href={createWhatsAppUrl(agencyInfo.phone1, defaultWaMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-200"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-emerald-400" /> {agencyInfo.phone1Formatted}
                </span>
                <span className="text-[11px] text-zinc-400">Primary Line</span>
              </a>
              <a
                href={createWhatsAppUrl(agencyInfo.phone2, defaultWaMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-200"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-emerald-400" /> {agencyInfo.phone2Formatted}
                </span>
                <span className="text-[11px] text-zinc-400">Commercials Line</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
