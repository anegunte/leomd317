'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { DistrictData, ClubData, ServiceProject, LeoEvent } from '@/lib/mockData';
import { MapPin, Users, Award, Calendar, FolderHeart, ArrowUpRight } from 'lucide-react';
import { REVENUE_DISTRICTS, LEO_DISTRICT_CENTERS } from '@/lib/karnatakaMapData';

export default function KarnatakaMap() {
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [clubs, setClubs] = useState<ClubData[]>([]);
  const [projects, setProjects] = useState<ServiceProject[]>([]);
  const [events, setEvents] = useState<LeoEvent[]>([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('317A');
  const [activeTab, setActiveTab] = useState<'info' | 'clubs' | 'projects' | 'events'>('info');
  const [hoveredLeoDistrictId, setHoveredLeoDistrictId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const d = await db.getDistricts();
      const c = await db.getClubs();
      const p = await db.getProjects();
      const e = await db.getEvents();
      setDistricts(d);
      setClubs(c);
      setProjects(p);
      setEvents(e);
    };
    fetchData();
  }, []);

  const selectedDistrict = districts.find(d => d.id === selectedDistrictId);
  const districtClubs = clubs.filter(c => c.districtId === selectedDistrictId);
  const districtProjects = projects.filter(p => p.district === selectedDistrictId);
  const districtEvents = events.filter(e => e.district === selectedDistrictId);

  // The map coordinates are parsed dynamically from the official geographical borders
  // of Karnataka's 31 revenue districts and Goa, grouped into LEO districts.

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch optimize-rendering-heavy">
      
      {/* SVG Interactive Map (LHS - 5 cols) */}
      <div className="lg:col-span-5 glass-panel-gold rounded-2xl p-6 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
        <div className="absolute top-4 left-6 z-10">
          <h4 className="text-xs font-sans font-bold tracking-widest text-gold-light uppercase">
            Interactive Territory Map
          </h4>
          <p className="text-[10px] text-silver-dark tracking-wide mt-1">
            Karnataka & Goa Live Collaboration Grid
          </p>
        </div>

        {/* High-tech grid background overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

        <svg
          viewBox="0 0 320 440"
          className="w-full max-w-[280px] h-auto relative z-10 filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] mt-8"
        >


          <g className="cursor-pointer">
            {/* GIS Dashboard Outer border box and tick lines */}
            <rect x="5" y="5" width="310" height="430" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <path d="M 5 110 L 12 110 M 5 220 L 12 220 M 5 330 L 12 330" stroke="rgba(255,255,255,0.15)" strokeWidth="0.75" />
            <path d="M 315 110 L 308 110 M 315 220 L 308 220 M 315 330 L 308 330" stroke="rgba(255,255,255,0.15)" strokeWidth="0.75" />
            <path d="M 80 5 L 80 12 M 160 5 L 160 12 M 240 5 L 240 12" stroke="rgba(255,255,255,0.15)" strokeWidth="0.75" />
            <path d="M 80 435 L 80 428 M 160 435 L 160 428 M 240 435 L 240 428" stroke="rgba(255,255,255,0.15)" strokeWidth="0.75" />

            {/* Latitude/Longitude labels */}
            <text x="15" y="113" fill="rgba(255, 255, 255, 0.25)" fontSize="6" className="font-mono">15° N</text>
            <text x="15" y="223" fill="rgba(255, 255, 255, 0.25)" fontSize="6" className="font-mono">13° N</text>
            <text x="15" y="333" fill="rgba(255, 255, 255, 0.25)" fontSize="6" className="font-mono">12° N</text>

            <text x="76" y="425" fill="rgba(255, 255, 255, 0.25)" fontSize="6" className="font-mono">74° E</text>
            <text x="156" y="425" fill="rgba(255, 255, 255, 0.25)" fontSize="6" className="font-mono">76° E</text>
            <text x="236" y="425" fill="rgba(255, 255, 255, 0.25)" fontSize="6" className="font-mono">78° E</text>

            {/* Scale/Translate Group for actual high-fidelity boundary rendering */}
            <g transform="translate(2.848, 5.142) scale(0.182028)">
              {/* Map Polygons */}
              {REVENUE_DISTRICTS.map((district) => {
                const isSelected = selectedDistrictId === district.leoDistrictId || 
                                  (selectedDistrictId === '317B' && district.leoDistrictId === 'GOA');
                const isHovered = hoveredLeoDistrictId === district.leoDistrictId ||
                                  (hoveredLeoDistrictId === '317B' && district.leoDistrictId === 'GOA');
                
                return (
                  <g 
                    key={district.id} 
                    onClick={() => {
                      setSelectedDistrictId(district.leoDistrictId === 'GOA' ? '317B' : district.leoDistrictId);
                      setActiveTab('info');
                    }}
                    onMouseEnter={() => setHoveredLeoDistrictId(district.leoDistrictId)}
                    onMouseLeave={() => setHoveredLeoDistrictId(null)}
                  >
                    {/* Glow outline on selection or hover */}
                    {(isSelected || isHovered) && (
                      <path
                        d={district.path}
                        fill="none"
                        stroke="#d4af37"
                        strokeWidth={isSelected ? "12" : "6"}
                        opacity={isSelected ? "0.3" : "0.15"}
                        className="blur-[2px] transition-all duration-300"
                      />
                    )}
                    <path
                      d={district.path}
                      fill={isSelected ? 'rgba(212, 175, 55, 0.18)' : (isHovered ? 'rgba(212, 175, 55, 0.07)' : 'rgba(10, 15, 30, 0.55)')}
                      stroke={isSelected ? '#d4af37' : (isHovered ? 'rgba(212, 175, 55, 0.5)' : 'rgba(255, 255, 255, 0.12)')}
                      strokeWidth={isSelected ? '2' : '0.75'}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}

              {/* Active Service Coordinates Markers */}
              {Object.entries(LEO_DISTRICT_CENTERS).map(([leoId, center]) => {
                if (leoId === 'GOA') return null;
                
                const isSelected = selectedDistrictId === leoId || (selectedDistrictId === '317B' && leoId === 'GOA');
                const isHovered = hoveredLeoDistrictId === leoId || (hoveredLeoDistrictId === '317B' && leoId === 'GOA');
                
                return (
                  <g key={`marker-${leoId}`} className="pointer-events-none">
                    {/* Core dot */}
                    <circle
                      cx={center[0]}
                      cy={center[1]}
                      r="10"
                      fill={isSelected || isHovered ? '#ffffff' : '#d4af37'}
                      stroke="rgba(10, 15, 30, 0.8)"
                      strokeWidth="3"
                    />
                    
                    {/* LEO ID Labels */}
                    {leoId !== 'GOA' && (
                      <text
                        x={center[0]}
                        y={center[1] + 45}
                        fill={isSelected || isHovered ? '#f3e5ab' : 'rgba(255, 255, 255, 0.5)'}
                        fontSize="32"
                        fontWeight={isSelected || isHovered ? 'bold' : 'normal'}
                        textAnchor="middle"
                        className="tracking-widest uppercase transition-colors duration-300 font-mono font-bold"
                      >
                        {leoId}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>



            <text x="20" y="270" fill="rgba(255, 255, 255, 0.12)" fontSize="7" letterSpacing="0.25em" transform="rotate(-90 20 270)" className="pointer-events-none uppercase font-semibold">ARABIAN SEA</text>
          </g>
        </svg>

        {/* Legend */}
        <div className="w-full mt-4 border-t border-white/5 pt-4 flex flex-wrap gap-x-4 gap-y-2 justify-center text-[9px] tracking-wider uppercase text-silver-primary">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm border border-gold-primary bg-gold-primary/20" />
            <span>District Focus</span>
          </div>
        </div>
      </div>

      {/* District Intelligence Dashboard Panel (RHS - 7 cols) */}
      <div className="lg:col-span-7 glass-panel rounded-2xl flex flex-col overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        
        {/* Panel Header */}
        <div className="px-6 py-5 border-b border-white/5 bg-bg-deep-space/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-gold-primary/10 border border-gold-primary/30 text-[9px] font-bold tracking-widest text-gold-light uppercase">
                District {selectedDistrict?.id}
              </span>
              <span className="text-[10px] text-silver-dark flex items-center gap-1">
                <MapPin size={10} /> {selectedDistrict?.name.split('(')[1]?.replace(')', '') || 'Karnataka'}
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-white mt-1">
              {selectedDistrict?.name.split('(')[0]}
            </h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="block text-[9px] tracking-widest uppercase text-silver-dark">District Theme</span>
              <span className="text-xs font-serif font-semibold text-gold-light">"{selectedDistrict?.theme}"</span>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/5 text-[10px] tracking-widest uppercase font-semibold text-silver-primary bg-bg-midnight/20">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              activeTab === 'info' ? 'border-gold-primary text-gold-light bg-white/5' : 'border-transparent hover:text-white'
            }`}
          >
            Leadership
          </button>
          <button
            onClick={() => setActiveTab('clubs')}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              activeTab === 'clubs' ? 'border-gold-primary text-gold-light bg-white/5' : 'border-transparent hover:text-white'
            }`}
          >
            Clubs ({districtClubs.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              activeTab === 'projects' ? 'border-gold-primary text-gold-light bg-white/5' : 'border-transparent hover:text-white'
            }`}
          >
            Projects ({districtProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              activeTab === 'events' ? 'border-gold-primary text-gold-light bg-white/5' : 'border-transparent hover:text-white'
            }`}
          >
            Events ({districtEvents.length})
          </button>
        </div>

        {/* Tab Panels */}
        <div className="p-6 flex-grow flex flex-col justify-between min-h-[300px]">
          
          {/* TAB: LEADERSHIP INFO */}
          {activeTab === 'info' && selectedDistrict && (
            <div className="space-y-6">
              {/* Quick stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl">
                  <span className="block text-[8px] tracking-widest text-silver-dark uppercase">Total Clubs</span>
                  <span className="text-xl font-bold font-sans text-white mt-1 flex items-center gap-1.5">
                    <FolderHeart size={16} className="text-gold-primary" />
                    {selectedDistrict.clubsCount}
                  </span>
                </div>
                <div className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl">
                  <span className="block text-[8px] tracking-widest text-silver-dark uppercase">Active Leos</span>
                  <span className="text-xl font-bold font-sans text-white mt-1 flex items-center gap-1.5">
                    <Users size={16} className="text-gold-primary" />
                    {selectedDistrict.membersCount}
                  </span>
                </div>
                <div className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl col-span-2">
                  <span className="block text-[8px] tracking-widest text-silver-dark uppercase">Lions Governor</span>
                  <span className="text-sm font-semibold text-silver-light mt-1 flex items-center gap-1.5">
                    <Award size={14} className="text-gold-primary" />
                    {selectedDistrict.governor}
                  </span>
                </div>
              </div>

              {/* District Leaders */}
              <div>
                <h4 className="text-[10px] tracking-widest uppercase font-bold text-gold-light mb-3">
                  District Cabinet Leadership
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedDistrict.cabinet.slice(0, 4).map((leader) => (
                    <div key={leader.id} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:border-gold-primary/20 transition-all">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-bg-deep-space border border-white/10 shrink-0">
                        {leader.photo ? (
                          <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-silver-primary">
                            {leader.name.split(' ').map(n=>n[0]).join('')}
                          </div>
                        )}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">{leader.name}</h5>
                        <p className="text-[9px] tracking-wider text-gold-primary/80 uppercase mt-0.5">{leader.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CLUBS */}
          {activeTab === 'clubs' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[260px] overflow-y-auto pr-2">
                {districtClubs.length > 0 ? (
                  districtClubs.map((club) => (
                    <div key={club.id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between hover:border-white/10 transition-all">
                      <div>
                        <h4 className="text-xs font-bold text-white">{club.name}</h4>
                        <span className="text-[9px] text-silver-dark mt-1 block">📍 {club.location} &bull; Founded {club.foundedYear}</span>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5 text-[9px] text-silver-primary">
                        <span>Pres: <strong className="text-gold-light">{club.president}</strong></span>
                        <span>{club.membersCount} Members</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-10 text-xs text-silver-dark">No clubs registered for this district yet.</div>
                )}
              </div>
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
              {districtProjects.length > 0 ? (
                districtProjects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-gold-primary/25 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-[8px] font-bold tracking-widest text-silver-primary uppercase">{proj.category}</span>
                      <h4 className="text-xs font-bold text-white mt-1.5">{proj.title}</h4>
                      <p className="text-[10px] text-silver-dark mt-1 block">{proj.club}</p>
                    </div>
                    <div className="flex items-center gap-6 self-stretch sm:self-auto justify-between border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                      <div className="text-right sm:text-right">
                        <span className="block text-[8px] tracking-widest uppercase text-silver-dark">Impacted</span>
                        <span className="text-xs font-bold text-gold-light">{proj.impactMetrics.beneficiaries?.toLocaleString() || 'N/A'}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[8px] tracking-widest uppercase text-silver-dark">Hours</span>
                        <span className="text-xs font-bold text-silver-light">{proj.impactMetrics.volunteerHours || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-xs text-silver-dark">No recent service projects listed for this district.</div>
              )}
            </div>
          )}

          {/* TAB: EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
              {districtEvents.length > 0 ? (
                districtEvents.map((evt) => (
                  <div key={evt.id} className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-gold-primary/20 transition-all flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-white">{evt.title}</h4>
                      <p className="text-[10px] text-silver-dark mt-1 flex items-center gap-1.5">
                        <Calendar size={12} />
                        {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        &bull; {evt.location}
                      </p>
                    </div>
                    {evt.status === 'upcoming' && evt.registrationLink && (
                      <a
                        href={evt.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-light hover:bg-gold-primary hover:text-bg-midnight transition-all shrink-0"
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-xs text-silver-dark">No events currently scheduled for this district.</div>
              )}
            </div>
          )}

          {/* Panel Footer */}
          <div className="mt-6 border-t border-white/5 pt-4 flex items-center justify-between text-[10px] text-silver-dark">
            <span>District Intelligence Sync: <strong className="text-silver-primary">Active</strong></span>
            <span className="flex items-center gap-1 text-gold-light hover:underline cursor-pointer">
              View Detailed Analytics <ArrowUpRight size={12} />
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

// Helper to retrieve district center coordinates for connection arcs
function selectedDistrictPathsCenter(districtId: string): number[] {
  const centers: Record<string, number[]> = {
    '317A': [225.8, 339.8],
    '317B': [131.2, 185.1],
    '317C': [123.9, 281.6],
    '317D': [127.2, 350.5],
    '317E': [280.4, 340.9],
    '317F': [252.2, 306.1],
    '317G': [193.6, 391.8],
    'GOA': [24.5, 196.9]
  };
  return centers[districtId] || [160, 220];
}
