import React, { useRef, useState, useEffect } from 'react';
import { PortfolioItem, AgencyContactInfo } from '../data/portfolioData';
import { createWhatsAppUrl } from '../utils/helpers';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  MessageSquare, 
  Share2, 
  Check, 
  MapPin, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';

interface VideoModalProps {
  item: PortfolioItem | null;
  agencyInfo: AgencyContactInfo;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ item, agencyInfo, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

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

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waOrderMsg = `Hello Pixora Labs, I watched your reel commercial "${item.title}" for ${item.client}. I want to order a similar high-converting video ad for my brand.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-md">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl md:flex-row">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 rounded-full bg-black/80 p-2 text-zinc-400 backdrop-blur-sm transition-colors hover:bg-zinc-800 hover:text-white"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video Theater Column (9:16 vertical ratio) */}
        <div className="relative flex aspect-[9/16] max-h-[75vh] w-full items-center justify-center bg-black md:max-h-[85vh] md:w-[420px]">
          <video
            ref={videoRef}
            src={item.videoUrl}
            poster={item.imageUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            className="h-full w-full cursor-pointer object-cover"
          />

          {/* Floating Player Controls */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
            
            {/* Timeline Progress Bar */}
            <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-zinc-700/60">
              <div 
                className="h-full bg-white transition-all duration-100" 
                style={{ width: `${progress}%` }} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={handleRestart}
                  className="rounded-full bg-white/10 p-2 text-zinc-300 backdrop-blur-sm hover:bg-white/20 hover:text-white"
                  title="Replay from start"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              <div className="text-[11px] font-semibold text-white uppercase tracking-wider">
                9:16 HD Commercial
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Info & Fast WhatsApp Ordering Column */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-5 md:p-7">
          <div>
            {/* Header Tags */}
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-semibold text-white">{item.client}</span>
              <span aria-hidden="true">·</span>
              <span>{item.category}</span>
              {item.metrics && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-medium">{item.metrics}</span>
                </>
              )}
            </div>

            <h2 className="mt-2 font-heading text-xl font-bold text-white sm:text-2xl">
              {item.title}
            </h2>

            {item.location && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-300">
                <MapPin className="h-3.5 w-3.5 text-red-400" />
                <span>Campaign Location: {item.location}</span>
              </div>
            )}

            <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
              {item.description}
            </p>

            {/* Creative Tagline & Highlights */}
            <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Creative Hook & Strategy
              </p>
              <p className="mt-1 text-sm font-medium text-white italic">
                "{item.tagline}"
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-xs text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Google Drive Link for Master Raw Deliverable */}
            {item.googleDriveUrl && (
              <div className="mt-4 flex items-center justify-between rounded-lg border border-zinc-800/80 bg-black/60 p-3 text-xs">
                <span className="text-zinc-400">Raw Files & Google Drive Project:</span>
                <a
                  href={item.googleDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-white underline underline-offset-2 hover:text-zinc-300"
                >
                  <span>Open Drive Folder</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* Bottom Action Buttons */}
          <div className="mt-6 border-t border-zinc-800 pt-5">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Ready to create ads that convert?
            </p>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <a
                href={createWhatsAppUrl(agencyInfo.phone1, waOrderMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-black transition-all hover:bg-zinc-200"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Order Ad on WhatsApp (Primary)</span>
              </a>

              <a
                href={createWhatsAppUrl(agencyInfo.phone2, waOrderMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
              >
                <span>Commercial Line</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-800 bg-black px-3 py-2.5 text-xs font-medium text-zinc-300 hover:text-white"
                title="Share Reel Link"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
                <span className="sm:hidden">{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
