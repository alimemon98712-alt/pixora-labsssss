import React from 'react';
import { PortfolioItem, AgencyContactInfo } from '../data/portfolioData';
import { createWhatsAppUrl } from '../utils/helpers';
import { Eye, MessageSquare, MapPin, ZoomIn } from 'lucide-react';

interface BannerCardProps {
  item: PortfolioItem;
  agencyInfo: AgencyContactInfo;
  onOpenLightbox: (item: PortfolioItem) => void;
}

export const BannerCard: React.FC<BannerCardProps> = ({ item, agencyInfo, onOpenLightbox }) => {
  const waOrderMsg = `Hello Pixora Labs, I want high-converting banner designs like your "${item.title}" for ${item.client}. Please send quotation.`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/60">
      
      {/* Banner Image Frame */}
      <div 
        onClick={() => onOpenLightbox(item)}
        className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden bg-zinc-900"
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-70 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="rounded bg-black/85 px-2 py-0.5 text-[11px] font-semibold text-white tracking-wider backdrop-blur-sm">
            Key Visual / Poster
          </span>
          <span className="flex items-center gap-1 rounded bg-black/70 px-2 py-0.5 text-[10px] text-zinc-300 backdrop-blur-sm">
            <ZoomIn className="h-3 w-3" /> Zoom
          </span>
        </div>

        {/* Floating Tagline on Image */}
        <div className="absolute bottom-3 left-3 right-3">
          {item.location && (
            <div className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-zinc-300">
              <MapPin className="h-3 w-3 text-red-400" />
              <span>{item.location}</span>
            </div>
          )}
          <p className="text-xs font-medium text-white italic drop-shadow-md line-clamp-1">
            "{item.tagline}"
          </p>
        </div>
      </div>

      {/* Details & Actions */}
      <div className="flex flex-1 flex-col p-4">
        
        {/* Unboxed Metadata */}
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
          <span className="font-semibold text-zinc-200">{item.client}</span>
          <span aria-hidden="true">·</span>
          <span>{item.category}</span>
          {item.metrics && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-300">{item.metrics}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-1 font-heading text-base font-bold text-white line-clamp-1">
          {item.title}
        </h3>
        
        <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Footer Actions */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-3">
          <button
            onClick={() => onOpenLightbox(item)}
            className="flex items-center gap-1 text-xs font-semibold text-zinc-300 transition-colors hover:text-white"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Inspect Poster</span>
          </button>

          <a
            href={createWhatsAppUrl(agencyInfo.phone1, waOrderMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>Inquire Design</span>
          </a>
        </div>

      </div>

    </div>
  );
};
