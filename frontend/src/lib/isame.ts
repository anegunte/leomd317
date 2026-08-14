export interface IsameSettings {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  heroSubtitle: string;
  location: string;
  dates: string;
  venue: string;
  regionIntro: string;
  forumExperience: string;
  destinationIntro: string;
  statusNote: string;
  registrationUrl: string;
  officialForumUrl: string;
  heroImage: string;
  forumImage: string;
  leadershipImage: string;
}

export const DEFAULT_ISAME_SETTINGS: IsameSettings = {
  eyebrow: 'Goa · India · 2027',
  titlePrefix: 'LEO ISAME',
  titleHighlight: 'FORUM 2027',
  heroSubtitle: 'A horizon for leadership, service and fellowship—where the spirit of Leoism meets the coast of Goa.',
  location: 'Goa, India',
  dates: 'Dates to be announced',
  venue: 'Venue to be announced',
  regionIntro: "ISAME connects Leo communities across India, South Asia and the Middle East. The forum is a place to meet peers beyond one's own district, listen deeply and return home with fresh energy for meaningful service.",
  forumExperience: 'Previous Leo ISAME gatherings have been documented by participating Leo organisations as opportunities for workshops, dialogue and cultural exchange. The 2027 programme will be announced by the organisers; this page deliberately does not speculate on sessions, speakers or dates.',
  destinationIntro: 'Goa is the officially listed destination for the ISAME Leo Forum. Final dates, venue, travel guidance and programme details are published when confirmed by the organisers.',
  statusNote: 'Register your interest now and follow the official forum listing for confirmed event details.',
  registrationUrl: 'https://forms.gle/Y5sqS9q3U7wmg6ix8',
  officialForumUrl: 'https://www.lionsclubs.org/en/resources-for-members/forums',
  heroImage: 'https://images.unsplash.com/photo-1589428000126-afdd64ae1f3a?auto=format&fit=crop&q=90&w=2400',
  forumImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=85&w=1400',
  leadershipImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=85&w=1400',
};
