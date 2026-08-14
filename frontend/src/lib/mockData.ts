export interface LeoProfile {
  id: string;
  name: string;
  role: string;
  district: string;
  club?: string;
  email: string;
  phone?: string;
  linkedin?: string;
  photo?: string;
}

export interface ClubData {
  id: string;
  name: string;
  districtId: string;
  president: string;
  secretary: string;
  membersCount: number;
  location: string;
  foundedYear: number;
  socials?: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
}

export interface DistrictData {
  id: string; // e.g. "317A"
  name: string;
  governor: string; // Lions District Governor
  president: string; // Leo District President
  vp: string; // Leo District Vice President
  secretary: string;
  treasurer: string;
  theme: string;
  clubsCount: number;
  membersCount: number;
  cabinet: LeoProfile[];
}

export interface ServiceProject {
  id: string;
  title: string;
  category: 'Education' | 'Healthcare' | 'Environment' | 'Mental Health' | 'Hunger Relief' | 'Women Empowerment' | 'Disaster Relief' | 'Youth Leadership' | 'Technology for Good';
  description: string;
  impactMetrics: {
    beneficiaries?: number;
    volunteerHours?: number;
    treesPlanted?: number;
    bloodUnits?: number;
    fundsRaised?: number;
  };
  photos: string[];
  videos?: string[];
  district: string;
  club: string;
  date: string;
}

export interface LeoEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  location: string;
  poster: string;
  registrationLink?: string;
  organizingTeam: string;
  district: string;
  club?: string;
  status: 'upcoming' | 'past';
  attendeesCount?: number;
  /** Enables the prominent rolling announcement on the home page. */
  isHighImpact?: boolean;
  /** Optional short announcement shown in the rolling ribbon. */
  highImpactMessage?: string;
}

export interface MediaItem {
  id: string;
  url: string;
  thumbnail: string;
  type: 'photo' | 'video';
  category: 'Installations' | 'Conferences' | 'Service Projects' | 'Youth Leadership';
  title: string;
  district: string;
}

// -------------------------------------------------------------
// Seed Data Definitions
// -------------------------------------------------------------

