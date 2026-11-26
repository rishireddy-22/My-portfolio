import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Resume from '../components/Resume';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

import { useTheme } from '../hooks/useTheme';
import { useFetch } from '../hooks/useFetch';
import {
  getProfile,
  getEducation,
  getSkills,
  getProjects,
  getResume
} from '../services/api';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');

  // Fetch data using the reusable useFetch hook
  const { data: profile, loading: profileLoading } = useFetch(getProfile);
  const { data: education, loading: educationLoading } = useFetch(getEducation);
  const { data: skills, loading: skillsLoading } = useFetch(getSkills);
  const { data: projects, loading: projectsLoading } = useFetch(getProjects);
  const { data: resume, loading: resumeLoading } = useFetch(getResume);

  // Active section scroll spy
  useEffect(() => {
    const sectionIds = ['home', 'about', 'education', 'skills', 'projects', 'resume', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Glass Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        initials={profile?.initials || 'RS'}
        activeSection={activeSection}
      />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        {profileLoading ? (
          <div className="section container" style={{ paddingTop: '8rem' }}>
            <Loader type="card" count={1} />
          </div>
        ) : (
          <Hero profile={profile} resumeUrl={resume?.fileUrl} />
        )}

        {/* About Section */}
        {profileLoading ? (
          <div className="section container">
            <Loader type="card" count={2} />
          </div>
        ) : (
          <About profile={profile} />
        )}

        {/* Education Timeline */}
        {educationLoading ? (
          <div className="section container">
            <Loader type="timeline" count={2} />
          </div>
        ) : (
          <Education educationList={education} />
        )}

        {/* Skills Competencies */}
        {skillsLoading ? (
          <div className="section container">
            <Loader type="card" count={3} />
          </div>
        ) : (
          <Skills skillsData={skills} />
        )}

        {/* Projects Showcase */}
        {projectsLoading ? (
          <div className="section container">
            <Loader type="card" count={3} />
          </div>
        ) : (
          <Projects projectsList={projects} />
        )}

        {/* Resume CV Section */}
        {resumeLoading ? (
          <div className="section container">
            <Loader type="card" count={1} />
          </div>
        ) : (
          <Resume resumeData={resume} />
        )}

        {/* Contact Form & Coordinates */}
        <Contact profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />
    </div>
  );
}
