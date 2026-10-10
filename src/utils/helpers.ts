import { AgencyContactInfo, PortfolioItem, initialAgencyInfo, initialPortfolioItems } from '../data/portfolioData';

const STORAGE_KEY_PORTFOLIO = 'pixora_labs_portfolio_items_v1';
const STORAGE_KEY_AGENCY = 'pixora_labs_agency_info_v1';

export function getStoredPortfolioItems(): PortfolioItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PORTFOLIO);
    if (!raw) return initialPortfolioItems;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialPortfolioItems;
  } catch {
    return initialPortfolioItems;
  }
}

export function saveStoredPortfolioItems(items: PortfolioItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save portfolio items to localStorage:', err);
  }
}

export function getStoredAgencyInfo(): AgencyContactInfo {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AGENCY);
    if (!raw) return initialAgencyInfo;
    return { ...initialAgencyInfo, ...JSON.parse(raw) };
  } catch {
    return initialAgencyInfo;
  }
}

export function saveStoredAgencyInfo(info: AgencyContactInfo): void {
  try {
    localStorage.setItem(STORAGE_KEY_AGENCY, JSON.stringify(info));
  } catch (err) {
    console.error('Failed to save agency info to localStorage:', err);
  }
}

export function resetAllToDefaults(): { items: PortfolioItem[]; agency: AgencyContactInfo } {
  localStorage.removeItem(STORAGE_KEY_PORTFOLIO);
  localStorage.removeItem(STORAGE_KEY_AGENCY);
  return { items: initialPortfolioItems, agency: initialAgencyInfo };
}

/**
 * Generate formatted WhatsApp click-to-chat URL
 * Sanitizes phone number by stripping '+' and spaces
 */
export function createWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
}

/**
 * Parse Google Drive link into an embeddable preview or direct link
 */
export function parseGoogleDriveLink(url: string): { isDrive: boolean; embedUrl?: string; rawUrl: string } {
  if (!url) return { isDrive: false, rawUrl: '' };
  
  // File link matching: /d/FILE_ID/ or id=FILE_ID
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return {
      isDrive: true,
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      rawUrl: `https://drive.google.com/uc?export=view&id=${fileId}`
    };
  }

  // Folder link matching
  const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch && folderMatch[1]) {
    return {
      isDrive: true,
      embedUrl: `https://drive.google.com/embeddedfolderview?id=${folderMatch[1]}#grid`,
      rawUrl: url
    };
  }

  return { isDrive: false, rawUrl: url };
}
