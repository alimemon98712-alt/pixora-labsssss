import React, { useState, useEffect } from 'react';
import { PortfolioItem, AgencyContactInfo } from '../data/portfolioData';
import { createWhatsAppUrl } from '../utils/helpers';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  MessageSquare, 
  MapPin, 
  ExternalLink,
  Sparkles,
  Share2,
  Check
} from 'lucide-react';

interface BannerLightboxProps {
  item: PortfolioItem | null;
  agencyInfo: AgencyContactInfo;
  onClose: () => void;
}

export const BannerLightbox: React.FC<BannerLightboxProps> = ({ item, agencyInfo, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.3, 0.8));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waOrderMsg = `Hello Pixora Labs, I want commercial banner creatives similar to your "${item.title}" for ${item.client}. Please provide details.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 sm:p-6 backdrop-blur-md">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl lg:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 rounded-full bg-black/80 p-2 text-zinc-400 backdrop-blur-sm transition-colors hover:bg-zinc-800 hover:text-white"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image Stage */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black p-4 min-h-[50vh] lg:min-h-[75vh]">
          <div 
            className="transition-transform duration-200 ease-out max-h-[70vh] lg:max-h-[85vh] flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[68vh] lg:max-h-[82vh] w-auto rounded-lg object-contain shadow-2xl"
            />
          </div>

          {/* Floating Zoom & Tool Bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/90 px-3 py-1.5 backdrop-blur-md">
            <button
              onClick={handleZoomOut}
              className="rounded p-1 text-zinc-400 hover:text-white"
              title="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono text-zinc-400">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="rounded p-1 text-zinc-400 hover:text-white"
              title="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <div className="h-4 w-[1px] bg-zinc-700 mx-1" />
            <a
              href={item.imageUrl}
              download={`${item.title.toLowerCase().replace(/\s+/g, '-')}-pixora-labs.jpg`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-zinc-300 hover:text-white"
              title="Download High-Res Graphic"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Save HD</span>
            </a>
          </div>
        </div>

        {/* Banner Details & Ordering Column */}
        <div className="flex w-full flex-col justify-between border-t border-zinc-800 bg-zinc-950 p-5 lg:w-[380px] lg:border-t-0 lg:border-l overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-semibold text-white">{item.client}</span>
              <span aria-hidden="true">·</span>
              <span>{item.category}</span>
            </div>

            <h2 className="mt-2 font-heading text-xl font-bold text-white">
              {item.title}
            </h2>

            {item.location && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-300">
                <MapPin className="h-3.5 w-3.5 text-red-400" />
                <span>{item.location}</span>
              </div>
            )}

            <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Advertising Headline / Copy
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                "{item.tagline}"
              </p>
            </div>

            <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
              {item.description}
            </p>

            {/* Design & Deliverable Specs */}
            <div className="mt-4 space-y-2 text-xs text-zinc-400 border-t border-zinc-800/80 pt-3">
              <div className="flex justify-between">
                <span>Aspect Ratio:</span>
                <span className="text-white font-mono">{item.aspectRatio} (Master Key Visual)</span>
              </div>
              <div className="flex justify-between">
                <span>Production Agency:</span>
                <span className="text-white font-semibold">PIXORA LABS</span>
              </div>
              {item.metrics && (
                <div className="flex justify-between">
                  <span>Performance Metric:</span>
                  <span className="text-emerald-400 font-medium">{item.metrics}</span>
                </div>
              )}
            </div>

            {/* Google Drive Link if provided */}
            {item.googleDriveUrl && (
              <div className="mt-4 flex items-center justify-between rounded-lg border border-zinc-800/80 bg-black/60 p-2.5 text-xs">
                <span className="text-zinc-400">Google Drive Raw Folder:</span>
                <a
                  href={item.googleDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-white underline underline-offset-2 hover:text-zinc-300"
                >
                  <span>Open Vault</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* Action Callouts */}
          <div className="mt-6 border-t border-zinc-800 pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Need posters or banners for your brand?
            </p>

            <div className="flex flex-col gap-2">
              <a
                href={createWhatsAppUrl(agencyInfo.phone1, waOrderMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-black transition-all hover:bg-zinc-200"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Discuss on WhatsApp ({agencyInfo.phone1Formatted})</span>
              </a>

              <a
                href={createWhatsAppUrl(agencyInfo.phone2, waOrderMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
              >
                <span>Call Alternate Line ({agencyInfo.phone2Formatted})</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
