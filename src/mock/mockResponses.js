/**
 * SUAi Local Mock Data Service
 * ZERO LLM tokens, ZERO network calls.
 * 100% local frontend simulation.
 */

export const mockResponses = {
  admissions: {
    state: "answering",
    speech: "Here is what I found about Admissions! 🎓",
    text: `**Admissions 2026-27 @ Sharda University Agra**\n\n- **Programs Offered:** B.Tech, BCA, MCA, B.Pharm, MBA, BBA, B.Com (ACCA), B.Sc Agriculture & Design.\n- **How to Apply:** You can apply online via the admission portal.\n- **Eligibility:** 50%+ aggregate in 10+2 / qualifying exam.\n\nNeed assistance? Call Admissions Helpline: **+91-120-6879222**!`
  },
  courses: {
    state: "answering",
    speech: "Check out our course programs! 📚",
    text: `**Schools & Degree Programs**\n\n1. **Anand School of Engineering & Technology (ASET):** B.Tech CSE, AI, Cyber Security, Data Science, MCA, M.Tech.\n2. **Sharda School of Pharmacy (SSP):** B.Pharm, M.Pharm, D.Pharm.\n3. **Sharda School of Business Studies (SSBS):** BBA, B.Com with ACCA, MBA, EMBA.\n4. **Sharda School of Smart Agriculture (SSSA):** B.Sc (Hons) & M.Sc Agriculture.\n5. **Sharda School of Design (SSD):** B.Design (Fashion & Interior Design).`
  },
  campus: {
    state: "excited",
    speech: "Our campus is awesome! Take a look 🏫✨",
    text: `**50+ Acres Campus & Facilities**\n\n- Modern AC & Non-AC Hostels for Boys & Girls with 24/7 Security.\n- High-Speed Wi-Fi & Teaching Learning Centers.\n- Multi-cuisine Food Courts & Cafeterias.\n- Sports Complex, Gymnasium, Medical Center & Library.`
  },
  scholarships: {
    state: "excited",
    speech: "We have great scholarship options! 💰🌟",
    text: `**Sharda Scholarship Schemes**\n\n- **Merit Scholarships:** Up to 100% tuition waiver based on qualifying marks.\n- **Innovative Idea Scholarship:** For promising student inventions & startup ideas.\n- **Special Categories:** Concessions for Sports stars & Wards of Defense personnel.`
  },
  exams: {
    state: "answering",
    speech: "Here is the exam & COE info! 📝",
    text: `**Office of COE & Examinations**\n\n- Exam schedules, circulars, and hall tickets are available via the ISIM Portal.\n- Results for mid-term & end-term exams can be checked online anytime.`
  },
  placements: {
    state: "success",
    speech: "Our placement records are stellar! 💼🎉",
    text: `**Placements & Career Building**\n\n- **Placement Rate:** 65% to 100% across programs!\n- **600+ Top Recruiters:** TCS, Infosys, Wipro, Dr. Reddy's, GlaxoSmithKline, Lido.\n- **Top Packages:** Up to 10 LPA+ for standout graduates.`
  },
  events: {
    state: "excited",
    speech: "Check out what's happening on campus! 📅🔥",
    text: `**Upcoming Events @ Sharda Agra**\n\n- **Sharda SPORTS Connect 2026:** June 5, 2026\n- **Industry Skills Bootcamp:** June 1, 2026\n- **Cyber Security Tech Workshop:** Recent MoU with Securium Solutions`
  },
  contact: {
    state: "answering",
    speech: "Here's how to contact us! 📞",
    text: `**Contact Sharda University Agra**\n\n- **Helpline:** +91-120-6879222\n- **Campus Address:** 18 KM from Bhagwan Talkies Towards Mathura, NH 19, Keetham, Agra – 282007, Uttar Pradesh.\n- **Website:** agra.sharda.ac.in`
  },
  default: {
    state: "answering",
    speech: "Got it! Here is what I can share 💜",
    text: `SUAi is currently in preview mode!\n\nSharda University Agra offers 40+ programs across Engineering, Pharmacy, Business, Agriculture, Humanities, and Design. Ask me about **Admissions**, **Courses**, **Fees**, or **Placements**!`
  }
};

export function getLocalMockReply(queryText) {
  const q = (queryText || '').toLowerCase();
  
  if (q.includes('admission') || q.includes('apply')) return mockResponses.admissions;
  if (q.includes('course') || q.includes('fee') || q.includes('program')) return mockResponses.courses;
  if (q.includes('campus') || q.includes('hostel') || q.includes('facility')) return mockResponses.campus;
  if (q.includes('scholarship') || q.includes('money') || q.includes('discount')) return mockResponses.scholarships;
  if (q.includes('exam') || q.includes('result') || q.includes('coe')) return mockResponses.exams;
  if (q.includes('placement') || q.includes('job') || q.includes('salary') || q.includes('company')) return mockResponses.placements;
  if (q.includes('event') || q.includes('news') || q.includes('activity')) return mockResponses.events;
  if (q.includes('contact') || q.includes('phone') || q.includes('address') || q.includes('location')) return mockResponses.contact;
  
  return mockResponses.default;
}
