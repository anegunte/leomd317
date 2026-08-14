/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { ServiceProject, ClubData, DistrictData, MediaItem, LeoEvent, LeoProfile } from '@/lib/mockData';
import { DEFAULT_ISAME_SETTINGS, IsameSettings } from '@/lib/isame';
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
  Edit3,
  Globe2
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'directory' | 'projects' | 'media' | 'events' | 'site' | 'cabinet' | 'lion' | 'isame'>('stats');

  // Database datasets state
  const [projects, setProjects] = useState<ServiceProject[]>([]);
  const [clubs, setClubs] = useState<ClubData[]>([]);
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [events, setEvents] = useState<LeoEvent[]>([]);
  const [mdCabinet, setMdCabinet] = useState<LeoProfile[]>([]);
  const [lionCabinet, setLionCabinet] = useState<LeoProfile[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [counters, setCounters] = useState<any[]>([]);
  const [tickerItems, setTickerItems] = useState<any[]>([]);
  const [isameSettings, setIsameSettings] = useState<IsameSettings>(DEFAULT_ISAME_SETTINGS);

  // The same form is used for a new record and for an existing record.
  const [editingProject, setEditingProject] = useState<ServiceProject | null>(null);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [editingEvent, setEditingEvent] = useState<LeoEvent | null>(null);
  const [editingCabinet, setEditingCabinet] = useState<LeoProfile | null>(null);
  const [editingLion, setEditingLion] = useState<LeoProfile | null>(null);

  // Event form
  const [evtTitle, setEvtTitle] = useState('');
  const [evtDesc, setEvtDesc] = useState('');
  const [evtDate, setEvtDate] = useState('');
  const [evtLocation, setEvtLocation] = useState('');
  const [evtDistrict, setEvtDistrict] = useState('317A');
  const [evtStatus, setEvtStatus] = useState<'upcoming' | 'past'>('upcoming');
  const [evtPoster, setEvtPoster] = useState('');
  const [evtClub, setEvtClub] = useState('');
  const [evtRegLink, setEvtRegLink] = useState('');

  // Cabinet member form
  const [cabName, setCabName] = useState('');
  const [cabRole, setCabRole] = useState('');
  const [cabDistrict, setCabDistrict] = useState('317A');
  const [cabClub, setCabClub] = useState('');
  const [cabEmail, setCabEmail] = useState('');
  const [cabPhone, setCabPhone] = useState('');
  const [cabPhoto, setCabPhoto] = useState('');

  // Lion Cabinet member form
  const [lionName, setLionName] = useState('');
  const [lionRole, setLionRole] = useState('');
  const [lionDistrict, setLionDistrict] = useState('317');
  const [lionClub, setLionClub] = useState('');
  const [lionEmail, setLionEmail] = useState('');
  const [lionPhone, setLionPhone] = useState('');
  const [lionPhoto, setLionPhoto] = useState('');

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
  const [projPhoto, setProjPhoto] = useState('');
  const [projDate, setProjDate] = useState('');

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

  // Form variables: Add new club
  const [newClubName, setNewClubName] = useState('');
  const [newClubLocation, setNewClubLocation] = useState('');
  const [newClubDistrict, setNewClubDistrict] = useState('317A');
  const [newClubPres, setNewClubPres] = useState('');
  const [newClubSec, setNewClubSec] = useState('');
  const [newClubMembers, setNewClubMembers] = useState(25);

  const loadData = async () => {
    const [p, c, d, e, m, lc, mi, s, cnt, tk, isame] = await Promise.all([
      db.getProjects(),
      db.getClubs(),
      db.getDistricts(),
      db.getEvents(),
      db.getMDCabinet(),
      db.getLionCabinet(),
      db.getMedia(),
      db.getSiteSettings(),
      db.getCounters(),
      db.getTicker(),
      db.getIsameSettings(),
    ]);
    setProjects(p);
    setClubs(c);
    setDistricts(d);
    setEvents(e);
    setMdCabinet(m);
    setLionCabinet(lc);
    setMediaItems(mi);
    setSiteSettings(s);
    setCounters(cnt);
    setTickerItems(tk);
    setIsameSettings({ ...DEFAULT_ISAME_SETTINGS, ...isame });
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

  const resetProjectForm = () => {
    setEditingProject(null); setProjTitle(''); setProjDesc(''); setProjCat('Education');
    setProjBenef(100); setProjHours(40); setProjTrees(0); setProjBlood(0); setProjClub('');
    setProjDistrict('317A'); setProjPhoto(''); setProjDate('');
  };

  const startEditProject = (project: ServiceProject) => {
    setEditingProject(project); setProjTitle(project.title); setProjDesc(project.description);
    setProjCat(project.category); setProjBenef(project.impactMetrics.beneficiaries || 0);
    setProjHours(project.impactMetrics.volunteerHours || 0); setProjTrees(project.impactMetrics.treesPlanted || 0);
    setProjBlood(project.impactMetrics.bloodUnits || 0); setProjClub(project.club); setProjDistrict(project.district);
    setProjPhoto(project.photos?.[0] || ''); setProjDate(project.date || '');
  };

  const handleSaveProject = async (e: React.FormEvent) => {
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
        ...(editingProject?.impactMetrics || {}),
        treesPlanted: projTrees,
        bloodUnits: projBlood,
      },
      photos: projPhoto ? [projPhoto] : ["https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600"],
      district: projDistrict,
      club: projClub,
      date: projDate || new Date().toISOString().split('T')[0]
    };

    if (editingProject) await db.updateProject({ ...editingProject, ...params });
    else await db.addProject(params);
    const wasEditing = Boolean(editingProject);
    resetProjectForm();
    loadData();
    alert(wasEditing ? 'Service project updated successfully!' : 'Service project successfully registered and aggregated!');
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this service record?')) {
      await db.deleteProject(id);
      loadData();
    }
  };

  const resetMediaForm = () => {
    setEditingMedia(null); setMediaTitle('');
    setMediaUrl('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600');
    setMediaCat('Service Projects'); setMediaDistrict('317A');
  };

  const startEditMedia = (item: MediaItem) => {
    setEditingMedia(item); setMediaTitle(item.title); setMediaUrl(item.url || item.thumbnail);
    setMediaCat(item.category); setMediaDistrict(item.district);
  };

  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle || !mediaUrl) return;

    const item = {
      title: mediaTitle,
      url: mediaUrl,
      thumbnail: mediaUrl,
      type: editingMedia?.type || 'photo',
      category: mediaCat,
      district: mediaDistrict
    };

    if (editingMedia) await db.updateMedia({ ...editingMedia, ...item });
    else await db.addMedia(item);
    const wasEditing = Boolean(editingMedia);
    resetMediaForm();
    loadData();
    alert(wasEditing ? 'Media item updated successfully!' : 'Media item uploaded successfully to the Hub!');
  };

  const resetEventForm = () => {
    setEditingEvent(null); setEvtTitle(''); setEvtDesc(''); setEvtDate(''); setEvtLocation('');
    setEvtDistrict('317A'); setEvtStatus('upcoming'); setEvtPoster(''); setEvtClub(''); setEvtRegLink('');
  };

  const startEditEvent = (event: LeoEvent) => {
    setEditingEvent(event); setEvtTitle(event.title); setEvtDesc(event.description || '');
    setEvtDate(event.date ? event.date.slice(0, 16) : ''); setEvtLocation(event.location);
    setEvtDistrict(event.district); setEvtStatus(event.status); setEvtPoster(event.poster || '');
    setEvtClub(event.organizingTeam || ''); setEvtRegLink(event.registrationLink || '');
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evtTitle || !evtDate || !evtLocation) { alert('Fill all required fields'); return; }
    const event = { title: evtTitle, description: evtDesc, date: evtDate, location: evtLocation, district: evtDistrict, status: evtStatus, poster: evtPoster, registrationLink: evtRegLink, organizingTeam: evtClub };
    if (editingEvent) await db.updateEvent({ ...editingEvent, ...event });
    else await db.addEvent(event);
    const wasEditing = Boolean(editingEvent);
    resetEventForm(); loadData();
    alert(wasEditing ? 'Event updated successfully!' : 'Event created successfully!');
  };

  const resetCabinetForm = () => {
    setEditingCabinet(null); setCabName(''); setCabRole(''); setCabDistrict('317A'); setCabClub(''); setCabEmail(''); setCabPhone(''); setCabPhoto('');
  };
  const startEditCabinet = (member: LeoProfile) => {
    setEditingCabinet(member); setCabName(member.name); setCabRole(member.role); setCabDistrict(member.district); setCabClub(member.club || ''); setCabEmail(member.email || ''); setCabPhone(member.phone || ''); setCabPhoto(member.photo || '');
  };
  const handleSaveCabinet = async (e: React.FormEvent) => {
    e.preventDefault(); if (!cabName || !cabRole) { alert('Name and role are required'); return; }
    const member = { name: cabName, role: cabRole, district: cabDistrict, club: cabClub, email: cabEmail, phone: cabPhone, photo: cabPhoto };
    if (editingCabinet) await db.updateCabinetMember({ ...editingCabinet, ...member }); else await db.addCabinetMember(member);
    const wasEditing = Boolean(editingCabinet); resetCabinetForm(); loadData(); alert(wasEditing ? 'Cabinet member updated!' : 'Cabinet member added!');
  };

  const resetLionForm = () => {
    setEditingLion(null); setLionName(''); setLionRole(''); setLionDistrict('317'); setLionClub(''); setLionEmail(''); setLionPhone(''); setLionPhoto('');
  };
  const startEditLion = (member: LeoProfile) => {
    setEditingLion(member); setLionName(member.name); setLionRole(member.role); setLionDistrict(member.district); setLionClub(member.club || ''); setLionEmail(member.email || ''); setLionPhone(member.phone || ''); setLionPhoto(member.photo || '');
  };
  const handleSaveLion = async (e: React.FormEvent) => {
    e.preventDefault(); if (!lionName || !lionRole) { alert('Name and role are required'); return; }
    const member = { name: lionName, role: lionRole, district: lionDistrict, club: lionClub, email: lionEmail, phone: lionPhone, photo: lionPhoto };
    if (editingLion) await db.updateLionCabinetMember({ ...editingLion, ...member }); else await db.addLionCabinetMember(member);
    const wasEditing = Boolean(editingLion); resetLionForm(); loadData(); alert(wasEditing ? 'Lion Cabinet member updated!' : 'Lion Cabinet member added!');
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

          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all ${activeTab === 'events' ? 'bg-gold-primary/10 border-l-2 border-gold-primary text-gold-light font-bold' : 'hover:bg-white/5 text-silver-primary hover:text-white'
              }`}
          >
            <CalendarCheck size={14} />
            Events Manager
          </button>

          <button
            onClick={() => setActiveTab('cabinet')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all ${activeTab === 'cabinet' ? 'bg-gold-primary/10 border-l-2 border-gold-primary text-gold-light font-bold' : 'hover:bg-white/5 text-silver-primary hover:text-white'
              }`}
          >
            <Award size={14} />
            MD Cabinet
          </button>

          <button
            onClick={() => setActiveTab('lion')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all ${activeTab === 'lion' ? 'bg-gold-primary/10 border-l-2 border-gold-primary text-gold-light font-bold' : 'hover:bg-white/5 text-silver-primary hover:text-white'
              }`}
          >
            <Users size={14} />
            Lion Cabinet
          </button>

          <button
            onClick={() => setActiveTab('isame')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all ${activeTab === 'isame' ? 'bg-gold-primary/10 border-l-2 border-gold-primary text-gold-light font-bold' : 'hover:bg-white/5 text-silver-primary hover:text-white'
              }`}
          >
            <Globe2 size={14} />
            ISAME Forum
          </button>

          <button
            onClick={() => setActiveTab('site')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all ${activeTab === 'site' ? 'bg-gold-primary/10 border-l-2 border-gold-primary text-gold-light font-bold' : 'hover:bg-white/5 text-silver-primary hover:text-white'
              }`}
          >
            <Edit3 size={14} />
            Site Settings
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

            {/* Add New Club Form */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!newClubName || !newClubLocation || !newClubPres || !newClubSec) {
                alert('Please fill all required fields');
                return;
              }
              await db.addClub({
                name: newClubName,
                location: newClubLocation,
                districtId: newClubDistrict,
                president: newClubPres,
                secretary: newClubSec,
                membersCount: newClubMembers,
                foundedYear: new Date().getFullYear()
              });
              setNewClubName(''); setNewClubLocation(''); setNewClubPres(''); setNewClubSec(''); setNewClubMembers(25);
              loadData();
              alert('Club profile added successfully!');
            }} className="border border-white/10 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-gold-light uppercase tracking-wider text-[9px] pb-2 border-b border-white/5 flex items-center gap-1.5">
                <Plus size={12} /> Add New Club Profile
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Club Name</label>
                  <input type="text" value={newClubName} onChange={e => setNewClubName(e.target.value)} required placeholder="e.g. Leo Club of Bangalore Elite" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Location</label>
                  <input type="text" value={newClubLocation} onChange={e => setNewClubLocation(e.target.value)} required placeholder="e.g. Bangalore" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">District</label>
                  <select value={newClubDistrict} onChange={e => setNewClubDistrict(e.target.value)} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs cursor-pointer">
                    {['317A','317B','317C','317D','317E','317F','317G'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">President Name</label>
                  <input type="text" value={newClubPres} onChange={e => setNewClubPres(e.target.value)} required placeholder="e.g. Leo John Doe" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Secretary Name</label>
                  <input type="text" value={newClubSec} onChange={e => setNewClubSec(e.target.value)} required placeholder="e.g. Leo Jane Smith" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>
              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Members Count</label>
                <input type="number" value={newClubMembers} onChange={e => setNewClubMembers(parseInt(e.target.value) || 0)} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-full bg-gold-primary text-bg-deep-space font-bold uppercase tracking-widest text-[9px]">Add Club</button>
            </form>

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
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEditProject(proj)} className="p-1.5 rounded-full border border-white/10 hover:border-gold-primary text-gold-light" title="Edit record"><Edit3 size={13} /></button>
                      <button onClick={() => handleDeleteProject(proj.id)} className="p-1.5 rounded-full border border-red-500/25 hover:border-red-500 hover:bg-red-500/5 text-red-400" title="Delete Record"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form: Add New Project */}
            <form onSubmit={handleSaveProject} className="border border-white/10 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-gold-light uppercase tracking-wider text-[9px] pb-2 border-b border-white/5 flex items-center gap-1.5">
                {editingProject ? <Edit3 size={12} /> : <Plus size={12} />} {editingProject ? 'Update Service Campaign' : 'Register On-Ground Service Campaign'}
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

              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Campaign Date</label>
                <input type="date" value={projDate} onChange={e => setProjDate(e.target.value)} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" />
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

              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Project Photo URL (Google Drive link or direct URL)</label>
                <input
                  type="text" value={projPhoto} onChange={e => setProjPhoto(e.target.value)} placeholder="https://drive.google.com/file/d/.../view"
                  className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs"
                />
              </div>

              <div className="flex gap-3">
                {editingProject && <button type="button" onClick={resetProjectForm} className="rounded-full border border-white/15 px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest text-silver-primary">Cancel</button>}
                <button type="submit" className="flex-1 py-2.5 rounded-full bg-gold-primary text-bg-deep-space font-bold uppercase tracking-widest text-[9px] hover:shadow-[0_0_15px_rgba(212,175,55,0.35)] transition-all">
                  {editingProject ? 'Save Project Changes' : 'Register & Synchronize Project'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: MEDIA & INSTALLATIONS */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                Platform Media Manager
              </h2>
              <span className="text-[9px] font-mono text-silver-dark uppercase">CRUD Assets</span>
            </div>

            {/* Existing Media Items List */}
            <div>
              <h4 className="text-[10px] tracking-widest uppercase font-bold text-gold-light mb-4">Current Media Items ({mediaItems.length})</h4>
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-2">
                {mediaItems.map((item) => (
                  <div key={item.id} className="p-3.5 bg-white/3 border border-white/5 rounded-xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-bg-deep-space border border-white/10 shrink-0">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">{item.title}</h5>
                        <span className="text-[9px] text-silver-dark">{item.category} &bull; District {item.district}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEditMedia(item)} className="p-1.5 rounded-full border border-white/10 hover:border-gold-primary text-gold-light" title="Edit media"><Edit3 size={13} /></button>
                      <button onClick={async () => { if (confirm(`Delete "${item.title}"?`)) { await db.deleteMedia(item.id); loadData(); } }} className="p-1.5 rounded-full border border-red-500/25 hover:border-red-500 hover:bg-red-500/5 text-red-400"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveMedia} className="border border-white/10 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-gold-light uppercase tracking-wider text-[9px] pb-2 border-b border-white/5 flex items-center gap-1.5">
                {editingMedia ? <Edit3 size={12} /> : <Plus size={12} />} {editingMedia ? 'Update Media Item' : 'Add Photo to Media Hub'}
              </h4>

              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Photo Title / Caption</label>
                <input
                  type="text" value={mediaTitle} onChange={e => setMediaTitle(e.target.value)} required placeholder="e.g. Officer Installation Ceremony"
                  className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs"
                />
              </div>

              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Image URL (Google Drive link or direct URL)</label>
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

              <div className="flex gap-3">
                {editingMedia && <button type="button" onClick={resetMediaForm} className="rounded-full border border-white/15 px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest text-silver-primary">Cancel</button>}
                <button type="submit" className="flex-1 py-2.5 rounded-full bg-gold-primary text-bg-deep-space font-bold uppercase tracking-widest text-[9px]">{editingMedia ? 'Save Media Changes' : 'Upload Photo to Hub'}</button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: EVENTS MANAGER */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">Events Manager</h2>
              <span className="text-[9px] font-mono text-silver-dark uppercase">CRUD</span>
            </div>

            <div>
              <h4 className="text-[10px] tracking-widest uppercase font-bold text-gold-light mb-4">Current Events</h4>
              <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-2">
                {events.map((evt) => (
                  <div key={evt.id} className="p-3.5 bg-white/3 border border-white/5 rounded-xl flex justify-between items-center">
                    <div>
                      <h5 className="text-xs font-bold text-white">{evt.title}</h5>
                      <span className="text-[9px] text-silver-dark">{evt.location} &bull; {new Date(evt.date).toLocaleDateString()} &bull; <span className={evt.status === 'upcoming' ? 'text-green-400' : 'text-silver-dark'}>{evt.status}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEditEvent(evt)} className="p-1.5 rounded-full border border-white/10 hover:border-gold-primary text-gold-light" title="Edit event"><Edit3 size={13} /></button>
                      <button onClick={async () => { if (confirm('Delete this event?')) { await db.deleteEvent(evt.id); loadData(); } }} className="p-1.5 rounded-full border border-red-500/25 hover:border-red-500 hover:bg-red-500/5 text-red-400"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveEvent} className="border border-white/10 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-gold-light uppercase tracking-wider text-[9px] pb-2 border-b border-white/5 flex items-center gap-1.5">
                {editingEvent ? <Edit3 size={12} /> : <Plus size={12} />} {editingEvent ? 'Update Event' : 'Add New Event'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Event Title</label>
                  <input type="text" value={evtTitle} onChange={e => setEvtTitle(e.target.value)} required placeholder="e.g. Leadership Summit 2026" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Date & Time</label>
                  <input type="datetime-local" value={evtDate} onChange={e => setEvtDate(e.target.value)} required className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>
              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Description</label>
                <textarea value={evtDesc} onChange={e => setEvtDesc(e.target.value)} rows={2} placeholder="Event description..." className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Location</label>
                  <input type="text" value={evtLocation} onChange={e => setEvtLocation(e.target.value)} required placeholder="e.g. Bengaluru" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">District</label>
                  <input type="text" value={evtDistrict} onChange={e => setEvtDistrict(e.target.value)} placeholder="e.g. 317A or 317" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Status</label>
                  <select value={evtStatus} onChange={e => setEvtStatus(e.target.value as any)} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs cursor-pointer">
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Organizing Club/Team (Optional)</label>
                  <input type="text" value={evtClub} onChange={e => setEvtClub(e.target.value)} placeholder="e.g. Leo Club of RVCE" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Registration Link (Optional)</label>
                  <input type="url" value={evtRegLink} onChange={e => setEvtRegLink(e.target.value)} placeholder="https://forms.gle/..." className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>
              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Poster Image URL (Google Drive link or direct URL)</label>
                <input type="text" value={evtPoster} onChange={e => setEvtPoster(e.target.value)} placeholder="https://drive.google.com/file/d/.../view" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
              </div>
              <div className="flex gap-3">
                {editingEvent && <button type="button" onClick={resetEventForm} className="rounded-full border border-white/15 px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest text-silver-primary">Cancel</button>}
                <button type="submit" className="flex-1 py-2.5 rounded-full bg-gold-primary text-bg-deep-space font-bold uppercase tracking-widest text-[9px]">{editingEvent ? 'Save Event Changes' : 'Create Event'}</button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 6: MD CABINET */}
        {activeTab === 'cabinet' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">MD Cabinet Manager</h2>
              <span className="text-[9px] font-mono text-silver-dark uppercase">Multiple District</span>
            </div>

            <div>
              <h4 className="text-[10px] tracking-widest uppercase font-bold text-gold-light mb-4">Current Cabinet Members</h4>
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-2">
                {mdCabinet.map((m) => (
                  <div key={m.id} className="p-3.5 bg-white/3 border border-white/5 rounded-xl flex justify-between items-center">
                    <div>
                      <h5 className="text-xs font-bold text-white">{m.name}</h5>
                      <span className="text-[9px] text-silver-dark">{m.role} &bull; {m.district} &bull; {m.club}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEditCabinet(m)} className="p-1.5 rounded-full border border-white/10 hover:border-gold-primary text-gold-light" title="Edit member"><Edit3 size={13} /></button>
                      <button onClick={async () => { if (confirm(`Remove ${m.name}?`)) { await db.deleteCabinetMember(m.id); loadData(); } }} className="p-1.5 rounded-full border border-red-500/25 hover:border-red-500 hover:bg-red-500/5 text-red-400"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveCabinet} className="border border-white/10 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-gold-light uppercase tracking-wider text-[9px] pb-2 border-b border-white/5 flex items-center gap-1.5">
                {editingCabinet ? <Edit3 size={12} /> : <Plus size={12} />} {editingCabinet ? 'Update Cabinet Member' : 'Add Cabinet Member'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Full Name</label>
                  <input type="text" value={cabName} onChange={e => setCabName(e.target.value)} required placeholder="e.g. Leo Lion Name" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Role / Designation</label>
                  <input type="text" value={cabRole} onChange={e => setCabRole(e.target.value)} required placeholder="e.g. Multiple District Leo President" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">District</label>
                  <select value={cabDistrict} onChange={e => setCabDistrict(e.target.value)} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs cursor-pointer">
                    {['317','317A','317B','317C','317D','317E','317F','317G'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Leo Club Name</label>
                  <input type="text" value={cabClub} onChange={e => setCabClub(e.target.value)} placeholder="e.g. Leo Club of RVCE" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Email</label>
                  <input type="email" value={cabEmail} onChange={e => setCabEmail(e.target.value)} placeholder="email@example.com" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Phone</label>
                  <input type="text" value={cabPhone} onChange={e => setCabPhone(e.target.value)} placeholder="+91 9876543210" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>
              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Photo URL (Google Drive link or direct URL)</label>
                <input type="text" value={cabPhoto} onChange={e => setCabPhoto(e.target.value)} placeholder="https://drive.google.com/file/d/.../view" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
              </div>
              <div className="flex gap-3">
                {editingCabinet && <button type="button" onClick={resetCabinetForm} className="rounded-full border border-white/15 px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest text-silver-primary">Cancel</button>}
                <button type="submit" className="flex-1 py-2.5 rounded-full bg-gold-primary text-bg-deep-space font-bold uppercase tracking-widest text-[9px]">{editingCabinet ? 'Save Member Changes' : 'Add Member'}</button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 7B: LION CABINET */}
        {activeTab === 'lion' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">Lion Cabinet Manager</h2>
              <span className="text-[9px] font-mono text-silver-dark uppercase">Lions Advisory</span>
            </div>

            <div>
              <h4 className="text-[10px] tracking-widest uppercase font-bold text-gold-light mb-4">Current Lion Cabinet Members</h4>
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-2">
                {lionCabinet.map((m) => (
                  <div key={m.id} className="p-3.5 bg-white/3 border border-white/5 rounded-xl flex justify-between items-center">
                    <div>
                      <h5 className="text-xs font-bold text-white">{m.name}</h5>
                      <span className="text-[9px] text-silver-dark">{m.role} &bull; {m.district} &bull; {m.club}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEditLion(m)} className="p-1.5 rounded-full border border-white/10 hover:border-gold-primary text-gold-light" title="Edit member"><Edit3 size={13} /></button>
                      <button onClick={async () => { if (confirm(`Remove ${m.name}?`)) { await db.deleteLionCabinetMember(m.id); loadData(); } }} className="p-1.5 rounded-full border border-red-500/25 hover:border-red-500 hover:bg-red-500/5 text-red-400"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveLion} className="border border-white/10 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-gold-light uppercase tracking-wider text-[9px] pb-2 border-b border-white/5 flex items-center gap-1.5">
                {editingLion ? <Edit3 size={12} /> : <Plus size={12} />} {editingLion ? 'Update Lion Cabinet Member' : 'Add Lion Cabinet Member'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Full Name</label>
                  <input type="text" value={lionName} onChange={e => setLionName(e.target.value)} required placeholder="e.g. Lion M.S. Ramesh" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Role / Designation</label>
                  <input type="text" value={lionRole} onChange={e => setLionRole(e.target.value)} required placeholder="e.g. District Leo Advisor" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">District</label>
                  <select value={lionDistrict} onChange={e => setLionDistrict(e.target.value)} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs cursor-pointer">
                    {['317','317A','317B','317C','317D','317E','317F','317G'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Lions Club Name</label>
                  <input type="text" value={lionClub} onChange={e => setLionClub(e.target.value)} placeholder="e.g. Lions Club of Bangalore" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Email</label>
                  <input type="email" value={lionEmail} onChange={e => setLionEmail(e.target.value)} placeholder="email@lions317.org" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Phone</label>
                  <input type="text" value={lionPhone} onChange={e => setLionPhone(e.target.value)} placeholder="+91 9876543210" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>
              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Photo URL (Google Drive link or direct URL)</label>
                <input type="text" value={lionPhoto} onChange={e => setLionPhoto(e.target.value)} placeholder="https://drive.google.com/file/d/.../view" className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
              </div>
              <div className="flex gap-3">
                {editingLion && <button type="button" onClick={resetLionForm} className="rounded-full border border-white/15 px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest text-silver-primary">Cancel</button>}
                <button type="submit" className="flex-1 py-2.5 rounded-full bg-gold-primary text-bg-deep-space font-bold uppercase tracking-widest text-[9px]">{editingLion ? 'Save Member Changes' : 'Add Lion Member'}</button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 8: ISAME FORUM */}
        {activeTab === 'isame' && (
          <div className="space-y-8">
            <div className="flex flex-wrap justify-between gap-3 border-b border-white/5 pb-4">
              <div>
                <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">ISAME Forum 2027</h2>
                <p className="mt-1 text-[9px] uppercase tracking-wider text-silver-dark">Public page content and registration details</p>
              </div>
              <Link href="/isame" target="_blank" className="rounded-full border border-gold-primary/35 px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-gold-light hover:bg-gold-primary/10">Preview page</Link>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              await db.updateIsameSettings(isameSettings);
              await loadData();
              alert('ISAME Forum page updated successfully!');
            }} className="border border-gold-primary/20 bg-gold-primary/[0.025] p-5 rounded-2xl space-y-5 text-xs">
              <p className="rounded-lg border border-gold-primary/15 bg-bg-deep-space/60 p-3 text-[10px] leading-relaxed text-silver-primary">Only publish dates, venue and programme details after they have been confirmed by the organisers. The official forum listing link remains available on the public page.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Eyebrow</label><input value={isameSettings.eyebrow} onChange={e => setIsameSettings({ ...isameSettings, eyebrow: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
                <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Location</label><input value={isameSettings.location} onChange={e => setIsameSettings({ ...isameSettings, location: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
                <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Title Line One</label><input value={isameSettings.titlePrefix} onChange={e => setIsameSettings({ ...isameSettings, titlePrefix: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
                <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Title Line Two</label><input value={isameSettings.titleHighlight} onChange={e => setIsameSettings({ ...isameSettings, titleHighlight: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Confirmed Dates</label><input value={isameSettings.dates} onChange={e => setIsameSettings({ ...isameSettings, dates: e.target.value })} placeholder="e.g. 10–12 January 2027" className="w-full px-2.5 py-2 bg-bg-deep-space border border-gold-primary/30 rounded-lg text-xs" /></div>
                <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Exact Venue</label><input value={isameSettings.venue} onChange={e => setIsameSettings({ ...isameSettings, venue: e.target.value })} placeholder="e.g. Venue name, Goa" className="w-full px-2.5 py-2 bg-bg-deep-space border border-gold-primary/30 rounded-lg text-xs" /></div>
              </div>

              <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Hero Introduction</label><textarea rows={3} value={isameSettings.heroSubtitle} onChange={e => setIsameSettings({ ...isameSettings, heroSubtitle: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
              <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">ISAME Region Content</label><textarea rows={4} value={isameSettings.regionIntro} onChange={e => setIsameSettings({ ...isameSettings, regionIntro: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
              <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Forum Content</label><textarea rows={4} value={isameSettings.forumExperience} onChange={e => setIsameSettings({ ...isameSettings, forumExperience: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
              <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Destination Content</label><textarea rows={3} value={isameSettings.destinationIntro} onChange={e => setIsameSettings({ ...isameSettings, destinationIntro: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
              <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Registration / Status Note</label><textarea rows={2} value={isameSettings.statusNote} onChange={e => setIsameSettings({ ...isameSettings, statusNote: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Google Form Registration URL</label><input type="url" value={isameSettings.registrationUrl} onChange={e => setIsameSettings({ ...isameSettings, registrationUrl: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
                <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Official Forum Listing URL</label><input type="url" value={isameSettings.officialForumUrl} onChange={e => setIsameSettings({ ...isameSettings, officialForumUrl: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Hero Image URL</label><input value={isameSettings.heroImage} onChange={e => setIsameSettings({ ...isameSettings, heroImage: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
                <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Forum Image URL</label><input value={isameSettings.forumImage} onChange={e => setIsameSettings({ ...isameSettings, forumImage: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
                <div><label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Leadership Image URL</label><input value={isameSettings.leadershipImage} onChange={e => setIsameSettings({ ...isameSettings, leadershipImage: e.target.value })} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg text-xs" /></div>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-full bg-gold-primary text-bg-deep-space font-bold uppercase tracking-widest text-[9px]">Save ISAME Forum Details</button>
            </form>
          </div>
        )}

        {/* TAB 9: SITE SETTINGS */}
        {activeTab === 'site' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">Site Settings</h2>
              <span className="text-[9px] font-mono text-silver-dark uppercase">Hero &amp; Content</span>
            </div>

            {/* Hero Section Settings */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              await db.updateSiteSettings(siteSettings);
              alert('Site settings saved!');
              loadData();
            }} className="border border-white/10 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-gold-light uppercase tracking-wider text-[9px] pb-2 border-b border-white/5">Hero Section & President&apos;s Address</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Hero Title Line 1</label>
                  <input type="text" value={siteSettings.heroTitle1 || ''} onChange={e => setSiteSettings({...siteSettings, heroTitle1: e.target.value})} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Hero Title Line 2</label>
                  <input type="text" value={siteSettings.heroTitle2 || ''} onChange={e => setSiteSettings({...siteSettings, heroTitle2: e.target.value})} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Subtitle Line 1</label>
                  <input type="text" value={siteSettings.heroSubtitle1 || ''} onChange={e => setSiteSettings({...siteSettings, heroSubtitle1: e.target.value})} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Subtitle Line 2</label>
                  <input type="text" value={siteSettings.heroSubtitle2 || ''} onChange={e => setSiteSettings({...siteSettings, heroSubtitle2: e.target.value})} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>
              <div>
                <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Year / Tagline</label>
                <input type="text" value={siteSettings.heroYear || ''} onChange={e => setSiteSettings({...siteSettings, heroYear: e.target.value})} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
              </div>

              <div className="border-t border-white/5 pt-4 mt-4">
                <h5 className="text-[9px] uppercase tracking-wider font-bold text-gold-light mb-3">President&apos;s Address</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">President Name</label>
                    <input type="text" value={siteSettings.presidentName || ''} onChange={e => setSiteSettings({...siteSettings, presidentName: e.target.value})} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">President Title</label>
                    <input type="text" value={siteSettings.presidentTitle || ''} onChange={e => setSiteSettings({...siteSettings, presidentTitle: e.target.value})} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">President Photo URL</label>
                  <input type="text" value={siteSettings.presidentPhoto || ''} onChange={e => setSiteSettings({...siteSettings, presidentPhoto: e.target.value})} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
                <div className="mt-4">
                  <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">President Message</label>
                  <textarea value={siteSettings.presidentMessage || ''} onChange={e => setSiteSettings({...siteSettings, presidentMessage: e.target.value})} rows={4} className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                </div>
              </div>

              <button type="submit" className="w-full py-2.5 rounded-full bg-gold-primary text-bg-deep-space font-bold uppercase tracking-widest text-[9px]">Save Site Settings</button>
            </form>

            {/* Activity Ticker Management */}
            <div className="border border-white/10 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-gold-light uppercase tracking-wider text-[9px] pb-2 border-b border-white/5">Live Activity Ticker Items</h4>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                {tickerItems.map((t, i) => (
                  <div key={t.id || i} className="flex items-center gap-2">
                    <input type="text" value={t.text} onChange={e => { const updated = [...tickerItems]; updated[i] = {...t, text: e.target.value}; setTickerItems(updated); }} className="flex-1 px-2.5 py-1.5 bg-bg-deep-space border border-white/10 rounded-lg focus:outline-none focus:border-gold-primary text-xs" />
                    <button onClick={() => { setTickerItems(tickerItems.filter((_, idx) => idx !== i)); }} className="p-1 text-red-400 hover:text-red-300"><Trash2 size={12} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setTickerItems([...tickerItems, {id: `tick-${Date.now()}`, text: ''}])} className="px-4 py-1.5 rounded-lg border border-white/10 hover:border-gold-primary/30 text-[9px] uppercase font-bold text-gold-light">+ Add Item</button>
                <button onClick={async () => { await db.updateTicker(tickerItems); alert('Ticker updated!'); loadData(); }} className="px-4 py-1.5 rounded-lg bg-gold-primary text-bg-deep-space text-[9px] uppercase font-bold">Save Ticker</button>
              </div>
            </div>

            {/* Impact Counters Management */}
            <div className="border border-white/10 p-5 rounded-2xl space-y-4 text-xs">
              <h4 className="font-bold text-gold-light uppercase tracking-wider text-[9px] pb-2 border-b border-white/5">Impact Dashboard Counters</h4>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {counters.map((c, i) => (
                  <div key={c.id || i} className="grid grid-cols-12 gap-2 items-center">
                    <input type="text" value={c.label} onChange={e => { const u = [...counters]; u[i] = {...c, label: e.target.value}; setCounters(u); }} placeholder="Label" className="col-span-4 px-2 py-1.5 bg-bg-deep-space border border-white/10 rounded-lg text-xs" />
                    <input type="number" value={c.value} onChange={e => { const u = [...counters]; u[i] = {...c, value: parseInt(e.target.value) || 0}; setCounters(u); }} className="col-span-3 px-2 py-1.5 bg-bg-deep-space border border-white/10 rounded-lg text-xs" />
                    <input type="text" value={c.icon || ''} onChange={e => { const u = [...counters]; u[i] = {...c, icon: e.target.value}; setCounters(u); }} placeholder="Icon" className="col-span-3 px-2 py-1.5 bg-bg-deep-space border border-white/10 rounded-lg text-xs" />
                    <button onClick={() => { setCounters(counters.filter((_, idx) => idx !== i)); }} className="col-span-2 p-1 text-red-400 hover:text-red-300 flex justify-center"><Trash2 size={12} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCounters([...counters, {id: `cnt-${Date.now()}`, label: '', value: 0, icon: 'Sparkles'}])} className="px-4 py-1.5 rounded-lg border border-white/10 hover:border-gold-primary/30 text-[9px] uppercase font-bold text-gold-light">+ Add Counter</button>
                <button onClick={async () => { await db.updateCounters(counters); alert('Counters updated!'); loadData(); }} className="px-4 py-1.5 rounded-lg bg-gold-primary text-bg-deep-space text-[9px] uppercase font-bold">Save Counters</button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
