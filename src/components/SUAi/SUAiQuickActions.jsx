import React from 'react';
import { GraduationCap, BookOpen, Building2, Coins, FileText, Briefcase, Calendar, HelpCircle } from 'lucide-react';

const ACTIONS = [
  { icon: GraduationCap, label: 'Admissions & Apply', query: 'Tell me about Admissions for 2026-27' },
  { icon: BookOpen, label: 'Courses & Fees', query: 'What courses and fee structure are available?' },
  { icon: Building2, label: 'Campus & Hostel', query: 'Tell me about campus facilities & hostel' },
  { icon: Coins, label: 'Scholarships', query: 'What scholarship options are available?' },
  { icon: FileText, label: 'Exams & Results', query: 'Tell me about exams and COE circulars' },
  { icon: Briefcase, label: 'Placements', query: 'What is the placement record & recruiters?' },
  { icon: Calendar, label: 'Events & News', query: 'What upcoming events are happening on campus?' },
  { icon: HelpCircle, label: 'Contact & Help', query: 'How can I contact Sharda University Agra?' }
];

export function SUAiQuickActions({ onActionSelect }) {
  return (
    <div className="suai-actions-grid">
      {ACTIONS.map((action, i) => {
        const IconComponent = action.icon;
        return (
          <div 
            key={i} 
            className="suai-action-btn"
            onClick={() => onActionSelect && onActionSelect(action.query)}
          >
            <div className="icon">
              <IconComponent size={18} color="#A78BFA" />
            </div>
            <span className="label">{action.label}</span>
          </div>
        );
      })}
    </div>
  );
}
