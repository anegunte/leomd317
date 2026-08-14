'use client';

import React, { useState, useEffect } from 'react';
import { db, toDirectImageUrl } from '@/lib/db';
import { LeoEvent } from '@/lib/mockData';
import {
  Calendar as CalIcon,
  MapPin,
  Users,
  Share2,
  CalendarPlus,
  ArrowUpRight,
  Plus,
  Trash2,
  Eye,
  Edit3,
  CalendarCheck
} from 'lucide-react';

export default function Events() {
  const [events, setEvents] = useState<LeoEvent[]>([]);
  const [activeView, setActiveView] = useState<'month' | 'week' | 'agenda'>('month');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Calendar dates math state
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 3)); // June 2026 based on mock data
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Admin Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDate, setNewDate] = useState('2026-07-15T09:00');
  const [newLoc, setNewLoc] = useState('');
  const [newTeam, setNewTeam] = useState('');
  const [newReg, setNewReg] = useState('https://forms.gle/');
  const [newDistrict, setNewDistrict] = useState('317A');

  const fetchEvents = async () => {
    const evts = await db.getEvents();
    setEvents(evts);
  };

  useEffect(() => {
    fetchEvents();
    setCurrentUser(db.getCurrentUser());
  }, []);

  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const pastEvents = events.filter(e => e.status === 'past');

  // Google Calendar Link generator helper
  const getGCalLink = (event: LeoEvent) => {
    const startStr = new Date(event.date).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endStr = new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
  };

  const handleShare = (event: LeoEvent) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/events?id=${event.id}`);
      alert(`Event URL for "${event.title}" copied to clipboard!`);
    }
  };

  // -------------------------------------------------------------
  // Calendar Math & Grid Rendering
  // -------------------------------------------------------------
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayIndex = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDaysBefore = Array.from({ length: firstDayIndex }, (_, i) => i);

  // Check if a day has an event associated with it
  const getDayEvents = (dayNum: number) => {
    return events.filter(e => {
      const d = new Date(e.date);
      return d.getDate() === dayNum &&
        d.getMonth() === currentDate.getMonth() &&
        d.getFullYear() === currentDate.getFullYear();
    });
  };

  // Add Event action handler
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newLoc || !newTeam) {
      alert('Please fill out essential fields');
      return;
    }
    const eventParams: Omit<LeoEvent, 'id'> = {
      title: newTitle,
      description: newDesc,
      date: new Date(newDate).toISOString(),
      location: newLoc,
      poster: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600",
      registrationLink: newReg,
      organizingTeam: newTeam,
      district: newDistrict,
      status: 'upcoming'
    };

    await db.addEvent(eventParams);
    setShowAddForm(false);
    setNewTitle('');
    setNewDesc('');
    setNewLoc('');
    setNewTeam('');
    fetchEvents();
    alert('Event created successfully on the platform!');
  };

  const handleCancelEvent = async (id: string) => {
    if (confirm('Are you sure you want to cancel and delete this event?')) {
      await db.deleteEvent(id);
      fetchEvents();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full optimize-rendering-heavy">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase mb-4">
          <span className="gold-glow-text">ASSEMBLIES & EXPERIENCES</span>
        </h1>
        <p className="text-xs tracking-widest uppercase text-silver-primary font-medium">
          DISCOVER UPCOMING EVENTS, TRAININGS & SERVICE ACTIVITIES
        </p>
      </div>

      {/* Main double-pane container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LHS: Google Calendar UI Widget (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-sans font-bold tracking-widest uppercase text-gold-light">
                Event Calendar
              </h3>

              {/* View options button group */}
              <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10 text-[9px] tracking-wider uppercase font-semibold text-silver-primary">
                <button
                  onClick={() => setActiveView('month')}
                  className={`px-2 py-1 rounded transition-all ${activeView === 'month' ? 'bg-gold-primary text-bg-deep-space font-bold' : 'hover:text-white'}`}
                >
                  Month
                </button>
                <button
                  onClick={() => setActiveView('week')}
                  className={`px-2 py-1 rounded transition-all ${activeView === 'week' ? 'bg-gold-primary text-bg-deep-space font-bold' : 'hover:text-white'}`}
                >
                  Week
                </button>
                <button
                  onClick={() => setActiveView('agenda')}
                  className={`px-2 py-1 rounded transition-all ${activeView === 'agenda' ? 'bg-gold-primary text-bg-deep-space font-bold' : 'hover:text-white'}`}
                >
                  Agenda
                </button>
              </div>
            </div>

            {/* Calendar Controls */}
            <div className="flex justify-between items-center text-xs mb-4">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                className="p-1 hover:text-gold-light"
              >
                &larr; Prev
              </button>
              <strong className="text-white tracking-widest uppercase text-[10px]">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </strong>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                className="p-1 hover:text-gold-light"
              >
                Next &rarr;
              </button>
            </div>

            {/* Monthly Grid View */}
            {activeView === 'month' && (
              <div>
                {/* Weekdays names */}
                <div className="grid grid-cols-7 text-center text-[8px] font-bold text-silver-dark uppercase tracking-widest mb-2">
                  <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                </div>

                {/* Month Days Grid */}
                <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-medium">
                  {emptyDaysBefore.map((_, idx) => (
                    <div key={`empty-${idx}`} className="aspect-square opacity-0 pointer-events-none" />
                  ))}

                  {daysArray.map((dayNum) => {
                    const dayEvents = getDayEvents(dayNum);
                    const hasEvents = dayEvents.length > 0;
                    const isSelected = selectedDay === dayNum;
                    return (
                      <div
                        key={dayNum}
                        onClick={() => setSelectedDay(isSelected ? null : dayNum)}
                        className={`aspect-square rounded-lg flex flex-col justify-center items-center relative cursor-pointer border transition-all ${isSelected
                          ? 'bg-gold-primary border-gold-light text-bg-deep-space font-bold'
                          : hasEvents
                            ? 'bg-gold-primary/10 border-gold-primary/30 text-gold-light hover:bg-gold-primary/20'
                            : 'bg-white/3 border-transparent hover:border-white/10 text-silver-primary hover:text-white'
                          }`}
                      >
                        <span>{dayNum}</span>
                        {/* Event Dot identifier */}
                        {hasEvents && !isSelected && (
                          <span className="w-1 h-1 bg-gold-primary rounded-full absolute bottom-1" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Weekly Calendar Mock View */}
            {activeView === 'week' && (
              <div className="space-y-3.5 text-xs">
                {[
                  { day: 'Mon 1st', title: 'District Strategy Prep', has: false },
                  { day: 'Tue 2nd', title: 'OTS Coordination Meeting', has: true },
                  { day: 'Wed 3rd', title: 'Blood Drive Setup Call', has: false },
                  { day: 'Thu 4th', title: 'Interactive Web Seminar', has: true },
                  { day: 'Fri 5th', title: 'Community Project Install', has: false }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-white/3 border border-white/5 rounded-lg">
                    <span className="text-[9px] tracking-wider text-silver-dark uppercase font-semibold">{item.day}</span>
                    <span className={`text-[10px] ${item.has ? 'text-gold-light font-medium' : 'text-silver-dark'}`}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Agenda Listing View */}
            {activeView === 'agenda' && (
              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
                {events.map((evt) => (
                  <div key={evt.id} className="p-3 bg-white/3 border border-white/5 rounded-lg flex items-start gap-3">
                    <CalIcon size={14} className="text-gold-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-bold text-white leading-tight">{evt.title}</h4>
                      <span className="text-[8px] text-silver-dark block mt-1">
                        {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} &bull; {evt.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Selected day events panel */}
            {selectedDay && (
              <div className="mt-6 pt-5 border-t border-white/5">
                <h4 className="text-[9px] tracking-widest uppercase font-bold text-gold-light mb-3">
                  Day's Events ({getDayEvents(selectedDay).length})
                </h4>
                {getDayEvents(selectedDay).length > 0 ? (
                  <div className="space-y-3">
                    {getDayEvents(selectedDay).map(evt => (
                      <div key={evt.id} className="p-3 bg-gold-primary/5 border border-gold-primary/20 rounded-xl">
                        <h5 className="text-[11px] font-bold text-white leading-tight">{evt.title}</h5>
                        <p className="text-[9px] text-silver-primary mt-1 line-clamp-2">{evt.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-[10px] text-silver-dark">No events scheduled on this calendar day.</div>
                )}
              </div>
            )}
          </div>

          {/* Admin Create Event Trigger */}
          {currentUser && (
            <div className="mt-6 pt-5 border-t border-white/5">
              {showAddForm ? (
                <form onSubmit={handleAddEvent} className="space-y-3 border border-gold-primary/25 bg-gold-primary/2 p-4 rounded-xl text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="font-bold text-gold-light uppercase tracking-wider text-[9px]">Add New Event</span>
                    <button type="button" onClick={() => setShowAddForm(false)} className="text-silver-dark hover:text-white">Close</button>
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Event Title</label>
                    <input
                      type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} required
                      className="w-full px-2.5 py-1.5 bg-bg-deep-space border border-white/10 rounded focus:outline-none focus:border-gold-primary text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Description</label>
                    <textarea
                      value={newDesc} onChange={e => setNewDesc(e.target.value)} rows={2}
                      className="w-full px-2.5 py-1.5 bg-bg-deep-space border border-white/10 rounded focus:outline-none focus:border-gold-primary text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Date & Time</label>
                      <input
                        type="datetime-local" value={newDate} onChange={e => setNewDate(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-bg-deep-space border border-white/10 rounded focus:outline-none focus:border-gold-primary text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Location</label>
                      <input
                        type="text" value={newLoc} onChange={e => setNewLoc(e.target.value)} required
                        className="w-full px-2.5 py-1.5 bg-bg-deep-space border border-white/10 rounded focus:outline-none focus:border-gold-primary text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Organizing Team</label>
                      <input
                        type="text" value={newTeam} onChange={e => setNewTeam(e.target.value)} required
                        className="w-full px-2.5 py-1.5 bg-bg-deep-space border border-white/10 rounded focus:outline-none focus:border-gold-primary text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">District</label>
                      <select
                        value={newDistrict} onChange={e => setNewDistrict(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-bg-deep-space border border-white/10 rounded focus:outline-none focus:border-gold-primary text-xs cursor-pointer"
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
                    <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1">Registration link</label>
                    <input
                      type="text" value={newReg} onChange={e => setNewReg(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-bg-deep-space border border-white/10 rounded focus:outline-none focus:border-gold-primary text-xs"
                    />
                  </div>
                  <button type="submit" className="w-full py-2 rounded bg-gold-primary text-bg-deep-space font-bold uppercase tracking-widest text-[9px]">
                    Publish Event
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-gold-primary/30 hover:border-gold-primary bg-gold-primary/5 hover:bg-gold-primary/10 text-xs font-bold text-gold-light transition-all"
                >
                  <Plus size={16} />
                  Add Event Controls
                </button>
              )}
            </div>
          )}

        </div>

        {/* RHS: Event details list (7 cols) */}
        <div className="lg:col-span-7 space-y-8">

          {/* Tab selections */}
          <div className="flex border-b border-white/5 text-xs tracking-widest uppercase font-semibold text-silver-primary">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-3 border-b-2 transition-all ${activeTab === 'upcoming' ? 'border-gold-primary text-gold-light' : 'border-transparent hover:text-white'
                }`}
            >
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-3 border-b-2 transition-all ${activeTab === 'past' ? 'border-gold-primary text-gold-light' : 'border-transparent hover:text-white'
                }`}
            >
              Previous Events ({pastEvents.length})
            </button>
          </div>

          {/* Grid listing */}
          <div className="space-y-6">

            {/* UPCOMING EVENTS LIST */}
            {activeTab === 'upcoming' && (
              upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-gold-primary/20 transition-all flex flex-col md:flex-row min-h-[220px]">

                    {/* Poster */}
                    <div className="relative isolate w-full md:w-56 aspect-[16/10] md:aspect-auto md:self-stretch overflow-hidden bg-bg-deep-space shrink-0 border-r border-white/5">
                      {event.poster ? (
                        <>
                          {/* Fill the frame without sacrificing any of the poster itself. */}
                          <img
                            src={toDirectImageUrl(event.poster)}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl"
                          />
                          <img
                            src={toDirectImageUrl(event.poster)}
                            alt={event.title}
                            className="relative z-10 block h-full w-full object-contain"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-silver-dark uppercase tracking-widest">No Poster</div>
                      )}
                      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t md:bg-gradient-to-r from-bg-deep-space/20 via-transparent to-transparent" />
                    </div>

                    {/* Content Details */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2 text-[9px] tracking-wider uppercase text-silver-dark mb-1">
                          <span className="flex items-center gap-1">
                            <MapPin size={10} /> {event.location}
                          </span>
                          <span>District {event.district}</span>
                        </div>
                        <h3 className="text-sm font-serif font-bold text-white leading-snug">{event.title}</h3>
                        <p className="text-[11px] text-silver-primary leading-relaxed font-light mt-2 line-clamp-3">
                          {event.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                        <span className="text-[9px] text-silver-dark font-mono uppercase">{event.organizingTeam}</span>

                        {/* Actions block */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleShare(event)}
                            className="p-1.5 rounded-full border border-white/10 hover:border-gold-primary/40 hover:bg-white/5 text-silver-primary hover:text-gold-light"
                            title="Share Link"
                          >
                            <Share2 size={13} />
                          </button>

                          <a
                            href={getGCalLink(event)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full border border-white/10 hover:border-gold-primary/40 hover:bg-white/5 text-silver-primary hover:text-gold-light flex items-center gap-1 text-[10px]"
                            title="Add to Google Calendar"
                          >
                            <CalendarPlus size={13} />
                            <span className="hidden sm:inline">Add to Cal</span>
                          </a>

                          {event.registrationLink && (
                            <a
                              href={event.registrationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-full bg-gold-primary text-bg-deep-space text-[10px] tracking-wider uppercase font-bold hover:shadow-[0_0_12px_rgba(212,175,55,0.3)] transition-all"
                            >
                              Register
                            </a>
                          )}

                          {/* Cancel button for Admin */}
                          {currentUser && (
                            <button
                              onClick={() => handleCancelEvent(event.id)}
                              className="p-1.5 rounded-full border border-red-500/20 hover:border-red-500 hover:bg-red-500/5 text-red-400"
                              title="Delete Event"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-xs text-silver-dark">No upcoming events listed. Check back later!</div>
              )
            )}

            {/* PAST EVENTS LIST: CASE STUDIES */}
            {activeTab === 'past' && (
              pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                  <div key={event.id} className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-silver-primary/20 transition-all flex flex-col md:flex-row min-h-[200px]">

                    {/* Poster */}
                    <div className="relative isolate w-full md:w-56 aspect-[16/10] md:aspect-auto md:self-stretch overflow-hidden bg-bg-deep-space shrink-0 border-r border-white/5">
                      {event.poster ? (
                        <>
                          {/* Keep the full photo visible; its blurred copy fills any spare space. */}
                          <img
                            src={toDirectImageUrl(event.poster)}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-xl saturate-50"
                          />
                          <img
                            src={toDirectImageUrl(event.poster)}
                            alt={event.title}
                            className="relative z-10 block h-full w-full object-contain saturate-50"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-silver-dark uppercase tracking-widest">No Poster</div>
                      )}
                      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t md:bg-gradient-to-r from-bg-deep-space/25 via-transparent to-transparent" />
                    </div>

                    {/* Content details */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2 text-[9px] tracking-wider uppercase text-silver-dark mb-1">
                          <span className="flex items-center gap-1">
                            <MapPin size={10} /> {event.location}
                          </span>
                          <span>District {event.district}</span>
                        </div>
                        <h3 className="text-sm font-serif font-bold text-silver-light leading-snug">{event.title}</h3>
                        <p className="text-[11px] text-silver-primary leading-relaxed font-light mt-2 line-clamp-3">
                          {event.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-[9px] text-silver-dark font-mono uppercase">{event.organizingTeam}</span>

                        <div className="flex gap-4 items-center">
                          {event.attendeesCount && (
                            <span className="text-[10px] font-bold text-silver-light flex items-center gap-1">
                              <Users size={12} className="text-gold-primary" />
                              {event.attendeesCount} Attended
                            </span>
                          )}

                          {/* Cancel button for Admin */}
                          {currentUser && (
                            <button
                              onClick={() => handleCancelEvent(event.id)}
                              className="p-1.5 rounded-full border border-red-500/20 hover:border-red-500 hover:bg-red-500/5 text-red-400"
                              title="Delete Event"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-xs text-silver-dark">No past event case studies logged.</div>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
