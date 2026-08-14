'use client';

import React, { useState, useEffect } from 'react';
import { db, toDirectImageUrl } from '@/lib/db';
import { MediaItem } from '@/lib/mockData';
import { Image, Video, Eye, X, Filter, Download } from 'lucide-react';

export default function MediaHub() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeMediaModal, setActiveMediaModal] = useState<MediaItem | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const m = await db.getMedia();
      setMediaItems(m);
    };
    fetchMedia();
  }, []);

  const categories = [
    'All',
    'Installations',
    'Conferences',
    'Service Projects',
    'Youth Leadership'
  ];

  const filteredMedia = mediaItems.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase mb-4">
          Media <span className="gold-glow-text">Hub</span>
        </h1>
        <p className="text-xs tracking-widest uppercase text-silver-primary font-medium">
          Pinterest-style Gallery of installations, conferences, and service projects
        </p>
      </div>

      {/* Categories Filter Station */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-semibold border transition-all ${
              activeCategory === cat
                ? 'bg-gold-primary border-gold-light text-bg-deep-space font-bold shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                : 'bg-white/5 border-white/5 hover:border-white/12 text-silver-primary hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredMedia.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMediaModal(item)}
              className="relative rounded-2xl overflow-hidden border border-white/5 bg-bg-panel/40 hover:border-gold-primary/20 transition-all duration-300 group cursor-pointer shadow-lg aspect-[4/3]"
            >
              
              {/* Image with fixed aspect ratio */}
              <img
                src={toDirectImageUrl(item.thumbnail)}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover filter brightness-95 group-hover:brightness-75 group-hover:scale-105 transition-all duration-500"
              />
              
              {/* Visual hover overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep-space via-transparent to-transparent opacity-70" />
              
              {/* Media type icon tag */}
              <span className="absolute top-4 right-4 p-1.5 rounded-lg bg-bg-deep-space/75 border border-white/10 text-gold-light z-10">
                {item.type === 'video' ? <Video size={13} /> : <Image size={13} />}
              </span>

              <div className="absolute bottom-4 left-5 right-5 z-10 flex flex-col">
                <span className="text-[8px] tracking-widest text-gold-light uppercase font-bold">
                  {item.category}
                </span>
                <h4 className="text-xs font-serif font-bold text-white mt-1 group-hover:text-gold-light transition-colors">
                  {item.title}
                </h4>
                <span className="text-[9px] text-silver-dark mt-0.5">District {item.district}</span>
              </div>
              
              {/* Eye overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="w-10 h-10 rounded-full bg-gold-primary/95 text-bg-deep-space flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Eye size={16} />
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-xs text-silver-dark glass-panel rounded-2xl border border-white/5">
          No media records available for this filter category.
        </div>
      )}

      {/* FULL SCREEN LIGHTBOX MODAL OVERLAY */}
      {activeMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep-space/90 backdrop-blur-md">
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center animate-scale-up">
            
            {/* Close */}
            <button
              onClick={() => setActiveMediaModal(null)}
              className="absolute -top-12 right-0 p-1.5 rounded-full border border-white/10 hover:border-gold-primary/40 text-silver-primary hover:text-white transition-all bg-bg-midnight/50"
            >
              <X size={18} />
            </button>

            {/* Media Image Display */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-bg-midnight shadow-2xl max-w-full max-h-[75vh]">
              <img
                src={toDirectImageUrl(activeMediaModal.url)}
                alt={activeMediaModal.title}
                className="w-auto h-auto max-w-full max-h-[75vh] object-contain"
              />
            </div>

            {/* Meta details footer */}
            <div className="w-full mt-4 flex items-center justify-between px-2 text-xs text-silver-primary">
              <div>
                <span className="text-[8px] tracking-widest text-gold-light uppercase font-bold">{activeMediaModal.category}</span>
                <h3 className="text-sm font-serif font-bold text-white mt-1">{activeMediaModal.title}</h3>
                <span className="text-[9px] text-silver-dark">District {activeMediaModal.district}</span>
              </div>
              
              <a
                href={activeMediaModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-gold-primary bg-white/5 text-[10px] uppercase font-bold text-gold-light transition-all"
              >
                <Download size={12} />
                Open Original
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
