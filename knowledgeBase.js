/**
 * knowledgeBase.js
 * Complete local rule-based chatbot engine for Sharda University Agra (SUA).
 * 
 * Pure JavaScript, zero external dependencies.
 * Fully compatible with Vite / ES modules.
 */

// Module-level conversation state tracker
const sessionState = {
  lastIntent: null,
  lastCategory: null,
  contextData: {}
};

/**
 * Normalizes text: lowercases, trims, and cleans non-alphanumeric characters.
 */
function normalizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculates Levenshtein distance between two strings for fuzzy matching.
 */
function levenshteinDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const row = [];
  for (let j = 0; j <= n; j++) row[j] = j;

  for (let i = 1; i <= m; i++) {
    let prev = i;
    for (let j = 1; j <= n; j++) {
      let val;
      if (s1[i - 1] === s2[j - 1]) {
        val = row[j - 1];
      } else {
        val = 1 + Math.min(row[j - 1], prev, row[j]);
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[n] = prev;
  }
  return row[n];
}

/**
 * Computes word similarity score (0 to 1) accounting for typos and prefixes.
 */
function wordSimilarity(w1, w2) {
  if (w1 === w2) return 1.0;
  if (!w1 || !w2) return 0.0;

  // Prefix match for longer roots
  if (w1.length >= 4 && w2.length >= 4) {
    if (w1.startsWith(w2) || w2.startsWith(w1)) return 0.9;
  }

  const maxLen = Math.max(w1.length, w2.length);
  if (maxLen === 0) return 1.0;
  const dist = levenshteinDistance(w1, w2);

  // Allow 1 typo for short words, 2 for medium, 3 for long
  const maxAllowedDist = maxLen <= 4 ? 1 : (maxLen <= 7 ? 2 : 3);
  if (dist <= maxAllowedDist) {
    return 1 - (dist / maxLen);
  }
  return 0.0;
}

/**
 * Common stopwords to skip during single-word matching.
 */
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'am', 'be', 'been',
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about', 'from',
  'i', 'me', 'my', 'we', 'our', 'you', 'your', 'it', 'its', 'they',
  'do', 'does', 'did', 'can', 'could', 'will', 'would', 'should',
  'what', 'which', 'who', 'whom', 'where', 'when', 'how', 'why',
  'tell', 'give', 'show', 'know', 'want', 'please', 'thanks'
]);

/**
 * Knowledge Base containing 36+ categorized Q&A intents for Sharda University Agra.
 */