export const MOCK_DISTRICTS: DistrictData[] = [
  {
    id: "317A",
    name: "District 317A",
    governor: "",
    president: "Jeevan K.V.",
    vp: "Deekshitha D",
    secretary: "Shashank S. Pawar",
    treasurer: "M Bharathi",
    theme: "Beyond Boundaries",
    clubsCount: 16,
    membersCount: 340,
    cabinet: [
      { id: "a-cab-1", name: "Jeevan K.V.", role: "District President", district: "317A", club: "Leo Club of Kanakapura", email: "chirujeevan111@gmail.com", phone: "+91 9535377931" },
      { id: "a-cab-2", name: "Ganavi N", role: "Immediate Past President", district: "317A", club: "Leo Club of Pristine Pride", email: "ganavin2002@gmail.com", phone: "+91 9900865685" },
      { id: "a-cab-3", name: "Amith P", role: "District Chairperson", district: "317A", club: "Leo Club Bangalore of Naliivu", email: "amithpanduranga@gmail.com", phone: "+91 9449502076" },
      { id: "a-cab-4", name: "Satish Kumar L", role: "District Coordinator", district: "317A", club: "Leo Club Bangalore of Naliivu", email: "satishkumar.leelambaram@gmail.com", phone: "+91 9972199444" },
      { id: "a-cab-5", name: "Sandeep M", role: "District Coordinator", district: "317A", club: "Leo Club of Kanakapura", email: "leosandeepm@yahoo.com", phone: "+91 9611833491" },
      { id: "a-cab-6", name: "Chandrashekar Aaradya", role: "District Coordinator", district: "317A", club: "Leo Club Bangalore of Mahanagar", email: "chandrashekar1575@gmail.com", phone: "+91 9902479523" },
      { id: "a-cab-7", name: "Deekshitha D", role: "Vice President", district: "317A", club: "Leo Club Bangalore of Host Parivarthan", email: "deekshithadeepak1990@gmail.com", phone: "+91 7483004604" },
      { id: "a-cab-8", name: "Shashank S. Pawar", role: "Secretary", district: "317A", club: "Leo Club of Sankalpa", email: "leoshashankspawar@gmail.com", phone: "+91 9901651441" },
      { id: "a-cab-9", name: "Disha Ashwin", role: "Joint Secretary", district: "317A", club: "Leo Club of Centennial Spandana", email: "dishaaradhya23@gmail.com", phone: "+91 7760290508" },
      { id: "a-cab-10", name: "M Bharathi", role: "Treasurer", district: "317A", club: "Leo Club Bangalore of Host Parivarthan", email: "bharathimuthuraman31@gmail.com", phone: "+91 8861941904" },
      { id: "a-cab-11", name: "Velu B", role: "GAT Coordinator", district: "317A", club: "Leo Club of SaIt Veerahoysala", email: "velub9964@gmail.com", phone: "+91 9964346958" },
      { id: "a-cab-12", name: "Arbaaz Hussain", role: "GMT", district: "317A", club: "Leo Club Bangalore of Host Sindhi College", email: "iarbaazhussain@gmail.com", phone: "+91 9535006518" },
      { id: "a-cab-13", name: "Ananya M", role: "GLT", district: "317A", club: "Leo Club of Sankalpa", email: "ananyamohan75@gmail.com", phone: "+91 8296562837" },
      { id: "a-cab-14", name: "Shreyas TP", role: "GST", district: "317A", club: "Leo Club of Veerahoysala", email: "shreyastp8055@gmail.com", phone: "+91 7204998215" },
      { id: "a-cab-15", name: "Dr. Vikhil Chakravarthy SV", role: "GET", district: "317A", club: "Leo Club of Silicon City", email: "vikhilchakravarthy563125@gmail.com", phone: "+91 9986456722" },
      { id: "a-cab-16", name: "Bhavana", role: "PRO", district: "317A", club: "Leo Club of Neozonites Tempus", email: "gandhambhavana2906@gmail.com", phone: "+91 9035826033" }
    ]
  },
  {
    id: "317B",
    name: "District 317B",
    governor: "",
    president: "",
    vp: "",
    secretary: "",
    treasurer: "",
    theme: "Beyond Boundaries",
    clubsCount: 8,
    membersCount: 210,
    cabinet: []
  },
  {
    id: "317C",
    name: "District 317C",
    governor: "",
    president: "Sanjana Baliga",
    vp: "Alanis Sweedal Castelino",
    secretary: "Loy Winston Fernandes",
    treasurer: "Aryan Suvarna",
    theme: "Beyond Boundaries",
    clubsCount: 16,
    membersCount: 390,
    cabinet: [
      { id: "c-cab-1", name: "Sanjana Baliga", role: "District President", district: "317C", club: "Leo Club of Parkala", email: "sanjanabaliga85@gmail.com", phone: "+91 9964488088" },
      { id: "c-cab-2", name: "Ranjitha Shet", role: "District Chairperson", district: "317C", club: "Lions Club Kunjibettu", email: "dakshranjitha@gmail.com", phone: "+91 7411341203" },
      { id: "c-cab-3", name: "Alanis Sweedal Castelino", role: "1st Vice President", district: "317C", club: "Leo Club of Belman", email: "alanissweedalcastelino@gmail.com", phone: "+91 6362936484" },
      { id: "c-cab-4", name: "Nandan Kundar", role: "2nd Vice President", district: "317C", club: "Leo Club of Malpe", email: "beingnandan2005@gmail.com", phone: "+91 7204264147" },
      { id: "c-cab-5", name: "Loy Winston Fernandes", role: "Secretary", district: "317C", club: "Leo Club Moodubelle", email: "loyfernandes814@gmail.com", phone: "+91 8604923324" },
      { id: "c-cab-6", name: "Spandana Baliga", role: "Joint Secretary", district: "317C", club: "Leo Club of Parkala", email: "spandanabaliga039@gmail.com", phone: "+91 9964488088" },
      { id: "c-cab-7", name: "Aryan Suvarna", role: "Treasurer", district: "317C", club: "Leo Club of Udupi Amrith", email: "Aryanbangera874@gmail.com", phone: "+91 7406641166" },
      { id: "c-cab-8", name: "Adithya Shet", role: "District Advisor", district: "317C", club: "Leo Club of Malpe", email: "shetadithya2@gmail.com", phone: "+91 9972849594" },
      { id: "c-cab-9", name: "Chirag Satish Poojary", role: "District Advisor", district: "317C", club: "Leo Club of Malpe", email: "chiragspoojary@gmail.com", phone: "+91 6363581583" },
      { id: "c-cab-10", name: "Drithi Hegde", role: "District Advisor", district: "317C", club: "Leo Club of Udupi Indralli", email: "dhritihhegde@gmail.com", phone: "+91 9591961530" },
      { id: "c-cab-11", name: "Prarthana A Suvarna", role: "GMT", district: "317C", club: "Leo Club of Manipal Valley", email: "prarthanasuvarna02@gmail.com", phone: "+91 9880519573" },
      { id: "c-cab-12", name: "Abhinav Binesh", role: "GST", district: "317C", club: "Leo Club of Bhramagiri", email: "abhinowbinesh@gmail.com", phone: "+91 9483557125" },
      { id: "c-cab-13", name: "Joel Nithin Castelino", role: "GLT", district: "317C", club: "Leo Club of Subhashnagar", email: "joelnithin100@gmail.com", phone: "+91 9483209146" },
      { id: "c-cab-14", name: "Aadya Jayanand", role: "GET", district: "317C", club: "Leo Club of Ambalpady Pride", email: "adya123@gmail.com", phone: "+91 7019346170" },
      { id: "c-cab-15", name: "Chithali G Shet", role: "Cultural Coordinator", district: "317C", club: "Leo Club of Santhekatte", email: "jyothishet2015@gmail.com", phone: "+91 7411911975" },
      { id: "c-cab-16", name: "Anika Rai", role: "PRO", district: "317C", club: "Leo Club of Bhramagiri", email: "vijethaudupi85@gmail.com", phone: "+91 9113874822" }
    ]
  },
  {
    id: "317D",
    name: "District 317D",
    governor: "",
    president: "Rishal Dsouza",
    vp: "Apeksha Neha",
    secretary: "Ananya Shetty",
    treasurer: "Prakyath Hegde K",
    theme: "Beyond Boundaries",
    clubsCount: 10,
    membersCount: 290,
    cabinet: [
      { id: "d-cab-1", name: "Rishal Dsouza", role: "District President", district: "317D", club: "Leo Club of Permannur", email: "rishaldsouza638@gmail.com", phone: "+91 9180914518" },
      { id: "d-cab-2", name: "Charan Alva", role: "District Chairperson", district: "317D", club: "Lions Club of Mangalore Ashoknagara", email: "charan.guthu@gmail.com", phone: "+91 9481140726" },
      { id: "d-cab-3", name: "Apeksha Neha", role: "Vice President", district: "317D", club: "Leo Club of Kodialbail", email: "apekshaneha16@gmail.com", phone: "+91 8431151695" },
      { id: "d-cab-4", name: "Ananya Shetty", role: "Secretary", district: "317D", club: "Leo Club of Pumpwell Kalpavraksha", email: "shettyananya116@gmail.com", phone: "+91 8073196883" },
      { id: "d-cab-5", name: "Apsara HR", role: "Joint Secretary", district: "317D", club: "Leo Club of Belthangadi", email: "" },
      { id: "d-cab-6", name: "Prakyath Hegde K", role: "Treasurer", district: "317D", club: "Leo Club of Moodbidri", email: "prakyathhegde17@gmail.com", phone: "+91 9945670579" },
      { id: "d-cab-7", name: "Dr. Akshay Shetty", role: "GMT Coordinator", district: "317D", club: "Leo Club of Haleangadi", email: "akshetty2002@gmail.com", phone: "+91 8792489092" },
      { id: "d-cab-8", name: "Dhanush Shetty", role: "GST", district: "317D", club: "Leo Club of Pumpwell Kalpavraksha", email: "dhanushrshetty1@gmail.com", phone: "+91 9035090715" },
      { id: "d-cab-9", name: "Shivani S", role: "GET", district: "317D", club: "Leo Club of Kodialbail", email: "shivaninaik31303@gmail.com", phone: "+91 7483277811" },
      { id: "d-cab-10", name: "Lean Aquinas", role: "GLT", district: "317D", club: "Leo Club of Mangalore", email: "leanaquinas@gmail.com", phone: "+91 8296823291" }
    ]
  },
  {
    id: "317E",
    name: "District 317E",
    governor: "",
    president: "A Lavanya",
    vp: "Varuna M",
    secretary: "Jahnavi C",
    treasurer: "Varsha P",
    theme: "Beyond Boundaries",
    clubsCount: 10,
    membersCount: 230,
    cabinet: [
      { id: "e-cab-1", name: "A Lavanya", role: "District President", district: "317E", club: "Leo Club of Someshwarapura Legacy", email: "lavanyaananthraj@gmail.com", phone: "+91 9535031229" },
      { id: "e-cab-2", name: "Sougandhi Golla", role: "Immediate Past President", district: "317E", club: "Leo Club of JL Vriddhi", email: "sougandhig36@gmail.com", phone: "+91 6363340244" },
      { id: "e-cab-3", name: "Jahnavi C", role: "Secretary", district: "317E", club: "Leo Club of BG Niyama", email: "jahnavi10504@gmail.com", phone: "+91 9738875173" },
      { id: "e-cab-4", name: "Varuna M", role: "Vice President", district: "317E", club: "Leo Club of JL Vriddhi", email: "varuna2004mr@gmail.com", phone: "+91 7892663034" },
      { id: "e-cab-5", name: "Varsha P", role: "Treasurer", district: "317E", club: "Leo Club of BG Niyama", email: "varshapkumar.2004@gmail.com", phone: "+91 9035817105" },
      { id: "e-cab-6", name: "Sanjana S.N", role: "GAT Coordinator", district: "317E", club: "Leo Club of BG Niyama", email: "sanjjj017@gmail.com", phone: "+91 7411005119" },
      { id: "e-cab-7", name: "Palak Khurana", role: "GLT", district: "317E", club: "Leo Club of JL Vriddhi", email: "kpalak302@gmail.com", phone: "+91 7027600687" },
      { id: "e-cab-8", name: "Gokul V", role: "GST", district: "317E", club: "Leo Club of Someshwarapura Legacy", email: "gokulv841@gmail.com", phone: "+91 9632987691" },
      { id: "e-cab-9", name: "Keerthana C", role: "GMT", district: "317E", club: "Leo Club of Vemana", email: "ckeerthana230@gmail.com", phone: "+91 9606236866" },
      { id: "e-cab-10", name: "N. Rajani Kumar", role: "GET", district: "317E", club: "Leo Club of Future", email: "rajinikumarnagasetty@gmail.com", phone: "+91 9347816893" }
    ]
  },
  {
    id: "317F",
    name: "District 317F",
    governor: "",
    president: "Sandhya R",
    vp: "Sai Kiran Gowda",
    secretary: "Luzaina Muskan",
    treasurer: "Aqib Feroz",
    theme: "Beyond Boundaries",
    clubsCount: 11,
    membersCount: 180,
    cabinet: [
      { id: "f-cab-1", name: "Sandhya R", role: "District President", district: "317F", club: "Leo Club of Akshaya", email: "sandhyark729@gmail.com", phone: "+91 8861859195" },
      { id: "f-cab-2", name: "Dimanth Charles", role: "Immediate Past President", district: "317F", club: "Leo Club of Yuvakeerthi", email: "dimanthcharles23@gmail.com", phone: "+91 9110687160" },
      { id: "f-cab-3", name: "Sai Kiran Gowda", role: "Vice President", district: "317F", club: "Leo Club of Vishwa Yuvashakti", email: "saikirangowda2@gmail.com", phone: "+91 8618240740" },
      { id: "f-cab-4", name: "Luzaina Muskan", role: "Secretary", district: "317F", club: "Leo Club of Achiever's", email: "Luzainamuskan0@gmail.com", phone: "+91 6363405760" },
      { id: "f-cab-5", name: "Aqib Feroz", role: "Treasurer", district: "317F", club: "Leo Club of Satva", email: "aqibferoz@hotmail.com", phone: "+91 9760871040" },
      { id: "f-cab-6", name: "Shashank N", role: "GAT Coordinator", district: "317F", club: "Leo Club of NDC", email: "shashankn238@gmail.com", phone: "+91 9342511961" },
      { id: "f-cab-7", name: "Esha Ramesh", role: "GMT", district: "317F", club: "Leo Club of Asraya", email: "leoesha20@gmail.com", phone: "+91 9035923462" },
      { id: "f-cab-8", name: "Hafsa Sultana", role: "GST", district: "317F", club: "Leo Club of Achiever's", email: "hafsasultana990@gmail.com", phone: "+91 6361145192" },
      { id: "f-cab-9", name: "Amrutha N Kumar", role: "GLT", district: "317F", club: "Leo Club of Satva", email: "amruthankumar888@gmail.com", phone: "+91 8296293441" },
      { id: "f-cab-10", name: "G. Lakshmi Pathi", role: "GET", district: "317F", club: "Leo Club of Akshaya", email: "glakshmipathi909@gmail.com", phone: "+91 9912469809" },
      { id: "f-cab-11", name: "Bharani Shankar D V", role: "PRO", district: "317F", club: "Leo Club of Akshaya", email: "bharanishankar2006132@gmail.com", phone: "+91 9353809107" }
    ]
  },
  {
    id: "317G",
    name: "District 317G",
    governor: "",
    president: "",
    vp: "",
    secretary: "",
    treasurer: "",
    theme: "Beyond Boundaries",
    clubsCount: 8,
    membersCount: 200,
    cabinet: []
  }
];

