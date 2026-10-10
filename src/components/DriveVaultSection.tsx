import React, { useState } from 'react';
import { AgencyContactInfo, PortfolioItem } from '../data/portfolioData';
import { parseGoogleDriveLink, createWhatsAppUrl } from '../utils/helpers';
import { 
  FolderGit2, 
  ExternalLink, 
  HardDrive, 
  Download, 
  ShieldCheck, 
  FileText, 
  Video, 
  Image as ImageIcon,
  Search,
  MessageSquare,
  Link as LinkIcon
} from 'lucide-react';

interface DriveVaultSectionProps {
  agencyInfo: AgencyContactInfo;
  portfolioItems: PortfolioItem[];
  onOpenVideoModal: (item: PortfolioItem) => void;
  onOpenBannerLightbox: (item: PortfolioItem) => void;
}

export const DriveVaultSection: React.FC<DriveVaultSectionProps> = ({
  agencyInfo,
  portfolioItems,
  onOpenVideoModal,
  onOpenBannerLightbox
}) => {
  const [customDriveUrl, setCustomDriveUrl] = useState('');
  const [testedLink, setTestedLink] = useState<{ isDrive: boolean; embedUrl?: string; rawUrl: string } | null>(null);

  const handleTestLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDriveUrl.trim()) return;
    const parsed = parseGoogleDriveLink(customDriveUrl.trim());
    setTestedLink(parsed);
  };

  const waDriveMsg = `Hi Pixora Labs, I want to access raw Google Drive assets or share my brand assets Google Drive link with you.`;

  return (
    <section id="drive-vault" className="border-b border-zinc-800 bg-black py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-zinc-800/80 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <FolderGit2 className="h-4 w-4 text-white" />
              <span>Asset Delivery & Master Files</span>
            </div>
            <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
              Google Drive Creative Vault
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400 leading-relaxed">
              Every client project includes a dedicated, organized Google Drive directory containing uncompressed 4K master video reels, multi-ratio Photoshop PSDs, font packages, and high-res display banners.
            </p>
          </div>

          {/* Master Google Drive Button */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={agencyInfo.googleDriveMasterLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-black transition-all hover:bg-zinc-200"
            >
              <HardDrive className="h-4 w-4" />
              <span>Open Google Drive Master Folder</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <a
              href={createWhatsAppUrl(agencyInfo.phone1, waDriveMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white"
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              <span>Send Your Assets via Drive</span>
            </a>
          </div>
        </div>

        {/* Deliverable Specifications & Features */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-2 text-white">
              <Video className="h-4 w-4 text-zinc-300" />
              <h3 className="font-heading text-sm font-semibold">ProRes & 4K H.265 Masters</h3>
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Crystal-clear 9:16 and 16:9 vertical reels rendered for TikTok, Instagram Reels, and Meta Ads Manager with no compression artifacts.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-2 text-white">
              <ImageIcon className="h-4 w-4 text-zinc-300" />
              <h3 className="font-heading text-sm font-semibold">Master Layered PSDs & PNGs</h3>
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Full layer hierarchy, smart objects, lighting passes, and typography vectors ready for print, billboards, or local social marketing.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <h3 className="font-heading text-sm font-semibold">Lifetime Cloud Access</h3>
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Permanent private cloud archive on Google Drive with shareable viewer links for marketing managers and ad media buyers.
            </p>
          </div>
        </div>

        {/* Client Campaign Vault Directory List */}
        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
          <div className="border-b border-zinc-800 bg-zinc-900/60 px-4 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Active Project Directories in Google Drive
            </h3>
          </div>

          <div className="divide-y divide-zinc-800/70">
            {portfolioItems.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 transition-colors hover:bg-zinc-900/40"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <span className="font-medium text-white">{item.client}</span>
                      <span aria-hidden="true">·</span>
                      <span className="uppercase">{item.type === 'video' ? 'Video Reel Master' : 'Banner Graphic'}</span>
                    </div>
                    <p className="font-heading text-sm font-bold text-white">
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {item.location || 'E-Commerce Global'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      if (item.type === 'video') onOpenVideoModal(item);
                      else onOpenBannerLightbox(item);
                    }}
                    className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white"
                  >
                    Preview
                  </button>

                  <a
                    href={item.googleDriveUrl || agencyInfo.googleDriveMasterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded border border-zinc-700 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                  >
                    <HardDrive className="h-3.5 w-3.5" />
                    <span>Open Drive</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Drive Link Inspector / Embed Tester */}
        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <LinkIcon className="h-4 w-4 text-white" />
            <span>Client Asset Inspection Tool</span>
          </div>
          <h3 className="mt-1 font-heading text-lg font-bold text-white">
            Have a Google Drive link for your product or brand assets?
          </h3>
          <p className="mt-1 text-xs text-zinc-400">
            Paste your Google Drive share link here to inspect or share it directly with our editing desk.
          </p>

          <form onSubmit={handleTestLink} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              type="url"
              placeholder="https://drive.google.com/drive/folders/... or https://drive.google.com/file/d/..."
              value={customDriveUrl}
              onChange={(e) => setCustomDriveUrl(e.target.value)}
              className="flex-1 rounded-lg border border-zinc-700 bg-black px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-black hover:bg-zinc-200"
            >
              Inspect Link
            </button>
          </form>

          {testedLink && (
            <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-900/80 p-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">
                  {testedLink.isDrive ? 'Google Drive Link Verified' : 'Standard Web Link'}
                </span>
                <a
                  href={createWhatsAppUrl(agencyInfo.phone1, `Hi Pixora Labs, here is my Google Drive folder with product images & footage: ${customDriveUrl}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-400 underline"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Send Link on WhatsApp &rarr;</span>
                </a>
              </div>
              {testedLink.embedUrl && (
                <div className="mt-3 aspect-video w-full overflow-hidden rounded border border-zinc-800">
                  <iframe
                    src={testedLink.embedUrl}
                    title="Google Drive Asset Preview"
                    className="h-full w-full border-0"
                    allow="autoplay"
                  />
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
