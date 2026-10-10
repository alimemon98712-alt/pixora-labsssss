import React, { useState, useEffect } from 'react';
import { 
  PortfolioItem, 
  AgencyContactInfo, 
  initialAgencyInfo, 
  initialPortfolioItems 
} from './data/portfolioData';
import { 
  getStoredPortfolioItems, 
  saveStoredPortfolioItems, 
  getStoredAgencyInfo, 
  saveStoredAgencyInfo, 
  resetAllToDefaults 
} from './utils/helpers';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FolderTabs } from './components/FolderTabs';
import { VideoCard } from './components/VideoCard';
import { BannerCard } from './components/BannerCard';
import { VideoModal } from './components/VideoModal';
import { BannerLightbox } from './components/BannerLightbox';
import { DriveVaultSection } from './components/DriveVaultSection';
import { ServicesAndPricing } from './components/ServicesAndPricing';
import { ContactSection } from './components/ContactSection';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Footer } from './components/Footer';

export default function App() {
  const [agencyInfo, setAgencyInfo] = useState<AgencyContactInfo>(getStoredAgencyInfo);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(getStoredPortfolioItems);

  // Filter state
  const [activeFolder, setActiveFolder] = useState<'all' | 'video' | 'banner' | 'drive'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal states
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<PortfolioItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Save changes to localStorage when updated
  const handleUpdateItems = (updated: PortfolioItem[]) => {
    setPortfolioItems(updated);
    saveStoredPortfolioItems(updated);
  };

  const handleUpdateAgency = (updated: AgencyContactInfo) => {
    setAgencyInfo(updated);
    saveStoredAgencyInfo(updated);
  };

  const handleResetDefaults = () => {
    const { items, agency } = resetAllToDefaults();
    setPortfolioItems(items);
    setAgencyInfo(agency);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Video and Banner sublists
  const videoItems = portfolioItems.filter(item => item.type === 'video');
  const bannerItems = portfolioItems.filter(item => item.type === 'banner');

  // Featured items for Hero dual stage
  const featuredVideo = videoItems.find(i => i.featured) || videoItems[0] || portfolioItems[0];
  const featuredBanners = bannerItems.filter(i => i.featured).length > 0 
    ? bannerItems.filter(i => i.featured) 
    : bannerItems;

  // Industry categories
  const categories = ['All', 'Food & Dining', 'E-Commerce', 'Luxury Goods'];

  // Filtered lists for display
  const filteredVideos = videoItems.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const filteredBanners = bannerItems.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black">
      
      {/* 1. Header Navigation */}
      <Navbar
        agencyInfo={agencyInfo}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateSection={scrollToSection}
        activeFilter={activeFolder}
        setActiveFilter={setActiveFolder}
      />

      {/* 2. Hero Section: Live video reel chalti hui + banner preview */}
      <HeroSection
        agencyInfo={agencyInfo}
        featuredVideo={featuredVideo}
        featuredBanners={featuredBanners}
        onOpenVideoModal={setSelectedVideo}
        onOpenBannerLightbox={setSelectedBanner}
        onNavigateSection={scrollToSection}
      />

      {/* 3. Folder Tabs: Video Folder, Banner Folder, Google Drive Vault */}
      <div id="portfolio">
        <FolderTabs
          activeFolder={activeFolder}
          onSelectFolder={setActiveFolder}
          videoCount={videoItems.length}
          bannerCount={bannerItems.length}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={categories}
        />
      </div>

      {/* 4. Main Portfolio Showcase Content */}
      {activeFolder !== 'drive' && (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
          
          {/* SECTION: Video Commercials Folder */}
          {(activeFolder === 'all' || activeFolder === 'video') && (
            <div className="mb-16">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-800/80 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Commercial Reels Folder
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1">
                    9:16 High-Retention Video Ads ({filteredVideos.length})
                  </h3>
                </div>
                <p className="text-xs text-zinc-400">
                  Hover to preview playback · Tap to view full vertical reel theater
                </p>
              </div>

              {filteredVideos.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8 text-center text-xs text-zinc-400">
                  No video ads found in this category. Select "All" or add new videos in the Admin Studio.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      item={video}
                      agencyInfo={agencyInfo}
                      onOpenModal={setSelectedVideo}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION: Banner Samples Folder */}
          {(activeFolder === 'all' || activeFolder === 'banner') && (
            <div className="mb-12">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-800/80 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Creative Banners Folder
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1">
                    Display Posters & Commercial Concepts ({filteredBanners.length})
                  </h3>
                </div>
                <p className="text-xs text-zinc-400">
                  Click any banner to inspect high-definition retouching, typography, and layered details
                </p>
              </div>

              {filteredBanners.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8 text-center text-xs text-zinc-400">
                  No banner concepts found in this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {filteredBanners.map((banner) => (
                    <BannerCard
                      key={banner.id}
                      item={banner}
                      agencyInfo={agencyInfo}
                      onOpenLightbox={setSelectedBanner}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      )}

      {/* 5. Google Drive Vault Section (Always accessible, highlighted if tab clicked) */}
      <DriveVaultSection
        agencyInfo={agencyInfo}
        portfolioItems={portfolioItems}
        onOpenVideoModal={setSelectedVideo}
        onOpenBannerLightbox={setSelectedBanner}
      />

      {/* 6. Services & Packages for E-Com Ad Sellers */}
      <ServicesAndPricing agencyInfo={agencyInfo} />

      {/* 7. Contact & Booking System with WhatsApp Generators for +92 numbers */}
      <ContactSection agencyInfo={agencyInfo} />

      {/* 8. Luxury Monochrome Footer */}
      <Footer
        agencyInfo={agencyInfo}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateSection={scrollToSection}
        onSelectFilter={setActiveFolder}
      />

      {/* Modals */}
      <VideoModal
        item={selectedVideo}
        agencyInfo={agencyInfo}
        onClose={() => setSelectedVideo(null)}
      />

      <BannerLightbox
        item={selectedBanner}
        agencyInfo={agencyInfo}
        onClose={() => setSelectedBanner(null)}
      />

      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        items={portfolioItems}
        agencyInfo={agencyInfo}
        onSaveItems={handleUpdateItems}
        onSaveAgencyInfo={handleUpdateAgency}
        onResetDefaults={handleResetDefaults}
      />

    </div>
  );
}
