/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DistrictData,
  ClubData,
  ServiceProject,
  LeoEvent,
  MediaItem,
  LeoProfile,
} from './mockData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ── Generic fetch helper ──
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || res.statusText);
    }
    return res.json();
  } catch (err: any) {
    console.warn(`[db] API call failed: ${path}`, err.message);
    throw err;
  }
}

// ── Local session helpers ──
const SESSION_KEY = 'leo_user_session';

function getSession() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function setSession(data: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

// -------------------------------------------------------------
// Database Interface — all calls go to the Python/MongoDB backend
// -------------------------------------------------------------

export const db = {
  // ── Districts ──
  async getDistricts(): Promise<DistrictData[]> {
    return apiFetch('/districts');
  },

  // ── Clubs ──
  async getClubs(): Promise<ClubData[]> {
    return apiFetch('/clubs');
  },

  async addClub(club: Omit<ClubData, 'id'>): Promise<ClubData> {
    return apiFetch('/clubs', { method: 'POST', body: JSON.stringify(club) });
  },

  async updateClub(club: ClubData): Promise<ClubData> {
    return apiFetch(`/clubs/${club.id}`, { method: 'PUT', body: JSON.stringify(club) });
  },

  async deleteClub(id: string): Promise<boolean> {
    await apiFetch(`/clubs/${id}`, { method: 'DELETE' });
    return true;
  },

  // ── Service Projects (Impact) ──
  async getProjects(): Promise<ServiceProject[]> {
    return apiFetch('/projects');
  },

  async addProject(project: Omit<ServiceProject, 'id'>): Promise<ServiceProject> {
    return apiFetch('/projects', { method: 'POST', body: JSON.stringify(project) });
  },

  async updateProject(project: ServiceProject): Promise<ServiceProject> {
    return apiFetch(`/projects/${project.id}`, { method: 'PUT', body: JSON.stringify(project) });
  },

  async deleteProject(id: string): Promise<boolean> {
    await apiFetch(`/projects/${id}`, { method: 'DELETE' });
    return true;
  },

  // ── Events ──
  async getEvents(): Promise<LeoEvent[]> {
    return apiFetch('/events');
  },

  async addEvent(event: Omit<LeoEvent, 'id'>): Promise<LeoEvent> {
    return apiFetch('/events', { method: 'POST', body: JSON.stringify(event) });
  },

  async updateEvent(event: LeoEvent): Promise<LeoEvent> {
    return apiFetch(`/events/${event.id}`, { method: 'PUT', body: JSON.stringify(event) });
  },

  async deleteEvent(id: string): Promise<boolean> {
    await apiFetch(`/events/${id}`, { method: 'DELETE' });
    return true;
  },

  // ── Media ──
  async getMedia(): Promise<MediaItem[]> {
    return apiFetch('/media');
  },

  async addMedia(item: Omit<MediaItem, 'id'>): Promise<MediaItem> {
    return apiFetch('/media', { method: 'POST', body: JSON.stringify(item) });
  },

  async updateMedia(item: MediaItem): Promise<MediaItem> {
    return apiFetch(`/media/${item.id}`, { method: 'PUT', body: JSON.stringify(item) });
  },

  async deleteMedia(id: string): Promise<boolean> {
    await apiFetch(`/media/${id}`, { method: 'DELETE' });
    return true;
  },

  // ── MD Cabinet ──
  async getMDCabinet(): Promise<LeoProfile[]> {
    return apiFetch('/cabinet');
  },

  async addCabinetMember(member: Omit<LeoProfile, 'id'>): Promise<LeoProfile> {
    return apiFetch('/cabinet', { method: 'POST', body: JSON.stringify(member) });
  },

  async updateCabinetMember(member: LeoProfile): Promise<LeoProfile> {
    return apiFetch(`/cabinet/${member.id}`, { method: 'PUT', body: JSON.stringify(member) });
  },

  async deleteCabinetMember(id: string): Promise<boolean> {
    await apiFetch(`/cabinet/${id}`, { method: 'DELETE' });
    return true;
  },

  // ── Site Settings ──
  async getSiteSettings(): Promise<any> {
    return apiFetch('/site-settings');
  },

  async updateSiteSettings(settings: any): Promise<any> {
    return apiFetch('/site-settings', { method: 'PUT', body: JSON.stringify(settings) });
  },

  // ── Impact Counters ──
  async getCounters(): Promise<any[]> {
    return apiFetch('/site-settings/counters');
  },

  async updateCounters(counters: any[]): Promise<any[]> {
    return apiFetch('/site-settings/counters', { method: 'PUT', body: JSON.stringify(counters) });
  },

  // ── Activity Ticker ──
  async getTicker(): Promise<any[]> {
    return apiFetch('/site-settings/ticker');
  },

  async updateTicker(items: any[]): Promise<any[]> {
    return apiFetch('/site-settings/ticker', { method: 'PUT', body: JSON.stringify(items) });
  },

  // ── Stories ──
  async getStories(): Promise<any[]> {
    return apiFetch('/site-settings/stories');
  },

  async addStory(story: any): Promise<any> {
    return apiFetch('/site-settings/stories', { method: 'POST', body: JSON.stringify(story) });
  },

  async updateStory(story: any): Promise<any> {
    return apiFetch(`/site-settings/stories/${story.id}`, { method: 'PUT', body: JSON.stringify(story) });
  },

  async deleteStory(id: string): Promise<boolean> {
    await apiFetch(`/site-settings/stories/${id}`, { method: 'DELETE' });
    return true;
  },

  // ── About Page ──
  async getAbout(): Promise<any> {
    return apiFetch('/about');
  },

  async updateAbout(content: any): Promise<any> {
    return apiFetch('/about', { method: 'PUT', body: JSON.stringify(content) });
  },

  async getThemePillars(): Promise<any[]> {
    return apiFetch('/about/pillars');
  },

  async updateThemePillars(pillars: any[]): Promise<any[]> {
    return apiFetch('/about/pillars', { method: 'PUT', body: JSON.stringify(pillars) });
  },

  // ── Authentication ──
  async login(username: string, password: string) {
    const session = await apiFetch<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    setSession(session);
    return session;
  },

  getCurrentUser() {
    return getSession();
  },

  logout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSION_KEY);
  },
};