export const MOCK_CLUBS: ClubData[] = [
  // 317A
  { id: "club-a1", name: "Leo Club of Bangalore Elite", districtId: "317A", president: "Leo Manoj K.", secretary: "Leo Navyashree G.", membersCount: 38, location: "Bengaluru", foundedYear: 2018, socials: { instagram: "https://instagram.com" } },
  { id: "club-a2", name: "Leo Club of RVCE", districtId: "317A", president: "Leo Chethan M.", secretary: "Leo Pallavi R.", membersCount: 45, location: "RVCE Campus, Bengaluru", foundedYear: 2012, socials: { instagram: "https://instagram.com" } },
  { id: "club-a3", name: "Leo Club of Bangalore South", districtId: "317A", president: "Leo Tarun S.", secretary: "Leo Lakshmi P.", membersCount: 25, location: "Jayanagar, Bengaluru", foundedYear: 2015 },
  // 317B
  { id: "club-b1", name: "Leo Club of Hubli Kings", districtId: "317B", president: "Leo Aditya P.", secretary: "Leo Sandeep M.", membersCount: 28, location: "Hubli", foundedYear: 2020 },
  { id: "club-b2", name: "Leo Club of Panaji Premium", districtId: "317B", president: "Leo Jessica Dias", secretary: "Leo Rahul Naik", membersCount: 32, location: "Panaji, Goa", foundedYear: 2016 },
  // 317C
  { id: "club-c1", name: "Leo Club of Udupi Mid-Town", districtId: "317C", president: "Leo Shravan Shetty", secretary: "Leo Divya K.", membersCount: 35, location: "Udupi", foundedYear: 2014 },
  { id: "club-c2", name: "Leo Club of Manipal Campus", districtId: "317C", president: "Leo Pratik Sharma", secretary: "Leo Pooja Roy", membersCount: 52, location: "Manipal", foundedYear: 2019 },
  // 317D
  { id: "club-d1", name: "Leo Club of Mangalore Central", districtId: "317D", president: "Leo Sheldon Dsouza", secretary: "Leo Reena Dsouza", membersCount: 42, location: "Mangaluru", foundedYear: 2010 },
  { id: "club-d2", name: "Leo Club of Kodagu Heritage", districtId: "317D", president: "Leo Machaiah B.", secretary: "Leo Kavitha K.", membersCount: 24, location: "Madikeri", foundedYear: 2021 },
  // 317E
  { id: "club-e1", name: "Leo Club of Mysore Royal", districtId: "317E", president: "Leo Sanjay Gowda", secretary: "Leo Nandini S.", membersCount: 30, location: "Mysuru", foundedYear: 2013 },
  // 317F
  { id: "club-f1", name: "Leo Club of Tumkur Stars", districtId: "317F", president: "Leo Sharath Chandra", secretary: "Leo Deepthi Gowda", membersCount: 26, location: "Tumakuru", foundedYear: 2017 },
  // 317G
  { id: "club-g1", name: "Leo Club of Belgaum Pioneers", districtId: "317G", president: "Leo Sourabh P.", secretary: "Leo Ashwini Patil", membersCount: 31, location: "Belagavi", foundedYear: 2018 }
];

