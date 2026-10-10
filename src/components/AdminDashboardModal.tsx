import React, { useState } from 'react';
import { PortfolioItem, AgencyContactInfo, initialAgencyInfo, initialPortfolioItems } from '../data/portfolioData';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Rocket, 
  SlidersHorizontal, 
  HardDrive, 
  Phone, 
  Check, 
  Image as ImageIcon, 
  Video,
  FileCode,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: PortfolioItem[];
  agencyInfo: AgencyContactInfo;
  onSaveItems: (items: PortfolioItem[]) => void;
  onSaveAgencyInfo: (info: AgencyContactInfo) => void;
  onResetDefaults: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  items,
  agencyInfo,
  onSaveItems,
  onSaveAgencyInfo,
  onResetDefaults
}) => {
  const [activeTab, setActiveTab] = useState<'items' | 'agency' | 'vercel'>('items');
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // Agency info form state
  const [agencyForm, setAgencyForm] = useState<AgencyContactInfo>(agencyInfo);

  // New item blank template
  const blankItem: PortfolioItem = {
    id: `item-${Date.now()}`,
    title: '',
    client: '',
    type: 'banner',
    category: 'E-Commerce',
    imageUrl: '',
    videoUrl: '',
    aspectRatio: '3:4',
    tagline: '',
    description: '',
    location: 'Hyderabad, Pakistan',
    metrics: '',
    tags: ['E-Commerce', 'New Ad'],
    googleDriveUrl: '',
    featured: false,
    createdAt: new Date().toISOString().split('T')[0]
  };

  const [newItemForm, setNewItemForm] = useState<PortfolioItem>(blankItem);

  if (!isOpen) return null;

  const handleAgencySave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAgencyInfo(agencyForm);
    setSaveFeedback('Agency settings updated successfully!');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      const filtered = items.filter(i => i.id !== id);
      onSaveItems(filtered);
      setSaveFeedback('Item deleted successfully');
      setTimeout(() => setSaveFeedback(null), 3000);
    }
  };

  const handleSaveEditedItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const updated = items.map(i => i.id === editingItem.id ? editingItem : i);
    onSaveItems(updated);
    setEditingItem(null);
    setSaveFeedback('Item updated successfully!');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemForm.title || !newItemForm.imageUrl) {
      alert('Please provide at least a title and an image URL.');
      return;
    }
    const newEntry = {
      ...newItemForm,
      id: `item-${Date.now()}`
    };
    onSaveItems([newEntry, ...items]);
    setNewItemForm(blankItem);
    setIsAddingNew(false);
    setSaveFeedback('New creative item added successfully!');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  // Image file reader helper for local uploads
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isNew: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (isNew) {
          setNewItemForm(prev => ({ ...prev, imageUrl: base64 }));
        } else if (editingItem) {
          setEditingItem(prev => prev ? ({ ...prev, imageUrl: base64 }) : null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Export current config as JSON
  const handleExportJSON = () => {
    const backup = {
      agencyInfo,
      items,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixora-labs-portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-black px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-white">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-white">
                PIXORA LABS Admin Studio
              </h2>
              <p className="text-xs text-zinc-400">
                Manage video reels, banner posters, phone numbers, and Vercel deployment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveFeedback && (
              <span className="text-xs text-emerald-400 font-medium animate-pulse">
                {saveFeedback}
              </span>
            )}
            <button
              onClick={onClose}
              className="rounded-full bg-zinc-900 p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/40 px-6">
          <button
            onClick={() => setActiveTab('items')}
            className={`border-b-2 px-4 py-3 text-xs font-semibold transition-all ${
              activeTab === 'items'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Portfolio Items ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('agency')}
            className={`border-b-2 px-4 py-3 text-xs font-semibold transition-all ${
              activeTab === 'agency'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Agency Info & Numbers (+92)
          </button>
          <button
            onClick={() => setActiveTab('vercel')}
            className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-xs font-semibold transition-all ${
              activeTab === 'vercel'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Rocket className="h-3.5 w-3.5 text-emerald-400" />
            <span>Launch on Vercel</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: PORTFOLIO ITEMS MANAGER */}
          {activeTab === 'items' && (
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading text-base font-bold text-white">
                    Live Creative Deliverables
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Add new commercial videos or banner concepts. Changes update instantly.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsAddingNew(!isAddingNew);
                    setEditingItem(null);
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-black hover:bg-zinc-200"
                >
                  <Plus className="h-4 w-4" />
                  <span>{isAddingNew ? 'Cancel' : 'Add New Creative'}</span>
                </button>
              </div>

              {/* Add New Item Form */}
              {isAddingNew && (
                <form onSubmit={handleAddNewItem} className="mb-8 rounded-xl border border-zinc-700 bg-zinc-900/90 p-5 space-y-4">
                  <h4 className="font-heading text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <span>Create New Creative Item</span>
                  </h4>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300">Creative Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. KFC Crispy Crunch 9:16 Reel"
                        value={newItemForm.title}
                        onChange={e => setNewItemForm({ ...newItemForm, title: e.target.value })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300">Client / Brand Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. McDonald's, Al-Faisal Biryani"
                        value={newItemForm.client}
                        onChange={e => setNewItemForm({ ...newItemForm, client: e.target.value })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300">Media Type</label>
                      <select
                        value={newItemForm.type}
                        onChange={e => setNewItemForm({ ...newItemForm, type: e.target.value as 'video' | 'banner' })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      >
                        <option value="video">Commercial Video Reel (9:16)</option>
                        <option value="banner">Display Banner / Key Visual (3:4)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300">Category</label>
                      <select
                        value={newItemForm.category}
                        onChange={e => setNewItemForm({ ...newItemForm, category: e.target.value as any })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      >
                        <option value="Food & Dining">Food & Dining</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Commercial Promo">Commercial Promo</option>
                        <option value="Luxury Goods">Luxury Goods</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-zinc-300">Thumbnail / Image URL or Local Upload</label>
                      <div className="mt-1 flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Paste image URL or Google Drive direct link..."
                          value={newItemForm.imageUrl}
                          onChange={e => setNewItemForm({ ...newItemForm, imageUrl: e.target.value })}
                          className="flex-1 rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                        />
                        <label className="cursor-pointer rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-700">
                          Upload
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={e => handleImageFileUpload(e, true)} 
                          />
                        </label>
                      </div>
                    </div>

                    {newItemForm.type === 'video' && (
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-zinc-300">Video MP4 URL or Drive Video Link</label>
                        <input
                          type="text"
                          placeholder="https://commondatastorage.googleapis.com/... or Google Drive video preview URL"
                          value={newItemForm.videoUrl || ''}
                          onChange={e => setNewItemForm({ ...newItemForm, videoUrl: e.target.value })}
                          className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-zinc-300">Campaign Tagline / Slogan</label>
                      <input
                        type="text"
                        placeholder="e.g. Crispy. Juicy. Irresistible."
                        value={newItemForm.tagline}
                        onChange={e => setNewItemForm({ ...newItemForm, tagline: e.target.value })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300">Location (e.g. Autobahn Road, Latifabad)</label>
                      <input
                        type="text"
                        placeholder="Autobahn Road, Hyderabad"
                        value={newItemForm.location || ''}
                        onChange={e => setNewItemForm({ ...newItemForm, location: e.target.value })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-zinc-300">Google Drive Deliverables URL</label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/drive/folders/..."
                        value={newItemForm.googleDriveUrl || ''}
                        onChange={e => setNewItemForm({ ...newItemForm, googleDriveUrl: e.target.value })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-zinc-300">Creative Description</label>
                      <textarea
                        rows={2}
                        placeholder="Describe hook, sound design, visual impact..."
                        value={newItemForm.description}
                        onChange={e => setNewItemForm({ ...newItemForm, description: e.target.value })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(false)}
                      className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-white px-5 py-2 text-xs font-bold text-black hover:bg-zinc-200"
                    >
                      Publish Item
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Existing Modal if active */}
              {editingItem && (
                <form onSubmit={handleSaveEditedItem} className="mb-8 rounded-xl border border-zinc-600 bg-zinc-900 p-5 space-y-4">
                  <h4 className="font-heading text-sm font-bold text-white flex items-center justify-between">
                    <span>Editing: {editingItem.title}</span>
                    <button 
                      type="button" 
                      onClick={() => setEditingItem(null)} 
                      className="text-xs text-zinc-400 hover:text-white"
                    >
                      Cancel Edit
                    </button>
                  </h4>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300">Title</label>
                      <input
                        type="text"
                        value={editingItem.title}
                        onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300">Client</label>
                      <input
                        type="text"
                        value={editingItem.client}
                        onChange={e => setEditingItem({ ...editingItem, client: e.target.value })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300">Location</label>
                      <input
                        type="text"
                        value={editingItem.location || ''}
                        onChange={e => setEditingItem({ ...editingItem, location: e.target.value })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300">Tagline</label>
                      <input
                        type="text"
                        value={editingItem.tagline}
                        onChange={e => setEditingItem({ ...editingItem, tagline: e.target.value })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-zinc-300">Google Drive URL</label>
                      <input
                        type="text"
                        value={editingItem.googleDriveUrl || ''}
                        onChange={e => setEditingItem({ ...editingItem, googleDriveUrl: e.target.value })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-zinc-300">Description</label>
                      <textarea
                        rows={2}
                        value={editingItem.description}
                        onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-white px-5 py-2 text-xs font-bold text-black hover:bg-zinc-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}

              {/* Items List Table */}
              <div className="divide-y divide-zinc-800 rounded-xl border border-zinc-800 bg-black">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3.5 hover:bg-zinc-950">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded border border-zinc-800 bg-zinc-900 flex-shrink-0">
                        <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                          <span className="font-semibold text-white">{item.client}</span>
                          <span>·</span>
                          <span className="uppercase">{item.type}</span>
                          <span>·</span>
                          <span>{item.location || 'Global'}</span>
                        </div>
                        <p className="font-heading text-xs font-bold text-white">{item.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="rounded border border-zinc-700 bg-zinc-900 p-1.5 text-zinc-300 hover:text-white"
                        title="Edit Item"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="rounded border border-zinc-800 bg-zinc-900 p-1.5 text-red-400 hover:bg-red-950/40"
                        title="Delete Item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: AGENCY DETAILS & PHONE NUMBERS */}
          {activeTab === 'agency' && (
            <form onSubmit={handleAgencySave} className="space-y-6 max-w-2xl">
              <div>
                <h3 className="font-heading text-base font-bold text-white">
                  Agency Contact & Identity
                </h3>
                <p className="text-xs text-zinc-400">
                  Update your contact phone numbers, taglines, and master Google Drive links.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-zinc-300">Agency Name</label>
                  <input
                    type="text"
                    value={agencyForm.name}
                    onChange={e => setAgencyForm({ ...agencyForm, name: e.target.value })}
                    className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300">Official Email</label>
                  <input
                    type="email"
                    value={agencyForm.email}
                    onChange={e => setAgencyForm({ ...agencyForm, email: e.target.value })}
                    className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                  />
                </div>

                {/* Primary Number */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300">
                    Phone 1 (Primary / WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={agencyForm.phone1Formatted}
                    onChange={e => {
                      const val = e.target.value;
                      setAgencyForm({
                        ...agencyForm,
                        phone1Formatted: val,
                        phone1: val.replace(/[^0-9]/g, '')
                      });
                    }}
                    className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white font-mono"
                  />
                  <span className="text-[10px] text-zinc-500">Currently: +92 319 2686812</span>
                </div>

                {/* Secondary Number */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300">
                    Phone 2 (Commercials Production)
                  </label>
                  <input
                    type="text"
                    value={agencyForm.phone2Formatted}
                    onChange={e => {
                      const val = e.target.value;
                      setAgencyForm({
                        ...agencyForm,
                        phone2Formatted: val,
                        phone2: val.replace(/[^0-9]/g, '')
                      });
                    }}
                    className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white font-mono"
                  />
                  <span className="text-[10px] text-zinc-500">Currently: +92 370 6651729</span>
                </div>

                {/* Google Drive Master Link */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-300">
                    Master Google Drive Folder URL
                  </label>
                  <input
                    type="url"
                    value={agencyForm.googleDriveMasterLink}
                    onChange={e => setAgencyForm({ ...agencyForm, googleDriveMasterLink: e.target.value })}
                    className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                  />
                </div>

                {/* Tagline */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-300">Hero Tagline</label>
                  <input
                    type="text"
                    value={agencyForm.tagline}
                    onChange={e => setAgencyForm({ ...agencyForm, tagline: e.target.value })}
                    className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                  />
                </div>

                {/* Sub-tagline */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-300">Sub-headline Description</label>
                  <textarea
                    rows={2}
                    value={agencyForm.subTagline}
                    onChange={e => setAgencyForm({ ...agencyForm, subTagline: e.target.value })}
                    className="mt-1 w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-zinc-800 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset all items and numbers to default Pixora Labs setup?')) {
                      onResetDefaults();
                      setAgencyForm(initialAgencyInfo);
                      setSaveFeedback('Reset to default complete.');
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-400"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Restore Factory Defaults</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-black hover:bg-zinc-200"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Agency Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: VERCEL QUICK LAUNCH GUIDE & EXPORT */}
          {activeTab === 'vercel' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-emerald-400" />
                  <span>Launch PIXORA LABS on Vercel in Under 2 Minutes</span>
                </h3>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  The application includes a pre-configured <code className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-200 font-mono">vercel.json</code> ready for immediate deployment on Vercel with zero extra setup.
                </p>
              </div>

              {/* 3 Step Guide */}
              <div className="space-y-3 rounded-xl border border-zinc-800 bg-black p-5 text-xs text-zinc-300">
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black font-bold text-[10px] flex-shrink-0">
                    1
                  </span>
                  <div>
                    <p className="font-semibold text-white">Push to GitHub or Import to Vercel</p>
                    <p className="text-zinc-400 mt-0.5">
                      Connect your GitHub repository to Vercel. Framework preset is automatically detected as <strong>Vite</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black font-bold text-[10px] flex-shrink-0">
                    2
                  </span>
                  <div>
                    <p className="font-semibold text-white">Zero Configuration Needed</p>
                    <p className="text-zinc-400 mt-0.5">
                      Our <code className="text-zinc-200">vercel.json</code> already includes all necessary SPA rewrite rules (<code className="text-zinc-400">/(.*) -&gt; /index.html</code>) and high-speed asset caching headers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black font-bold text-[10px] flex-shrink-0">
                    3
                  </span>
                  <div>
                    <p className="font-semibold text-white">Instant Custom Domain</p>
                    <p className="text-zinc-400 mt-0.5">
                      Add your custom domain (e.g. <code className="text-zinc-200">pixoralabs.com</code>) directly in your Vercel project settings with automatic free SSL certificate.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Backup & Export Controls */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                <h4 className="font-heading text-sm font-bold text-white flex items-center gap-2">
                  <Download className="h-4 w-4 text-zinc-300" />
                  <span>Backup & Data Export</span>
                </h4>
                <p className="mt-1 text-xs text-zinc-400">
                  Export all your current portfolio items, Google Drive references, and contact details as a standalone JSON backup.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={handleExportJSON}
                    className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-black hover:bg-zinc-200"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download portfolio-data.json</span>
                  </button>

                  <a
                    href="https://vercel.com/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
                  >
                    <span>Open Vercel Dashboard</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
