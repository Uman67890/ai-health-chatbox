import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, Sparkles, Github, ExternalLink } from 'lucide-react';

const teamMembers = [
    {
        name: 'UMANG',
        role: 'Lead Developer & Architect',
        contribution: 'Designed the core architecture, AI integration logic, and seamless health tracking system. Spearheaded the global health registry development.',
        skills: ['React', 'TypeScript', 'System Design'],
        color: '#1a73e8'
    },
    {
        name: 'DAKSH',
        role: 'UI/UX Designer',
        contribution: 'Crafted the elegant "Wellness AI" design system, focused on glassmorphism and premium user experience. Refined the mobile-responsive layouts.',
        skills: ['Framer Motion', 'Vanilla CSS', 'UI Design'],
        color: '#e11d48'
    },
    {
        name: 'GAURAV',
        role: 'Frontend Engineer',
        contribution: 'Implemented complex medical visualization cards and interactive dashboard metrics. Optimized performance for high-speed AI interactions.',
        skills: ['React Hooks', 'Data Visualization', 'Optimization'],
        color: '#059669'
    },
    {
        name: 'AYUSH',
        role: 'Medical Data Specialist',
        contribution: 'Curated the comprehensive disease database and ensured medical accuracy across symptoms, remedies, and precautions. Built the wellness tips engine.',
        skills: ['Data Curation', 'Health Science', 'Backend Services'],
        color: '#7c3aed'
    }
];

export const TeamDetails: React.FC = () => {
    return (
        <div className="team-container glass">
            <header className="team-header">
                <Sparkles className="icon-pulse" size={32} />
                <h2>Individual Contribution</h2>
                <p>Meet the brilliant minds behind Wellness AI</p>
            </header>

            <div className="team-grid">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={member.name}
                        className="member-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="member-avatar" style={{ background: `linear-gradient(135deg, ${member.color}22, ${member.color}44)` }}>
                            <User size={32} style={{ color: member.color }} />
                        </div>

                        <div className="member-info">
                            <span className="member-role" style={{ color: member.color, background: `${member.color}11` }}>
                                {member.role}
                            </span>
                            <h3>{member.name}</h3>
                            <p className="member-contribution">{member.contribution}</p>

                            <div className="member-skills">
                                {member.skills.map(skill => (
                                    <span key={skill} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div className="card-footer">
                            <button className="icon-btn"><Github size={16} /></button>
                            <button className="icon-btn"><ExternalLink size={16} /></button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="project-highlight">
                <Code2 size={24} />
                <p>Built with ❤️ for a Healthier Planet</p>
            </div>
        </div>
    );
};