export const MOCK_PROJECTS: ServiceProject[] = [
  {
    id: "proj-1",
    title: "Vidyadhana: Empowering Underprivileged Scholars",
    category: "Education",
    description: "Distributed textbook kits, learning accessories, and basic calculators to 1,200 government school students, alongside hosting interactive sessions on science, basic coding, and dynamic career opportunities.",
    impactMetrics: { beneficiaries: 1200, volunteerHours: 180, fundsRaised: 75000 },
    photos: ["https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600", "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600"],
    district: "317A",
    club: "Leo Club of RVCE",
    date: "2026-04-12"
  },
  {
    id: "proj-2",
    title: "Rakta-Dhaan 2026 Mega Blood Drive",
    category: "Healthcare",
    description: "Collaborated with local Red Cross and government hospitals to organize a centralized blood donation campaign, successfully accumulating 350 units of blood in a single day.",
    impactMetrics: { beneficiaries: 1050, volunteerHours: 90, bloodUnits: 350 },
    photos: ["https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600"],
    district: "317C",
    club: "Leo Club of Udupi Mid-Town",
    date: "2026-05-18"
  },
  {
    id: "proj-3",
    title: "Eco-Pulse: Urban Afforestation & Seedball Drive",
    category: "Environment",
    description: "Planted 500 saplings across public parks and forest buffers in North Bengaluru, and dispersed over 2,000 native species seedballs to aid rural reforestation.",
    impactMetrics: { beneficiaries: 5000, volunteerHours: 240, treesPlanted: 500 },
    photos: ["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600", "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=600"],
    district: "317A",
    club: "Leo Club of Bangalore Elite",
    date: "2026-05-05"
  },
  {
    id: "proj-4",
    title: "MindMatters: High School Mental Health Forums",
    category: "Mental Health",
    description: "Conducted stress management, digital addiction awareness, and confidence workshops for senior students in partnership with professional youth psychologists.",
    impactMetrics: { beneficiaries: 450, volunteerHours: 60 },
    photos: ["https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600"],
    district: "317D",
    club: "Leo Club of Mangalore Central",
    date: "2026-03-20"
  },
  {
    id: "proj-5",
    title: "Annam: Community Hunger Relief",
    category: "Hunger Relief",
    description: "Coordinated distribution of nutritious hot meals, fresh fruits, and clean drinking water to over 800 daily wage laborers and homeless individuals across transit centers.",
    impactMetrics: { beneficiaries: 800, volunteerHours: 40, fundsRaised: 25000 },
    photos: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600"],
    district: "317E",
    club: "Leo Club of Mysore Royal",
    date: "2026-02-14"
  },
  {
    id: "proj-6",
    title: "Tejaswini: Women's Hygiene & Self-Defense Bootcamps",
    category: "Women Empowerment",
    description: "Distributed over 1,500 biodegradable sanitary napkins and organized intensive 3-day basic martial arts and safety workshops in girls' degree colleges.",
    impactMetrics: { beneficiaries: 1500, volunteerHours: 120, fundsRaised: 40000 },
    photos: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600"],
    district: "317F",
    club: "Leo Club of Tumkur Stars",
    date: "2026-05-10"
  },
  {
    id: "proj-7",
    title: "Flood Relief Mission: Coastal Flood Support",
    category: "Disaster Relief",
    description: "Mobilized dry rations, clothing, blankets, and essential medications to over 300 families affected by flash floods along coastal inlets.",
    impactMetrics: { beneficiaries: 1200, volunteerHours: 320, fundsRaised: 180000 },
    photos: ["https://images.unsplash.com/photo-1469571486040-7a9b1373c402?auto=format&fit=crop&q=80&w=600"],
    district: "317B",
    club: "Leo Club of Panaji Premium",
    date: "2026-01-08"
  },
  {
    id: "proj-8",
    title: "LeadNext: Youth Leadership Forum",
    category: "Youth Leadership",
    description: "Hosted a centralized residential youth leadership summit bringing together 150 top Leo leaders to hone public speaking, project management, and team conflict resolution skills.",
    impactMetrics: { beneficiaries: 150, volunteerHours: 400, fundsRaised: 120000 },
    photos: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"],
    district: "317G",
    club: "Leo Club of Belgaum Pioneers",
    date: "2026-05-24"
  }
];

