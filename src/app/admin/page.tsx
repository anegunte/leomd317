/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { ServiceProject, ClubData, DistrictData, MediaItem } from '@/lib/mockData';
import {
  Users,
  FolderHeart,
  Map,
  Award,
  LayoutDashboard,
  Plus,
  Trash2,
  Sparkles,
  LogOut,
  Building,
  Image,
  Database,
  CalendarCheck,
  Edit3
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'directory' | 'projects' | 'media'>('stats');

  // Database datasets state
  const [projects, setProjects] = useState<ServiceProject[]>([]);
  const [clubs, setClubs] = useState<ClubData[]>([]);
  const [districts, setDistricts] = useState<DistrictData[]>([]);

  // Form variables: Project
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projCat, setProjCat] = useState<'Education' | 'Healthcare' | 'Environment' | 'Mental Health' | 'Hunger Relief' | 'Women Empowerment' | 'Disaster Relief' | 'Youth Leadership' | 'Technology for Good'>('Education');
  const [projBenef, setProjBenef] = useState(100);
  const [projHours, setProjHours] = useState(40);
  const [projTrees, setProjTrees] = useState(0);
  const [projBlood, setProjBlood] = useState(0);
  const [projClub, setProjClub] = useState('');
  const [projDistrict, setProjDistrict] = useState('317A');

  // Form variables: Media
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600');
  const [mediaCat, setMediaCat] = useState<'Installations' | 'Conferences' | 'Service Projects' | 'Youth Leadership'>('Service Projects');
  const [mediaDistrict, setMediaDistrict] = useState('317A');

  // Form variables: Club edit
  const [editingClub, setEditingClub] = useState<ClubData | null>(null);
  const [editClubPres, setEditClubPres] = useState('');
  const [editClubSec, setEditClubSec] = useState('');
  const [editClubMembers, setEditClubMembers] = useState(25);

  const loadData = async () => {
    const p = await db.getProjects();
    const c = await db.getClubs();
    const d = await db.getDistricts();
    setProjects(p);
    setClubs(c);
    setDistricts(d);
  };

  useEffect(() => {
    const currentUser = db.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    loadData();
  }, [router]);

  const handleLogout = () => {
    db.logout();
    window.dispatchEvent(new Event('leo-auth-change'));
    router.push('/');
  };

  // Simulating changing roles directly on the UI for quick evaluation
  const handleSimulateRole = (role: string) => {
    if (!user) return;
    let dist = "317";
    let clb = undefined;
    if (role === 'District Admin') dist = '317A';
    if (role === 'Club Admin') {
      dist = '317A';
      clb = 'Leo Club of RVCE';
    }
    const simulated = { ...user, role, district: dist, club: clb };
    localStorage.setItem('leo_user_session', JSON.stringify(simulated));
    setUser(simulated);
    window.dispatchEvent(new Event('leo-auth-change'));
  };

  // Project addition logic
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projDesc || !projClub) {
      alert('Please fill out all required fields');
      return;
    }
    const params: Omit<ServiceProject, 'id'> = {
      title: projTitle,
      category: projCat,
      description: projDesc,
      impactMetrics: {
        beneficiaries: projBenef,
        volunteerHours: projHours,
        ...(projTrees > 0 ? { treesPlanted: projTrees } : {}),
        ...(projBlood > 0 ? { bloodUnits: projBlood } : {})
      },
      photos: ["https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600"],
      district: projDistrict,
      club: projClub,
      date: new Date().toISOString().split('T')[0]
    };

    await db.addProject(params);
    setProjTitle('');
    setProjDesc('');
    setProjClub('');
    loadData();
    alert('Service project successfully registered and aggregated!');
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this service record?')) {
      await db.deleteProject(id);
      loadData();
    }
  };

  // Media addition logic
  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle || !mediaUrl) return;

    await db.addMedia({
      title: mediaTitle,
      url: mediaUrl,
      thumbnail: mediaUrl,
      type: 'photo',
      category: mediaCat,
      district: mediaDistrict
    });

    setMediaTitle('');
    loadData();
    alert('Media item uploaded successfully to the Hub!');
  };

  // Club update logic
  const handleSaveClubEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClub) return;

    const updated: ClubData = {
      ...editingClub,
      president: editClubPres,
      secretary: editClubSec,
      membersCount: editClubMembers
    };

    await db.updateClub(updated);
    setEditingClub(null);
    loadData();
    alert('Club profile updated successfully!');
  };

  if (!user) return null;

  // Role based filtering logic for actions
  const isSuper = user.role === 'Super Admin';
  const isMD = user.role === 'MD Admin' || isSuper;
  const isDistrict = user.role === 'District Admin' || isMD;
  const isClub = user.role === 'Club Admin' || isDistrict;

  // Filter lists based on simulated roles to prove access restriction works!
  const manageableClubs = clubs.filter(c => isMD || (isDistrict && c.districtId === user.district) || (user.club && c.name === user.club));
  const manageableProjects = projects.filter(p => isMD || (isDistrict && p.district === user.district) || (user.club && p.club === user.club));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch optimize-rendering-heavy">

      {/* 1. LHS SIDEBAR & SIMULATION HUB (3 cols) */}
      <div className="lg:col-span-3 flex flex-col gap-6">

        {/* User Card */}
        <div className="glass-panel-gold rounded-2xl p-5 border border-gold-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gold-primary/5 rounded-full blur-2xl pointer-events-none" />

          <span className="text-[8px] tracking-widest text-gold-light uppercase font-bold block mb-1">Authenticated Command</span>
          <h3 className="text-sm font-serif font-bold text-white truncate">{user.name}</h3>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-2 py-0.5 rounded bg-gold-primary/10 border border-gold-primary/25 text-[8px] font-bold text-gold-light uppercase">
              {user.role}
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-bold text-silver-primary uppercase">
              {user.district === "317" ? "MD 317" : `Dist ${user.district}`}
            </span>
          </div>

          {user.club && (
            <div className="mt-3 text-[10px] text-silver-dark italic">
              Club: {user.club}
            </div>
          )}
        </div>

        {/* Sidebar Nav Links */}
        <div className="glass-panel rounded-2xl p-4 border border-white/5 space-y-1 text-xs">
          <button
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all ${activeTab === 'stats' ? 'bg-gold-primary/10 border-l-2 border-gold-primary text-gold-light font-bold' : 'hover:bg-white/5 text-silver-primary hover:text-white'
              }`}
          >
            <LayoutDashboard size={14} />
            Command Center
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all ${activeTab === 'directory' ? 'bg-gold-primary/10 border-l-2 border-gold-primary text-gold-light font-bold' : 'hover:bg-white/5 text-silver-primary hover:text-white'
              }`}
          >
            <Building size={14} />
            Directory Profiles
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-gold-primary/10 border-l-2 border-gold-primary text-gold-light font-bold' : 'hover:bg-white/5 text-silver-primary hover:text-white'
              }`}
          >
            <Database size={14} />
            Service Records
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all ${activeTab === 'media' ? 'bg-gold-primary/10 border-l-2 border-gold-primary text-gold-light font-bold' : 'hover:bg-white/5 text-silver-primary hover:text-white'
              }`}
          >
            <Image size={14} />
            Media & Installations
          </button>

          <Link
            href="/admin/narrator"
            className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl hover:bg-white/5 text-silver-primary hover:text-white transition-all text-left"
          >
            <Sparkles size={14} className="text-gold-primary animate-pulse" />
            AI Impact Narrator
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl hover:bg-red-500/5 text-red-400 border-t border-white/5 pt-4 text-left"
          >
            <LogOut size={14} />
            Logout Command
          </button>
        </div>

        {/* DEMO EVALUATOR ROLE SWITCHER */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 text-xs">
          <h4 className="text-[9px] tracking-widest uppercase font-bold text-gold-light mb-2 flex items-center gap-1">
            <Sparkles size={10} className="text-gold-primary fill-gold-primary" />
            Simulate Role Switch
          </h4>
          <p className="text-[9px] text-silver-dark mb-4 leading-normal">
            Toggle administrative access scopes on-the-fly to test district directory filtering:
          </p>
          <div className="flex flex-col gap-1.5 font-semibold">
            {['Super Admin', 'MD Admin', 'District Admin', 'Club Admin'].map((role) => (
              <button
                key={role}
                onClick={() => handleSimulateRole(role)}
                className={`w-full py-2 px-3 rounded text-[9px] text-left border transition-all ${user.role === role
                    ? 'bg-gold-primary/10 border-gold-primary/50 text-gold-light'
                    : 'bg-white/3 border-transparent hover:border-white/10 text-silver-primary'
                  }`}
              >
                {role} View
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 2. RHS PANEL: CAPABILITY CONTROLS (9 cols) */}
      <div className="lg:col-span-9 glass-panel rounded-3xl border border-white/10 p-8 flex flex-col justify-between">

        {/* TAB 1: PLATFORM STATISTICS */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                Admin Command Center
              </h2>
              <span className="text-[9px] font-mono text-silver-dark uppercase">Live Sync</span>
            </div>

            {/* Quick Summary row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-white/3 border border-white/5 rounded-xl">
                <span className="block text-[8px] tracking-widest uppercase text-silver-dark">Manageable Clubs</span>
                <span className="text-xl font-bold text-white mt-1 block">{manageableClubs.length} Clubs</span>
                <span className="text-[8px] text-silver-dark mt-1 block">Based on auth context</span>
              </div>
              <div className="p-4 bg-white/3 border border-white/5 rounded-xl">
                <span className="block text-[8px] tracking-widest uppercase text-silver-dark">Manageable Projects</span>
                <span className="text-xl font-bold text-white mt-1 block">{manageableProjects.length} Projects</span>
                <span className="text-[8px] text-silver-dark mt-1 block">Registered in territory</span>
              </div>
              <div className="p-4 bg-white/3 border border-white/5 rounded-xl">
                <span className="block text-[8px] tracking-widest uppercase text-silver-dark">Database State</span>
                <span className="text-xl font-bold text-gold-light mt-1 block flex items-center gap-1.5">
                  <Database size={16} className="text-gold-primary" />
                  Local Sync
                </span>
                <span className="text-[8px] text-silver-dark mt-1 block">Auto-fallback persistence</span>
              </div>
            </div>

            {/* Audit log mockup */}
            <div className="border border-white/5 rounded-xl p-5 bg-white/1">
              <h4 className="text-[10px] tracking-widest uppercase font-bold text-gold-light mb-4">
                Recent Admin Activity Log
              </h4>
              <div className="space-y-3.5 text-xs text-silver-primary">
                <div className="flex justify-between border-b border-white/3 pb-2">
                  <span>Leo Chethan M. added project <strong>"Vidyadhana Scholastics"</strong></span>
                  <span className="text-silver-dark text-[10px]">Just now</span>
                </div>
                <div className="flex justify-between border-b border-white/3 pb-2">
                  <span>Leo Lion A Vaishnavi mjf published <strong>"Annual Report 2026 Booklet"</strong></span>
                  <span className="text-silver-dark text-[10px]">2 hours ago</span>
                </div>
                <div className="flex justify-between border-b border-white/3 pb-2">
                  <span>Leo Shruthi K.R. scheduled event <strong>"OTS Officer Assembly"</strong></span>
                  <span className="text-silver-dark text-[10px]">1 day ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Ln. Dr. R. Murugan updated District <strong>317A Cabinet</strong> records</span>
                  <span className="text-silver-dark text-[10px]">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIRECTORY PROFILES */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                Directory Cabinet Manager
              </h2>
              <span className="text-[9px] font-mono text-silver-dark uppercase">Manage Roles</span>
            </div>

            {/* Club manager listing */}
            <div>
              <h4 className="text-[10px] tracking-widest uppercase font-bold text-gold-light mb-4">
                Local Clubs Directory Profiles
              </h4>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {manageableClubs.map((club) => (
                  <div key={club.id} className="p-4 bg-white/3 border border-white/5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-white">{club.name}</h4>
                      <p className="text-[9px] text-silver-dark mt-1">📍 {club.location} &bull; District {club.districtId}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-[10px] text-silver-primary">
                        Pres: <strong className="text-white">{club.president}</strong> | Sec: <strong className="text-white">{club.secretary}</strong>
                      </div>
                      <button
                        onClick={() => {
                          setEditingClub(club);
                          setEditClubPres(club.president);
                          setEditClubSec(club.secretary);
                          setEditClubMembers(club.membersCount);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 hover:border-gold-primary hover:bg-gold-primary/5 text-[9px] uppercase font-bold text-gold-light"
                      >
                        <Edit3 size={10} /> Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editing Club Form overlay popup */}
            {editingClub && (
              <form onSubmit={handleSaveClubEdit} className="border border-gold-primary/30 bg-gold-primary/2 p-5 rounded-2xl space-y-4 text-xs">
                <h4 className="font-bold text-gold-light uppercase tracking-wider text-[9px] pb-2 border-b border-white/5">
                  Editing Club Profile: {editingClub.name}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">President Name</label>
                    <input
                      type="text" value={editClubPres} onChange={e => setEditClubPres(e.target.value)} required
                      className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Secretary Name</label>
                    <input
                      type="text" value={editClubSec} onChange={e => setEditClubSec(e.target.value)} required
                      className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Members Count</label>
                    <input
                      type="number" value={editClubMembers} onChange={e => setEditClubMembers(parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end text-[9px] font-bold uppercase tracking-wider pt-2">
                  <button type="button" onClick={() => setEditingClub(null)} className="px-4 py-2 border border-white/10 hover:border-white/20 text-silver-primary rounded-full">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-gold-primary text-bg-deep-space rounded-full">Save Profile</button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* TAB 3: SERVICE RECORDS */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                Service Records Catalog
              </h2>
              <span className="text-[9px] font-mono text-silver-dark uppercase">Aggregates</span>
            </div>

            {/* List current projects */}
            <div>
              <h4 className="text-[10px] tracking-widest uppercase font-bold text-gold-light mb-4">
                Recent Registered Service Projects
              </h4>
              <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-2">
                {manageableProjects.map((proj) => (
                  <div key={proj.id} className="p-3.5 bg-white/3 border border-white/5 rounded-xl flex justify-between items-center">
                    <div>
                      <h5 className="text-xs font-bold text-white">{proj.title}</h5>
                      <span className="text-[9px] text-silver-dark">{proj.club} &bull; Beneficiaries: {proj.impactMetrics.beneficiaries}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1.5 rounded-full border border-red-500/25 hover:border-red-500 hover:bg-red-500/5 text-red-400"
                      title="Delete Record"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Form: Add New Project */}
            <form onSubmit={handleAddProject} className="border border-white/10 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-gold-light uppercase tracking-wider text-[9px] pb-2 border-b border-white/5 flex items-center gap-1.5">
                <Plus size={12} /> Register On-Ground Service Campaign
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Campaign Title</label>
                  <input
                    type="text" value={projTitle} onChange={e => setProjTitle(e.target.value)} required placeholder="e.g. Rakta-Dhaan Blood Drive"
                    className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Sector Category</label>
                  <select
                    value={projCat} onChange={e => setProjCat(e.target.value as any)}
                    className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs cursor-pointer"
                  >
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Environment">Environment</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="Hunger Relief">Hunger Relief</option>
                    <option value="Women Empowerment">Women Empowerment</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                    <option value="Youth Leadership">Youth Leadership</option>
                    <option value="Technology for Good">Technology for Good</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Description & Scope</label>
                <textarea
                  value={projDesc} onChange={e => setProjDesc(e.target.value)} rows={3} required placeholder="Detail the local action, partners, and implementation strategy..."
                  className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Beneficiaries</label>
                  <input
                    type="number" value={projBenef} onChange={e => setProjBenef(parseInt(e.target.value) || 0)} required
                    className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Volunteer Hours</label>
                  <input
                    type="number" value={projHours} onChange={e => setProjHours(parseInt(e.target.value) || 0)} required
                    className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Trees Planted</label>
                  <input
                    type="number" value={projTrees} onChange={e => setProjTrees(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Blood Units</label>
                  <input
                    type="number" value={projBlood} onChange={e => setProjBlood(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Organizing Leo Club Name</label>
                  <input
                    type="text" value={projClub} onChange={e => setProjClub(e.target.value)} required placeholder="e.g. Leo Club of RVCE"
                    className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">District Territory</label>
                  <select
                    value={projDistrict} onChange={e => setProjDistrict(e.target.value)}
                    className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs cursor-pointer"
                  >
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

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-gold-primary text-bg-deep-space font-bold uppercase tracking-widest text-[9px] hover:shadow-[0_0_15px_rgba(212,175,55,0.35)] transition-all"
              >
                Register & Synchronize Project
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: MEDIA & INSTALLATIONS */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                Platform Media Uploader
              </h2>
              <span className="text-[9px] font-mono text-silver-dark uppercase">Upload Assets</span>
            </div>

            <form onSubmit={handleAddMedia} className="border border-white/10 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-gold-light uppercase tracking-wider text-[9px] pb-2 border-b border-white/5 flex items-center gap-1.5">
                <Plus size={12} /> Add Photo to Media Hub
              </h4>

              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Photo Title / Caption</label>
                <input
                  type="text" value={mediaTitle} onChange={e => setMediaTitle(e.target.value)} required placeholder="e.g. Officer Installation Ceremony"
                  className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs"
                />
              </div>

              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Image URL</label>
                <input
                  type="text" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} required
                  className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Category</label>
                  <select
                    value={mediaCat} onChange={e => setMediaCat(e.target.value as any)}
                    className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs cursor-pointer"
                  >
                    <option value="Installations">Installations</option>
                    <option value="Conferences">Conferences</option>
                    <option value="Service Projects">Service Projects</option>
                    <option value="Youth Leadership">Youth Leadership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">District</label>
                  <select
                    value={mediaDistrict} onChange={e => setMediaDistrict(e.target.value)}
                    className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs cursor-pointer"
                  >
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

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-gold-primary text-bg-deep-space font-bold uppercase tracking-widest text-[9px]"
              >
                Upload Photo to Hub
              </button>
            </form>
          </div>
        )}

      </div>

    </div>
  );
}
