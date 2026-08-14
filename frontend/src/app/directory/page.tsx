'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { DistrictData, ClubData, LeoProfile } from '@/lib/mockData';
import { Search, Mail, Phone, Users, MapPin, Building, ChevronDown, ChevronUp } from 'lucide-react';

const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Directory() {
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [clubs, setClubs] = useState<ClubData[]>([]);
  const [mdCabinet, setMdCabinet] = useState<LeoProfile[]>([]);
  const [activeTab, setActiveTab] = useState<'md' | 'district' | 'clubs'>('md');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState('All');
  const [expandedCabinetDistrict, setExpandedCabinetDistrict] = useState<string | null>('317A');

  useEffect(() => {
    const fetchData = async () => {
      const d = await db.getDistricts();
      const c = await db.getClubs();
      const m = await db.getMDCabinet();
      setDistricts(d);
      setClubs(c);
      setMdCabinet(m);
    };
    fetchData();
  }, []);

  // Filters logic
  const filteredMDCabinet = mdCabinet.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDistricts = districts.map(d => {
    // Search within cabinet members of the district
    const matchingCabinet = d.cabinet.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...d, cabinet: matchingCabinet };
  }).filter(d =>
    (selectedDistrictFilter === 'All' || d.id === selectedDistrictFilter) &&
    (d.cabinet.length > 0 || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.governor.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredClubs = clubs.filter(c =>
    (selectedDistrictFilter === 'All' || c.districtId === selectedDistrictFilter) &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.president.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase mb-4">
          Leadership <span className="gold-glow-text">Network</span>
        </h1>
        <p className="text-xs tracking-widest uppercase text-silver-primary font-medium">
          Professional LEO Directory of Multiple District 317
        </p>
      </div>

      {/* SEARCH AND FILTER COMMAND CENTER */}
      <div className="glass-panel rounded-2xl p-6 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between border border-white/10">

        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3.5 text-silver-dark" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leaders, clubs, positions, locations..."
            className="w-full pl-11 pr-4 py-3 bg-bg-deep-space/65 border border-white/10 rounded-xl text-xs text-white placeholder-silver-dark focus:outline-none focus:border-gold-primary transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex w-full md:w-auto gap-4 items-center justify-end">
          <span className="text-[10px] tracking-widest uppercase text-silver-dark font-semibold">Filter District:</span>
          <select
            value={selectedDistrictFilter}
            onChange={(e) => setSelectedDistrictFilter(e.target.value)}
            className="px-4 py-3 bg-bg-deep-space/65 border border-white/10 rounded-xl text-xs text-silver-light focus:outline-none focus:border-gold-primary cursor-pointer transition-colors"
          >
            <option value="All">All Districts</option>
            <option value="317A">317A</option>
            <option value="317B">317B</option>
            <option value="317C">317C</option>
            <option value="317D">317D</option>
            <option value="317E">317E</option>
            <option value="317F">317F</option>
            <option value="317G">317G</option>
          </select>
        </div>

      </div>

      {/* DIRECTORY TABS */}
      <div className="flex border-b border-white/10 text-xs tracking-widest uppercase font-semibold text-silver-primary mb-10">
        <button
          onClick={() => setActiveTab('md')}
          className={`px-6 py-4 border-b-2 transition-all ${activeTab === 'md' ? 'border-gold-primary text-gold-light font-bold bg-white/5' : 'border-transparent hover:text-white'
            }`}
        >
          MD Cabinet
        </button>
        <button
          onClick={() => setActiveTab('district')}
          className={`px-6 py-4 border-b-2 transition-all ${activeTab === 'district' ? 'border-gold-primary text-gold-light font-bold bg-white/5' : 'border-transparent hover:text-white'
            }`}
        >
          District Cabinets
        </button>
        <button
          onClick={() => setActiveTab('clubs')}
          className={`px-6 py-4 border-b-2 transition-all ${activeTab === 'clubs' ? 'border-gold-primary text-gold-light font-bold bg-white/5' : 'border-transparent hover:text-white'
            }`}
        >
          Club Directory
        </button>
      </div>

      {/* 1. TAB CONTENT: MD CABINET */}
      {activeTab === 'md' && (
        <div>
          {filteredMDCabinet.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredMDCabinet.map((profile) => (
                <div key={profile.id} className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-gold-primary/20 transition-all group flex flex-col justify-between min-h-[360px] relative">

                  {/* Photo or initials placeholder */}
                  <div className="relative w-full aspect-square bg-bg-deep-space overflow-hidden flex items-center justify-center border-b border-white/5">
                    {profile.photo ? (
                      <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                    ) : (
                      <span className="text-4xl font-serif text-silver-dark">{profile.name.split(' ').map(n => n[0]).join('')}</span>
                    )}
                    {/* Glowing gold border on active selection */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep-space via-transparent to-transparent opacity-60" />
                    <span className="absolute bottom-4 left-6 text-[9px] tracking-widest text-gold-light uppercase font-bold bg-gold-primary/10 border border-gold-primary/25 px-2 py-0.5 rounded">
                      MD 317 Cabinet
                    </span>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-serif font-bold text-white leading-snug">{profile.name}</h3>
                      <p className="text-[10px] tracking-widest text-silver-dark uppercase mt-1">{profile.role}</p>
                    </div>

                    {/* Contact networks */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      {profile.email && (
                        <a href={`mailto:${profile.email}`} className="text-silver-primary hover:text-gold-primary transition-colors flex items-center gap-1.5" title={profile.email}>
                          <Mail size={14} />
                          <span className="text-[9px] lowercase tracking-normal hidden md:inline truncate max-w-[80px]">Email</span>
                        </a>
                      )}
                      {profile.phone && (
                        <a href={`tel:${profile.phone}`} className="text-silver-primary hover:text-gold-primary transition-colors flex items-center gap-1.5" title={profile.phone}>
                          <Phone size={14} />
                          <span className="text-[9px] tracking-normal hidden md:inline">Call</span>
                        </a>
                      )}
                      {profile.linkedin && (
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-silver-primary hover:text-gold-primary transition-colors flex items-center gap-1.5" title="LinkedIn Profile">
                          <LinkedinIcon size={14} />
                          <span className="text-[9px] tracking-normal hidden md:inline">Connect</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-xs text-silver-dark">No Multiple District leaders found matching your search.</div>
          )}
        </div>
      )}

      {/* 2. TAB CONTENT: DISTRICT CABINETS */}
      {activeTab === 'district' && (
        <div className="space-y-6">
          {filteredDistricts.length > 0 ? (
            filteredDistricts.map((district) => {
              const isExpanded = expandedCabinetDistrict === district.id;
              return (
                <div key={district.id} className="glass-panel rounded-2xl overflow-hidden border border-white/10">

                  {/* District Panel Title Header */}
                  <div
                    onClick={() => setExpandedCabinetDistrict(isExpanded ? null : district.id)}
                    className="px-6 py-5 bg-bg-deep-space/40 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-gold-primary/10 border border-gold-primary/30 text-[9px] font-bold tracking-widest text-gold-light uppercase">
                          District {district.id}
                        </span>
                        <span className="text-[10px] text-silver-dark">
                          Lions DG: <strong>{district.governor}</strong>
                        </span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-white mt-1">
                        {district.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-silver-primary">
                      <span className="hidden sm:inline font-mono text-[10px] text-silver-dark tracking-wider">
                        Cabinet size: {district.cabinet.length}
                      </span>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  {/* Expanded Cabinet List */}
                  {isExpanded && (
                    <div className="p-6 border-t border-white/5 bg-bg-midnight/35">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {district.cabinet.map((leader) => (
                          <div key={leader.id} className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-gold-primary/20 transition-all flex flex-col justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-bg-deep-space border border-white/10 flex items-center justify-center shrink-0">
                                {leader.photo ? (
                                  <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-xs font-semibold text-silver-primary">{leader.name.split(' ').map(n => n[0]).join('')}</span>
                                )}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-white">{leader.name}</h4>
                                <p className="text-[9px] tracking-wider text-gold-primary/80 uppercase mt-0.5">{leader.role}</p>
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-silver-primary text-xs">
                              {leader.email && (
                                <a href={`mailto:${leader.email}`} className="hover:text-gold-primary transition-colors" title={leader.email}>
                                  <Mail size={12} />
                                </a>
                              )}
                              {leader.linkedin && (
                                <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gold-primary transition-colors" title="LinkedIn">
                                  <LinkedinIcon size={12} />
                                </a>
                              )}
                              <span className="text-[8px] text-silver-dark tracking-widest uppercase">Contact Sync</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          ) : (
            <div className="text-center py-20 text-xs text-silver-dark">No district cabinets matched your selection or search filters.</div>
          )}
        </div>
      )}

      {/* 3. TAB CONTENT: CLUB DIRECTORY */}
      {activeTab === 'clubs' && (
        <div>
          {filteredClubs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => (
                <div key={club.id} className="glass-panel rounded-2xl p-5 border border-white/5 hover:border-gold-primary/20 transition-all flex flex-col justify-between min-h-[220px]">

                  {/* Header */}
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-bold tracking-widest text-silver-primary uppercase">
                        District {club.districtId}
                      </span>
                      <span className="text-[10px] text-silver-dark flex items-center gap-1">
                        <MapPin size={10} /> {club.location.split(',')[0]}
                      </span>
                    </div>
                    <h3 className="text-sm font-serif font-bold text-white mt-3 flex items-center gap-2">
                      <Building size={14} className="text-gold-primary" />
                      {club.name}
                    </h3>
                    <span className="text-[9px] text-silver-dark block mt-1">Founded {club.foundedYear}</span>
                  </div>

                  {/* Cabinet roles & Details */}
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-xs text-silver-primary">
                    <div className="flex justify-between">
                      <span className="text-silver-dark">President:</span>
                      <span className="font-medium text-white">{club.president}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-silver-dark">Secretary:</span>
                      <span className="font-medium text-white">{club.secretary}</span>
                    </div>
                  </div>

                  {/* Footing stats */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] text-silver-dark uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Users size={10} />
                      {club.membersCount} active Leos
                    </span>
                    {club.socials?.instagram ? (
                      <a href={club.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gold-primary hover:underline">
                        Instagram Profile
                      </a>
                    ) : (
                      <span>Active Charter</span>
                    )}
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-xs text-silver-dark">No clubs found matching your search parameters.</div>
          )}
        </div>
      )}

    </div>
  );
}
