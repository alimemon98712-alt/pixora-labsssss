import React, { useState, useRef } from 'react';
import { PortfolioItem, AgencyContactInfo } from '../data/portfolioData';
import { createWhatsAppUrl } from '../utils/helpers';
import { Play, Pause, Maximize2, MessageSquare, Volume2, VolumeX, Sparkles, MapPin } from 'lucide-react';

interface VideoCardProps {
  item: PortfolioItem;
  agencyInfo: AgencyContactInfo;
  onOpenModal: (item: PortfolioItem) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ item, agencyInfo, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may be blocked by browser policy without mute
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const waOrderMsg = `Hello Pixora Labs, I want to order a commercial video ad like "${item.title}" (${item.client}). Can you share package details and timeline?`;

  return (
    <div 
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/60"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Preview Aspect Frame */}
      <div 
        onClick={() => onOpenModal(item)}
        className="relative aspect-[9/16] w-full cursor-pointer overflow-hidden bg-zinc-900"
      >
        <video
          ref={videoRef}
          src={item.videoUrl}
          poster={item.imageUrl}
          muted={isMuted}
          loop
          playsInline
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges & Controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="rounded bg-black/80 px-2 py-0.5 text-[11px] font-semibold text-white tracking-wider backdrop-blur-sm">
            9:16 Video Ad
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleSound}
              className="rounded-full bg-black/70 p-1.5 text-zinc-300 backdrop-blur-sm transition-colors hover:bg-black hover:text-white"
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(item);
              }}
              className="rounded-full bg-black/70 p-1.5 text-zinc-300 backdrop-blur-sm transition-colors hover:bg-black hover:text-white"
              title="Full Screen Reel"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Center Play Indicator when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
              <Play className="h-5 w-5 fill-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Floating Metrics / Location Badge */}
        {item.location && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-[11px] font-medium text-zinc-300 backdrop-blur-sm">
            <MapPin className="h-3 w-3 text-red-400" />
            <span>{item.location}</span>
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="flex flex-1 flex-col p-4">
        
        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
          <span className="font-medium text-zinc-300">{item.client}</span>
          <span aria-hidden="true">·</span>
          <span>{item.category}</span>
          {item.metrics && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">{item.metrics}</span>
            </>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="mt-1 font-heading text-base font-bold text-white line-clamp-1">
          {item.title}
        </h3>
        <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Footer Actions */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-3">
          <button
            onClick={() => onOpenModal(item)}
            className="text-xs font-semibold text-zinc-300 transition-colors hover:text-white"
          >
            Watch Full Reel &rarr;
          </button>

          <a
            href={createWhatsAppUrl(agencyInfo.phone1, waOrderMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>Order Similar Ad</span>
          </a>
        </div>

      </div>
    </div>
  );
};