export const MOCK_EVENTS: LeoEvent[] = [
  {
    id: "evt-1",
    title: "Leo Multiple District 317 Annual Conference 'Boundless'",
    description: "The biggest youth leadership convention in the region. Features interactive panels with top global leaders, installations of the incoming cabinet, rewards distributions, and community impact discussions.",
    date: "2026-07-11T09:00:00Z",
    location: "Golden Grand Castle Convention, Bengaluru",
    poster: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600",
    registrationLink: "https://forms.gle/sample",
    organizingTeam: "Multiple District Cabinet 317",
    district: "317",
    status: "upcoming"
  },
  {
    id: "evt-2",
    title: "Interactive Youth Leadership Bootcamp",
    description: "A comprehensive weekend workshop focused on equipping new club officers with financial management, public speaking, and project leadership capabilities.",
    date: "2026-06-25T10:00:00Z",
    location: "Senate Hall, Mangalore University",
    poster: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
    registrationLink: "https://forms.gle/sample",
    organizingTeam: "District 317D Cabinet",
    district: "317D",
    status: "upcoming"
  },
  {
    id: "evt-3",
    title: "Green Hearts Eco-Walkathon",
    description: "Join hundreds of citizens walking to raise awareness about urban biodiversity conservation. Trees saplings will be gifted to all registered participants.",
    date: "2026-06-14T06:30:00Z",
    location: "Kanteerava Stadium, Bengaluru",
    poster: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600",
    registrationLink: "https://forms.gle/sample",
    organizingTeam: "Leo Club of Bangalore Elite & RVCE",
    district: "317A",
    status: "upcoming"
  },
  {
    id: "evt-4",
    title: "Youth Tech For Good Ideathon",
    description: "A coding and product design hackathon to prototype digital solutions for local waste management and traffic challenges.",
    date: "2026-05-15T09:00:00Z",
    location: "PES University Auditorium, Bengaluru",
    poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600",
    organizingTeam: "Leo Club of RVCE",
    district: "317A",
    status: "past",
    attendeesCount: 220
  },
  {
    id: "evt-5",
    title: "Leo District 317C Officer Training School (OTS)",
    description: "Annual intensive training program for newly elected club Presidents, Secretaries, and Treasurers to coordinate service strategies.",
    date: "2026-05-02T10:00:00Z",
    location: "Hotel Ocean Pearl, Udupi",
    poster: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
    organizingTeam: "District 317C Cabinet",
    district: "317C",
    status: "past",
    attendeesCount: 140
  }
];