const KNOWLEDGE_BASE = [
  // 1. Greetings
  {
    id: 'greetings',
    category: 'Greetings',
    keywords: [
      'hello', 'hi', 'hey', 'heya', 'hola', 'namaste', 'good morning', 
      'good afternoon', 'good evening', 'greetings', 'whats up', 'howdy',
      'hello suai', 'hi suai', 'hey there'
    ],
    response: `Hello there! 👋 Welcome to **Sharda University Agra (SUA)**!

I'm **SUAi**, your smart campus assistant. Whether you're curious about admissions, courses, campus facilities, placements, or student life, I'm here to help.

What would you like to know today? 😊`,
    suggestions: [
      'Tell me about admissions',
      'What courses are available?',
      'Where is the campus located?',
      'How are the placements?'
    ]
  },

  // 2. Bot Identity
  {
    id: 'bot_identity',
    category: 'Bot Identity',
    keywords: [
      'who are you', 'what are you', 'your name', 'who made you', 
      'what can you do', 'tell me about yourself', 'are you ai', 
      'are you a bot', 'what is suai', 'suai'
    ],
    response: `I'm **SUAi** 🤖 — the official virtual AI assistant for **Sharda University Agra (SUA)**!

I'm designed to help prospective students, parents, and visitors navigate:
* 🎓 **Academic Programs** (B.Tech, MBA, BCA, Pharmacy, B.Sc, etc.)
* 📝 **Admissions & Eligibility** procedures
* 🏫 **50+ Acre Campus Infrastructure** & facilities
* 💼 **Placement Records** & top recruiting companies
* 📍 **Campus Location** & official contact details

Feel free to ask me anything about life and learning at Sharda Agra!`,
    suggestions: [
      'What programs are offered?',
      'How do I apply for admission?',
      'Tell me about campus facilities',
      'Show official contact info'
    ]
  },

  // 3. General Information & Overview
  {
    id: 'general_info',
    category: 'General Info',
    keywords: [
      'what is sharda', 'tell me about sharda', 'tell me about sua', 
      'about sharda university agra', 'overview', 'about campus', 
      'anand campus', 'sua overview', 'history of campus', 'facts about sua',
      'university profile'
    ],
    response: `🏛️ **Sharda University Agra (SUA)** — *Formerly known as Anand Campus*

SUA is a premier academic institution in Uttar Pradesh offering world-class education backed by the renowned Sharda legacy.

**Key Highlights at a Glance:**
* 🌳 **50+ Acre Lush Green Campus** equipped with ultra-modern infrastructure
* 🌐 **Global Reach**: 95+ countries represented across the Sharda network
* 👨‍🏫 **200+ Experienced Faculty Members** including international and industry adjunct faculty
* 🎓 **2,500+ Active Students** thriving on campus
* 📚 **40+ Undergraduate, Postgraduate & Diploma Programs**
* 🤝 **81+ MOUs** with leading global universities and corporate partners
* 📜 **NEP 2020 Implemented**: Flexible, multidisciplinary curriculum
* 🚀 **Sharda Launchpad**: Robust startup incubation & entrepreneurship support
* 👥 **90,000+ Strong Alumni Network** worldwide

Would you like to explore our schools, programs, or admission details?`,
    suggestions: [
      'What schools are available?',
      'Tell me about admissions',
      'Where is the campus located?',
      'Tell me about placements'
    ]
  },

  // 4. Campus Location & Address
  {
    id: 'location',
    category: 'Location',
    keywords: [
      'where is', 'location', 'address', 'located', 'where is campus', 
      'where is sharda agra', 'how to reach', 'directions', 'keetham', 
      'nh 19', 'distance from agra', 'city location', 'pin code'
    ],
    response: `📍 **Campus Location & Address — Sharda University Agra:**

Our serene, 50+ acre campus is situated right on the Agra-Mathura National Highway:

📌 **Address:**  
**18 KM from Bhagwan Talkies, Agra-Mathura, NH 19, Keetham, Agra – 282007, Uttar Pradesh, India.**  
*(Formerly known as Anand Campus)*

**Connectivity:**
* 🚗 Easily accessible by private vehicles, city buses, and taxis along NH 19
* 🚆 Well connected to Agra Cantt and Raja Ki Mandi railway stations
* 🌳 Situated near the tranquil Keetham Lake bird sanctuary area, providing a peaceful learning environment

Are you planning an on-campus visit?`,
    suggestions: [
      'What are the campus facilities?',
      'What are the contact details?',
      'How to apply for admission?',
      'Tell me about hostel facilities'
    ]
  },

  // 5. Official Website
  {
    id: 'website',
    category: 'Website',
    keywords: [
      'website', 'official website', 'portal', 'url', 'web page', 
      'link', 'site', 'online portal', 'where to visit online'
    ],
    response: `🌐 **Official Website of Sharda University Agra:**

You can visit our official portal here:  
👉 **[https://www.agra.sharda.ac.in](https://www.agra.sharda.ac.in)**

On the official website, you can:
* 📝 Fill out online application forms
* 📑 Download detailed program brochures and syllabi
* 💰 View updated fee schedules and seat matrices
* 📢 Check latest campus notices and entrance exam alerts`,
    suggestions: [
      'How to apply for admission?',
      'What is the contact number?',
      'What courses are offered?',
      'Tell me about scholarships'
    ]
  },

  // 6. Admissions - General Process
  {
    id: 'admissions_general',
    category: 'Admissions',
    keywords: [
      'admission', 'how to apply', 'admission process', 'apply now', 
      'admission procedure', 'get admission', 'enrol', 'enrollment', 
      'join sua', 'apply online', 'form', 'application form'
    ],
    response: `🎯 **Admission Process at Sharda University Agra:**

Joining SUA is straightforward! Here is the standard 4-step process:

1. **Online Registration:** Visit our portal at **[agra.sharda.ac.in](https://www.agra.sharda.ac.in)** and register with your basic details.
2. **Application Submission:** Fill out the academic details and select your preferred course.
3. **Entrance / Eligibility Assessment:** Appear for the **SUAT** (Sharda University Admission Test) or submit valid national test scores (such as JEE / CUET / MAT / CAT, where applicable).
4. **Document Verification & Confirmation:** Submit required academic documents and complete fee payment to confirm your seat.

💡 *Note:* Exact seat availability, deadlines, and criteria vary by program. Please check the website or reach our admission helpline at **+91-120-6879222**.`,
    suggestions: [
      'What documents are required for admission?',
      'Tell me about entrance exams',
      'What are the available courses?',
      'Are scholarships available?'
    ]
  },

  // 7. Admissions - Documents Required
  {
    id: 'admissions_documents',
    category: 'Admissions',
    keywords: [
      'documents required', 'documents', 'required docs', 'certificates needed', 
      'what documents', 'document checklist', 'papers required', 'verification docs'
    ],
    response: `📄 **Documents Required for Admission Verification:**

Please keep self-attested copies and originals ready during admission confirmation:

* 🎓 **10th Mark Sheet & Passing Certificate** (for date of birth verification)
* 📜 **12th Mark Sheet & Passing Certificate** (for UG programs)
* 🎓 **Graduation Degree & Marksheets** (for PG programs like MBA, MCA, M.Tech, M.Pharm)
* 🆔 **Valid Government Photo ID Proof** (Aadhaar Card, Passport, or Voter ID)
* 📸 **Recent Passport Size Photographs** (4-6 copies)
* 📑 **Transfer Certificate (TC) & Migration Certificate**
* 🏅 **Entrance Exam Scorecard** (SUAT / JEE / CUET, if applicable)
* 🎖️ **Category / Caste Certificate** (if claiming applicable quota or scholarship)

Would you like to know about eligibility requirements or the entrance exam?`,
    suggestions: [
      'Tell me about the SUAT entrance exam',
      'How do I apply online?',
      'What are the scholarship options?',
      'What courses are available?'
    ]
  },

  // 8. Admissions - Entrance Exam & Eligibility
  {
    id: 'admissions_entrance',
    category: 'Admissions',
    keywords: [
      'entrance exam', 'suat', 'eligibility', 'eligibility criteria', 
      'sharda entrance', 'jee', 'cuet', 'cut off', 'qualifying marks', 
      'entrance test', 'is entrance exam required'
    ],
    response: `📝 **Entrance Exams & Eligibility Criteria at SUA:**

* **SUAT (Sharda University Admission Test):** A comprehensive online admission test assessing aptitude, logical reasoning, and subject foundations.
* **National Score Acceptance:** Valid scores in recognized tests (such as **JEE Main** for B.Tech, **CAT/MAT/XAT** for MBA, **CUET** for various UG courses) may qualify candidates for direct admission or exemption from SUAT.
* **Basic Eligibility:**
  * **Undergraduate (B.Tech, B.Sc, BCA):** Minimum 50% aggregate marks in 10+2 from a recognized board with relevant subjects (PCM/PCB).
  * **Postgraduate (MBA, MCA, M.Tech):** Bachelor's degree in a relevant discipline with at least 50% aggregate marks.
  * **Pharmacy (B.Pharm, D.Pharm):** 10+2 with Physics, Chemistry, and Math/Biology.

*Note: Strict eligibility percentages and exemption criteria are updated annually on the [official website](https://www.agra.sharda.ac.in).*`,
    suggestions: [
      'How do I apply online?',
      'What documents are needed?',
      'Tell me about B.Tech CSE',
      'What are the scholarship criteria?'
    ]
  },

  // 9. Courses / Programs Overview
  {
    id: 'courses_overview',
    category: 'Courses/Programs',
    keywords: [
      'courses', 'programs', 'degrees', 'available courses', 'what courses', 
      'all programs', 'ug courses', 'pg courses', 'diploma courses', 
      'what can i study', 'course list', 'programs offered'
    ],
    response: `📚 **Academic Programs Offered at Sharda University Agra:**

SUA offers **40+ industry-aligned programs** across leading domains:

💻 **Engineering & Technology:**
* B.Tech (Computer Science & Engineering, Artificial Intelligence & Machine Learning, IT)
* BCA & MCA
* M.Tech

💼 **Business & Commerce:**
* BBA, MBA, Executive MBA (EMBA), B.Com

💊 **Pharmacy:**
* B.Pharm (Bachelor of Pharmacy)
* M.Pharm (Master of Pharmacy)
* D.Pharm (Diploma in Pharmacy)

🔬 **Applied Sciences & Design:**
* B.Sc (Artificial Intelligence, Cyber Security, Data Science, Agriculture)
* B.Design (Bachelor of Design)
* Humanities & Social Sciences

Which specific field would you like to explore?`,
    suggestions: [
      'Tell me about B.Tech CSE and AI/ML',
      'Tell me about MBA & Business Studies',
      'Tell me about Pharmacy programs',
      'Tell me about B.Sc Data Science & Cyber Security'
    ]
  },

  // 10. Courses - B.Tech & Computer Science
  {
    id: 'courses_btech',
    category: 'Courses/Programs',
    keywords: [
      'btech', 'b tech', 'engineering', 'cse', 'computer science', 
      'ai and ml', 'artificial intelligence', 'machine learning', 
      'information technology', 'btech cse', 'btech ai', 'software engineering'
    ],
    response: `💻 **B.Tech Programs at Sharda University Agra:**

Our School of Engineering & Technology delivers cutting-edge technical education focused on real-world engineering skills:

**Key Specializations Offered:**
* 🧠 **B.Tech in Artificial Intelligence & Machine Learning (AI & ML)**
* 💻 **B.Tech in Computer Science & Engineering (CSE)**
* 🌐 **B.Tech in Information Technology (IT)**

**Highlights:**
* Hands-on laboratory training with modern computing clusters
* Curriculum aligned with National Education Policy (**NEP 2020**)
* Industry Adjunct Faculty and project-based learning
* Strong placement record with tech giants like **TCS, Wipro, Infosys, and Gemini Solutions**

Would you like to know about B.Tech eligibility or the admission procedure?`,
    suggestions: [
      'How to apply for B.Tech?',
      'What are the placement opportunities?',
      'Tell me about BCA & MCA',
      'What are the lab facilities?'
    ]
  },

  // 11. Courses - BCA & MCA
  {
    id: 'courses_bca_mca',
    category: 'Courses/Programs',
    keywords: [
      'bca', 'mca', 'computer applications', 'bachelor of computer applications', 
      'master of computer applications', 'coding courses', 'software programming'
    ],
    response: `🖥️ **BCA & MCA Programs at Sharda University Agra:**

Designed for students aspiring to build rewarding careers in software development, cloud computing, and IT solutions:

* **BCA (Bachelor of Computer Applications):** 3-year undergraduate program covering full-stack web development, Python, Java, database management, and cloud basics.
* **MCA (Master of Computer Applications):** 2-year postgraduate program diving into advanced enterprise computing, software architecture, mobile application development, and data analytics.

**Why choose BCA/MCA at SUA?**
* Modern high-tech computer labs with campus-wide high-speed Wi-Fi
* Practical industry internships and hackathon participation
* Active placement cell connecting graduates with 600+ recruiting companies`,
    suggestions: [
      'How to apply for BCA/MCA?',
      'Tell me about placements',
      'What is the fee structure?',
      'Tell me about campus labs'
    ]
  },

  // 12. Courses - Management & Business (BBA / MBA / B.Com)
  {
    id: 'courses_management',
    category: 'Courses/Programs',
    keywords: [
      'mba', 'bba', 'emba', 'bcom', 'business', 'management', 
      'business studies', 'bba course', 'mba course', 'executive mba', 
      'marketing', 'finance', 'hr'
    ],
    response: `📈 **School of Business Studies at SUA:**

Empowering future business leaders and entrepreneurs through experiential learning, case studies, and corporate mentorship:

**Programs Offered:**
* 🎓 **BBA (Bachelor of Business Administration):** Solid foundation in corporate management, finance, marketing, and human resources.
* 🎓 **MBA (Master of Business Administration):** Flagship postgraduate program with dual specializations, live industry projects, and corporate internships.
* 👔 **EMBA (Executive MBA):** Tailored for working professionals looking to accelerate their managerial leadership.
* 📊 **B.Com (Bachelor of Commerce):** Comprehensive accounting, taxation, and financial analysis.

**Highlights:**
* Incubation support via **Sharda Launchpad**
* Guest lectures by corporate CXOs and industry leaders
* Dedicated placement preparation and campus recruitment`,
    suggestions: [
      'What companies hire MBA graduates?',
      'How to apply for MBA?',
      'Tell me about Sharda Launchpad',
      'What is the fee policy?'
    ]
  },

  // 13. Courses - Pharmacy (B.Pharm, M.Pharm, D.Pharm)
  {
    id: 'courses_pharmacy',
    category: 'Courses/Programs',
    keywords: [
      'pharmacy', 'bpharm', 'mpharm', 'dpharm', 'b pharm', 
      'm pharm', 'd pharm', 'pharmaceutical', 'medicine course', 
      'school of pharmacy', 'pharma'
    ],
    response: `💊 **School of Pharmacy at Sharda University Agra:**

Our pharmacy school prepares students for vital roles in healthcare, clinical research, drug formulation, and pharmaceutical manufacturing:

**Programs Offered:**
* 💊 **B.Pharm (Bachelor of Pharmacy):** 4-year professional degree
* 🔬 **M.Pharm (Master of Pharmacy):** 2-year advanced postgraduate specialization
* 📋 **D.Pharm (Diploma in Pharmacy):** 2-year foundational professional diploma

**Key Advantages:**
* Fully-equipped pharmaceutical chemistry, pharmacology, and pharmacognosy laboratories
* Training aligned with standard regulatory bodies
* Campus placements with top pharmaceutical leaders like **GlaxoSmithKline and Dr. Reddy's Laboratories**`,
    suggestions: [
      'How to apply for B.Pharm?',
      'What recruiters visit for Pharmacy?',
      'What are the lab facilities like?',
      'What are the hostel facilities?'
    ]
  },

  // 14. Courses - Science & Specializations (Data Science, Cyber, AI)
  {
    id: 'courses_science',
    category: 'Courses/Programs',
    keywords: [
      'bsc', 'b sc', 'bachelor of science', 'data science', 
      'cyber security', 'cybersecurity', 'agriculture', 'bsc ai', 
      'bsc cyber security', 'bsc data science', 'bsc agriculture'
    ],
    response: `🔬 **B.Sc Specializations & Applied Sciences at SUA:**

SUA offers high-demand, future-ready Bachelor of Science programs:

* 📊 **B.Sc in Data Science:** Master big data, statistical modeling, machine learning, and business analytics.
* 🛡️ **B.Sc in Cyber Security:** Learn digital forensics, ethical hacking, network defense, and cryptography.
* 🤖 **B.Sc in Artificial Intelligence:** Hands-on study of intelligent agents, neural networks, and computer vision.
* 🌾 **B.Sc in Agriculture:** Modern agronomy, precision farming, crop protection, and agricultural economics.

All programs blend theory with practical field and laboratory exposure!`,
    suggestions: [
      'What are the admission requirements for B.Sc?',
      'Tell me about B.Tech CSE',
      'What is the fee structure?',
      'Tell me about research opportunities'
    ]
  },

  // 15. Courses - Design (B.Design)
  {
    id: 'courses_design',
    category: 'Courses/Programs',
    keywords: [
      'design', 'b design', 'bdesign', 'school of design', 
      'fashion design', 'interior design', 'graphic design', 'creative courses'
    ],
    response: `🎨 **School of Design at Sharda University Agra:**

Unleash your creativity and shape the future of visual communication, user experiences, and aesthetics:

* **Program Offered:** **B.Design (Bachelor of Design)**
* **Focus Areas:** Visual design, interaction design, creative problem solving, and modern digital design software.
* **Facilities:** Dedicated design studios, prototyping labs, exhibition spaces, and portfolio development workshops.`,
    suggestions: [
      'How to apply for B.Design?',
      'What other schools are available?',
      'Tell me about campus facilities',
      'Where is the campus located?'
    ]
  },

  // 16. Departments & Schools Overview
  {
    id: 'schools_overview',
    category: 'Departments/Schools',
    keywords: [
      'departments', 'schools', 'faculties', 'academic departments', 
      'what departments', 'what schools', 'divisions', 'colleges in sharda'
    ],
    response: `🏛️ **Academic Schools at Sharda University Agra:**

SUA houses several dedicated schools, each equipped with specialized faculty and research labs:

1. ⚙️ **School of Engineering & Technology** (B.Tech, BCA, MCA, M.Tech)
2. 💊 **School of Pharmacy** (B.Pharm, M.Pharm, D.Pharm)
3. 💼 **School of Business Studies** (BBA, MBA, EMBA, B.Com)
4. 🎨 **School of Design** (B.Design)
5. 🌾 **School of Agriculture** (B.Sc Agriculture)
6. 📖 **School of Humanities & Social Sciences**

Each school adheres to National Education Policy (**NEP 2020**) guidelines with interdisciplinary electives!`,
    suggestions: [
      'Tell me about Engineering school',
      'Tell me about Business school',
      'Tell me about Pharmacy school',
      'What are the campus facilities?'
    ]
  },

  // 17. Campus Facilities - Overview
  {
    id: 'facilities_overview',
    category: 'Campus Facilities',
    keywords: [
      'facilities', 'campus facilities', 'infrastructure', 'amenities', 
      'campus life', 'campus area', '50 acre', 'what does campus have', 
      'campus tour'
    ],
    response: `🌳 **World-Class Campus Facilities at Sharda University Agra:**

Spread across a sprawling **50+ acre lush green campus**, SUA is built to provide an enriching academic and residential environment:

* 🏢 **Modern Academic Blocks** with air-conditioned, smart multimedia classrooms
* 🛏️ **Comfortable On-Campus Hostels** for boys and girls with 24/7 security
* 📚 **Central Library** stocked with thousands of books and digital databases
* ⚽ **Extensive Sports Grounds** for cricket, football, basketball, and indoor games
* 🍽️ **Spacious Multi-Cuisine Cafeteria** serving hygienic meals and refreshments
* 🧪 **Advanced Scientific & Computer Labs** with cutting-edge equipment
* 📶 **High-Speed Wi-Fi** connectivity across all campus zones

Which facility would you like to know more about?`,
    suggestions: [
      'Tell me about hostel accommodation',
      'Tell me about sports facilities',
      'Tell me about the central library',
      'Tell me about the cafeteria'
    ]
  },

  // 18. Campus Facilities - Hostel & Accommodation
  {
    id: 'facilities_hostel',
    category: 'Campus Facilities',
    keywords: [
      'hostel', 'accommodation', 'hostel facility', 'rooms', 'mess', 
      'hostel fee', 'boys hostel', 'girls hostel', 'stay', 'residential', 
      'living on campus'
    ],
    response: `🛏️ **Hostel & Residential Accommodation at SUA:**

SUA provides a secure, welcoming "home away from home" for outstation and international students:

* 🏢 **Separate Hostels for Boys and Girls** located right within the 50+ acre campus.
* 🛏️ **Room Options:** Well-ventilated AC and Non-AC room configurations (single, twin, and triple occupancy).
* 🍲 **Hygienic Mess:** Nutritious, multi-cuisine meals planned by experienced catering teams.
* 🛡️ **24/7 Security & CCTV:** Guarded entrances, biometric attendance, and strict safety protocols.
* 📶 **Amenities:** High-speed Wi-Fi, study halls, recreational lounges, laundry support, and continuous water/power backup.

💡 *Note on Hostel Fees:* Hostel charges vary depending on room occupancy (single/double/triple) and AC/Non-AC selection. Please refer to [agra.sharda.ac.in](https://www.agra.sharda.ac.in) for the updated schedule.`,
    suggestions: [
      'Tell me about the cafeteria',
      'Where is the campus located?',
      'What are the sports facilities?',
      'How to reach the admission office?'
    ]
  },

  // 19. Campus Facilities - Library
  {
    id: 'facilities_library',
    category: 'Campus Facilities',
    keywords: [
      'library', 'central library', 'books', 'reading room', 
      'digital library', 'journals', 'study hall', 'e-books'
    ],
    response: `📚 **Central Library at Sharda University Agra:**

A scholarly sanctuary designed to empower research, learning, and self-study:

* 📖 **Extensive Collection:** Thousands of textbooks, reference manuals, and research volumes covering engineering, management, pharmacy, and sciences.
* 💻 **Digital Library Access:** Subscriptions to leading international journals, IEEE explore, DELNET, Springer, and online e-book repositories.
* 🔇 **Quiet Study Zones:** Comfortable reading areas and group study cubicles.
* ⏰ **Extended Hours:** Accessible during exam periods to support rigorous academic preparation.`,
    suggestions: [
      'Tell me about computer labs & Wi-Fi',
      'Tell me about research & MOUs',
      'What are the campus facilities?',
      'What courses are available?'
    ]
  },

  // 20. Campus Facilities - Sports & Gym
  {
    id: 'facilities_sports',
    category: 'Campus Facilities',
    keywords: [
      'sports', 'gym', 'gymnasium', 'games', 'football', 'cricket', 
      'badminton', 'basketball', 'athletics', 'fitness', 'playground'
    ],
    response: `⚽ **Sports & Fitness Facilities at SUA:**

At SUA, physical wellness and teamwork are integral to student development:

* 🏏 **Outdoor Sports:** Full-sized grounds for Cricket, Football, Volleyball, and Basketball courts.
* 🏸 **Indoor Games:** Badminton courts, Table Tennis, Chess, and Carrom rooms.
* 🏋️ **Modern Fitness Gym:** Well-equipped gymnasium with trainers for student fitness and wellbeing.
* 🏆 **Annual Sports Meets:** Inter-college and intra-university tournaments, athletics championships, and fitness challenges throughout the year.`,
    suggestions: [
      'Tell me about student clubs and fests',
      'Tell me about hostel life',
      'What are the campus facilities?',
      'Tell me about admissions'
    ]
  },

  // 21. Campus Facilities - Labs & Wi-Fi
  {
    id: 'facilities_labs_wifi',
    category: 'Campus Facilities',
    keywords: [
      'labs', 'laboratory', 'wifi', 'wi fi', 'internet', 
      'computer lab', 'tech labs', 'pharma lab', 'hardware lab'
    ],
    response: `🧪 **High-Tech Labs & Campus-Wide Wi-Fi:**

SUA is powered by modern technological infrastructure:

* 💻 **Advanced Computer Labs:** Loaded with high-performance workstations, licensed programming environments, and AI/ML simulation tools.
* 🔬 **Specialized Science & Pharma Labs:** Modern pharmaceutics, microbiology, chemistry, and hardware engineering laboratories conforming to industry standards.
* 📶 **High-Speed Campus Wi-Fi:** Seamless, secure wireless internet connectivity across classrooms, hostels, laboratories, and outdoor lounges.`,
    suggestions: [
      'Tell me about B.Tech CSE & AI/ML',
      'Tell me about Pharmacy programs',
      'Tell me about the central library',
      'How to apply for admission?'
    ]
  },

  // 22. Campus Facilities - Cafeteria
  {
    id: 'facilities_cafeteria',
    category: 'Campus Facilities',
    keywords: [
      'cafeteria', 'canteen', 'food', 'food court', 'cafe', 
      'meals', 'snacks', 'eating', 'coffee'
    ],
    response: `🍽️ **Cafeteria & Food Court at SUA:**

The campus cafeteria is a vibrant hub where students and faculty gather to unwind:

* 🥗 **Diverse Menu:** Freshly prepared South Indian, North Indian, Chinese snacks, healthy salads, and wholesome meals.
* ☕ **Beverage Lounge:** Tea, coffee, fruit juices, and quick refreshments available throughout college hours.
* 🧼 **Strict Hygiene Standards:** Regular cleanliness audits and food safety checks ensure top quality dining.`,
    suggestions: [
      'Tell me about hostel facilities',
      'What are the sports amenities?',
      'Tell me about campus facilities',
      'Where is the campus located?'
    ]
  },

  // 23. Fees & Fee Structure Policy
  {
    id: 'fees_structure',
    category: 'Fees',
    keywords: [
      'fee', 'fees', 'fee structure', 'how much', 'cost', 'tuition', 
      'tuition fees', 'btech fee', 'mba fee', 'bca fee', 'pharmacy fee', 
      'annual fee', 'semester fee', 'charges', 'installment'
    ],
    response: `💰 **Fee Structure Policy at Sharda University Agra:**

At SUA, fee structures are designed to be transparent and competitive across our 40+ programs:

* **Programs Covered:** B.Tech, BCA, MCA, MBA, B.Com, B.Pharm, D.Pharm, B.Sc, and B.Design.
* **Fee Components:** Typically include tuition fees, examination fees, and one-time registration/caution deposits.
* **Payment Plans:** Flexible installment options and academic scholarship fee concessions are available.

📌 **Important Notice:** To guarantee exact and current figures, SUA does not publish fixed fee numbers via chat, as fee structures vary by specialization, quota, and academic year.

👉 **To view the official fee schedule:**  
Please visit the official website at **[https://www.agra.sharda.ac.in](https://www.agra.sharda.ac.in)** or contact our dedicated admissions desk at **+91-120-6879222**.`,
    suggestions: [
      'Are there any scholarships available?',
      'How do I apply for admission?',
      'What are the hostel charges?',
      'What is the contact number?'
    ]
  },

  // 24. Placements - Overview & Placement Rate
  {
    id: 'placements_overview',
    category: 'Placements',
    keywords: [
      'placement', 'placements', 'placement rate', 'jobs', 'salary', 
      'highest package', 'average package', 'campus placement', 
      'recruitment', 'career', 'job opportunities', 'package'
    ],
    response: `💼 **Placements & Career Opportunities at SUA:**

SUA boasts an impressive placement ecosystem driven by a dedicated Corporate Resource Center (CRC):

* 📈 **Placement Rate:** **65% – 100%** across leading technical, business, and healthcare streams
* 🏢 **600+ Top Recruiting Companies** hire from the Sharda ecosystem
* 🌐 **Global Alumni Power:** Over **90,000+ successful alumni** making their mark in top multinational corporations worldwide
* 🎯 **Career Preparation:** Soft-skills training, mock technical interviews, aptitude workshops, and resume coaching integrated into the curriculum

Would you like to know which major recruiters visit our campus?`,
    suggestions: [
      'Which companies visit for campus hiring?',
      'Tell me about B.Tech CSE placements',
      'Tell me about MBA placements',
      'Tell me about Sharda Launchpad'
    ]
  },

  // 25. Placements - Recruiters & Companies
  {
    id: 'placements_recruiters',
    category: 'Placements',
    keywords: [
      'companies', 'recruiters', 'top companies', 'who hires', 
      'hiring partners', 'tcs', 'infosys', 'wipro', 'dr reddy', 
      'glaxosmithkline', 'gemini solutions', 'top recruiters'
    ],
    response: `🏢 **Top Recruiting Companies at Sharda University Agra:**

Over **600+ esteemed companies** actively recruit graduates from the Sharda network. Notable marquee recruiters include:

* 💻 **Information Technology & Services:**
  * **TCS (Tata Consultancy Services)**
  * **Infosys**
  * **Wipro**
  * **Gemini Solutions**
  * Cognizant & Tech Mahindra

* 💊 **Pharmaceutical & Healthcare:**
  * **GlaxoSmithKline (GSK)**
  * **Dr. Reddy's Laboratories**
  * Sun Pharma & Cipla

* 📊 **Management & Corporate Consulting:**
  * Leading financial institutions, marketing agencies, and emerging tech startups!

Graduates benefit from both on-campus placement drives and shared consortium recruitment events.`,
    suggestions: [
      'What is the placement percentage?',
      'Tell me about B.Tech programs',
      'Tell me about MBA programs',
      'How do I apply for admission?'
    ]
  },

  // 26. Scholarships & Financial Aid
  {
    id: 'scholarships',
    category: 'Scholarships',
    keywords: [
      'scholarship', 'scholarships', 'financial aid', 'fee concession', 
      'discount', 'merit scholarship', 'sports scholarship', 
      'scholarship criteria', 'concession', 'waiver'
    ],
    response: `🎖️ **Scholarships & Financial Assistance at SUA:**

Sharda University Agra believes quality higher education should be accessible to deserving minds:

* 🌟 **Merit-Based Scholarships:** Concessions based on your academic performance in 10+2, graduation, or entrance tests (**SUAT / JEE / CUET**).
* 🏅 **Sports & Cultural Scholarships:** Dedicated fee waivers for state and national-level sports achievers.
* 🤝 **Special Concessions:** Wards of defense personnel, teachers, and sibling concessions as per university guidelines.
* 📅 **Early Bird Concessions:** Benefits for candidates confirming admissions during early phases.

💡 *Note:* Exact scholarship percentage brackets and terms are updated for each academic session. Detailed criteria can be verified on **[agra.sharda.ac.in](https://www.agra.sharda.ac.in)** or by calling **+91-120-6879222**.`,
    suggestions: [
      'How do I apply for a scholarship?',
      'What is the admission procedure?',
      'What is the fee policy?',
      'What courses are available?'
    ]
  },

  // 27. International Students & Global Diversity
  {
    id: 'international_students',
    category: 'International Students',
    keywords: [
      'international students', 'foreign students', 'global', 
      'countries represented', 'international', 'abroad', 'global exposure', 
      'foreign faculty', 'international admissions'
    ],
    response: `🌍 **Global Diversity & International Exposure at SUA:**

The Sharda brand is renowned for its truly international campus culture:

* 🌐 **95+ Countries Represented:** Students from across Africa, the Middle East, South Asia, and beyond study within the Sharda ecosystem.
* 👨‍🏫 **International & Industry Adjunct Faculty:** Learn from distinguished professors and global practitioners who bring worldwide industry trends into the classroom.
* 🤝 **International Relations Cell:** Dedicated support for visa guidance, international student onboarding, English proficiency, and cultural adaptation.
* 🛫 **Global Study Opportunities:** Benefit from student exchange arrangements supported by our **81+ international MOUs**.`,
    suggestions: [
      'Tell me about university MOUs',
      'How to apply for international admission?',
      'Tell me about hostel accommodation',
      'Where is the campus located?'
    ]
  },

  // 28. Research & Industry Tie-ups (MOUs)
  {
    id: 'research_mous',
    category: 'Research',
    keywords: [
      'research', 'mous', 'mou', 'tie ups', 'collaborations', 
      'industry partners', 'patents', 'publications', 'academic tie ups', 
      'partnerships'
    ],
    response: `🔬 **Research, Innovation & Global Collaborations:**

SUA actively bridges the gap between academic theory and real-world industrial research:

* 🤝 **81+ Active MOUs** with leading national and international universities, research institutions, and industry bodies.
* 🏭 **Industry-Linked Curriculum:** Developed in consultation with corporate leaders to integrate cutting-edge tools in AI, Cyber Security, and Cloud.
* 👨‍🏫 **200+ Accomplished Faculty:** Actively involved in peer-reviewed publications, patent filings, and consultancy projects.
* 🚀 **Student Innovation Projects:** Funding and mentorship available for innovative engineering and pharmaceutical student prototypes.`,
    suggestions: [
      'Tell me about Sharda Launchpad',
      'Tell me about B.Tech CSE & AI',
      'What schools are available?',
      'How do I contact the university?'
    ]
  },

  // 29. Sharda Launchpad & Entrepreneurship
  {
    id: 'sharda_launchpad',
    category: 'General Info',
    keywords: [
      'sharda launchpad', 'launchpad', 'entrepreneurship', 'startups', 
      'startup', 'incubation', 'incubator', 'funding', 'business ideas', 
      'innovations'
    ],
    response: `🚀 **Sharda Launchpad — Fostering Young Entrepreneurs:**

Have a groundbreaking business idea? **Sharda Launchpad** is the university's dedicated entrepreneurship and business incubation engine!

**What Sharda Launchpad Offers:**
* 💡 **Ideation & Mentorship:** Guidance from seasoned entrepreneurs, venture capitalists, and industry veterans.
* 🏢 **Incubation Space:** Modern co-working spaces equipped with high-speed internet, conference rooms, and maker tools.
* 💰 **Seed Funding Support:** Assistance in building pitch decks, securing angel funding, and government grants.
* 📜 **Legal & IPR Support:** Intellectual property guidance, company registration, and trademark counseling.

Transform your creative concepts into thriving business ventures right from college!`,
    suggestions: [
      'Tell me about MBA & Business Studies',
      'Tell me about B.Tech programs',
      'Tell me about placements',
      'What are the campus facilities?'
    ]
  },

  // 30. Contact Info & Helpline
  {
    id: 'contact_info',
    category: 'Contact Info',
    keywords: [
      'contact', 'phone number', 'contact number', 'helpline', 
      'email', 'call', 'mobile', 'telephone', 'admission office phone', 
      'how to contact', 'reach out'
    ],
    response: `📞 **Official Contact Information — Sharda University Agra:**

Get in touch directly with our admission and support team:

* ☎️ **Central Phone Helpline:** **+91-120-6879222**
* 🌐 **Official Website:** **[https://www.agra.sharda.ac.in](https://www.agra.sharda.ac.in)**
* 📍 **Campus Address:**  
  **18 KM from Bhagwan Talkies, Agra-Mathura, NH 19, Keetham, Agra – 282007, Uttar Pradesh**  
  *(Formerly known as Anand Campus)*

Our admission counselors are available Monday through Saturday to guide you with program details, fees, and campus tours!`,
    suggestions: [
      'How to apply for admission?',
      'Where is the campus located?',
      'What are the available courses?',
      'Tell me about scholarships'
    ]
  },

  // 31. Thanks & Gratitude
  {
    id: 'thanks',
    category: 'Thanks/goodbye',
    keywords: [
      'thank you', 'thanks', 'thx', 'thank u', 'appreciate it', 
      'thank you so much', 'helpful', 'great help'
    ],
    response: `You are very welcome! 😊 Always happy to help.

Do you have any other questions about Sharda University Agra, or are you all set for now?`,
    suggestions: [
      'Tell me about admissions',
      'What is the campus address?',
      'What courses are offered?',
      'I am good, thank you!'
    ]
  },

  // 32. Goodbye & Farewells
  {
    id: 'goodbye',
    category: 'Thanks/goodbye',
    keywords: [
      'bye', 'goodbye', 'see you', 'cya', 'see you later', 
      'good night', 'have a nice day', 'bye bye', 'talk later'
    ],
    response: `Goodbye! 👋 Thank you for chatting with me today.

Wishing you great success in your academic journey! Feel free to return anytime you need help, or visit **[agra.sharda.ac.in](https://www.agra.sharda.ac.in)**. Have a wonderful day ahead! 🎓✨`,
    suggestions: [
      'Hello!',
      'Tell me about admissions',
      'What courses are available?'
    ]
  },

  // 33. Help & Bot Capabilities
  {
    id: 'help',
    category: 'Help/what can I ask',
    keywords: [
      'help', 'what can i ask', 'menu', 'options', 'features', 
      'guide me', 'what can you do', 'how to use', 'help me'
    ],
    response: `💡 **Here is what you can ask me about SUA:**

I can quickly assist you with information on:
* 🎓 **Programs:** B.Tech (CSE, AI & ML), BCA, MCA, MBA, Pharmacy, B.Sc, Design
* 📝 **Admissions:** How to apply, SUAT entrance test, document requirements
* 📍 **Campus:** Location at Keetham NH 19, transport & directions
* 🏡 **Facilities:** Hostels, Central Library, sports grounds, cafeteria, Wi-Fi
* 💼 **Placements:** 65-100% placement record, 600+ recruiters (TCS, Wipro, Infosys)
* 🎖️ **Scholarships & Aid:** Merit and sports fee concessions
* 📞 **Contact Info:** Phone helpline (+91-120-6879222) and website

Just type your question naturally, like: *"Tell me about B.Tech CSE"* or *"How do I apply?"*`,
    suggestions: [
      'How to apply for admission?',
      'What courses are available?',
      'Tell me about placements',
      'Where is the campus located?'
    ]
  },

  // 34. Accreditation, UGC & Ranking
  {
    id: 'accreditation_ranking',
    category: 'Accreditation/ranking',
    keywords: [
      'accreditation', 'ranking', 'ugc', 'ugc recognized', 'naac', 
      'is sharda recognized', 'approval', 'government approved', 
      'aicte', 'pci', 'recognized'
    ],
    response: `🏆 **Accreditation & Recognition at Sharda University Agra:**

* 📜 **UGC Recognized:** SUA is recognized by the **University Grants Commission (UGC)**, ensuring valid and esteemed degree credentials across India and internationally.
* 💊 **PCI Approved:** Pharmacy programs conform to the norms of the **Pharmacy Council of India (PCI)**.
* 🎓 **Legacy of Excellence:** Built upon the rich heritage of Anand Campus and the nationwide prestige of Sharda University.
* 👥 **90,000+ Alumni:** A globally respected community of alumni working in Fortune 500 corporations and top government bodies.`,
    suggestions: [
      'Tell me about the schools available',
      'What courses are offered?',
      'How to apply for admission?',
      'Tell me about placements'
    ]
  },

  // 35. Student Life, Clubs & Campus Events
  {
    id: 'student_life_clubs',
    category: 'Student life / clubs / events',
    keywords: [
      'student life', 'clubs', 'events', 'fests', 'cultural fest', 
      'activities', 'societies', 'campus life', 'hackathons', 
      'extra curricular', 'fest'
    ],
    response: `🎉 **Student Life, Clubs & Cultural Events at SUA:**

Life at Sharda University Agra is full of energy, learning, and celebration!

* 🎭 **Cultural & Creative Clubs:** Music, dance, dramatics, fine arts, and photography societies.
* 💻 **Technical Societies:** Coding clubs, hackathons, robotics challenges, and developer circles.
* 🎊 **Annual Fests:** Grand inter-college cultural and technical festivals featuring celebrity artists, music concerts, and sports leagues.
* 🤝 **Social Impact:** Rotaract club, NSS activities, environmental drives, and blood donation camps.

You will find abundant avenues to make lifelong friends and discover hidden talents!`,
    suggestions: [
      'Tell me about sports facilities',
      'Tell me about hostel life',
      'What courses are offered?',
      'Tell me about campus facilities'
    ]
  },

  // 36. NEP Implementation
  {
    id: 'nep_implementation',
    category: 'General Info',
    keywords: [
      'nep', 'national education policy', 'nep 2020', 'curriculum', 
      'flexible curriculum', 'credit system', 'multidisciplinary'
    ],
    response: `📜 **National Education Policy (NEP 2020) at SUA:**

Sharda University Agra has fully embraced the progressive principles of the **National Education Policy (NEP 2020)**:

* 🔄 **Multidisciplinary Choices:** Students can pursue interdisciplinary minor courses and open electives alongside their major degrees.
* 💡 **Skill-Oriented Training:** Greater emphasis on practical workshops, internships, and research projects over rote learning.
* 🌐 **Credit Mobility & Multiple Entries/Exits:** Flexible academic pathways tailored to modern student needs.
* 🤝 **Industry & International Adjunct Faculty:** Blending theoretical foundations with practical enterprise knowledge.`,
    suggestions: [
      'What programs are offered?',
      'Tell me about B.Tech specializations',
      'How to apply for admission?',
      'Tell me about Sharda Launchpad'
    ]
  }
];

