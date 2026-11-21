(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();const x=""+new URL("idle-CfdtpcPN.jpg",import.meta.url).href,_=""+new URL("thinking-CG9M0lDr.jpg",import.meta.url).href,P=""+new URL("celebrating-CdPPumbm.jpg",import.meta.url).href,F=""+new URL("confused-BwyF_4h5.jpg",import.meta.url).href,U=""+new URL("calm-am5o5Xin.jpg",import.meta.url).href,q=""+new URL("waving-DHvQHbGW.jpg",import.meta.url).href,S={lastIntent:null,lastCategory:null};function C(c){return!c||typeof c!="string"?"":c.toLowerCase().replace(/[^\w\s]/g," ").replace(/\s+/g," ").trim()}function D(c,t){const e=c.length,i=t.length;if(e===0)return i;if(i===0)return e;const s=[];for(let a=0;a<=i;a++)s[a]=a;for(let a=1;a<=e;a++){let n=a;for(let r=1;r<=i;r++){let l;c[a-1]===t[r-1]?l=s[r-1]:l=1+Math.min(s[r-1],n,s[r]),s[r-1]=n,n=l}s[i]=n}return s[i]}function R(c,t){if(c===t)return 1;if(!c||!t)return 0;if(c.length>=4&&t.length>=4&&(c.startsWith(t)||t.startsWith(c)))return .9;const e=Math.max(c.length,t.length);if(e===0)return 1;const i=D(c,t),s=e<=4?1:e<=7?2:3;return i<=s?1-i/e:0}const L=new Set(["a","an","the","is","are","was","were","am","be","been","in","on","at","to","for","of","with","by","about","from","i","me","my","we","our","you","your","it","its","they","do","does","did","can","could","will","would","should","what","which","who","whom","where","when","how","why","tell","give","show","know","want","please","thanks"]),k=[{id:"greetings",category:"Greetings",keywords:["hello","hi","hey","heya","hola","namaste","good morning","good afternoon","good evening","greetings","whats up","howdy","hello suai","hi suai","hey there"],response:`Hello there! 👋 Welcome to **Sharda University Agra (SUA)**!

I'm **SUAi**, your smart campus assistant. Whether you're curious about admissions, courses, campus facilities, placements, or student life, I'm here to help.

What would you like to know today? 😊`,suggestions:["Tell me about admissions","What courses are available?","Where is the campus located?","How are the placements?"]},{id:"bot_identity",category:"Bot Identity",keywords:["who are you","what are you","your name","who made you","what can you do","tell me about yourself","are you ai","are you a bot","what is suai","suai"],response:`I'm **SUAi** 🤖 — the official virtual AI assistant for **Sharda University Agra (SUA)**!

I'm designed to help prospective students, parents, and visitors navigate:
* 🎓 **Academic Programs** (B.Tech, MBA, BCA, Pharmacy, B.Sc, etc.)
* 📝 **Admissions & Eligibility** procedures
* 🏫 **50+ Acre Campus Infrastructure** & facilities
* 💼 **Placement Records** & top recruiting companies
* 📍 **Campus Location** & official contact details

Feel free to ask me anything about life and learning at Sharda Agra!`,suggestions:["What programs are offered?","How do I apply for admission?","Tell me about campus facilities","Show official contact info"]},{id:"general_info",category:"General Info",keywords:["what is sharda","tell me about sharda","tell me about sua","about sharda university agra","overview","about campus","anand campus","sua overview","history of campus","facts about sua","university profile"],response:`🏛️ **Sharda University Agra (SUA)** — *Formerly known as Anand Campus*

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

Would you like to explore our schools, programs, or admission details?`,suggestions:["What schools are available?","Tell me about admissions","Where is the campus located?","Tell me about placements"]},{id:"location",category:"Location",keywords:["where is","location","address","located","where is campus","where is sharda agra","how to reach","directions","keetham","nh 19","distance from agra","city location","pin code"],response:`📍 **Campus Location & Address — Sharda University Agra:**

Our serene, 50+ acre campus is situated right on the Agra-Mathura National Highway:

📌 **Address:**  
**18 KM from Bhagwan Talkies, Agra-Mathura, NH 19, Keetham, Agra – 282007, Uttar Pradesh, India.**  
*(Formerly known as Anand Campus)*

**Connectivity:**
* 🚗 Easily accessible by private vehicles, city buses, and taxis along NH 19
* 🚆 Well connected to Agra Cantt and Raja Ki Mandi railway stations
* 🌳 Situated near the tranquil Keetham Lake bird sanctuary area, providing a peaceful learning environment

Are you planning an on-campus visit?`,suggestions:["What are the campus facilities?","What are the contact details?","How to apply for admission?","Tell me about hostel facilities"]},{id:"website",category:"Website",keywords:["website","official website","portal","url","web page","link","site","online portal","where to visit online"],response:`🌐 **Official Website of Sharda University Agra:**

You can visit our official portal here:  
👉 **[https://www.agra.sharda.ac.in](https://www.agra.sharda.ac.in)**

On the official website, you can:
* 📝 Fill out online application forms
* 📑 Download detailed program brochures and syllabi
* 💰 View updated fee schedules and seat matrices
* 📢 Check latest campus notices and entrance exam alerts`,suggestions:["How to apply for admission?","What is the contact number?","What courses are offered?","Tell me about scholarships"]},{id:"admissions_general",category:"Admissions",keywords:["admission","how to apply","admission process","apply now","admission procedure","get admission","enrol","enrollment","join sua","apply online","form","application form"],response:`🎯 **Admission Process at Sharda University Agra:**

Joining SUA is straightforward! Here is the standard 4-step process:

1. **Online Registration:** Visit our portal at **[agra.sharda.ac.in](https://www.agra.sharda.ac.in)** and register with your basic details.
2. **Application Submission:** Fill out the academic details and select your preferred course.
3. **Entrance / Eligibility Assessment:** Appear for the **SUAT** (Sharda University Admission Test) or submit valid national test scores (such as JEE / CUET / MAT / CAT, where applicable).
4. **Document Verification & Confirmation:** Submit required academic documents and complete fee payment to confirm your seat.

💡 *Note:* Exact seat availability, deadlines, and criteria vary by program. Please check the website or reach our admission helpline at **+91-120-6879222**.`,suggestions:["What documents are required for admission?","Tell me about entrance exams","What are the available courses?","Are scholarships available?"]},{id:"admissions_documents",category:"Admissions",keywords:["documents required","documents","required docs","certificates needed","what documents","document checklist","papers required","verification docs"],response:`📄 **Documents Required for Admission Verification:**

Please keep self-attested copies and originals ready during admission confirmation:

* 🎓 **10th Mark Sheet & Passing Certificate** (for date of birth verification)
* 📜 **12th Mark Sheet & Passing Certificate** (for UG programs)
* 🎓 **Graduation Degree & Marksheets** (for PG programs like MBA, MCA, M.Tech, M.Pharm)
* 🆔 **Valid Government Photo ID Proof** (Aadhaar Card, Passport, or Voter ID)
* 📸 **Recent Passport Size Photographs** (4-6 copies)
* 📑 **Transfer Certificate (TC) & Migration Certificate**
* 🏅 **Entrance Exam Scorecard** (SUAT / JEE / CUET, if applicable)
* 🎖️ **Category / Caste Certificate** (if claiming applicable quota or scholarship)

Would you like to know about eligibility requirements or the entrance exam?`,suggestions:["Tell me about the SUAT entrance exam","How do I apply online?","What are the scholarship options?","What courses are available?"]},{id:"admissions_entrance",category:"Admissions",keywords:["entrance exam","suat","eligibility","eligibility criteria","sharda entrance","jee","cuet","cut off","qualifying marks","entrance test","is entrance exam required"],response:`📝 **Entrance Exams & Eligibility Criteria at SUA:**

* **SUAT (Sharda University Admission Test):** A comprehensive online admission test assessing aptitude, logical reasoning, and subject foundations.
* **National Score Acceptance:** Valid scores in recognized tests (such as **JEE Main** for B.Tech, **CAT/MAT/XAT** for MBA, **CUET** for various UG courses) may qualify candidates for direct admission or exemption from SUAT.
* **Basic Eligibility:**
  * **Undergraduate (B.Tech, B.Sc, BCA):** Minimum 50% aggregate marks in 10+2 from a recognized board with relevant subjects (PCM/PCB).
  * **Postgraduate (MBA, MCA, M.Tech):** Bachelor's degree in a relevant discipline with at least 50% aggregate marks.
  * **Pharmacy (B.Pharm, D.Pharm):** 10+2 with Physics, Chemistry, and Math/Biology.

*Note: Strict eligibility percentages and exemption criteria are updated annually on the [official website](https://www.agra.sharda.ac.in).*`,suggestions:["How do I apply online?","What documents are needed?","Tell me about B.Tech CSE","What are the scholarship criteria?"]},{id:"courses_overview",category:"Courses/Programs",keywords:["courses","programs","degrees","available courses","what courses","all programs","ug courses","pg courses","diploma courses","what can i study","course list","programs offered"],response:`📚 **Academic Programs Offered at Sharda University Agra:**

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

Which specific field would you like to explore?`,suggestions:["Tell me about B.Tech CSE and AI/ML","Tell me about MBA & Business Studies","Tell me about Pharmacy programs","Tell me about B.Sc Data Science & Cyber Security"]},{id:"courses_btech",category:"Courses/Programs",keywords:["btech","b tech","engineering","cse","computer science","ai and ml","artificial intelligence","machine learning","information technology","btech cse","btech ai","software engineering"],response:`💻 **B.Tech Programs at Sharda University Agra:**

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

Would you like to know about B.Tech eligibility or the admission procedure?`,suggestions:["How to apply for B.Tech?","What are the placement opportunities?","Tell me about BCA & MCA","What are the lab facilities?"]},{id:"courses_bca_mca",category:"Courses/Programs",keywords:["bca","mca","computer applications","bachelor of computer applications","master of computer applications","coding courses","software programming"],response:`🖥️ **BCA & MCA Programs at Sharda University Agra:**

Designed for students aspiring to build rewarding careers in software development, cloud computing, and IT solutions:

* **BCA (Bachelor of Computer Applications):** 3-year undergraduate program covering full-stack web development, Python, Java, database management, and cloud basics.
* **MCA (Master of Computer Applications):** 2-year postgraduate program diving into advanced enterprise computing, software architecture, mobile application development, and data analytics.

**Why choose BCA/MCA at SUA?**
* Modern high-tech computer labs with campus-wide high-speed Wi-Fi
* Practical industry internships and hackathon participation
* Active placement cell connecting graduates with 600+ recruiting companies`,suggestions:["How to apply for BCA/MCA?","Tell me about placements","What is the fee structure?","Tell me about campus labs"]},{id:"courses_management",category:"Courses/Programs",keywords:["mba","bba","emba","bcom","business","management","business studies","bba course","mba course","executive mba","marketing","finance","hr"],response:`📈 **School of Business Studies at SUA:**

Empowering future business leaders and entrepreneurs through experiential learning, case studies, and corporate mentorship:

**Programs Offered:**
* 🎓 **BBA (Bachelor of Business Administration):** Solid foundation in corporate management, finance, marketing, and human resources.
* 🎓 **MBA (Master of Business Administration):** Flagship postgraduate program with dual specializations, live industry projects, and corporate internships.
* 👔 **EMBA (Executive MBA):** Tailored for working professionals looking to accelerate their managerial leadership.
* 📊 **B.Com (Bachelor of Commerce):** Comprehensive accounting, taxation, and financial analysis.

**Highlights:**
* Incubation support via **Sharda Launchpad**
* Guest lectures by corporate CXOs and industry leaders
* Dedicated placement preparation and campus recruitment`,suggestions:["What companies hire MBA graduates?","How to apply for MBA?","Tell me about Sharda Launchpad","What is the fee policy?"]},{id:"courses_pharmacy",category:"Courses/Programs",keywords:["pharmacy","bpharm","mpharm","dpharm","b pharm","m pharm","d pharm","pharmaceutical","medicine course","school of pharmacy","pharma"],response:`💊 **School of Pharmacy at Sharda University Agra:**

Our pharmacy school prepares students for vital roles in healthcare, clinical research, drug formulation, and pharmaceutical manufacturing:

**Programs Offered:**
* 💊 **B.Pharm (Bachelor of Pharmacy):** 4-year professional degree
* 🔬 **M.Pharm (Master of Pharmacy):** 2-year advanced postgraduate specialization
* 📋 **D.Pharm (Diploma in Pharmacy):** 2-year foundational professional diploma

**Key Advantages:**
* Fully-equipped pharmaceutical chemistry, pharmacology, and pharmacognosy laboratories
* Training aligned with standard regulatory bodies
* Campus placements with top pharmaceutical leaders like **GlaxoSmithKline and Dr. Reddy's Laboratories**`,suggestions:["How to apply for B.Pharm?","What recruiters visit for Pharmacy?","What are the lab facilities like?","What are the hostel facilities?"]},{id:"courses_science",category:"Courses/Programs",keywords:["bsc","b sc","bachelor of science","data science","cyber security","cybersecurity","agriculture","bsc ai","bsc cyber security","bsc data science","bsc agriculture"],response:`🔬 **B.Sc Specializations & Applied Sciences at SUA:**

SUA offers high-demand, future-ready Bachelor of Science programs:

* 📊 **B.Sc in Data Science:** Master big data, statistical modeling, machine learning, and business analytics.
* 🛡️ **B.Sc in Cyber Security:** Learn digital forensics, ethical hacking, network defense, and cryptography.
* 🤖 **B.Sc in Artificial Intelligence:** Hands-on study of intelligent agents, neural networks, and computer vision.
* 🌾 **B.Sc in Agriculture:** Modern agronomy, precision farming, crop protection, and agricultural economics.

All programs blend theory with practical field and laboratory exposure!`,suggestions:["What are the admission requirements for B.Sc?","Tell me about B.Tech CSE","What is the fee structure?","Tell me about research opportunities"]},{id:"courses_design",category:"Courses/Programs",keywords:["design","b design","bdesign","school of design","fashion design","interior design","graphic design","creative courses"],response:`🎨 **School of Design at Sharda University Agra:**

Unleash your creativity and shape the future of visual communication, user experiences, and aesthetics:

* **Program Offered:** **B.Design (Bachelor of Design)**
* **Focus Areas:** Visual design, interaction design, creative problem solving, and modern digital design software.
* **Facilities:** Dedicated design studios, prototyping labs, exhibition spaces, and portfolio development workshops.`,suggestions:["How to apply for B.Design?","What other schools are available?","Tell me about campus facilities","Where is the campus located?"]},{id:"schools_overview",category:"Departments/Schools",keywords:["departments","schools","faculties","academic departments","what departments","what schools","divisions","colleges in sharda"],response:`🏛️ **Academic Schools at Sharda University Agra:**

SUA houses several dedicated schools, each equipped with specialized faculty and research labs:

1. ⚙️ **School of Engineering & Technology** (B.Tech, BCA, MCA, M.Tech)
2. 💊 **School of Pharmacy** (B.Pharm, M.Pharm, D.Pharm)
3. 💼 **School of Business Studies** (BBA, MBA, EMBA, B.Com)
4. 🎨 **School of Design** (B.Design)
5. 🌾 **School of Agriculture** (B.Sc Agriculture)
6. 📖 **School of Humanities & Social Sciences**

Each school adheres to National Education Policy (**NEP 2020**) guidelines with interdisciplinary electives!`,suggestions:["Tell me about Engineering school","Tell me about Business school","Tell me about Pharmacy school","What are the campus facilities?"]},{id:"facilities_overview",category:"Campus Facilities",keywords:["facilities","campus facilities","infrastructure","amenities","campus life","campus area","50 acre","what does campus have","campus tour"],response:`🌳 **World-Class Campus Facilities at Sharda University Agra:**

Spread across a sprawling **50+ acre lush green campus**, SUA is built to provide an enriching academic and residential environment:

* 🏢 **Modern Academic Blocks** with air-conditioned, smart multimedia classrooms
* 🛏️ **Comfortable On-Campus Hostels** for boys and girls with 24/7 security
* 📚 **Central Library** stocked with thousands of books and digital databases
* ⚽ **Extensive Sports Grounds** for cricket, football, basketball, and indoor games
* 🍽️ **Spacious Multi-Cuisine Cafeteria** serving hygienic meals and refreshments
* 🧪 **Advanced Scientific & Computer Labs** with cutting-edge equipment
* 📶 **High-Speed Wi-Fi** connectivity across all campus zones

Which facility would you like to know more about?`,suggestions:["Tell me about hostel accommodation","Tell me about sports facilities","Tell me about the central library","Tell me about the cafeteria"]},{id:"facilities_hostel",category:"Campus Facilities",keywords:["hostel","accommodation","hostel facility","rooms","mess","hostel fee","boys hostel","girls hostel","stay","residential","living on campus"],response:`🛏️ **Hostel & Residential Accommodation at SUA:**

SUA provides a secure, welcoming "home away from home" for outstation and international students:

* 🏢 **Separate Hostels for Boys and Girls** located right within the 50+ acre campus.
* 🛏️ **Room Options:** Well-ventilated AC and Non-AC room configurations (single, twin, and triple occupancy).
* 🍲 **Hygienic Mess:** Nutritious, multi-cuisine meals planned by experienced catering teams.
* 🛡️ **24/7 Security & CCTV:** Guarded entrances, biometric attendance, and strict safety protocols.
* 📶 **Amenities:** High-speed Wi-Fi, study halls, recreational lounges, laundry support, and continuous water/power backup.

💡 *Note on Hostel Fees:* Hostel charges vary depending on room occupancy (single/double/triple) and AC/Non-AC selection. Please refer to [agra.sharda.ac.in](https://www.agra.sharda.ac.in) for the updated schedule.`,suggestions:["Tell me about the cafeteria","Where is the campus located?","What are the sports facilities?","How to reach the admission office?"]},{id:"facilities_library",category:"Campus Facilities",keywords:["library","central library","books","reading room","digital library","journals","study hall","e-books"],response:`📚 **Central Library at Sharda University Agra:**

A scholarly sanctuary designed to empower research, learning, and self-study:

* 📖 **Extensive Collection:** Thousands of textbooks, reference manuals, and research volumes covering engineering, management, pharmacy, and sciences.
* 💻 **Digital Library Access:** Subscriptions to leading international journals, IEEE explore, DELNET, Springer, and online e-book repositories.
* 🔇 **Quiet Study Zones:** Comfortable reading areas and group study cubicles.
* ⏰ **Extended Hours:** Accessible during exam periods to support rigorous academic preparation.`,suggestions:["Tell me about computer labs & Wi-Fi","Tell me about research & MOUs","What are the campus facilities?","What courses are available?"]},{id:"facilities_sports",category:"Campus Facilities",keywords:["sports","gym","gymnasium","games","football","cricket","badminton","basketball","athletics","fitness","playground"],response:`⚽ **Sports & Fitness Facilities at SUA:**

At SUA, physical wellness and teamwork are integral to student development:

* 🏏 **Outdoor Sports:** Full-sized grounds for Cricket, Football, Volleyball, and Basketball courts.
* 🏸 **Indoor Games:** Badminton courts, Table Tennis, Chess, and Carrom rooms.
* 🏋️ **Modern Fitness Gym:** Well-equipped gymnasium with trainers for student fitness and wellbeing.
* 🏆 **Annual Sports Meets:** Inter-college and intra-university tournaments, athletics championships, and fitness challenges throughout the year.`,suggestions:["Tell me about student clubs and fests","Tell me about hostel life","What are the campus facilities?","Tell me about admissions"]},{id:"facilities_labs_wifi",category:"Campus Facilities",keywords:["labs","laboratory","wifi","wi fi","internet","computer lab","tech labs","pharma lab","hardware lab"],response:`🧪 **High-Tech Labs & Campus-Wide Wi-Fi:**

SUA is powered by modern technological infrastructure:

* 💻 **Advanced Computer Labs:** Loaded with high-performance workstations, licensed programming environments, and AI/ML simulation tools.
* 🔬 **Specialized Science & Pharma Labs:** Modern pharmaceutics, microbiology, chemistry, and hardware engineering laboratories conforming to industry standards.
* 📶 **High-Speed Campus Wi-Fi:** Seamless, secure wireless internet connectivity across classrooms, hostels, laboratories, and outdoor lounges.`,suggestions:["Tell me about B.Tech CSE & AI/ML","Tell me about Pharmacy programs","Tell me about the central library","How to apply for admission?"]},{id:"facilities_cafeteria",category:"Campus Facilities",keywords:["cafeteria","canteen","food","food court","cafe","meals","snacks","eating","coffee"],response:`🍽️ **Cafeteria & Food Court at SUA:**

The campus cafeteria is a vibrant hub where students and faculty gather to unwind:

* 🥗 **Diverse Menu:** Freshly prepared South Indian, North Indian, Chinese snacks, healthy salads, and wholesome meals.
* ☕ **Beverage Lounge:** Tea, coffee, fruit juices, and quick refreshments available throughout college hours.
* 🧼 **Strict Hygiene Standards:** Regular cleanliness audits and food safety checks ensure top quality dining.`,suggestions:["Tell me about hostel facilities","What are the sports amenities?","Tell me about campus facilities","Where is the campus located?"]},{id:"fees_structure",category:"Fees",keywords:["fee","fees","fee structure","how much","cost","tuition","tuition fees","btech fee","mba fee","bca fee","pharmacy fee","annual fee","semester fee","charges","installment"],response:`💰 **Fee Structure Policy at Sharda University Agra:**

At SUA, fee structures are designed to be transparent and competitive across our 40+ programs:

* **Programs Covered:** B.Tech, BCA, MCA, MBA, B.Com, B.Pharm, D.Pharm, B.Sc, and B.Design.
* **Fee Components:** Typically include tuition fees, examination fees, and one-time registration/caution deposits.
* **Payment Plans:** Flexible installment options and academic scholarship fee concessions are available.

📌 **Important Notice:** To guarantee exact and current figures, SUA does not publish fixed fee numbers via chat, as fee structures vary by specialization, quota, and academic year.

👉 **To view the official fee schedule:**  
Please visit the official website at **[https://www.agra.sharda.ac.in](https://www.agra.sharda.ac.in)** or contact our dedicated admissions desk at **+91-120-6879222**.`,suggestions:["Are there any scholarships available?","How do I apply for admission?","What are the hostel charges?","What is the contact number?"]},{id:"placements_overview",category:"Placements",keywords:["placement","placements","placement rate","jobs","salary","highest package","average package","campus placement","recruitment","career","job opportunities","package"],response:`💼 **Placements & Career Opportunities at SUA:**

SUA boasts an impressive placement ecosystem driven by a dedicated Corporate Resource Center (CRC):

* 📈 **Placement Rate:** **65% – 100%** across leading technical, business, and healthcare streams
* 🏢 **600+ Top Recruiting Companies** hire from the Sharda ecosystem
* 🌐 **Global Alumni Power:** Over **90,000+ successful alumni** making their mark in top multinational corporations worldwide
* 🎯 **Career Preparation:** Soft-skills training, mock technical interviews, aptitude workshops, and resume coaching integrated into the curriculum

Would you like to know which major recruiters visit our campus?`,suggestions:["Which companies visit for campus hiring?","Tell me about B.Tech CSE placements","Tell me about MBA placements","Tell me about Sharda Launchpad"]},{id:"placements_recruiters",category:"Placements",keywords:["companies","recruiters","top companies","who hires","hiring partners","tcs","infosys","wipro","dr reddy","glaxosmithkline","gemini solutions","top recruiters"],response:`🏢 **Top Recruiting Companies at Sharda University Agra:**

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

Graduates benefit from both on-campus placement drives and shared consortium recruitment events.`,suggestions:["What is the placement percentage?","Tell me about B.Tech programs","Tell me about MBA programs","How do I apply for admission?"]},{id:"scholarships",category:"Scholarships",keywords:["scholarship","scholarships","financial aid","fee concession","discount","merit scholarship","sports scholarship","scholarship criteria","concession","waiver"],response:`🎖️ **Scholarships & Financial Assistance at SUA:**

Sharda University Agra believes quality higher education should be accessible to deserving minds:

* 🌟 **Merit-Based Scholarships:** Concessions based on your academic performance in 10+2, graduation, or entrance tests (**SUAT / JEE / CUET**).
* 🏅 **Sports & Cultural Scholarships:** Dedicated fee waivers for state and national-level sports achievers.
* 🤝 **Special Concessions:** Wards of defense personnel, teachers, and sibling concessions as per university guidelines.
* 📅 **Early Bird Concessions:** Benefits for candidates confirming admissions during early phases.

💡 *Note:* Exact scholarship percentage brackets and terms are updated for each academic session. Detailed criteria can be verified on **[agra.sharda.ac.in](https://www.agra.sharda.ac.in)** or by calling **+91-120-6879222**.`,suggestions:["How do I apply for a scholarship?","What is the admission procedure?","What is the fee policy?","What courses are available?"]},{id:"international_students",category:"International Students",keywords:["international students","foreign students","global","countries represented","international","abroad","global exposure","foreign faculty","international admissions"],response:`🌍 **Global Diversity & International Exposure at SUA:**

The Sharda brand is renowned for its truly international campus culture:

* 🌐 **95+ Countries Represented:** Students from across Africa, the Middle East, South Asia, and beyond study within the Sharda ecosystem.
* 👨‍🏫 **International & Industry Adjunct Faculty:** Learn from distinguished professors and global practitioners who bring worldwide industry trends into the classroom.
* 🤝 **International Relations Cell:** Dedicated support for visa guidance, international student onboarding, English proficiency, and cultural adaptation.
* 🛫 **Global Study Opportunities:** Benefit from student exchange arrangements supported by our **81+ international MOUs**.`,suggestions:["Tell me about university MOUs","How to apply for international admission?","Tell me about hostel accommodation","Where is the campus located?"]},{id:"research_mous",category:"Research",keywords:["research","mous","mou","tie ups","collaborations","industry partners","patents","publications","academic tie ups","partnerships"],response:`🔬 **Research, Innovation & Global Collaborations:**

SUA actively bridges the gap between academic theory and real-world industrial research:

* 🤝 **81+ Active MOUs** with leading national and international universities, research institutions, and industry bodies.
* 🏭 **Industry-Linked Curriculum:** Developed in consultation with corporate leaders to integrate cutting-edge tools in AI, Cyber Security, and Cloud.
* 👨‍🏫 **200+ Accomplished Faculty:** Actively involved in peer-reviewed publications, patent filings, and consultancy projects.
* 🚀 **Student Innovation Projects:** Funding and mentorship available for innovative engineering and pharmaceutical student prototypes.`,suggestions:["Tell me about Sharda Launchpad","Tell me about B.Tech CSE & AI","What schools are available?","How do I contact the university?"]},{id:"sharda_launchpad",category:"General Info",keywords:["sharda launchpad","launchpad","entrepreneurship","startups","startup","incubation","incubator","funding","business ideas","innovations"],response:`🚀 **Sharda Launchpad — Fostering Young Entrepreneurs:**

Have a groundbreaking business idea? **Sharda Launchpad** is the university's dedicated entrepreneurship and business incubation engine!

**What Sharda Launchpad Offers:**
* 💡 **Ideation & Mentorship:** Guidance from seasoned entrepreneurs, venture capitalists, and industry veterans.
* 🏢 **Incubation Space:** Modern co-working spaces equipped with high-speed internet, conference rooms, and maker tools.
* 💰 **Seed Funding Support:** Assistance in building pitch decks, securing angel funding, and government grants.
* 📜 **Legal & IPR Support:** Intellectual property guidance, company registration, and trademark counseling.

Transform your creative concepts into thriving business ventures right from college!`,suggestions:["Tell me about MBA & Business Studies","Tell me about B.Tech programs","Tell me about placements","What are the campus facilities?"]},{id:"contact_info",category:"Contact Info",keywords:["contact","phone number","contact number","helpline","email","call","mobile","telephone","admission office phone","how to contact","reach out"],response:`📞 **Official Contact Information — Sharda University Agra:**

Get in touch directly with our admission and support team:

* ☎️ **Central Phone Helpline:** **+91-120-6879222**
* 🌐 **Official Website:** **[https://www.agra.sharda.ac.in](https://www.agra.sharda.ac.in)**
* 📍 **Campus Address:**  
  **18 KM from Bhagwan Talkies, Agra-Mathura, NH 19, Keetham, Agra – 282007, Uttar Pradesh**  
  *(Formerly known as Anand Campus)*

Our admission counselors are available Monday through Saturday to guide you with program details, fees, and campus tours!`,suggestions:["How to apply for admission?","Where is the campus located?","What are the available courses?","Tell me about scholarships"]},{id:"thanks",category:"Thanks/goodbye",keywords:["thank you","thanks","thx","thank u","appreciate it","thank you so much","helpful","great help"],response:`You are very welcome! 😊 Always happy to help.

Do you have any other questions about Sharda University Agra, or are you all set for now?`,suggestions:["Tell me about admissions","What is the campus address?","What courses are offered?","I am good, thank you!"]},{id:"goodbye",category:"Thanks/goodbye",keywords:["bye","goodbye","see you","cya","see you later","good night","have a nice day","bye bye","talk later"],response:`Goodbye! 👋 Thank you for chatting with me today.

Wishing you great success in your academic journey! Feel free to return anytime you need help, or visit **[agra.sharda.ac.in](https://www.agra.sharda.ac.in)**. Have a wonderful day ahead! 🎓✨`,suggestions:["Hello!","Tell me about admissions","What courses are available?"]},{id:"help",category:"Help/what can I ask",keywords:["help","what can i ask","menu","options","features","guide me","what can you do","how to use","help me"],response:`💡 **Here is what you can ask me about SUA:**

I can quickly assist you with information on:
* 🎓 **Programs:** B.Tech (CSE, AI & ML), BCA, MCA, MBA, Pharmacy, B.Sc, Design
* 📝 **Admissions:** How to apply, SUAT entrance test, document requirements
* 📍 **Campus:** Location at Keetham NH 19, transport & directions
* 🏡 **Facilities:** Hostels, Central Library, sports grounds, cafeteria, Wi-Fi
* 💼 **Placements:** 65-100% placement record, 600+ recruiters (TCS, Wipro, Infosys)
* 🎖️ **Scholarships & Aid:** Merit and sports fee concessions
* 📞 **Contact Info:** Phone helpline (+91-120-6879222) and website

Just type your question naturally, like: *"Tell me about B.Tech CSE"* or *"How do I apply?"*`,suggestions:["How to apply for admission?","What courses are available?","Tell me about placements","Where is the campus located?"]},{id:"accreditation_ranking",category:"Accreditation/ranking",keywords:["accreditation","ranking","ugc","ugc recognized","naac","is sharda recognized","approval","government approved","aicte","pci","recognized"],response:`🏆 **Accreditation & Recognition at Sharda University Agra:**

* 📜 **UGC Recognized:** SUA is recognized by the **University Grants Commission (UGC)**, ensuring valid and esteemed degree credentials across India and internationally.
* 💊 **PCI Approved:** Pharmacy programs conform to the norms of the **Pharmacy Council of India (PCI)**.
* 🎓 **Legacy of Excellence:** Built upon the rich heritage of Anand Campus and the nationwide prestige of Sharda University.
* 👥 **90,000+ Alumni:** A globally respected community of alumni working in Fortune 500 corporations and top government bodies.`,suggestions:["Tell me about the schools available","What courses are offered?","How to apply for admission?","Tell me about placements"]},{id:"student_life_clubs",category:"Student life / clubs / events",keywords:["student life","clubs","events","fests","cultural fest","activities","societies","campus life","hackathons","extra curricular","fest"],response:`🎉 **Student Life, Clubs & Cultural Events at SUA:**

Life at Sharda University Agra is full of energy, learning, and celebration!

* 🎭 **Cultural & Creative Clubs:** Music, dance, dramatics, fine arts, and photography societies.
* 💻 **Technical Societies:** Coding clubs, hackathons, robotics challenges, and developer circles.
* 🎊 **Annual Fests:** Grand inter-college cultural and technical festivals featuring celebrity artists, music concerts, and sports leagues.
* 🤝 **Social Impact:** Rotaract club, NSS activities, environmental drives, and blood donation camps.

You will find abundant avenues to make lifelong friends and discover hidden talents!`,suggestions:["Tell me about sports facilities","Tell me about hostel life","What courses are offered?","Tell me about campus facilities"]},{id:"nep_implementation",category:"General Info",keywords:["nep","national education policy","nep 2020","curriculum","flexible curriculum","credit system","multidisciplinary"],response:`📜 **National Education Policy (NEP 2020) at SUA:**

Sharda University Agra has fully embraced the progressive principles of the **National Education Policy (NEP 2020)**:

* 🔄 **Multidisciplinary Choices:** Students can pursue interdisciplinary minor courses and open electives alongside their major degrees.
* 💡 **Skill-Oriented Training:** Greater emphasis on practical workshops, internships, and research projects over rote learning.
* 🌐 **Credit Mobility & Multiple Entries/Exits:** Flexible academic pathways tailored to modern student needs.
* 🤝 **Industry & International Adjunct Faculty:** Blending theoretical foundations with practical enterprise knowledge.`,suggestions:["What programs are offered?","Tell me about B.Tech specializations","How to apply for admission?","Tell me about Sharda Launchpad"]}];function N(c,t){if(!t)return null;const e=/(fee|fees|cost|how much|charges|pricing|tuition)/i.test(c),i=/(how to apply|apply|admission|procedure|process|register|join)/i.test(c),s=/(more|tell me more|details|elaborate|explain more|yes|sure|okay)/i.test(c),a=/(eligibility|criteria|qualification|requirements)/i.test(c);if(t.startsWith("courses_")){if(e)return{reply:`Regarding the fee structure for this program:

Because tuition fees at SUA vary depending on specializations, lab components, and applicable merit scholarships, exact fee breakdowns are regularly updated on our website.

👉 Please consult the official fee table at **[https://www.agra.sharda.ac.in](https://www.agra.sharda.ac.in)** or contact our counselors directly at **+91-120-6879222**.`,suggestions:["What are the scholarship options?","What is the admission process?","Tell me about placements","What are the hostel charges?"]};if(i||a)return{reply:`To apply for this program:

1. Check that you meet the minimum eligibility criteria (typically 50% in qualifying board/degree examinations).
2. Register and submit your application on **[agra.sharda.ac.in](https://www.agra.sharda.ac.in)**.
3. Appear for **SUAT** or present valid national test scores (such as JEE Main for B.Tech or CAT/MAT for MBA).

Need help with document submission or exam dates?`,suggestions:["What documents are needed?","Tell me about the SUAT exam","What are the scholarship criteria?","What is the contact number?"]}}if(t==="facilities_hostel"&&e)return{reply:`Hostel fees vary based on your room preference:
* AC vs. Non-AC accommodations
* Single, double, or triple occupancy configurations

All hostel packages include mess meals, 24/7 security, high-speed Wi-Fi, and continuous utilities. Please check **[agra.sharda.ac.in](https://www.agra.sharda.ac.in)** for current session hostel room tariffs.`,suggestions:["Tell me about cafeteria food","What are the campus sports facilities?","Where is the campus located?","How do I contact admissions?"]};if(t==="placements_overview"&&(s||/(company|companies|who hires)/i.test(c))){const n=k.find(r=>r.id==="placements_recruiters");if(n)return{reply:n.response,suggestions:n.suggestions}}if(t==="admissions_general"&&s){const n=k.find(r=>r.id==="admissions_documents");if(n)return{reply:n.response,suggestions:n.suggestions}}return null}function O(c,t,e){let i=0;for(const s of c.keywords){const a=C(s);if(a){if(t===a)i+=60;else if(t.includes(a)){const n=a.split(" ").length;i+=20+n*10}}}for(const s of e){if(L.has(s)&&s.length<=3)continue;let a=0;for(const n of c.keywords){const r=C(n).split(" ");for(const l of r)if(!(L.has(l)&&l.length<=3)){if(s===l)a=Math.max(a,10);else if(s.length>=4&&l.length>=4){const d=R(s,l);d>=.75&&(a=Math.max(a,8*d))}}}i+=a}return i}function G(){return{reply:`I'm not quite sure I understood that question about **Sharda University Agra** 🤔

Here are a few popular topics you can ask me about:
* 🎓 **Admissions & Eligibility:** How to apply, SUAT entrance, documents required
* 📚 **Programs & Courses:** B.Tech (CSE, AI & ML), BCA, MBA, Pharmacy, B.Sc
* 🌳 **Campus Life & Facilities:** Hostels, Central Library, sports, cafeteria, labs & Wi-Fi
* 💼 **Placements & Recruiters:** 65-100% placement rate, TCS, Wipro, Infosys
* 📍 **Location & Contacts:** Keetham NH 19 address or telephone helpline

For detailed official notifications, please visit our **[Official Website](https://www.agra.sharda.ac.in)** or call our helpline at **+91-120-6879222**.`,suggestions:["Tell me about admissions","What courses are available?","Where is the campus located?","Tell me about placements"]}}function j(c,t=[]){if(!c||typeof c!="string"||!c.trim())return{reply:"Hello! 👋 How can I help you today with information regarding Sharda University Agra?",suggestions:["Tell me about admissions","What courses are available?","Where is the campus located?","Tell me about campus facilities"]};const e=C(c),i=e.split(" ").filter(Boolean);if(!S.lastIntent&&Array.isArray(t)&&t.length>0)for(let r=t.length-1;r>=0;r--){const l=t[r];if(l&&l.role==="assistant"&&typeof l.content=="string"){const d=k.find(u=>l.content.includes(u.category)||u.response.slice(0,40)===l.content.slice(0,40));if(d){S.lastIntent=d.id,S.lastCategory=d.category;break}}}const s=N(e,S.lastIntent);if(s)return s;let a=null,n=0;for(const r of k){const l=O(r,e,i);l>n&&(n=l,a=r)}return a&&n>=8?(S.lastIntent=a.id,S.lastCategory=a.category,{reply:a.response,suggestions:a.suggestions||[]}):G()}(function(){const c={state:{isOpen:!1,emotion:"idle",previousEmotion:"idle",messages:[],messageCounter:0,isTyping:!1,idleTimer:null,emotionTimers:[],imagesReady:!1},rawEmotions:{idle:x,thinking:_,happy:P,celebrating:P,confused:F,calm:U,meditating:U,waving:q},emotions:{},emotionPriority:{idle:0,happy:1,waving:1,thinking:2,celebrating:2,confused:2,meditating:2,calm:1},apiConfig:{chatEndpoint:"/api/chat",feedbackEndpoint:"/api/feedback",maxHistoryMessages:10},elements:{},init:async function(){await this.preprocessImages(),this.injectHTML(),this.cacheElements(),this.setupEventListeners();const t=sessionStorage.getItem("suai-intro-done"),e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;!t&&!e?(this.elements.tooltip.style.display="none",await this.playIntroSequence(),sessionStorage.setItem("suai-intro-done","1")):t||sessionStorage.setItem("suai-intro-done","1"),setTimeout(()=>{this.addMessage("Hey! 👋 I'm SUAi, your university AI assistant. How can I help you today?","bot")},500)},playIntroSequence:function(){return new Promise(t=>{const e=this.elements.mascotBtn,i=e.getBoundingClientRect(),s=window.innerWidth,a=window.innerHeight,n=s/2-i.width/2,r=a/2-i.height/2,l=i.left,d=i.top,u=n-l,g=r-d;e.style.setProperty("--suai-intro-translate",`translate(${u}px, ${g}px)`),this._crossfadeMascot(this.emotions.waving),this.state.emotion="waving",e.classList.add("suai-intro-hidden"),setTimeout(()=>{e.classList.remove("suai-intro-hidden"),e.classList.add("suai-intro-center"),e.style.transform=`translate(${u}px, ${g}px) scale(1.6)`,e.style.opacity="0",requestAnimationFrame(()=>{e.classList.remove("suai-intro-center"),e.classList.add("suai-intro-pop")})},400),setTimeout(()=>{this.showIntroBubble(n,r,e.offsetWidth)},1100),setTimeout(()=>{this._crossfadeMascot(this.emotions.happy),this.state.emotion="happy"},1800),setTimeout(()=>{this.hideIntroBubble(),e.classList.remove("suai-intro-pop"),e.style.transform=`translate(${u}px, ${g}px) scale(1.6)`,e.style.opacity="1",requestAnimationFrame(()=>{e.classList.add("suai-intro-settle"),requestAnimationFrame(()=>{e.style.transform="translate(0, 0) scale(1)"})})},2800),setTimeout(()=>{e.classList.remove("suai-intro-settle"),e.style.transform="",e.style.opacity="",e.style.removeProperty("--suai-intro-translate"),this._crossfadeMascot(this.emotions.idle),this.state.emotion="idle",this.elements.tooltip.style.display="",t()},3800)})},showIntroBubble:function(t,e,i){const s=document.createElement("div");s.id="suai-intro-bubble",s.innerHTML=`
        <span class="suai-bubble-line">Hey! 👋 I'm SUAi.</span>
        <span class="suai-bubble-line">Your university AI assistant.</span>
      `,document.body.appendChild(s);const a=s.getBoundingClientRect(),n=t+i/2-a.width/2,r=e-a.height-12;s.style.left=n+"px",s.style.top=r+"px",requestAnimationFrame(()=>{s.classList.add("suai-bubble-visible")}),this._introBubble=s},hideIntroBubble:function(){const t=this._introBubble;t&&(t.classList.remove("suai-bubble-visible"),t.classList.add("suai-bubble-fade"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t),this._introBubble=null},400))},preprocessImages:async function(){const t=new Map;for(const[i,s]of Object.entries(this.rawEmotions))t.has(s)||t.set(s,[]),t.get(s).push(i);const e=[];for(const[i,s]of t)e.push(this.removeBackground(i).then(a=>{for(const n of s)this.emotions[n]=a}));await Promise.all(e),this.state.imagesReady=!0},removeBackground:function(t){return new Promise(e=>{const i=new Image;i.onload=()=>{try{const s=document.createElement("canvas"),a=i.naturalWidth,n=i.naturalHeight;s.width=a,s.height=n;const r=s.getContext("2d",{willReadFrequently:!0});r.drawImage(i,0,0);const l=r.getImageData(0,0,a,n),d=l.data,u=a*n,g=new Uint8Array(u);for(let o=0;o<u;o++){const h=o*4,y=d[h],b=d[h+1],w=d[h+2],m=Math.min(y,b,w),p=Math.max(y,b,w);m>170&&p>185&&p-m<35?g[o]=1:g[o]=2}const T=new Uint8Array(u),B=new Int32Array(u);let E=0,M=0;const f=o=>{g[o]===1&&!T[o]&&(T[o]=1,B[M++]=o)};for(let o=0;o<a;o++)f(o),f((n-1)*a+o);for(let o=0;o<n;o++)f(o*a),f(o*a+a-1);for(;E<M;){const o=B[E++],h=o%a,y=(o-h)/a;h>0&&f(o-1),h<a-1&&f(o+1),y>0&&f(o-a),y<n-1&&f(o+a)}for(let o=0;o<u;o++)T[o]&&(d[o*4+3]=0);for(let o=0;o<u;o++){if(T[o])continue;const h=o%a,y=(o-h)/a;let b=0,w=0;for(let m=-1;m<=1;m++)for(let p=-1;p<=1;p++){if(p===0&&m===0)continue;const v=h+p,A=y+m;v<0||v>=a||A<0||A>=n||(w++,T[A*a+v]&&b++)}if(b>0&&w>0){const m=o*4,p=d[m],v=d[m+1],A=d[m+2],I=Math.min(p,v,A),W=Math.max(p,v,A);if(I>140&&W-I<45){const H=1-b/w*.7;d[m+3]=Math.round(d[m+3]*H)}}}r.putImageData(l,0,0),e(s.toDataURL("image/png"))}catch(s){console.warn("SUAi: background removal failed, using raw image",s),e(t)}},i.onerror=()=>{console.warn("SUAi: could not load image for preprocessing",t),e(t)},i.src=t})},injectHTML:function(){const t=document.createElement("div");t.id="suai-chatbot-container",t.innerHTML=`
        <!-- Tooltip -->
        <div id="suai-tooltip" role="tooltip">Ask SUAi ✨</div>

        <!-- Floating Mascot Button -->
        <button id="suai-mascot-btn" aria-label="Open SUAi chatbot assistant" aria-expanded="false" type="button">
          <div class="suai-mascot-img-wrapper">
            <img id="suai-mascot-img-a" class="suai-img-visible" src="${this.emotions.idle}" alt="SUAi Mascot" />
            <img id="suai-mascot-img-b" class="suai-img-hidden" src="${this.emotions.idle}" alt="SUAi Mascot" />
          </div>
        </button>

        <!-- Chat Panel -->
        <div id="suai-chat-panel" role="dialog" aria-label="SUAi chatbot" aria-hidden="true">
          <!-- Header -->
          <div id="suai-chat-header">
            <div class="suai-header-avatar suai-header-idle">
              <img id="suai-header-img-a" class="suai-img-visible" src="${this.emotions.idle}" alt="SUAi" />
              <img id="suai-header-img-b" class="suai-img-hidden" src="${this.emotions.idle}" alt="SUAi" />
            </div>
            <div class="suai-header-info">
              <span class="suai-header-title">SUAi</span>
              <span class="suai-header-subtitle">
                <span class="suai-status-dot"></span>
                University AI Assistant
              </span>
            </div>
            <div class="suai-header-actions">
              <button id="suai-minimize-btn" aria-label="Minimize chat" type="button">
                <i class="fa fa-minus"></i>
              </button>
              <button id="suai-close-btn" aria-label="Close chat" type="button">
                <i class="fa fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Panel Content wrapper for fade-in -->
          <div class="suai-panel-content">
            <!-- Messages -->
            <div id="suai-messages" aria-live="polite" aria-relevant="additions">
              <!-- Messages injected here -->
            </div>

            <!-- Quick Actions -->
            <div id="suai-quick-actions">
              <button class="suai-quick-btn" data-action="about" type="button">🏛️ About Sharda University</button>
              <button class="suai-quick-btn" data-action="courses" type="button">📚 Courses available</button>
              <button class="suai-quick-btn" data-action="admissions" type="button">📝 How to apply</button>
              <button class="suai-quick-btn" data-action="campus" type="button">🏕️ Campus facilities</button>
            </div>

            <!-- Input -->
            <div id="suai-input-area">
              <input id="suai-input" type="text" placeholder="Ask SUAi something..." autocomplete="off" aria-label="Type your message" />
              <button id="suai-send-btn" aria-label="Send message" type="button">
                <i class="fa fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      `,document.body.appendChild(t)},cacheElements:function(){this.elements={container:document.getElementById("suai-chatbot-container"),tooltip:document.getElementById("suai-tooltip"),mascotBtn:document.getElementById("suai-mascot-btn"),mascotImgA:document.getElementById("suai-mascot-img-a"),mascotImgB:document.getElementById("suai-mascot-img-b"),chatPanel:document.getElementById("suai-chat-panel"),headerAvatar:document.querySelector(".suai-header-avatar"),headerImgA:document.getElementById("suai-header-img-a"),headerImgB:document.getElementById("suai-header-img-b"),minimizeBtn:document.getElementById("suai-minimize-btn"),closeBtn:document.getElementById("suai-close-btn"),messages:document.getElementById("suai-messages"),quickActions:document.getElementById("suai-quick-actions"),inputArea:document.getElementById("suai-input-area"),input:document.getElementById("suai-input"),sendBtn:document.getElementById("suai-send-btn")},this._mascotActiveSlot="a",this._headerActiveSlot="a"},setupEventListeners:function(){this.elements.mascotBtn.addEventListener("click",()=>this.togglePanel()),this.elements.closeBtn.addEventListener("click",()=>this.closePanel()),this.elements.minimizeBtn.addEventListener("click",()=>this.closePanel()),this.elements.sendBtn.addEventListener("click",()=>this.handleSendMessage()),this.elements.input.addEventListener("keypress",e=>{e.key==="Enter"&&this.handleSendMessage()}),this.elements.quickActions.querySelectorAll(".suai-quick-btn").forEach(e=>{e.addEventListener("click",i=>{const s=i.target.getAttribute("data-action"),a=i.target.textContent;this.handleQuickAction(s,a)})}),this.elements.mascotBtn.addEventListener("mouseenter",()=>{this.state.isOpen||this.setEmotion("waving")}),this.elements.mascotBtn.addEventListener("mouseleave",()=>{this.state.isOpen||this.setEmotion("idle")}),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.state.isOpen&&this.closePanel()})},togglePanel:function(){this.state.isOpen?this.closePanel():this.openPanel()},openPanel:function(){this.state.isOpen=!0,this.triggerMascotAnimation("suai-anim-pop"),this.setEmotion("happy"),this.elements.chatPanel.classList.add("suai-panel-open"),this.elements.mascotBtn.setAttribute("aria-expanded","true"),this.elements.chatPanel.setAttribute("aria-hidden","false"),this.elements.tooltip.style.display="none",this.elements.headerAvatar.classList.add("suai-header-idle"),setTimeout(()=>this.elements.input.focus(),400)},closePanel:function(){this.state.isOpen=!1,this.elements.chatPanel.classList.remove("suai-panel-open"),this.elements.mascotBtn.setAttribute("aria-expanded","false"),this.elements.chatPanel.setAttribute("aria-hidden","true"),this.setEmotion("idle"),this.elements.headerAvatar.classList.remove("suai-header-idle"),setTimeout(()=>{this.elements.tooltip.style.display=""},1e3)},setEmotion:function(t,e={}){if(!this.emotions[t]||this.state.emotion===t)return;this.state.previousEmotion=this.state.emotion,this.state.emotion=t;const i=this.emotions[t];this._crossfadeMascot(i),this._crossfadeHeader(i),this._applyEmotionAnimation(t),e.temporary&&e.duration?this.scheduleEmotionReturn(e.returnTo||"idle",e.duration):this.resetIdleTimer()},_crossfadeMascot:function(t){const e=this._mascotActiveSlot,i=e==="a"?"b":"a",s=e==="a"?this.elements.mascotImgA:this.elements.mascotImgB,a=i==="a"?this.elements.mascotImgA:this.elements.mascotImgB;a.src=t,a.classList.replace("suai-img-hidden","suai-img-visible"),s.classList.replace("suai-img-visible","suai-img-hidden"),this._mascotActiveSlot=i},_crossfadeHeader:function(t){if(!this.elements.headerImgA||!this.elements.headerImgB)return;const e=this._headerActiveSlot,i=e==="a"?"b":"a",s=e==="a"?this.elements.headerImgA:this.elements.headerImgB,a=i==="a"?this.elements.headerImgA:this.elements.headerImgB;a.src=t,a.classList.replace("suai-img-hidden","suai-img-visible"),s.classList.replace("suai-img-visible","suai-img-hidden"),this._headerActiveSlot=i},_applyEmotionAnimation:function(t){["suai-anim-pop","suai-anim-thinking","suai-anim-celebrating","suai-anim-confused","suai-anim-meditating"].forEach(s=>this.elements.mascotBtn.classList.remove(s)),this.elements.mascotBtn.offsetWidth;const i={thinking:"suai-anim-thinking",celebrating:"suai-anim-celebrating",confused:"suai-anim-confused",meditating:"suai-anim-meditating",calm:"suai-anim-meditating",happy:"suai-anim-pop",waving:"suai-anim-pop"};i[t]&&this.elements.mascotBtn.classList.add(i[t])},triggerMascotAnimation:function(t){this.elements.mascotBtn.classList.remove(t),this.elements.mascotBtn.offsetWidth,this.elements.mascotBtn.classList.add(t);const e=()=>{this.elements.mascotBtn.classList.remove(t),this.elements.mascotBtn.removeEventListener("animationend",e)};this.elements.mascotBtn.addEventListener("animationend",e)},scheduleEmotionReturn:function(t,e){const i=setTimeout(()=>{this.state.isTyping||this.setEmotion(t);const s=this.state.emotionTimers.indexOf(i);s>-1&&this.state.emotionTimers.splice(s,1)},e);this.state.emotionTimers.push(i)},clearAllEmotionTimers:function(){this.state.emotionTimers.forEach(t=>clearTimeout(t)),this.state.emotionTimers=[]},resetIdleTimer:function(){this.state.idleTimer&&clearTimeout(this.state.idleTimer),this.state.emotion!=="idle"&&(this.state.idleTimer=setTimeout(()=>{this.state.isTyping||this.setEmotion("idle")},5e3))},addMessage:function(t,e,i=!1){const s=document.createElement("div");s.className=`suai-message-wrapper suai-message-${e}`;const a=document.createElement("div");a.className="suai-message",i||a.classList.add("suai-animate-in");let n="";if(e==="bot"){const r=this.emotions[this.state.emotion]||this.emotions.idle;n+=`
          <div class="suai-message-avatar">
            <img src="${r}" alt="SUAi" />
          </div>
          <div class="suai-message-content">${t}</div>
        `}else n+=`<div class="suai-message-content">${t}</div>`;a.innerHTML=n,s.appendChild(a),this.elements.messages.appendChild(s),this.state.messages.push({text:t,sender:e}),this.scrollToBottom()},showTypingIndicator:function(){this.state.isTyping=!0,this.clearAllEmotionTimers(),this.setEmotion("thinking");const t=document.createElement("div");t.id="suai-typing-indicator",t.className="suai-message-wrapper suai-message-bot",t.innerHTML=`
        <div class="suai-message suai-animate-in">
          <div class="suai-message-avatar">
            <img src="${this.emotions.thinking}" alt="SUAi thinking" />
          </div>
          <div class="suai-message-content suai-typing-bubble">
            <div class="suai-typing-dot"></div>
            <div class="suai-typing-dot"></div>
            <div class="suai-typing-dot"></div>
          </div>
        </div>
      `,this.elements.messages.appendChild(t),this.scrollToBottom()},hideTypingIndicator:function(){this.state.isTyping=!1;const t=document.getElementById("suai-typing-indicator");t&&t.remove()},handleSendMessage:function(){const t=this.elements.input.value.trim();!t||this.state.isTyping||(this.elements.input.value="",this.addMessage(t,"user"),this.elements.quickActions.classList.add("suai-hidden"),this.streamBotResponse(t))},handleQuickAction:function(t,e){if(this.state.isTyping)return;this.elements.quickActions.classList.add("suai-hidden");const s={about:"Tell me about Sharda University",courses:"What courses are available?",admissions:"How can I apply for admission?",campus:"What facilities are available on campus?"}[t]||e;this.addMessage(s,"user"),this.streamBotResponse(s)},streamBotResponse:async function(t){this.showTypingIndicator();try{const e=this.state.messages.map(u=>({role:u.sender==="user"?"user":"assistant",content:u.text})),i=j(t,e),s=i.reply||"",a=i.suggestions||[],n=800+Math.random()*700;await new Promise(u=>setTimeout(u,n)),this.hideTypingIndicator(),this.setEmotion("happy"),this.triggerMascotAnimation("suai-anim-pop");const r="msg-"+ ++this.state.messageCounter,{contentEl:l,wrapperEl:d}=this._createStreamingMessage(r);l.innerHTML=this.renderMarkdown(s),l.classList.add("suai-markdown-content"),this.state.messages.push({text:s,sender:"bot"}),this._addFeedbackButtons(d,r,s),a&&a.length>0&&this._addSuggestionPills(d,a),this.scrollToBottom(),this.scheduleEmotionReturn("idle",3e3)}catch(e){console.error("SUAi: local engine error",e),this.hideTypingIndicator(),this.setEmotion("confused"),this.triggerMascotAnimation("suai-anim-confused"),this.addMessage("I'm sorry, something went wrong on my end. Please try rephrasing your question. 🔧","bot"),this.scheduleEmotionReturn("idle",4e3)}},_createStreamingMessage:function(t){const e=document.createElement("div");e.className="suai-message-wrapper suai-message-bot",e.setAttribute("data-message-id",t);const i=document.createElement("div");i.className="suai-message suai-animate-in";const s=this.emotions[this.state.emotion]||this.emotions.idle;return i.innerHTML=`
        <div class="suai-message-avatar">
          <img src="${s}" alt="SUAi" />
        </div>
        <div class="suai-message-content suai-markdown-content"><span class="suai-stream-cursor"></span></div>
      `,e.appendChild(i),this.elements.messages.appendChild(e),this.scrollToBottom(),{contentEl:i.querySelector(".suai-message-content"),wrapperEl:e}},renderMarkdown:function(t){if(!t)return"";let e=t;return e=e.replace(/```(\w*)?\n([\s\S]*?)```/g,function(i,s,a){return"<pre><code>"+a.replace(/</g,"&lt;").replace(/>/g,"&gt;").trim()+"</code></pre>"}),e=e.replace(/`([^`]+)`/g,"<code>$1</code>"),e=e.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),e=e.replace(/__(.+?)__/g,"<strong>$1</strong>"),e=e.replace(/\*(.+?)\*/g,"<em>$1</em>"),e=e.replace(/_(.+?)_/g,"<em>$1</em>"),e=e.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>'),e=e.replace(/^> (.+)$/gm,"<blockquote>$1</blockquote>"),e=e.replace(/^[\-\*] (.+)$/gm,"<li>$1</li>"),e=e.replace(/(<li>.*<\/li>)/s,"<ul>$1</ul>"),e=e.replace(/^\d+\. (.+)$/gm,"<li>$1</li>"),e=e.replace(/\n\n/g,"</p><p>"),e=e.replace(/\n/g,"<br>"),e.startsWith("<")||(e="<p>"+e+"</p>"),e},_parseSuggestions:function(t){const e=t.match(/<suggestions>\s*(\[.*?\])\s*<\/suggestions>/s);let i=[],s=t;if(e){try{i=JSON.parse(e[1])}catch(a){console.warn("SUAi: failed to parse suggestions",a)}s=t.replace(/<suggestions>[\s\S]*?<\/suggestions>/g,"").trim()}return{cleanText:s,suggestions:i}},_stripSuggestions:function(t){return t.replace(/<suggestions>[\s\S]*$/g,"").trim()},_addSuggestionPills:function(t,e){this.elements.messages.querySelectorAll(".suai-suggestions-container").forEach(a=>a.remove());const s=document.createElement("div");s.className="suai-suggestions-container",e.forEach(a=>{const n=document.createElement("button");n.className="suai-suggestion-pill",n.type="button",n.textContent=a,n.addEventListener("click",()=>{s.remove(),this.elements.input.value=a,this.handleSendMessage()}),s.appendChild(n)}),t.after(s)},_addFeedbackButtons:function(t,e,i){const s=document.createElement("div");s.className="suai-feedback-row";const a=document.createElement("button");a.className="suai-feedback-btn",a.type="button",a.innerHTML="👍",a.setAttribute("aria-label","Helpful");const n=document.createElement("button");n.className="suai-feedback-btn",n.type="button",n.innerHTML="👎",n.setAttribute("aria-label","Not helpful");const r=(l,d,u)=>{d.classList.add(l==="up"?"suai-feedback-active-up":"suai-feedback-active-down"),u.classList.add("suai-feedback-disabled"),a.disabled=!0,n.disabled=!0,fetch(this.apiConfig.feedbackEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messageId:e,rating:l,messageText:i})}).catch(g=>console.warn("SUAi: feedback send failed",g))};a.addEventListener("click",()=>r("up",a,n)),n.addEventListener("click",()=>r("down",n,a)),s.appendChild(a),s.appendChild(n),t.appendChild(s)},scrollToBottom:function(){this.elements.messages.scrollTop=this.elements.messages.scrollHeight}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>c.init()):c.init()})();
