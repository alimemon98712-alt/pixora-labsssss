import logoImg from '../assets/images/pixora_logo_1791671518095.jpg';
import kfcImg from '../assets/images/kfc_banner_1791671535034.jpg';
import mcdonaldsImg from '../assets/images/mcdonalds_banner_1791671557995.jpg';
import biryaniImg from '../assets/images/biryani_banner_1791671581338.jpg';
import kababjeesImg from '../assets/images/kababjees_banner_1791671604752.jpg';
import perfumeImg from '../assets/images/perfume_banner_1791671635102.jpg';

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  type: 'video' | 'banner';
  category: 'Food & Dining' | 'E-Commerce' | 'Commercial Promo' | 'Luxury Goods';
  imageUrl: string;
  videoUrl?: string;
  aspectRatio: '9:16' | '16:9' | '3:4' | '1:1';
  tagline: string;
  description: string;
  location?: string;
  metrics?: string;
  tags: string[];
  googleDriveUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface AgencyContactInfo {
  name: string;
  logo: string;
  tagline: string;
  subTagline: string;
  phone1: string;
  phone1Formatted: string;
  phone2: string;
  phone2Formatted: string;
  email: string;
  location: string;
  googleDriveMasterLink: string;
  instagram: string;
  stats: {
    projectsDelivered: string;
    avgClientRoas: string;
    totalViews: string;
    turnaroundTime: string;
  };
}

export const initialAgencyInfo: AgencyContactInfo = {
  name: "PIXORA LABS",
  logo: logoImg,
  tagline: "Commercial E-Commerce Ads & High-Converting Visuals",
  subTagline: "We craft cinematic commercial reels and scroll-stopping promotional banners engineered for food brands, e-commerce sellers, and fast-scaling retail leaders.",
  phone1: "+923192686812",
  phone1Formatted: "+92 319 2686812",
  phone2: "+923706651729",
  phone2Formatted: "+92 370 6651729",
  email: "editzprimekick@gmail.com",
  location: "Hyderabad / Karachi · Pakistan · Global Remote",
  googleDriveMasterLink: "https://drive.google.com/drive/folders/pixora-labs-master-vault",
  instagram: "pixoralabs",
  stats: {
    projectsDelivered: "250+",
    avgClientRoas: "4.8x",
    totalViews: "15M+",
    turnaroundTime: "24-48h",
  }
};

