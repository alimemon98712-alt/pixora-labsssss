import React, { useState, useRef, useEffect } from 'react';
import { AgencyContactInfo, PortfolioItem } from '../data/portfolioData';
import { createWhatsAppUrl } from '../utils/helpers';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ArrowUpRight, 
  MessageSquare, 
  Sparkles, 
  CheckCircle,
  FolderOpen,
  Eye,
  Layers
} from 'lucide-react';

interface HeroSectionProps {
  agencyInfo: AgencyContactInfo;
  featuredVideo: PortfolioItem;
  featuredBanners: PortfolioItem[];
  onOpenVideoModal: (item: PortfolioItem) => void;
  onOpenBannerLightbox: (item: PortfolioItem) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  agencyInfo,
  featuredVideo,
  featuredBanners,
  onOpenVideoModal,
  onOpenBannerLightbox,
  onNavigateSection
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto rotate banner preview every 4 seconds
  useEffect(() => {
    if (featuredBanners.length <= 1) return;
    const interval = setInterval(() => {
      setActiveBannerIdx((prev) => (prev + 1) % featuredBanners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [featuredBanners]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const currentBanner = featuredBanners[activeBannerIdx] || featuredBanners[0];

  const heroWaMessage = `Hello Pixora Labs, I saw your live commercial reels and banner portfolio. I want to discuss high-converting ads for my business.`;

  return (
    <section id="hero" className="relative overflow-hidden border-b border-zinc-800/80 bg-black pt-8 pb-16 sm:pt-14 sm:pb-24">
      {/* Background Subtle Geometric Grid & Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker & Agency Identity */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs tracking-wider text-zinc-400 uppercase">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-zinc-200">PIXORA LABS</span>
            <span aria-hidden="true">·</span>
            <span>E-Commerce Ads Specialist</span>
            <span aria-hidden="true">·</span>
            <span>Commercial Reels & Banner Concepts</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="hidden sm:inline">Direct Lines:</span>
            <a 
              href={`tel:${agencyInfo.phone1}`}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              {agencyInfo.phone1Formatted}
            </a>
            <span aria-hidden="true">/</span>
            <a 
              href={`tel:${agencyInfo.phone2}`}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              {agencyInfo.phone2Formatted}
            </a>
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          <div className="lg:col-span-6">
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              Commercial Ads That{' '}
              <span className="text-metallic">Command Attention</span> & Convert.
            </h1>
            
            <p className="mt-5 text-base text-zinc-400 sm:text-lg leading-relaxed">
              We engineer high-converting 9:16 video reels and scroll-stopping promotional banners 
              for food franchises, e-commerce stores, and high-growth brands. From mouth-watering sizzle shots to polished key visuals.
            </p>

            {/* Quick Contact & Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={createWhatsAppUrl(agencyInfo.phone1, heroWaMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/10"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Book on WhatsApp</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href={createWhatsAppUrl(agencyInfo.phone2, heroWaMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
              >
                <span>Call Commercial Team</span>
                <span className="text-xs text-zinc-400">({agencyInfo.phone2Formatted})</span>
              </a>

              <button
                onClick={() => onNavigateSection('portfolio')}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-black px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-700 hover:text-white"
              >
                <FolderOpen className="h-4 w-4 text-zinc-400" />
                <span>Browse All Folders</span>
              </button>
            </div>

            {/* Credibility Counters */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-zinc-900 pt-6 sm:grid-cols-4">
              <div>
                <p className="font-heading text-2xl font-bold text-white">{agencyInfo.stats.projectsDelivered}</p>
                <p className="text-xs text-zinc-400">Ads Delivered</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-white">{agencyInfo.stats.avgClientRoas}</p>
                <p className="text-xs text-zinc-400">Average ROAS</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-white">{agencyInfo.stats.totalViews}</p>
                <p className="text-xs text-zinc-400">Video Views</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-white">{agencyInfo.stats.turnaroundTime}</p>
                <p className="text-xs text-zinc-400">Fast Delivery</p>
              </div>
            </div>
          </div>

          {/* DUAL LIVE STAGE: VIDEO CHALTI HUI + BANNER BHI DIKHA */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 sm:p-4 shadow-2xl backdrop-blur-sm">
              
              {/* Header Label for Dual Showcase */}
              <div className="mb-3 flex items-center justify-between border-b border-zinc-800/80 pb-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-white uppercase tracking-wider">
                    Live Dual Showcase
                  </span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-zinc-400">Autoplay Reel + Banner Concept</span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  Pixora Labs Creative
                </div>
              </div>

              {/* Grid: Left Video Reel (Autoplay), Right Banner Concept */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* 1. Video Playing Automatically */}
                <div className="group relative aspect-[9/14] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                  <video
                    ref={videoRef}
                    src={featuredVideo.videoUrl}
                    poster={featuredVideo.imageUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Top Overlay Badge */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="rounded bg-black/80 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider backdrop-blur-sm">
                      Commercial Reel
                    </span>
                    <button
                      onClick={toggleMute}
                      className="rounded-full bg-black/70 p-1.5 text-white backdrop-blur-sm hover:bg-black"
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  {/* Bottom Video Metadata & Interactive controls */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-6">
                    <p className="text-xs font-semibold text-white line-clamp-1">{featuredVideo.title}</p>
                    <p className="text-[11px] text-zinc-400">{featuredVideo.client}</p>
                    {featuredVideo.location && (
                      <p className="text-[10px] text-zinc-500 mt-0.5">{featuredVideo.location}</p>
                    )}

                    <div className="mt-2 flex items-center justify-between pt-1">
                      <button
                        onClick={togglePlay}
                        className="flex items-center gap-1 text-[11px] font-medium text-zinc-300 hover:text-white"
                      >
                        {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                        <span>{isPlaying ? 'Pause' : 'Play'}</span>
                      </button>

                      <button
                        onClick={() => onOpenVideoModal(featuredVideo)}
                        className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-[11px] font-medium text-white hover:bg-white/20"
                      >
                        <Maximize2 className="h-3 w-3" />
                        <span>Watch Reel</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Banner Concept View */}
                {currentBanner && (
                  <div 
                    onClick={() => onOpenBannerLightbox(currentBanner)}
                    className="group relative aspect-[9/14] cursor-pointer overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
                  >
                    <img
                      src={currentBanner.imageUrl}
                      alt={currentBanner.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top Overlay Badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="rounded bg-black/80 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider backdrop-blur-sm">
                        Display Banner
                      </span>
                      <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                        {activeBannerIdx + 1}/{featuredBanners.length}
                      </span>
                    </div>

                    {/* Bottom Banner Details */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent p-3 pt-6">
                      <p className="text-xs font-semibold text-white line-clamp-1">{currentBanner.title}</p>
                      <p className="text-[11px] text-zinc-400">{currentBanner.client}</p>
                      <p className="mt-1 text-[10px] text-zinc-400 italic line-clamp-1">"{currentBanner.tagline}"</p>

                      <div className="mt-2 flex items-center justify-between pt-1">
                        <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                          <Eye className="h-3 w-3" /> Click to Inspect
                        </span>
                        <div className="flex gap-1">
                          {featuredBanners.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveBannerIdx(idx);
                              }}
                              className={`h-1.5 rounded-full transition-all ${
                                idx === activeBannerIdx ? 'w-4 bg-white' : 'w-1.5 bg-zinc-600'
                              }`}
                              aria-label={`Show banner ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Quick Bar for Dual Stage */}
              <div className="mt-3 flex items-center justify-between rounded-lg bg-zinc-900/60 px-3 py-2 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
                  <span>Looking for ads like KFC, McDonald's or Biryani Corner?</span>
                </span>
                <a
                  href={createWhatsAppUrl(agencyInfo.phone1, `Hi, I need ads created similar to your McDonald's and KFC concepts!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white underline underline-offset-2 hover:text-zinc-300"
                >
                  Order on WhatsApp &rarr;
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
