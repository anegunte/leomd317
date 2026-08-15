/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DistrictData,
  ClubData,
  ServiceProject,
  LeoEvent,
  MediaItem,
  LeoProfile,
} from './mockData';
import type { IsameSettings } from './isame';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

/**
 * Convert a Google Drive share link to a direct-viewable image URL.
 * Supports formats:
 *   - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   - https://drive.google.com/open?id=FILE_ID
 *   - Already-direct URLs are returned as-is.
 */
export function toDirectImageUrl(url: string): string {
  if (!url) return url;
  // Match /file/d/FILE_ID/ pattern
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (fileMatch) {
    return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
  }
  // Match open?id=FILE_ID pattern
  const openMatch = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (openMatch) {
    return `https://lh3.googleusercontent.com/d/${openMatch[1]}`;
  }
  // Match id=FILE_ID in any google drive URL
  const idMatch = url.match(/drive\.google\.com.*[?&]id=([^&]+)/);
  if (idMatch) {
    return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
  }
  return url;
}

// ── Generic fetch helper ──
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const headers = new Headers(options?.headers);
    headers.set('Content-Type', 'application/json');
    const session = getSession();
    if (session?.token) headers.set('Authorization', `Bearer ${session.token}`);

    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      if (res.status === 401 && path !== '/auth/login' && typeof window !== 'undefined') {
        localStorage.removeItem(SESSION_KEY);
        window.dispatchEvent(new Event('leo-auth-change'));
      }
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

  // ── Lion Cabinet ──
  async getLionCabinet(): Promise<LeoProfile[]> {
    return apiFetch('/lion-cabinet');
  },

  async addLionCabinetMember(member: Omit<LeoProfile, 'id'>): Promise<LeoProfile> {
    return apiFetch('/lion-cabinet', { method: 'POST', body: JSON.stringify(member) });
  },

  async updateLionCabinetMember(member: LeoProfile): Promise<LeoProfile> {
    return apiFetch(`/lion-cabinet/${member.id}`, { method: 'PUT', body: JSON.stringify(member) });
  },

  async deleteLionCabinetMember(id: string): Promise<boolean> {
    await apiFetch(`/lion-cabinet/${id}`, { method: 'DELETE' });
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

  // ── ISAME Forum Page ──
  async getIsameSettings(): Promise<IsameSettings> {
    return apiFetch('/isame');
  },

  async updateIsameSettings(settings: IsameSettings): Promise<IsameSettings> {
    return apiFetch('/isame', { method: 'PUT', body: JSON.stringify(settings) });
  },

  // ── Landing-page celebration signal ──
  async getCelebration(): Promise<{ nonce: string | null; launchedAt?: string }> {
    return apiFetch('/celebration');
  },

  async launchCelebration(): Promise<{ nonce: string; launchedAt: string }> {
    return apiFetch('/celebration/launch', { method: 'POST' });
  },

  getLiveUpdatesUrl(): string {
    return `${API_BASE}/live/stream`;
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

  async verifySession() {
    const verified = await apiFetch<any>('/auth/me');
    const current = getSession();
    const session = { ...current, ...verified };
    setSession(session);
    return session;
  },

  logout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSION_KEY);
  },
};