/**
 * Handles contextual follow-ups when user input is brief (e.g., "how to apply?", "what are the fees?", "yes", "tell me more")
 */
function handleContextualFollowUp(normalizedInput, lastIntentId) {
  if (!lastIntentId) return null;

  const isFeeQuestion = /(fee|fees|cost|how much|charges|pricing|tuition)/i.test(normalizedInput);
  const isApplyQuestion = /(how to apply|apply|admission|procedure|process|register|join)/i.test(normalizedInput);
  const isMoreQuestion = /(more|tell me more|details|elaborate|explain more|yes|sure|okay)/i.test(normalizedInput);
  const isEligibilityQuestion = /(eligibility|criteria|qualification|requirements)/i.test(normalizedInput);

  // Follow-up on Course Intents
  if (lastIntentId.startsWith('courses_')) {
    if (isFeeQuestion) {
      return {
        reply: `Regarding the fee structure for this program:

Because tuition fees at SUA vary depending on specializations, lab components, and applicable merit scholarships, exact fee breakdowns are regularly updated on our website.

👉 Please consult the official fee table at **[https://www.agra.sharda.ac.in](https://www.agra.sharda.ac.in)** or contact our counselors directly at **+91-120-6879222**.`,
        suggestions: [
          'What are the scholarship options?',
          'What is the admission process?',
          'Tell me about placements',
          'What are the hostel charges?'
        ]
      };
    }

    if (isApplyQuestion || isEligibilityQuestion) {
      return {
        reply: `To apply for this program:

1. Check that you meet the minimum eligibility criteria (typically 50% in qualifying board/degree examinations).
2. Register and submit your application on **[agra.sharda.ac.in](https://www.agra.sharda.ac.in)**.
3. Appear for **SUAT** or present valid national test scores (such as JEE Main for B.Tech or CAT/MAT for MBA).

Need help with document submission or exam dates?`,
        suggestions: [
          'What documents are needed?',
          'Tell me about the SUAT exam',
          'What are the scholarship criteria?',
          'What is the contact number?'
        ]
      };
    }
  }

  // Follow-up on Hostel Intent
  if (lastIntentId === 'facilities_hostel') {
    if (isFeeQuestion) {
      return {
        reply: `Hostel fees vary based on your room preference:
* AC vs. Non-AC accommodations
* Single, double, or triple occupancy configurations

All hostel packages include mess meals, 24/7 security, high-speed Wi-Fi, and continuous utilities. Please check **[agra.sharda.ac.in](https://www.agra.sharda.ac.in)** for current session hostel room tariffs.`,
        suggestions: [
          'Tell me about cafeteria food',
          'What are the campus sports facilities?',
          'Where is the campus located?',
          'How do I contact admissions?'
        ]
      };
    }
  }

  // Follow-up on Placements Intent
  if (lastIntentId === 'placements_overview' && (isMoreQuestion || /(company|companies|who hires)/i.test(normalizedInput))) {
    const recruitersIntent = KNOWLEDGE_BASE.find(item => item.id === 'placements_recruiters');
    if (recruitersIntent) {
      return {
        reply: recruitersIntent.response,
        suggestions: recruitersIntent.suggestions
      };
    }
  }

  // Follow-up on Admissions Intent
  if (lastIntentId === 'admissions_general' && isMoreQuestion) {
    const docsIntent = KNOWLEDGE_BASE.find(item => item.id === 'admissions_documents');
    if (docsIntent) {
      return {
        reply: docsIntent.response,
        suggestions: docsIntent.suggestions
      };
    }
  }

  return null;
}

