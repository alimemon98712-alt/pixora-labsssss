import React from 'react';
import { PlaySquare, Image as ImageIcon, LayoutGrid, FolderGit2 } from 'lucide-react';

interface FolderTabsProps {
  activeFolder: 'all' | 'video' | 'banner' | 'drive';
  onSelectFolder: (folder: 'all' | 'video' | 'banner' | 'drive') => void;
  videoCount: number;
  bannerCount: number;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

export const FolderTabs: React.FC<FolderTabsProps> = ({
  activeFolder,
  onSelectFolder,
  videoCount,
  bannerCount,
  selectedCategory,
  onSelectCategory,
  categories
}) => {
  return (
    <div className="border-b border-zinc-800 bg-zinc-950/70 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Folder Switcher (All / Video Folder / Banner Folder / Drive Vault) */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
              Creative Portfolio Folders
            </h2>
            <p className="mt-1 text-xs text-zinc-400">
              Explore separated folders for high-retention commercial video reels and high-resolution banner concepts.
            </p>
          </div>

          {/* Clean Segmented Folder Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/90 p-1.5">
            <button
              onClick={() => onSelectFolder('all')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeFolder === 'all'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>All Work ({videoCount + bannerCount})</span>
            </button>

            <button
              onClick={() => onSelectFolder('video')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeFolder === 'video'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <PlaySquare className="h-3.5 w-3.5" />
              <span>Video Reels Folder ({videoCount})</span>
            </button>

            <button
              onClick={() => onSelectFolder('banner')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeFolder === 'banner'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Banner Posters Folder ({bannerCount})</span>
            </button>

            <button
              onClick={() => onSelectFolder('drive')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeFolder === 'drive'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>Drive Vault</span>
            </button>
          </div>
        </div>

        {/* Sub-Category Filters (Only when not in drive mode) */}
        {activeFolder !== 'drive' && (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-zinc-800/80 pt-4">
            <span className="text-xs font-medium text-zinc-500 mr-1">Filter by Industry:</span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    isSelected
                      ? 'border border-zinc-600 bg-zinc-800 text-white'
                      : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
