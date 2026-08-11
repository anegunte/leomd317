'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { ServiceProject } from '@/lib/mockData';
import { Search, MapPin, Users, Clock, Award, Play, X, Calendar, PlusCircle } from 'lucide-react';

export default function Impact() {
  const [projects, setProjects] = useState<ServiceProject[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ServiceProject | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const p = await db.getProjects();
      setProjects(p);
    };
    fetchProjects();
  }, []);

  const categories = [
    'All',
    'Education',
    'Healthcare',
    'Environment',
    'Mental Health',
    'Hunger Relief',
    'Women Empowerment',
    'Disaster Relief',
    'Youth Leadership',
    'Technology for Good'
  ];

  // Filters logic
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.club.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'All' || p.district === selectedDistrict;
    
    return matchesSearch && matchesCategory && matchesDistrict;
  });

  // Calculate aggregated stats
  const totalBeneficiaries = filteredProjects.reduce((acc, p) => acc + (p.impactMetrics.beneficiaries || 0), 0);
  const totalHours = filteredProjects.reduce((acc, p) => acc + (p.impactMetrics.volunteerHours || 0), 0);
  const totalSaplings = filteredProjects.reduce((acc, p) => acc + (p.impactMetrics.treesPlanted || 0), 0);
  const totalBloodUnits = filteredProjects.reduce((acc, p) => acc + (p.impactMetrics.bloodUnits || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full optimize-rendering-heavy">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase mb-4">
          Impact <span className="gold-glow-text">Beyond Boundaries</span>
        </h1>
        <p className="text-xs tracking-widest uppercase text-silver-primary font-medium">
          Consolidated Registry of Leo Multiple District 317 Service Campaigns
        </p>
      </div>

      {/* AGGREGATED STATS COMMAND GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="glass-panel rounded-2xl p-5 border border-white/5">
          <span className="block text-[8px] tracking-widest uppercase text-silver-dark font-semibold">Total Beneficiaries</span>
          <span className="text-2xl font-sans font-bold text-gold-light mt-1.5 block">
            {totalBeneficiaries.toLocaleString()}+
          </span>
          <span className="text-[9px] text-silver-dark mt-1 block">Accumulated across query selection</span>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-white/5">
          <span className="block text-[8px] tracking-widest uppercase text-silver-dark font-semibold">Volunteer Investment</span>
          <span className="text-2xl font-sans font-bold text-white mt-1.5 block">
            {totalHours.toLocaleString()} Hrs
          </span>
          <span className="text-[9px] text-silver-dark mt-1 block">Youth leader on-ground service hours</span>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-white/5">
          <span className="block text-[8px] tracking-widest uppercase text-silver-dark font-semibold">Reforestation Saplings</span>
          <span className="text-2xl font-sans font-bold text-gold-light mt-1.5 block">
            {totalSaplings.toLocaleString()} Saplings
          </span>
          <span className="text-[9px] text-silver-dark mt-1 block">Native trees planted and distributed</span>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-white/5">
          <span className="block text-[8px] tracking-widest uppercase text-silver-dark font-semibold">Blood Bank Accumulations</span>
          <span className="text-2xl font-sans font-bold text-white mt-1.5 block">
            {totalBloodUnits.toLocaleString()} Units
          </span>
          <span className="text-[9px] text-silver-dark mt-1 block">Units collected in clinical drives</span>
        </div>
      </div>

      {/* FILTER & SEARCH STATION */}
      <div className="glass-panel rounded-2xl p-6 mb-12 border border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3.5 text-silver-dark" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search project titles, descriptions, clubs..."
              className="w-full pl-10 pr-4 py-3 bg-bg-deep-space/65 border border-white/10 rounded-xl text-xs text-white placeholder-silver-dark focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>

          {/* District filter */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-[9px] tracking-widest uppercase text-silver-dark font-semibold">Region Filter:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-2.5 bg-bg-deep-space/65 border border-white/10 rounded-xl text-xs text-silver-light focus:outline-none focus:border-gold-primary cursor-pointer transition-colors"
            >
              <option value="All">All Districts</option>
              <option value="317A">District 317A</option>
              <option value="317B">District 317B</option>
              <option value="317C">District 317C</option>
              <option value="317D">District 317D</option>
              <option value="317E">District 317E</option>
              <option value="317F">District 317F</option>
              <option value="317G">District 317G</option>
            </select>
          </div>

        </div>

        {/* Categories Badges */}
        <div className="border-t border-white/5 pt-4">
          <span className="block text-[9px] tracking-widest uppercase text-silver-dark font-semibold mb-3">Filter Sectors:</span>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-[10px] tracking-wider uppercase font-semibold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-gold-primary border-gold-light text-bg-deep-space font-bold shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                    : 'bg-white/5 border-white/5 hover:border-white/15 text-silver-primary hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* PROJECTS CATALOG GRID */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setActiveProjectModal(project)}
              className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-gold-primary/20 transition-all cursor-pointer group flex flex-col justify-between min-h-[360px]"
            >
              
              {/* Image banner */}
              <div className="relative w-full aspect-[16/10] bg-bg-deep-space overflow-hidden">
                {project.photos && project.photos[0] ? (
                  <img src={project.photos[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-silver-dark uppercase tracking-widest">No Photos Available</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep-space via-transparent to-transparent opacity-70" />
                <span className="absolute bottom-4 left-6 text-[8px] tracking-widest text-gold-light uppercase font-bold bg-gold-primary/10 border border-gold-primary/30 px-2 py-0.5 rounded">
                  {project.category}
                </span>
              </div>

              {/* Text detail */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[9px] text-silver-dark tracking-wider uppercase mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} /> District {project.district}
                    </span>
                    <span>{new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                  <h3 className="text-sm font-serif font-bold text-white group-hover:text-gold-light transition-colors leading-snug line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-silver-primary font-light leading-relaxed mt-2.5 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Micro metrics */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[9px] text-silver-dark font-mono truncate max-w-[120px]">{project.club}</span>
                  <div className="flex gap-4 shrink-0 text-[10px] font-bold text-gold-light font-sans">
                    {project.impactMetrics.beneficiaries && (
                      <span className="flex items-center gap-1" title="Beneficiaries">
                        <Users size={12} className="text-gold-primary" />
                        {project.impactMetrics.beneficiaries.toLocaleString()}
                      </span>
                    )}
                    {project.impactMetrics.volunteerHours && (
                      <span className="flex items-center gap-1" title="Volunteer Hours">
                        <Clock size={12} className="text-gold-primary" />
                        {project.impactMetrics.volunteerHours}h
                      </span>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-xs text-silver-dark glass-panel rounded-3xl border border-white/5">
          No service projects found matching your filter selection.
        </div>
      )}

      {/* DETAIL DIALOG MODAL OVERLAY */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep-space/80 backdrop-blur-md">
          <div className="relative glass-panel rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/15 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-scale-up">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-6 right-6 p-1.5 rounded-full border border-white/10 hover:border-gold-primary/40 hover:bg-white/5 text-silver-primary hover:text-white transition-all"
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <div>
              <span className="px-2 py-0.5 rounded bg-gold-primary/10 border border-gold-primary/30 text-[9px] font-bold tracking-widest text-gold-light uppercase">
                {activeProjectModal.category} Project
              </span>
              <h2 className="text-xl font-serif font-bold text-white mt-3 pr-8 leading-snug">
                {activeProjectModal.title}
              </h2>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-[10px] text-silver-dark tracking-wide uppercase mt-2">
                <span>Organized by: <strong className="text-silver-primary">{activeProjectModal.club}</strong></span>
                <span>&bull;</span>
                <span>District {activeProjectModal.district}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(activeProjectModal.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>

              {/* Photos Gallery (carousel-like mockup) */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {activeProjectModal.photos.map((ph, idx) => (
                  <div key={idx} className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-bg-deep-space">
                    <img src={ph} alt={`Project Detail ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Exhaustive Metrics Grid */}
              <div className="mt-8 border-y border-white/5 py-5 grid grid-cols-2 sm:grid-cols-3 gap-6 bg-white/2">
                
                {activeProjectModal.impactMetrics.beneficiaries && (
                  <div>
                    <span className="block text-[8px] tracking-widest uppercase text-silver-dark">Beneficiaries</span>
                    <span className="text-lg font-bold text-gold-light flex items-center gap-1.5 mt-1 font-sans">
                      <Users size={16} className="text-gold-primary" />
                      {activeProjectModal.impactMetrics.beneficiaries.toLocaleString()}
                    </span>
                  </div>
                )}
                {activeProjectModal.impactMetrics.volunteerHours && (
                  <div>
                    <span className="block text-[8px] tracking-widest uppercase text-silver-dark">Volunteer Investment</span>
                    <span className="text-lg font-bold text-white flex items-center gap-1.5 mt-1 font-sans">
                      <Clock size={16} className="text-gold-primary" />
                      {activeProjectModal.impactMetrics.volunteerHours} Hours
                    </span>
                  </div>
                )}
                {activeProjectModal.impactMetrics.treesPlanted && (
                  <div>
                    <span className="block text-[8px] tracking-widest uppercase text-silver-dark">Reforestation</span>
                    <span className="text-lg font-bold text-gold-light flex items-center gap-1.5 mt-1 font-sans">
                      <Award size={16} className="text-gold-primary" />
                      {activeProjectModal.impactMetrics.treesPlanted} Trees
                    </span>
                  </div>
                )}
                {activeProjectModal.impactMetrics.bloodUnits && (
                  <div>
                    <span className="block text-[8px] tracking-widest uppercase text-silver-dark">Blood Units Collected</span>
                    <span className="text-lg font-bold text-white flex items-center gap-1.5 mt-1 font-sans">
                      <PlusCircle size={16} className="text-gold-primary" />
                      {activeProjectModal.impactMetrics.bloodUnits} Units
                    </span>
                  </div>
                )}
                {activeProjectModal.impactMetrics.fundsRaised && (
                  <div>
                    <span className="block text-[8px] tracking-widest uppercase text-silver-dark">Funds Mobilized</span>
                    <span className="text-lg font-bold text-gold-light flex items-center gap-1.5 mt-1 font-sans">
                      ₹{activeProjectModal.impactMetrics.fundsRaised.toLocaleString()}
                    </span>
                  </div>
                )}

              </div>

              {/* Complete Narrative Description */}
              <div className="mt-6">
                <h4 className="text-[9px] tracking-widest uppercase font-bold text-white mb-2">Narrative & Achievements</h4>
                <p className="text-xs text-silver-primary leading-relaxed font-light">
                  {activeProjectModal.description}
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