/**
 * Scores an intent against a normalized user query.
 */
function scoreIntent(intent, normalizedInput, inputTokens) {
  let score = 0;

  // 1. Exact Phrase Matching (highest weight)
  for (const keyword of intent.keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) continue;

    if (normalizedInput === normalizedKeyword) {
      score += 60;
    } else if (normalizedInput.includes(normalizedKeyword)) {
      // Reward longer multi-word phrases more
      const wordCount = normalizedKeyword.split(' ').length;
      score += 20 + (wordCount * 10);
    }
  }

  // 2. Token Matching & Fuzzy Matching
  for (const token of inputTokens) {
    if (STOP_WORDS.has(token) && token.length <= 3) continue;

    let bestTokenScore = 0;

    for (const keyword of intent.keywords) {
      const keywordTokens = normalizeText(keyword).split(' ');

      for (const kToken of keywordTokens) {
        if (STOP_WORDS.has(kToken) && kToken.length <= 3) continue;

        if (token === kToken) {
          bestTokenScore = Math.max(bestTokenScore, 10);
        } else if (token.length >= 4 && kToken.length >= 4) {
          const sim = wordSimilarity(token, kToken);
          if (sim >= 0.75) {
            bestTokenScore = Math.max(bestTokenScore, 8 * sim);
          }
        }
      }
    }

    score += bestTokenScore;
  }

  return score;
}