export const initialPortfolioItems: PortfolioItem[] = [
  // Video Samples (Commercial 9:16 Reels)
  {
    id: "vid-mcdonalds-double-beef",
    title: "Double Beef Burger Commercial Reel",
    client: "McDonald's Autobahn",
    type: "video",
    category: "Food & Dining",
    imageUrl: mcdonaldsImg,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    aspectRatio: "9:16",
    tagline: "Double The Taste. Double The Craving.",
    description: "High-octane commercial ad featuring explosive 3D burger sizzle, golden cheese drip, and sizzling embers targeted for Autobahn Road Hyderabad fast-food lovers.",
    location: "Autobahn Road, Hyderabad",
    metrics: "+420% Engagement Lift",
    tags: ["9:16 Reel", "Fast Food Ad", "Motion Graphics", "Sound Design"],
    googleDriveUrl: "https://drive.google.com/drive/folders/pixora-mcdonalds-ad",
    featured: true,
    createdAt: "2026-03-15"
  },
  {
    id: "vid-alfaisal-biryani",
    title: "Special Beef Biryani Cinematic Sizzle",
    client: "Al-Faisal Biryani Corner",
    type: "video",
    category: "Food & Dining",
    imageUrl: biryaniImg,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    aspectRatio: "9:16",
    tagline: "Lazeez Zaaika, Yaadgaar Maza!",
    description: "Rich culinary cinematography capturing authentic steam release from heavy copper deg, tender spiced beef chunks, and golden saffron basmati rice serving.",
    location: "Hyder Chowk, Hyderabad",
    metrics: "+380% Walk-in Boost",
    tags: ["Food Commercial", "Authentic Cuisine", "Color Grading", "Social Ad"],
    googleDriveUrl: "https://drive.google.com/drive/folders/pixora-alfaisal-ad",
    featured: true,
    createdAt: "2026-03-20"
  },
  {
    id: "vid-kababjees-fried-chicken",
    title: "Crispy Fried Chicken Crunch Reel",
    client: "Kababjees Fried Chicken",
    type: "video",
    category: "Food & Dining",
    imageUrl: kababjeesImg,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    aspectRatio: "9:16",
    tagline: "Crispy To The Bone · Latifabad",
    description: "Slow-motion ultra-crispy bone crunch reveal, golden batter explosion, and sizzling zinger burger macro shots designed to trigger instant food cravings on Instagram & TikTok.",
    location: "Latifabad, Hyderabad",
    metrics: "1.4M Organic Views",
    tags: ["9:16 Reel", "Crunch Audio", "Viral Food Reel", "E-Commerce"],
    googleDriveUrl: "https://drive.google.com/drive/folders/pixora-kababjees-ad",
    featured: true,
    createdAt: "2026-03-25"
  },
  {
    id: "vid-ecommerce-luxury-drop",
    title: "Aura Noir E-Commerce Product Reel",
    client: "Aura Fragrances",
    type: "video",
    category: "Luxury Goods",
    imageUrl: perfumeImg,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    aspectRatio: "9:16",
    tagline: "Matte Black Elegance in Motion",
    description: "Sleek 3D product commercial featuring dynamic water ripples, golden atomized fragrance mist, and dark luxury lighting engineered for Shopify conversion ads.",
    location: "Global E-Commerce",
    metrics: "5.4x ROAS",
    tags: ["Shopify Ad", "3D Motion", "Luxury Brand", "Paid Ads"],
    googleDriveUrl: "https://drive.google.com/drive/folders/pixora-aura-noir",
    featured: false,
    createdAt: "2026-04-01"
  },

  // Banner Samples (Commercial Posters & Social Creative Concepts)
  {
    id: "ban-kfc-crispy-juicy",
    title: "KFC Crispy Juicy Irresistible Concept",
    client: "KFC Creative Concept",
    type: "banner",
    category: "Food & Dining",
    imageUrl: kfcImg,
    aspectRatio: "3:4",
    tagline: "Crispy. Juicy. Irresistible. The Crunch You Crave",
    description: "Bold red and black commercial key visual showcasing signature KFC chicken bucket with energetic glowing light trails and metallic Pixora Labs concept mark.",
    location: "National Campaign Concept",
    metrics: "Top Showcase Concept",
    tags: ["Key Visual", "Poster Design", "Food Retouching", "Typography"],
    googleDriveUrl: "https://drive.google.com/drive/folders/pixora-kfc-banner",
    featured: true,
    createdAt: "2026-03-10"
  },
  {
    id: "ban-mcdonalds-double-beef",
    title: "McDonald's Double Beef Burger Master Poster",
    client: "McDonald's Autobahn Road",
    type: "banner",
    category: "Food & Dining",
    imageUrl: mcdonaldsImg,
    aspectRatio: "3:4",
    tagline: "Double The Taste. Double The Craving.",
    description: "Rich burgundy and golden ember food key visual highlighting authentic texture, melted cheese gloss, and fresh toasted sesame bun for localized social ads.",
    location: "Autobahn Road, Hyderabad",
    metrics: "+58% CTR Improvement",
    tags: ["Social Media Ad", "Macro Food Art", "Brand Concept", "Photoshop"],
    googleDriveUrl: "https://drive.google.com/drive/folders/pixora-mcdonalds-banner",
    featured: true,
    createdAt: "2026-03-12"
  },
  {
    id: "ban-alfaisal-biryani",
    title: "Al-Faisal Special Beef Biryani Banner",
    client: "Al-Faisal Biryani Corner",
    type: "banner",
    category: "Food & Dining",
    imageUrl: biryaniImg,
    aspectRatio: "3:4",
    tagline: "Lazeez Zaaika, Yaadgaar Maza!",
    description: "Opulent traditional culinary poster featuring ornate brass handi, steaming spiced rice, and Urdu/English bilingual calligraphy for Hyder Chowk food promotions.",
    location: "Hyder Chowk, Hyderabad",
    metrics: "+210% Festive Orders",
    tags: ["Traditional Cuisine", "Restaurant Ad", "Billboard Ready", "Retouching"],
    googleDriveUrl: "https://drive.google.com/drive/folders/pixora-alfaisal-banner",
    featured: true,
    createdAt: "2026-03-18"
  },
  {
    id: "ban-kababjees-crispy-bone",
    title: "Kababjees Fried Chicken Display Ad",
    client: "Kababjees Fried Chicken",
    type: "banner",
    category: "Food & Dining",
    imageUrl: kababjeesImg,
    aspectRatio: "3:4",
    tagline: "Crispy To The Bone · Latifabad",
    description: "Dark luxury food photography ad featuring crispy golden fried drumsticks, zinger sandwich, and fiery dipping sauces set on rustic slate with golden bokeh.",
    location: "Latifabad, Hyderabad",
    metrics: "+180% Delivery Orders",
    tags: ["Fried Chicken", "Fast Food Banner", "E-Commerce Delivery", "High Res"],
    googleDriveUrl: "https://drive.google.com/drive/folders/pixora-kababjees-banner",
    featured: true,
    createdAt: "2026-03-22"
  },
  {
    id: "ban-aura-noir-perfume",
    title: "Aura Noir Luxury Eau De Parfum Banner",
    client: "Aura Luxury Fragrances",
    type: "banner",
    category: "Luxury Goods",
    imageUrl: perfumeImg,
    aspectRatio: "3:4",
    tagline: "A Defining Scent for the Sophisticated Individual",
    description: "Monochrome luxury e-commerce banner showcasing matte black bottle architecture, water ripple reflections, and golden mist particle styling.",
    location: "Shopify Global Store",
    metrics: "4.8% Direct Conversion",
    tags: ["E-Commerce Ad", "Product Photography", "Luxury Aesthetic", "Minimalist"],
    googleDriveUrl: "https://drive.google.com/drive/folders/pixora-aura-banner",
    featured: false,
    createdAt: "2026-03-28"
  }
];