export const MOCK_MEDIA: MediaItem[] = [
  { id: "med-1", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800", thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400", type: "photo", category: "Conferences", title: "MD 317 Executive Meet", district: "317" },
  { id: "med-2", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800", thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400", type: "photo", category: "Youth Leadership", title: "Residential Leadership Seminar", district: "317G" },
  { id: "med-3", url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800", thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400", type: "photo", category: "Service Projects", title: "Vidyadhana Book Distribution", district: "317A" },
  { id: "med-4", url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800", thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400", type: "photo", category: "Service Projects", title: "Eco-Pulse Reforestation Drive", district: "317A" },
  { id: "med-5", url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400", type: "photo", category: "Installations", title: "317C Officers Installation Night", district: "317C" }
];

export const MOCK_USERS = [
  { username: "superadmin", password: "password123", name: "Leo Lion A Vaishnavi mjf", role: "Super Admin", district: "317" },
  { username: "mdadmin", password: "password123", name: "Leo Lion A Vaishnavi mjf", role: "MD Admin", district: "317" },
  { username: "distadmin317a", password: "password123", name: "Leo Shruthi K.R.", role: "District Admin", district: "317A" },
  { username: "clubadminrvce", password: "password123", name: "Leo Chethan M.", role: "Club Admin", district: "317A", club: "Leo Club of RVCE" }
];