/**
 * Returns a conversational fallback response when no intent matches with high confidence.
 */
function getFallbackResponse() {
  return {
    reply: `I'm not quite sure I understood that question about **Sharda University Agra** 🤔

Here are a few popular topics you can ask me about:
* 🎓 **Admissions & Eligibility:** How to apply, SUAT entrance, documents required
* 📚 **Programs & Courses:** B.Tech (CSE, AI & ML), BCA, MBA, Pharmacy, B.Sc
* 🌳 **Campus Life & Facilities:** Hostels, Central Library, sports, cafeteria, labs & Wi-Fi
* 💼 **Placements & Recruiters:** 65-100% placement rate, TCS, Wipro, Infosys
* 📍 **Location & Contacts:** Keetham NH 19 address or telephone helpline

For detailed official notifications, please visit our **[Official Website](https://www.agra.sharda.ac.in)** or call our helpline at **+91-120-6879222**.`,
    suggestions: [
      'Tell me about admissions',
      'What courses are available?',
      'Where is the campus located?',
      'Tell me about placements'
    ]
  };
}

/**
 * Main engine function.
 * Matches user input against SUA knowledge base and returns a response with suggestions.
 * 
 * @param {string} userMessage - The message string from the user.
 * @param {Array} [conversationHistory=[]] - Optional array of previous messages.
 * @returns {{ reply: string, suggestions: string[] }}
 */
