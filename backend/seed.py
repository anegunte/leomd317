"""
Seed script to populate MongoDB with initial data from the existing mock data.
Run: python seed.py
"""

from database import db


def seed():
    print("🌱 Seeding LEO MD 317 database...")

    # ── Districts ──
    districts = [
        {
            "id": "317A", "name": "District 317A", "governor": "",
            "president": "Jeevan K.V.", "vp": "Deekshitha D",
            "secretary": "Shashank S. Pawar", "treasurer": "M Bharathi",
            "theme": "Beyond Boundaries", "clubsCount": 16, "membersCount": 340,
            "cabinet": [
                {"id": "a-cab-1", "name": "Jeevan K.V.", "role": "District President", "district": "317A", "club": "Leo Club of Kanakapura", "email": "chirujeevan111@gmail.com", "phone": "+91 9535377931"},
                {"id": "a-cab-2", "name": "Ganavi N", "role": "Immediate Past President", "district": "317A", "club": "Leo Club of Pristine Pride", "email": "ganavin2002@gmail.com", "phone": "+91 9900865685"},
                {"id": "a-cab-3", "name": "Amith P", "role": "District Chairperson", "district": "317A", "club": "Leo Club Bangalore of Naliivu", "email": "amithpanduranga@gmail.com", "phone": "+91 9449502076"},
                {"id": "a-cab-4", "name": "Satish Kumar L", "role": "District Coordinator", "district": "317A", "club": "Leo Club Bangalore of Naliivu", "email": "satishkumar.leelambaram@gmail.com", "phone": "+91 9972199444"},
                {"id": "a-cab-5", "name": "Sandeep M", "role": "District Coordinator", "district": "317A", "club": "Leo Club of Kanakapura", "email": "leosandeepm@yahoo.com", "phone": "+91 9611833491"},
                {"id": "a-cab-6", "name": "Chandrashekar Aaradya", "role": "District Coordinator", "district": "317A", "club": "Leo Club Bangalore of Mahanagar", "email": "chandrashekar1575@gmail.com", "phone": "+91 9902479523"},
                {"id": "a-cab-7", "name": "Deekshitha D", "role": "Vice President", "district": "317A", "club": "Leo Club Bangalore of Host Parivarthan", "email": "deekshithadeepak1990@gmail.com", "phone": "+91 7483004604"},
                {"id": "a-cab-8", "name": "Shashank S. Pawar", "role": "Secretary", "district": "317A", "club": "Leo Club of Sankalpa", "email": "leoshashankspawar@gmail.com", "phone": "+91 9901651441"},
                {"id": "a-cab-9", "name": "Disha Ashwin", "role": "Joint Secretary", "district": "317A", "club": "Leo Club of Centennial Spandana", "email": "dishaaradhya23@gmail.com", "phone": "+91 7760290508"},
                {"id": "a-cab-10", "name": "M Bharathi", "role": "Treasurer", "district": "317A", "club": "Leo Club Bangalore of Host Parivarthan", "email": "bharathimuthuraman31@gmail.com", "phone": "+91 8861941904"},
                {"id": "a-cab-11", "name": "Velu B", "role": "GAT Coordinator", "district": "317A", "club": "Leo Club of SaIt Veerahoysala", "email": "velub9964@gmail.com", "phone": "+91 9964346958"},
                {"id": "a-cab-12", "name": "Arbaaz Hussain", "role": "GMT", "district": "317A", "club": "Leo Club Bangalore of Host Sindhi College", "email": "iarbaazhussain@gmail.com", "phone": "+91 9535006518"},
                {"id": "a-cab-13", "name": "Ananya M", "role": "GLT", "district": "317A", "club": "Leo Club of Sankalpa", "email": "ananyamohan75@gmail.com", "phone": "+91 8296562837"},
                {"id": "a-cab-14", "name": "Shreyas TP", "role": "GST", "district": "317A", "club": "Leo Club of Veerahoysala", "email": "shreyastp8055@gmail.com", "phone": "+91 7204998215"},
                {"id": "a-cab-15", "name": "Dr. Vikhil Chakravarthy SV", "role": "GET", "district": "317A", "club": "Leo Club of Silicon City", "email": "vikhilchakravarthy563125@gmail.com", "phone": "+91 9986456722"},
                {"id": "a-cab-16", "name": "Bhavana", "role": "PRO", "district": "317A", "club": "Leo Club of Neozonites Tempus", "email": "gandhambhavana2906@gmail.com", "phone": "+91 9035826033"},
            ],
        },
        {
            "id": "317B", "name": "District 317B", "governor": "",
            "president": "", "vp": "", "secretary": "", "treasurer": "",
            "theme": "Beyond Boundaries", "clubsCount": 8, "membersCount": 210,
            "cabinet": [],
        },
        {
            "id": "317C", "name": "District 317C", "governor": "",
            "president": "Sanjana Baliga", "vp": "Alanis Sweedal Castelino",
            "secretary": "Loy Winston Fernandes", "treasurer": "Aryan Suvarna",
            "theme": "Beyond Boundaries", "clubsCount": 16, "membersCount": 390,
            "cabinet": [
                {"id": "c-cab-1", "name": "Sanjana Baliga", "role": "District President", "district": "317C", "club": "Leo Club of Parkala", "email": "sanjanabaliga85@gmail.com", "phone": "+91 9964488088"},
                {"id": "c-cab-2", "name": "Ranjitha Shet", "role": "District Chairperson", "district": "317C", "club": "Lions Club Kunjibettu", "email": "dakshranjitha@gmail.com", "phone": "+91 7411341203"},
                {"id": "c-cab-3", "name": "Alanis Sweedal Castelino", "role": "1st Vice President", "district": "317C", "club": "Leo Club of Belman", "email": "alanissweedalcastelino@gmail.com", "phone": "+91 6362936484"},
                {"id": "c-cab-4", "name": "Nandan Kundar", "role": "2nd Vice President", "district": "317C", "club": "Leo Club of Malpe", "email": "beingnandan2005@gmail.com", "phone": "+91 7204264147"},
                {"id": "c-cab-5", "name": "Loy Winston Fernandes", "role": "Secretary", "district": "317C", "club": "Leo Club Moodubelle", "email": "loyfernandes814@gmail.com", "phone": "+91 8604923324"},
                {"id": "c-cab-6", "name": "Spandana Baliga", "role": "Joint Secretary", "district": "317C", "club": "Leo Club of Parkala", "email": "spandanabaliga039@gmail.com", "phone": "+91 9964488088"},
                {"id": "c-cab-7", "name": "Aryan Suvarna", "role": "Treasurer", "district": "317C", "club": "Leo Club of Udupi Amrith", "email": "Aryanbangera874@gmail.com", "phone": "+91 7406641166"},
                {"id": "c-cab-8", "name": "Adithya Shet", "role": "District Advisor", "district": "317C", "club": "Leo Club of Malpe", "email": "shetadithya2@gmail.com", "phone": "+91 9972849594"},
                {"id": "c-cab-9", "name": "Chirag Satish Poojary", "role": "District Advisor", "district": "317C", "club": "Leo Club of Malpe", "email": "chiragspoojary@gmail.com", "phone": "+91 6363581583"},
                {"id": "c-cab-10", "name": "Drithi Hegde", "role": "District Advisor", "district": "317C", "club": "Leo Club of Udupi Indralli", "email": "dhritihhegde@gmail.com", "phone": "+91 9591961530"},
                {"id": "c-cab-11", "name": "Prarthana A Suvarna", "role": "GMT", "district": "317C", "club": "Leo Club of Manipal Valley", "email": "prarthanasuvarna02@gmail.com", "phone": "+91 9880519573"},
                {"id": "c-cab-12", "name": "Abhinav Binesh", "role": "GST", "district": "317C", "club": "Leo Club of Bhramagiri", "email": "abhinowbinesh@gmail.com", "phone": "+91 9483557125"},
                {"id": "c-cab-13", "name": "Joel Nithin Castelino", "role": "GLT", "district": "317C", "club": "Leo Club of Subhashnagar", "email": "joelnithin100@gmail.com", "phone": "+91 9483209146"},
                {"id": "c-cab-14", "name": "Aadya Jayanand", "role": "GET", "district": "317C", "club": "Leo Club of Ambalpady Pride", "email": "adya123@gmail.com", "phone": "+91 7019346170"},
                {"id": "c-cab-15", "name": "Chithali G Shet", "role": "Cultural Coordinator", "district": "317C", "club": "Leo Club of Santhekatte", "email": "jyothishet2015@gmail.com", "phone": "+91 7411911975"},
                {"id": "c-cab-16", "name": "Anika Rai", "role": "PRO", "district": "317C", "club": "Leo Club of Bhramagiri", "email": "vijethaudupi85@gmail.com", "phone": "+91 9113874822"},
            ],
        },
        {
            "id": "317D", "name": "District 317D", "governor": "",
            "president": "Rishal Dsouza", "vp": "Apeksha Neha",
            "secretary": "Ananya Shetty", "treasurer": "Prakyath Hegde K",
            "theme": "Beyond Boundaries", "clubsCount": 10, "membersCount": 290,
            "cabinet": [
                {"id": "d-cab-1", "name": "Rishal Dsouza", "role": "District President", "district": "317D", "club": "Leo Club of Permannur", "email": "rishaldsouza638@gmail.com", "phone": "+91 9180914518"},
                {"id": "d-cab-2", "name": "Charan Alva", "role": "District Chairperson", "district": "317D", "club": "Lions Club of Mangalore Ashoknagara", "email": "charan.guthu@gmail.com", "phone": "+91 9481140726"},
                {"id": "d-cab-3", "name": "Apeksha Neha", "role": "Vice President", "district": "317D", "club": "Leo Club of Kodialbail", "email": "apekshaneha16@gmail.com", "phone": "+91 8431151695"},
                {"id": "d-cab-4", "name": "Ananya Shetty", "role": "Secretary", "district": "317D", "club": "Leo Club of Pumpwell Kalpavraksha", "email": "shettyananya116@gmail.com", "phone": "+91 8073196883"},
                {"id": "d-cab-5", "name": "Apsara HR", "role": "Joint Secretary", "district": "317D", "club": "Leo Club of Belthangadi", "email": ""},
                {"id": "d-cab-6", "name": "Prakyath Hegde K", "role": "Treasurer", "district": "317D", "club": "Leo Club of Moodbidri", "email": "prakyathhegde17@gmail.com", "phone": "+91 9945670579"},
                {"id": "d-cab-7", "name": "Dr. Akshay Shetty", "role": "GMT Coordinator", "district": "317D", "club": "Leo Club of Haleangadi", "email": "akshetty2002@gmail.com", "phone": "+91 8792489092"},
                {"id": "d-cab-8", "name": "Dhanush Shetty", "role": "GST", "district": "317D", "club": "Leo Club of Pumpwell Kalpavraksha", "email": "dhanushrshetty1@gmail.com", "phone": "+91 9035090715"},
                {"id": "d-cab-9", "name": "Shivani S", "role": "GET", "district": "317D", "club": "Leo Club of Kodialbail", "email": "shivaninaik31303@gmail.com", "phone": "+91 7483277811"},
                {"id": "d-cab-10", "name": "Lean Aquinas", "role": "GLT", "district": "317D", "club": "Leo Club of Mangalore", "email": "leanaquinas@gmail.com", "phone": "+91 8296823291"},
            ],
        },
        {
            "id": "317E", "name": "District 317E", "governor": "",
            "president": "A Lavanya", "vp": "Varuna M",
            "secretary": "Jahnavi C", "treasurer": "Varsha P",
            "theme": "Beyond Boundaries", "clubsCount": 10, "membersCount": 230,
            "cabinet": [
                {"id": "e-cab-1", "name": "A Lavanya", "role": "District President", "district": "317E", "club": "Leo Club of Someshwarapura Legacy", "email": "lavanyaananthraj@gmail.com", "phone": "+91 9535031229"},
                {"id": "e-cab-2", "name": "Sougandhi Golla", "role": "Immediate Past President", "district": "317E", "club": "Leo Club of JL Vriddhi", "email": "sougandhig36@gmail.com", "phone": "+91 6363340244"},
                {"id": "e-cab-3", "name": "Jahnavi C", "role": "Secretary", "district": "317E", "club": "Leo Club of BG Niyama", "email": "jahnavi10504@gmail.com", "phone": "+91 9738875173"},
                {"id": "e-cab-4", "name": "Varuna M", "role": "Vice President", "district": "317E", "club": "Leo Club of JL Vriddhi", "email": "varuna2004mr@gmail.com", "phone": "+91 7892663034"},
                {"id": "e-cab-5", "name": "Varsha P", "role": "Treasurer", "district": "317E", "club": "Leo Club of BG Niyama", "email": "varshapkumar.2004@gmail.com", "phone": "+91 9035817105"},
                {"id": "e-cab-6", "name": "Sanjana S.N", "role": "GAT Coordinator", "district": "317E", "club": "Leo Club of BG Niyama", "email": "sanjjj017@gmail.com", "phone": "+91 7411005119"},
                {"id": "e-cab-7", "name": "Palak Khurana", "role": "GLT", "district": "317E", "club": "Leo Club of JL Vriddhi", "email": "kpalak302@gmail.com", "phone": "+91 7027600687"},
                {"id": "e-cab-8", "name": "Gokul V", "role": "GST", "district": "317E", "club": "Leo Club of Someshwarapura Legacy", "email": "gokulv841@gmail.com", "phone": "+91 9632987691"},
                {"id": "e-cab-9", "name": "Keerthana C", "role": "GMT", "district": "317E", "club": "Leo Club of Vemana", "email": "ckeerthana230@gmail.com", "phone": "+91 9606236866"},
                {"id": "e-cab-10", "name": "N. Rajani Kumar", "role": "GET", "district": "317E", "club": "Leo Club of Future", "email": "rajinikumarnagasetty@gmail.com", "phone": "+91 9347816893"},
            ],
        },
        {
            "id": "317F", "name": "District 317F", "governor": "",
            "president": "Sandhya R", "vp": "Sai Kiran Gowda",
            "secretary": "Luzaina Muskan", "treasurer": "Aqib Feroz",
            "theme": "Beyond Boundaries", "clubsCount": 11, "membersCount": 180,
            "cabinet": [
                {"id": "f-cab-1", "name": "Sandhya R", "role": "District President", "district": "317F", "club": "Leo Club of Akshaya", "email": "sandhyark729@gmail.com", "phone": "+91 8861859195"},
                {"id": "f-cab-2", "name": "Dimanth Charles", "role": "Immediate Past President", "district": "317F", "club": "Leo Club of Yuvakeerthi", "email": "dimanthcharles23@gmail.com", "phone": "+91 9110687160"},
                {"id": "f-cab-3", "name": "Sai Kiran Gowda", "role": "Vice President", "district": "317F", "club": "Leo Club of Vishwa Yuvashakti", "email": "saikirangowda2@gmail.com", "phone": "+91 8618240740"},
                {"id": "f-cab-4", "name": "Luzaina Muskan", "role": "Secretary", "district": "317F", "club": "Leo Club of Achiever's", "email": "Luzainamuskan0@gmail.com", "phone": "+91 6363405760"},
                {"id": "f-cab-5", "name": "Aqib Feroz", "role": "Treasurer", "district": "317F", "club": "Leo Club of Satva", "email": "aqibferoz@hotmail.com", "phone": "+91 9760871040"},
                {"id": "f-cab-6", "name": "Shashank N", "role": "GAT Coordinator", "district": "317F", "club": "Leo Club of NDC", "email": "shashankn238@gmail.com", "phone": "+91 9342511961"},
                {"id": "f-cab-7", "name": "Esha Ramesh", "role": "GMT", "district": "317F", "club": "Leo Club of Asraya", "email": "leoesha20@gmail.com", "phone": "+91 9035923462"},
                {"id": "f-cab-8", "name": "Hafsa Sultana", "role": "GST", "district": "317F", "club": "Leo Club of Achiever's", "email": "hafsasultana990@gmail.com", "phone": "+91 6361145192"},
                {"id": "f-cab-9", "name": "Amrutha N Kumar", "role": "GLT", "district": "317F", "club": "Leo Club of Satva", "email": "amruthankumar888@gmail.com", "phone": "+91 8296293441"},
                {"id": "f-cab-10", "name": "G. Lakshmi Pathi", "role": "GET", "district": "317F", "club": "Leo Club of Akshaya", "email": "glakshmipathi909@gmail.com", "phone": "+91 9912469809"},
                {"id": "f-cab-11", "name": "Bharani Shankar D V", "role": "PRO", "district": "317F", "club": "Leo Club of Akshaya", "email": "bharanishankar2006132@gmail.com", "phone": "+91 9353809107"},
            ],
        },
        {
            "id": "317G", "name": "District 317G", "governor": "",
            "president": "", "vp": "", "secretary": "", "treasurer": "",
            "theme": "Beyond Boundaries", "clubsCount": 8, "membersCount": 200,
            "cabinet": [],
        },
    ]
    db["districts"].delete_many({})
    db["districts"].insert_many(districts)
    print(f"  ✅ Inserted {len(districts)} districts")

    # ── Clubs ──
    clubs = [
        {"id": "club-a1", "name": "Leo Club of Bangalore Elite", "districtId": "317A", "president": "Leo Manoj K.", "secretary": "Leo Navyashree G.", "membersCount": 38, "location": "Bengaluru", "foundedYear": 2018, "socials": {"instagram": "https://instagram.com"}},
        {"id": "club-a2", "name": "Leo Club of RVCE", "districtId": "317A", "president": "Leo Chethan M.", "secretary": "Leo Pallavi R.", "membersCount": 45, "location": "RVCE Campus, Bengaluru", "foundedYear": 2012, "socials": {"instagram": "https://instagram.com"}},
        {"id": "club-a3", "name": "Leo Club of Bangalore South", "districtId": "317A", "president": "Leo Tarun S.", "secretary": "Leo Lakshmi P.", "membersCount": 25, "location": "Jayanagar, Bengaluru", "foundedYear": 2015},
        {"id": "club-b1", "name": "Leo Club of Hubli Kings", "districtId": "317B", "president": "Leo Aditya P.", "secretary": "Leo Sandeep M.", "membersCount": 28, "location": "Hubli", "foundedYear": 2020},
        {"id": "club-b2", "name": "Leo Club of Panaji Premium", "districtId": "317B", "president": "Leo Jessica Dias", "secretary": "Leo Rahul Naik", "membersCount": 32, "location": "Panaji, Goa", "foundedYear": 2016},
        {"id": "club-c1", "name": "Leo Club of Udupi Mid-Town", "districtId": "317C", "president": "Leo Shravan Shetty", "secretary": "Leo Divya K.", "membersCount": 35, "location": "Udupi", "foundedYear": 2014},
        {"id": "club-c2", "name": "Leo Club of Manipal Campus", "districtId": "317C", "president": "Leo Pratik Sharma", "secretary": "Leo Pooja Roy", "membersCount": 52, "location": "Manipal", "foundedYear": 2019},
        {"id": "club-d1", "name": "Leo Club of Mangalore Central", "districtId": "317D", "president": "Leo Sheldon Dsouza", "secretary": "Leo Reena Dsouza", "membersCount": 42, "location": "Mangaluru", "foundedYear": 2010},
        {"id": "club-d2", "name": "Leo Club of Kodagu Heritage", "districtId": "317D", "president": "Leo Machaiah B.", "secretary": "Leo Kavitha K.", "membersCount": 24, "location": "Madikeri", "foundedYear": 2021},
        {"id": "club-e1", "name": "Leo Club of Mysore Royal", "districtId": "317E", "president": "Leo Sanjay Gowda", "secretary": "Leo Nandini S.", "membersCount": 30, "location": "Mysuru", "foundedYear": 2013},
        {"id": "club-f1", "name": "Leo Club of Tumkur Stars", "districtId": "317F", "president": "Leo Sharath Chandra", "secretary": "Leo Deepthi Gowda", "membersCount": 26, "location": "Tumakuru", "foundedYear": 2017},
        {"id": "club-g1", "name": "Leo Club of Belgaum Pioneers", "districtId": "317G", "president": "Leo Sourabh P.", "secretary": "Leo Ashwini Patil", "membersCount": 31, "location": "Belagavi", "foundedYear": 2018},
    ]
    db["clubs"].delete_many({})
    db["clubs"].insert_many(clubs)
    print(f"  ✅ Inserted {len(clubs)} clubs")

    # ── Projects ──
    projects = [
        {"id": "proj-1", "title": "Vidyadhana: Empowering Underprivileged Scholars", "category": "Education", "description": "Distributed textbook kits, learning accessories, and basic calculators to 1,200 government school students, alongside hosting interactive sessions on science, basic coding, and dynamic career opportunities.", "impactMetrics": {"beneficiaries": 1200, "volunteerHours": 180, "fundsRaised": 75000}, "photos": ["https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600", "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600"], "district": "317A", "club": "Leo Club of RVCE", "date": "2026-04-12"},
        {"id": "proj-2", "title": "Rakta-Dhaan 2026 Mega Blood Drive", "category": "Healthcare", "description": "Collaborated with local Red Cross and government hospitals to organize a centralized blood donation campaign, successfully accumulating 350 units of blood in a single day.", "impactMetrics": {"beneficiaries": 1050, "volunteerHours": 90, "bloodUnits": 350}, "photos": ["https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600"], "district": "317C", "club": "Leo Club of Udupi Mid-Town", "date": "2026-05-18"},
        {"id": "proj-3", "title": "Eco-Pulse: Urban Afforestation & Seedball Drive", "category": "Environment", "description": "Planted 500 saplings across public parks and forest buffers in North Bengaluru, and dispersed over 2,000 native species seedballs to aid rural reforestation.", "impactMetrics": {"beneficiaries": 5000, "volunteerHours": 240, "treesPlanted": 500}, "photos": ["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600", "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=600"], "district": "317A", "club": "Leo Club of Bangalore Elite", "date": "2026-05-05"},
        {"id": "proj-4", "title": "MindMatters: High School Mental Health Forums", "category": "Mental Health", "description": "Conducted stress management, digital addiction awareness, and confidence workshops for senior students in partnership with professional youth psychologists.", "impactMetrics": {"beneficiaries": 450, "volunteerHours": 60}, "photos": ["https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600"], "district": "317D", "club": "Leo Club of Mangalore Central", "date": "2026-03-20"},
        {"id": "proj-5", "title": "Annam: Community Hunger Relief", "category": "Hunger Relief", "description": "Coordinated distribution of nutritious hot meals, fresh fruits, and clean drinking water to over 800 daily wage laborers and homeless individuals across transit centers.", "impactMetrics": {"beneficiaries": 800, "volunteerHours": 40, "fundsRaised": 25000}, "photos": ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600"], "district": "317E", "club": "Leo Club of Mysore Royal", "date": "2026-02-14"},
        {"id": "proj-6", "title": "Tejaswini: Women's Hygiene & Self-Defense Bootcamps", "category": "Women Empowerment", "description": "Distributed over 1,500 biodegradable sanitary napkins and organized intensive 3-day basic martial arts and safety workshops in girls' degree colleges.", "impactMetrics": {"beneficiaries": 1500, "volunteerHours": 120, "fundsRaised": 40000}, "photos": ["https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600"], "district": "317F", "club": "Leo Club of Tumkur Stars", "date": "2026-05-10"},
        {"id": "proj-7", "title": "Flood Relief Mission: Coastal Flood Support", "category": "Disaster Relief", "description": "Mobilized dry rations, clothing, blankets, and essential medications to over 300 families affected by flash floods along coastal inlets.", "impactMetrics": {"beneficiaries": 1200, "volunteerHours": 320, "fundsRaised": 180000}, "photos": ["https://images.unsplash.com/photo-1469571486040-7a9b1373c402?auto=format&fit=crop&q=80&w=600"], "district": "317B", "club": "Leo Club of Panaji Premium", "date": "2026-01-08"},
        {"id": "proj-8", "title": "LeadNext: Youth Leadership Forum", "category": "Youth Leadership", "description": "Hosted a centralized residential youth leadership summit bringing together 150 top Leo leaders to hone public speaking, project management, and team conflict resolution skills.", "impactMetrics": {"beneficiaries": 150, "volunteerHours": 400, "fundsRaised": 120000}, "photos": ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"], "district": "317G", "club": "Leo Club of Belgaum Pioneers", "date": "2026-05-24"},
    ]
    db["projects"].delete_many({})
    db["projects"].insert_many(projects)
    print(f"  ✅ Inserted {len(projects)} projects")

    # ── Events ──
    events = [
        {"id": "evt-1", "title": "Leo Multiple District 317 Annual Conference 'Boundless'", "description": "The biggest youth leadership convention in the region. Features interactive panels with top global leaders, installations of the incoming cabinet, rewards distributions, and community impact discussions.", "date": "2026-07-11T09:00:00Z", "location": "Golden Grand Castle Convention, Bengaluru", "poster": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600", "registrationLink": "https://forms.gle/sample", "organizingTeam": "Multiple District Cabinet 317", "district": "317", "status": "upcoming"},
        {"id": "evt-2", "title": "Interactive Youth Leadership Bootcamp", "description": "A comprehensive weekend workshop focused on equipping new club officers with financial management, public speaking, and project leadership capabilities.", "date": "2026-06-25T10:00:00Z", "location": "Senate Hall, Mangalore University", "poster": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600", "registrationLink": "https://forms.gle/sample", "organizingTeam": "District 317D Cabinet", "district": "317D", "status": "upcoming"},
        {"id": "evt-3", "title": "Green Hearts Eco-Walkathon", "description": "Join hundreds of citizens walking to raise awareness about urban biodiversity conservation. Trees saplings will be gifted to all registered participants.", "date": "2026-06-14T06:30:00Z", "location": "Kanteerava Stadium, Bengaluru", "poster": "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600", "registrationLink": "https://forms.gle/sample", "organizingTeam": "Leo Club of Bangalore Elite & RVCE", "district": "317A", "status": "upcoming"},
        {"id": "evt-4", "title": "Youth Tech For Good Ideathon", "description": "A coding and product design hackathon to prototype digital solutions for local waste management and traffic challenges.", "date": "2026-05-15T09:00:00Z", "location": "PES University Auditorium, Bengaluru", "poster": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600", "organizingTeam": "Leo Club of RVCE", "district": "317A", "status": "past", "attendeesCount": 220},
        {"id": "evt-5", "title": "Leo District 317C Officer Training School (OTS)", "description": "Annual intensive training program for newly elected club Presidents, Secretaries, and Treasurers to coordinate service strategies.", "date": "2026-05-02T10:00:00Z", "location": "Hotel Ocean Pearl, Udupi", "poster": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600", "organizingTeam": "District 317C Cabinet", "district": "317C", "status": "past", "attendeesCount": 140},
    ]
    db["events"].delete_many({})
    db["events"].insert_many(events)
    print(f"  ✅ Inserted {len(events)} events")

    # ── Media ──
    media = [
        {"id": "med-1", "url": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800", "thumbnail": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400", "type": "photo", "category": "Conferences", "title": "MD 317 Executive Meet", "district": "317"},
        {"id": "med-2", "url": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800", "thumbnail": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400", "type": "photo", "category": "Youth Leadership", "title": "Residential Leadership Seminar", "district": "317G"},
        {"id": "med-3", "url": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800", "thumbnail": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400", "type": "photo", "category": "Service Projects", "title": "Vidyadhana Book Distribution", "district": "317A"},
        {"id": "med-4", "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800", "thumbnail": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400", "type": "photo", "category": "Service Projects", "title": "Eco-Pulse Reforestation Drive", "district": "317A"},
        {"id": "med-5", "url": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", "thumbnail": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400", "type": "photo", "category": "Installations", "title": "317C Officers Installation Night", "district": "317C"},
    ]
    db["media"].delete_many({})
    db["media"].insert_many(media)
    print(f"  ✅ Inserted {len(media)} media items")

    # ── MD Cabinet ──
    md_cabinet = [
        {"id": "md-1", "name": "Leo Lion A Vaishnavi mjf", "role": "Multiple District Leo President", "district": "317F", "club": "Leo Club of Satva", "email": "vaishnavianegunte@gmail.com", "phone": "+91 9886633259"},
        {"id": "md-2", "name": "Leo Lion Kiran Bijoor", "role": "Immediate Past Multiple District Leo President", "district": "317A", "club": "Leo Club of Padmanabhnagar", "email": "kirusavi97@gmail.com", "phone": "+91 7026495863"},
        {"id": "md-3", "name": "Leo Lion Sameeksha Rhea", "role": "Multiple District Leo Vice President", "district": "317D", "club": "Leo Club Mangalore Kodialbail", "email": "sameeksharhealeo@gmail.com", "phone": "+91 7349143491"},
        {"id": "md-4", "name": "Leo Lion Vaishnavi Mohan", "role": "Multiple District Leo Secretary", "district": "317E", "club": "Leo Club JL Vriddhi", "email": "vaishnavimohan2501@gmail.com", "phone": "+91 6366634559"},
        {"id": "md-5", "name": "Leo Chirag Sathish Poojary", "role": "Multiple District Treasurer", "district": "317C", "club": "Leo Club of Malpe", "email": "chiragspoojary@gmail.com", "phone": "+91 6363581583"},
        {"id": "md-6", "name": "Leo Vijay S", "role": "Multiple District Joint Secretary", "district": "317A", "club": "Leo Club of Parivarthan", "email": "vijayy2615@gmail.com", "phone": "+91 9739899070"},
        {"id": "md-7", "name": "Leo Lion Shrinidhi Shetty", "role": "Multiple District GAT", "district": "317D", "club": "Leo Club of Mangaladevi", "email": "shrinidhishetty623@gmail.com", "phone": "+91 9148016526"},
        {"id": "md-8", "name": "Leo Vikas Gowda", "role": "Multiple District GMT", "district": "317A", "club": "Leo Club of Parivarthan", "email": "vikigowdarp@gmail.com", "phone": "+91 9108581479"},
        {"id": "md-9", "name": "Leo Lion Sougandhi Golla", "role": "Multiple District GLT", "district": "317E", "club": "Leo Club of JL Vriddhi", "email": "sougandhig36@gmail.com", "phone": "+91 6363340244"},
        {"id": "md-10", "name": "Leo Soujanya Shashidhar Allalli", "role": "Multiple District Leo GST", "district": "317B", "club": "Leo Club of Hubballi", "email": "soujanyashashidhar04@gmail.com", "phone": "+91 6361267986"},
    ]
    db["md_cabinet"].delete_many({})
    db["md_cabinet"].insert_many(md_cabinet)
    print(f"  ✅ Inserted {len(md_cabinet)} MD cabinet members")

    # ── Site Settings (hero, president's address, etc.) ──
    site_settings = {
        "_type": "site_settings",
        "heroTitle1": "BEYOND",
        "heroTitle2": "BOUNDARIES",
        "heroSubtitle1": "Leading with Purpose.",
        "heroSubtitle2": "Serving without Limits.",
        "heroYear": "MD 317  |  2026-27",
        "presidentName": "Leo Lion A Vaishnavi mjf",
        "presidentTitle": "Multiple District Leo President 2026-27",
        "presidentMessage": "Our vision this year is to push ourselves beyond every boundary that limits service. Every district, every club, every Leo is a force multiplier. Together, we will create a legacy of impact that echoes across Karnataka, Goa, and beyond.",
        "presidentPhoto": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    }
    db["site_settings"].delete_many({})
    db["site_settings"].insert_one(site_settings)
    print("  ✅ Inserted site settings")

    # ── Impact Counters ──
    counters = [
        {"id": "cnt-1", "label": "Active Leo Clubs", "value": 79, "icon": "Users"},
        {"id": "cnt-2", "label": "Service Campaigns", "value": 186, "icon": "FolderHeart"},
        {"id": "cnt-3", "label": "Districts Covered", "value": 7, "icon": "Map"},
        {"id": "cnt-4", "label": "Volunteer Hours", "value": 12450, "icon": "Clock"},
        {"id": "cnt-5", "label": "Active Leos", "value": 1840, "icon": "Sparkles"},
        {"id": "cnt-6", "label": "Blood Units Collected", "value": 850, "icon": "Droplet"},
        {"id": "cnt-7", "label": "Trees Planted", "value": 2200, "icon": "Trees"},
        {"id": "cnt-8", "label": "Beneficiaries Served", "value": 18750, "icon": "Play"},
    ]
    db["impact_counters"].delete_many({})
    db["impact_counters"].insert_many(counters)
    print(f"  ✅ Inserted {len(counters)} impact counters")

    # ── Activity Ticker ──
    ticker = [
        {"id": "tick-1", "text": "District 317A completed a blood donation drive (120 units)"},
        {"id": "tick-2", "text": "District 317D planted 500 saplings in Kodagu"},
        {"id": "tick-3", "text": "District 317F conducted youth leadership training for 50 Leos"},
        {"id": "tick-4", "text": "District 317B organized educational outreach in Belagavi"},
        {"id": "tick-5", "text": "District 317C distributed 150 health kits in Udupi"},
        {"id": "tick-6", "text": "District 317E completed lake cleanup in Mysuru"},
        {"id": "tick-7", "text": "District 317G set up a primary care medical camp"},
    ]
    db["ticker_items"].delete_many({})
    db["ticker_items"].insert_many(ticker)
    print(f"  ✅ Inserted {len(ticker)} ticker items")

    # ── Stories ──
    stories = [
        {"id": "story-1", "tag": "Go green campaign", "title": "Kodagu Reforestation", "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600"},
        {"id": "story-2", "tag": "Health Outreach", "title": "Udupi Welfare Drive", "image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600"},
        {"id": "story-3", "tag": "Leadership summit", "title": "Cabinet Induction 2026", "image": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600"},
    ]
    db["stories"].delete_many({})
    db["stories"].insert_many(stories)
    print(f"  ✅ Inserted {len(stories)} stories")

    # ── About Page Content ──
    about = {
        "_type": "about",
        "leoInternationalTitle": "About LEO Clubs International",
        "leoInternationalContent": [
            "Sponsored by Lions Clubs International, the LEO Club Program provides youth around the world with an opportunity to development and contribution, both individually and collectively, as responsible members of their local, national, and international community.",
            "The letters L-E-O stand for Leadership, Experience, and Opportunity. Through organizing community projects, managing club structures, and cooperating with senior Lions advisors, Leos gain core project management skills and cultivate lifelong relationships.",
        ],
        "leoInternationalFooter": "Sponsored by Lions Clubs International \u2022 Serving since 1957",
        "md317Title": "About Multiple District 317",
        "md317Content": [
            "Leo Multiple District 317 constitutes the administrative union of seven distinct LEO Districts (317A to 317G) covering the geographical landscape of Karnataka, Goa and parts of Andhra Pradesh. Our membership spans thousands of active youth volunteers operating in over 60 campus and community clubs.",
            "With a storied history of organizing large-scale health camps, dynamic environmental campaigns, blood drives, and youth training summits, MD 317 is recognized as one of the most active and organized Multiple Districts globally. We focus on bridging the gap between young energy and structured, scalable community development.",
        ],
        "md317Footer": "Encompassing Districts 317A-G \u2022 Serving Karnataka & Goa",
        "themeYear": "2026-27",
        "themeName": "Beyond Boundaries",
        "themeDescription": "Unpacking the guiding philosophy behind our leadership execution, service campaigns, and digital footprint.",
    }
    db["about_content"].delete_many({})
    db["about_content"].insert_one(about)
    print("  ✅ Inserted about page content")

    # ── Theme Pillars ──
    pillars = [
        {"id": "pillar-1", "title": "Beyond Boundaries of Geography", "description": "We bridge borders across 7 distinct administrative districts. From coastal inlets to urban centers, our projects unify communities and extend support wherever a need arises.", "icon": "Globe2", "color": "from-gold-primary to-gold-hover"},
        {"id": "pillar-2", "title": "Beyond Boundaries of Service", "description": "Service is not just a checkbox; it is our heartbeat. We address complex needs, ranging from urban afforestation and health support to hunger relief and digital learning kits.", "icon": "Target", "color": "from-silver-primary to-white"},
        {"id": "pillar-3", "title": "Beyond Boundaries of Leadership", "description": "We are incubators for future systems-thinkers and public servants. Our members take absolute ownership of budgets, projects, and district cabinets, developing actual leadership capacity.", "icon": "Shield", "color": "from-gold-light to-gold-primary"},
        {"id": "pillar-4", "title": "Beyond Boundaries of Innovation", "description": "We utilize advanced tech stacks, AI copywriting, and interactive service analytics to coordinate efforts. We bring startup-level execution and digital tracking to youth philanthropy.", "icon": "Lightbulb", "color": "from-silver-light to-silver-dark"},
    ]
    db["theme_pillars"].delete_many({})
    db["theme_pillars"].insert_many(pillars)
    print(f"  ✅ Inserted {len(pillars)} theme pillars")

    # ── Lion Cabinet ──
    lion_cabinet = [
        {"id": "lion-1", "name": "Lion M.S. Ramesh", "role": "Multiple District Chairperson", "district": "317", "club": "Lions Club of Bangalore", "email": "msramesh@lions317.org", "phone": "+91 9845012345"},
        {"id": "lion-2", "name": "Lion Dr. Kavitha Rao", "role": "Council Chairperson", "district": "317", "club": "Lions Club of Mysuru Heritage", "email": "kavitha.rao@lions317.org", "phone": "+91 9876543210"},
        {"id": "lion-3", "name": "Lion Prakash Shetty", "role": "MD Leo Advisor", "district": "317A", "club": "Lions Club of Mangalore", "email": "prakash.shetty@lions317.org", "phone": "+91 9845067890"},
        {"id": "lion-4", "name": "Lion Sunita Kulkarni", "role": "MD Leo Coordinator", "district": "317B", "club": "Lions Club of Hubli", "email": "sunita.k@lions317.org", "phone": "+91 9900123456"},
        {"id": "lion-5", "name": "Lion Raghavendra Nayak", "role": "District Leo Advisor 317A", "district": "317A", "club": "Lions Club of Bangalore South", "email": "raghu.nayak@lions317.org", "phone": "+91 9845098765"},
        {"id": "lion-6", "name": "Lion Meena Hegde", "role": "District Leo Advisor 317C", "district": "317C", "club": "Lions Club of Shimoga", "email": "meena.hegde@lions317.org", "phone": "+91 9886654321"},
    ]
    db["lion_cabinet"].delete_many({})
    db["lion_cabinet"].insert_many(lion_cabinet)
    print(f"  ✅ Inserted {len(lion_cabinet)} Lion Cabinet members")

    print("\n🎉 Database seeded successfully!")


if __name__ == "__main__":
    seed()
