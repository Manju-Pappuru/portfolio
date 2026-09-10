import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import Footer from './components/Footer';
import { portfolioData } from './data/portfolioData';
import { getProjects } from './services/api';

export default function App() {
  const [projects, setProjects] = useState(portfolioData.projects);

  useEffect(() => {
    getProjects().then(setProjects).catch(() => setProjects(portfolioData.projects));
  }, []);

  return <>
    <Navbar />
    <main>
      <Hero personal={portfolioData.personal} />
      <About personal={portfolioData.personal} />
      <Skills skills={portfolioData.skills} />
      <Education education={portfolioData.education} />
      <Projects projects={projects} />
      <Certifications certifications={portfolioData.certifications} />
      <Achievements achievements={portfolioData.achievements} />
      <Contact />
    </main>
    <AIChat />
    <Footer personal={portfolioData.personal} />
  </>;
}
