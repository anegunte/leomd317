/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';
import { 
  MOCK_DISTRICTS, 
  MOCK_CLUBS, 
  MOCK_PROJECTS, 
  MOCK_EVENTS, 
  MOCK_MEDIA, 
  MOCK_USERS,
  DistrictData,
  ClubData,
  ServiceProject,
  LeoEvent,
  MediaItem
} from './mockData';

// Initialize Supabase if variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = supabaseUrl !== '' && supabaseAnonKey !== '';
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

// LocalStorage Persistence Keys
const KEYS = {
  DISTRICTS: 'leo_districts_db',
  CLUBS: 'leo_clubs_db',
  PROJECTS: 'leo_projects_db',
  EVENTS: 'leo_events_db',
  MEDIA: 'leo_media_db',
  USER_SESSION: 'leo_user_session',
  DB_VERSION: 'leo_db_version'
};

const CURRENT_DB_VERSION = 'v3_districts_updated';

// Programmatically invalidate local storage cache when seed data updates
if (typeof window !== 'undefined') {
  try {
    const version = localStorage.getItem(KEYS.DB_VERSION);
    if (version !== CURRENT_DB_VERSION) {
      localStorage.removeItem(KEYS.DISTRICTS);
      localStorage.removeItem(KEYS.CLUBS);
      localStorage.removeItem(KEYS.EVENTS);
      localStorage.removeItem(KEYS.PROJECTS);
      localStorage.removeItem(KEYS.MEDIA);
      localStorage.setItem(KEYS.DB_VERSION, CURRENT_DB_VERSION);
    }
  } catch (e) {
    console.error('Failed to invalidate local storage cache:', e);
  }
}

// Helper to load or initialize from localStorage
function getLocalStorageItem<T>(key: string, seed: T): T {
  if (typeof window === 'undefined') return seed;
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(data) as T;
  } catch (e) {
    return seed;
  }
}

function setLocalStorageItem<T>(key: string, data: T) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// -------------------------------------------------------------
// Database Interfaces
// -------------------------------------------------------------

export const db = {
  // Districts
  async getDistricts(): Promise<DistrictData[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('districts').select('*');
      if (!error && data) return data as DistrictData[];
    }
    return getLocalStorageItem(KEYS.DISTRICTS, MOCK_DISTRICTS);
  },

  // Clubs
  async getClubs(): Promise<ClubData[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('clubs').select('*');
      if (!error && data) return data as ClubData[];
    }
    return getLocalStorageItem(KEYS.CLUBS, MOCK_CLUBS);
  },

  async addClub(club: Omit<ClubData, 'id'>): Promise<ClubData> {
    const newClub = { ...club, id: `club-${Date.now()}` };
    const clubs = await this.getClubs();
    clubs.push(newClub);
    setLocalStorageItem(KEYS.CLUBS, clubs);
    return newClub;
  },

  async updateClub(club: ClubData): Promise<ClubData> {
    const clubs = await this.getClubs();
    const index = clubs.findIndex(c => c.id === club.id);
    if (index !== -1) {
      clubs[index] = club;
      setLocalStorageItem(KEYS.CLUBS, clubs);
    }
    return club;
  },

  // Service Projects (Impact)
  async getProjects(): Promise<ServiceProject[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('projects').select('*');
      if (!error && data) return data as ServiceProject[];
    }
    return getLocalStorageItem(KEYS.PROJECTS, MOCK_PROJECTS);
  },

  async addProject(project: Omit<ServiceProject, 'id'>): Promise<ServiceProject> {
    const newProj = { ...project, id: `proj-${Date.now()}` };
    const projects = await this.getProjects();
    projects.unshift(newProj); // Prepend so it appears first
    setLocalStorageItem(KEYS.PROJECTS, projects);
    return newProj;
  },

  async updateProject(project: ServiceProject): Promise<ServiceProject> {
    const projects = await this.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      projects[index] = project;
      setLocalStorageItem(KEYS.PROJECTS, projects);
    }
    return project;
  },

  async deleteProject(id: string): Promise<boolean> {
    const projects = await this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    setLocalStorageItem(KEYS.PROJECTS, filtered);
    return true;
  },

  // Events
  async getEvents(): Promise<LeoEvent[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('events').select('*');
      if (!error && data) return data as LeoEvent[];
    }
    return getLocalStorageItem(KEYS.EVENTS, MOCK_EVENTS);
  },

  async addEvent(event: Omit<LeoEvent, 'id'>): Promise<LeoEvent> {
    const newEvt = { ...event, id: `evt-${Date.now()}` };
    const events = await this.getEvents();
    events.unshift(newEvt);
    setLocalStorageItem(KEYS.EVENTS, events);
    return newEvt;
  },

  async updateEvent(event: LeoEvent): Promise<LeoEvent> {
    const events = await this.getEvents();
    const index = events.findIndex(e => e.id === event.id);
    if (index !== -1) {
      events[index] = event;
      setLocalStorageItem(KEYS.EVENTS, events);
    }
    return event;
  },

  async deleteEvent(id: string): Promise<boolean> {
    const events = await this.getEvents();
    const filtered = events.filter(e => e.id !== id);
    setLocalStorageItem(KEYS.EVENTS, filtered);
    return true;
  },

  // Media
  async getMedia(): Promise<MediaItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('media').select('*');
      if (!error && data) return data as MediaItem[];
    }
    return getLocalStorageItem(KEYS.MEDIA, MOCK_MEDIA);
  },

  async addMedia(item: Omit<MediaItem, 'id'>): Promise<MediaItem> {
    const newMed = { ...item, id: `med-${Date.now()}` };
    const media = await this.getMedia();
    media.unshift(newMed);
    setLocalStorageItem(KEYS.MEDIA, media);
    return newMed;
  },

  // Authentication Mock
  async login(username: string, password: string) {
    const user = MOCK_USERS.find(u => u.username === username.toLowerCase() && u.password === password);
    if (user) {
      const session = {
        username: user.username,
        name: user.name,
        role: user.role,
        district: user.district,
        club: (user as any).club || null,
        token: `mock-jwt-token-${Date.now()}`
      };
      setLocalStorageItem(KEYS.USER_SESSION, session);
      return session;
    }
    throw new Error('Invalid credentials');
  },

  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    return getLocalStorageItem(KEYS.USER_SESSION, null as any);
  },

  logout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEYS.USER_SESSION);
  }
};