export function getResponse(userMessage, conversationHistory = []) {
  if (!userMessage || typeof userMessage !== 'string' || !userMessage.trim()) {
    return {
      reply: `Hello! 👋 How can I help you today with information regarding Sharda University Agra?`,
      suggestions: [
        'Tell me about admissions',
        'What courses are available?',
        'Where is the campus located?',
        'Tell me about campus facilities'
      ]
    };
  }

  const normalizedInput = normalizeText(userMessage);
  const inputTokens = normalizedInput.split(' ').filter(Boolean);

  // If session state has no last intent, inspect conversationHistory
  if (!sessionState.lastIntent && Array.isArray(conversationHistory) && conversationHistory.length > 0) {
    for (let i = conversationHistory.length - 1; i >= 0; i--) {
      const msg = conversationHistory[i];
      if (msg && msg.role === 'assistant' && typeof msg.content === 'string') {
        // Find matching intent from knowledge base content
        const found = KNOWLEDGE_BASE.find(item => msg.content.includes(item.category) || item.response.slice(0, 40) === msg.content.slice(0, 40));
        if (found) {
          sessionState.lastIntent = found.id;
          sessionState.lastCategory = found.category;
          break;
        }
      }
    }
  }

  // Check for contextual follow-up first
  const followUpResult = handleContextualFollowUp(normalizedInput, sessionState.lastIntent);
  if (followUpResult) {
    return followUpResult;
  }

  // Score all intents
  let bestIntent = null;
  let highestScore = 0;

  for (const intent of KNOWLEDGE_BASE) {
    const score = scoreIntent(intent, normalizedInput, inputTokens);
    if (score > highestScore) {
      highestScore = score;
      bestIntent = intent;
    }
  }

  // Confidence threshold: at least 8 points required
  if (bestIntent && highestScore >= 8) {
    sessionState.lastIntent = bestIntent.id;
    sessionState.lastCategory = bestIntent.category;

    return {
      reply: bestIntent.response,
      suggestions: bestIntent.suggestions || []
    };
  }

  // Fallback when no intent matches with confidence
  return getFallbackResponse();
}