export const servicesList = [
  {
    id: "service-video-ads",
    number: "01",
    title: "E-Commerce Video Ads & Viral Reels",
    description: "High-retention 9:16 and 16:9 commercial ads tailored for TikTok, Meta Ads, and YouTube Shorts. Engineered with aggressive 3-second hooks, dynamic pacing, and commercial sound mastering.",
    deliverables: "4K Master Videos, Subtitles, 3 Hook Variations, Sound Design",
    turnaround: "24 to 48 Hours"
  },
  {
    id: "service-banner-ads",
    number: "02",
    title: "High-Converting Product Banners & Posters",
    description: "Ultra-sharp food and e-commerce display ads, social media posts, and billboard-ready key visuals. Multi-aspect ratio formats optimized for maximum click-through rates.",
    deliverables: "1:1 Feed, 9:16 Story, 4:5 Portrait, PSD/Master Files",
    turnaround: "12 to 24 Hours"
  },
  {
    id: "service-campaign-packs",
    number: "03",
    title: "Full Launch Ad Creative Suite",
    description: "Complete e-commerce ad package combining video reels, static banners, carousel creatives, and ad copy ready for Meta Ads Manager and Google Performance Max.",
    deliverables: "3 Video Commercials, 8 Static Posters, 2 Carousels, Ad Copy",
    turnaround: "3 to 4 Days"
  },
  {
    id: "service-brand-visuals",
    number: "04",
    title: "3D Motion & Commercial Post-Production",
    description: "Advanced product manipulation, high-end CGI integration, smoke/steam sizzle simulation, and high-fidelity retouching for high-ticket brands.",
    deliverables: "CGI Renders, Compositing Masters, Unlimited Color Grades",
    turnaround: "Custom Timeline"
  }
];
