interface NarrativeInput {
  title: string;
  category: string;
  description: string;
  beneficiaries?: number;
  volunteerHours?: number;
  district: string;
  club: string;
}

export interface GeneratedNarrative {
  instagram: string;
  linkedin: string;
  newsletter: string;
  annualReport: string;
}

// Creative quote vocabulary and templates
const IMPACT_PHRASES = [
  "shattering barriers and redefining service",
  "catalyzing grass-roots leadership to drive meaningful community engagement",
  "leading with purpose and serving without limits",
  "building bridges of support where they are needed most",
  "driving systemic change and youth-led action",
  "demonstrating the unparalleled power of collective youth commitment"
];

const INTROS = [
  "In a profound showcase of leadership and active citizenship,",
  "Stepping beyond geographical and structural boundaries,",
  "Fulfilling our core commitment to transformative community welfare,",
  "With an unwavering vision to uplift and empower,"
];

const OUTLOOKS = [
  "This project stands as a testament to what is possible when youth lead with clear intent.",
  "As we scale our operations, our focus remains on sustaining these deep localized footprints.",
  "Every hour volunteered brings us closer to a multiple district unified by selfless service.",
  "Through these collaborative actions, we continue to shape the next generation of global impact leaders."
];

export function generateNarrative(input: NarrativeInput): GeneratedNarrative {
  const { title, category, description, beneficiaries, volunteerHours, district, club } = input;

  const benefText = beneficiaries ? `${beneficiaries.toLocaleString()} beneficiaries` : "hundreds of community members";
  const hoursText = volunteerHours ? `${volunteerHours} service hours` : "substantial volunteer hours";
  
  // Random selects for copy variation
  const phrase = IMPACT_PHRASES[Math.floor(Math.random() * IMPACT_PHRASES.length)];
  const intro = INTROS[Math.floor(Math.random() * INTROS.length)];
  const outlook = OUTLOOKS[Math.floor(Math.random() * OUTLOOKS.length)];

  // 1. Instagram Caption
  const instagram = `🌟 BEYOND BOUNDARIES: ${title.toUpperCase()} 🌟

${club} (${district}) just wrapped up an incredible ${category.toLowerCase()} initiative! 🚀

${description}

Through this effort, we achieved:
✨ ${benefText} directly impacted
⏱️ ${hoursText} invested by youth leaders
🤝 Stronger communities, built together

Proud of our Leos for ${phrase}! We are leading with purpose and serving without limits.

#LeoClubs #LeoMD317 #BeyondBoundaries #YouthLeadership #ServiceAboveSelf #LionsInternational #CommunityImpact #SocialGood #${category.replace(/\s+/g, '')}`;

  // 2. LinkedIn Post
  const linkedin = `📍 Impact Reporting | Leo Multiple District 317

We are proud to share the successful execution of "${title}," a key ${category.toLowerCase()} initiative organized by ${club} under District ${district}.

${intro} our members mobilized resources and coordinated logistics to address critical community needs. 

📊 Key Achievements:
- Impact Footprint: ${benefText}
- Volunteer Investment: ${hoursText}
- Strategic Focus: ${category}

At Leo MD 317, we believe in transforming youth energy into structured leadership. By launching projects of this scale, our members are not only resolving immediate challenges but also developing critical program management, stakeholder communication, and operational planning skills.

Thank you to all our volunteers, Lions advisors, and community stakeholders who made this initiative possible. We continue to build a legacy of service that goes "Beyond Boundaries."

#YouthLeadership #NonProfitManagement #CommunityDevelopment #SocialResponsibility #LeoClubsInternational #LionsDistricts #ProjectImpact`;

  // 3. Newsletter Article
  const newsletter = `LEO MD 317 CHRONICLE | REGIONAL SERVICE IN FOCUS

HEADLINE: ${title.toUpperCase()}: ${club.toUpperCase()} DRIVES NEW IMPACT IN ${category.toUpperCase()}

${intro} the members of ${club} (${district}) launched a major campaign, "${title}," which successfully served ${benefText} and recorded over ${hoursText}.

The project, which targeted essential needs in the ${category.toLowerCase()} sector, saw extensive local planning and collaboration. According to organizers, the project was designed to create immediate relief while laying structural groundwork for long-term community benefits. "${description}"

This initiative perfectly embodies Multiple District 317's current theme, "Beyond Boundaries." By enabling youth to take absolute ownership of complex operations—managing budgets, designing marketing campaigns, and working directly on the ground—the Leo movement continues to serve as the premier incubator for leadership in Karnataka.

${outlook} We congratulate ${club} on this exemplary accomplishment and look forward to more clubs launching data-driven service campaigns.`;

  // 4. Annual Report Summary
  const annualReport = `Under the core banner of "Beyond Boundaries," ${club} (${district}) executed "${title}" in the category of ${category}. Fulfilling a critical need, this initiative addressed local issues by implementing: ${description}. Through rigorous youth leadership and community networking, the campaign successfully reached ${benefText} and engaged ${hoursText}. This effort underscores Leo MD 317's strategic mission to combine large-scale operational excellence with targeted service projects, establishing a model for sustainable regional impact.`;

  return {
    instagram,
    linkedin,
    newsletter,
    annualReport
  };
}
