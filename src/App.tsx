import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './styles/theme.ts';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  overflow-x: hidden;
`;

const MainWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const MainContent = styled.main`
  padding-top: 10px;
  width: 100%;
`;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.lg} 0;
  min-height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md} 0;
  }
  @media (max-width: 600px) {
    padding: 0.7rem 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  text-align: left;
  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const ExperienceItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const ExperienceLogo = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e3f2fd;
  border-radius: 8px;
  font-size: 2rem;
  padding: 4px;
  box-sizing: border-box;
  margin-right: 0.5rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 6px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0 0 0.5rem 0;
  }
`;

const ExperienceTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1.25rem;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;
    transition: color 0.2s;
    &:hover {
      color: ${({ theme }) => theme.colors.textLight};
    }
  }
`;

const ExperienceDate = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 0.95rem;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  width: calc(100vw - 128px);
  max-width: calc(100vw - 128px);
  margin-left: 50%;
  transform: translateX(-50%);
  padding-left: 64px;
  padding-right: 64px;
  box-sizing: border-box;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    padding-left: 24px;
    padding-right: 24px;
    width: calc(100vw - 48px);
    max-width: calc(100vw - 48px);
  }
`;

const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: transform ${({ theme }) => theme.transitions.default};
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
  &:hover a.project-btn {
    opacity: 1;
    pointer-events: auto;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const ProjectContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  h3 {
    font-size: 1.25rem;
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
  p {
    font-size: 0.95rem;
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const ProjectButton = styled.a`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  opacity: 0;
  pointer-events: none;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const AchievementList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const AchievementItem = styled.li`
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  h3 {
    font-size: 1.25rem;
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const Links = styled.a`
  color: #0e0e45;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;
  }
  &:visited {
    color: #0e0 e45;
  }
`;

// Animated wrapper for Hero section
const HeroSectionWrapper = styled.div<{ show: boolean }>`
  opacity: ${props => (props.show ? 1 : 0)};
  transform: translateY(${props => (props.show ? '0' : '-60px')});
  transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
`;

// Animated wrapper for About Me section
const AboutSectionWrapper = styled.div<{ show: boolean }>`
  opacity: ${props => (props.show ? 1 : 0)};
  transform: translateY(${props => (props.show ? '0' : '-60px')});
  transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
`;

const Footer = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  padding: 2rem 0 1rem 0;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  border-top: 1px solid ${({ theme }) => theme.colors.textLight}22;
  margin-top: 3rem;
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1.5rem 0 1rem 0;
    margin-top: 2rem;
  }
`;

// Change SkillsGrid to display rows instead of columns
const SkillsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    gap: 1.2rem;
  }
`;

const SkillRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

const RowTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: 600;
  min-width: 150px;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    min-width: auto;
  }
`;

const SkillsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const SkillItem = styled.li`
  background: #e3f2fd;
  color: #0e0e45;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  cursor: pointer;
  transition: background 0.25s, color 0.25s, box-shadow 0.25s, transform 0.18s cubic-bezier(0.4,0,0.2,1);
  will-change: background, color, box-shadow, transform;
  max-width: 400px;
  text-align: left;
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    max-width: none;
    white-space: normal;
  }
  &:hover {
    background: #bbdefb;
    color: #1976d2;
    box-shadow: 0 4px 16px rgba(25, 118, 210, 0.13);
    transform: translateY(-3px) scale(1.06);
  }
`;

const CredentialButton = styled.a`
  display: inline-flex;
  align-items: center;
  margin-top: 16px;
  padding: 8px 24px;
  border: 1.5px solid #888;
  border-radius: 24px;
  font-weight: 500;
  color: #222;
  text-decoration: none;
  font-size: 1rem;
  background: #fff;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 6px 20px;
  }
  &:hover {
    background: #f5f5f5;
    border-color: #222;
    color: #111;
  }
`;

function ScrollToHashOrState() {
  const location = useLocation();
  useEffect(() => {
    // Priority: scrollTo state, then hash
    const scrollTo = (location.state as any)?.scrollTo;
    if (scrollTo) {
      if (scrollTo === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(scrollTo);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 0);
        }
      }
    } else if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    }
  }, [location]);
  return null;
}

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const aboutRef = React.useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Trigger the hero animation after a short delay for smoothness
    const timer = setTimeout(() => setShowHero(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ref = aboutRef.current;
    if (!ref) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowAbout(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <ScrollToHashOrState />
        <AppContainer>
          <Navbar/>
          <MainWrapper>
            <MainContent>
              <Routes>
                <Route path="/" element={
                  <>
                    <Section id="hero">
                      <HeroSectionWrapper show={showHero}>
                        <Hero />
                      </HeroSectionWrapper>
                    </Section>
                    <Section id="about">
                      <AboutSectionWrapper show={showAbout} ref={aboutRef}>
                        <ContentWrapper>
                          <SectionTitle>About Me</SectionTitle>
                          <p>
                           I’m a Computer Science & Software Engineering student at the University of Washington, graduating in June 2026.
                          </p>

                          <p>
                          I’m currently involved in two research projects: (1) Data Analysis & Intelligent Systems (DAIS) Lab and (2) 
                          Custom Keyset Skins for the Microsoft Surface Laptop. Even though these projects are very different, I joined both because 
                          I love learning new fields and understanding how technology can improve someone’s life.
                          </p>

                          <p>
                          At my core, I’m driven by people. I constantly think about real pain points in daily life and ask: “How can this be solved? 
                          What tools do I need to build it? What should I learn next?” I’m a curious learner, a user-driven thinker, and a problem 
                          solver who cares deeply about creating meaningful, human-centered solutions.
                          </p> 

                        </ContentWrapper>
                      </AboutSectionWrapper>
                    </Section>

                    <Section id="skills">
                      <ContentWrapper>
                        <SectionTitle>Skills</SectionTitle>
                        <SkillsGrid>
                          <SkillRow>
                            <RowTitle>Technical Skills</RowTitle>
                            <SkillsList>
                              <SkillItem>Python</SkillItem>
                              <SkillItem>C++</SkillItem>
                              <SkillItem>Java</SkillItem>
                              <SkillItem>Machine Learning</SkillItem>
                              <SkillItem>Deep Learning</SkillItem>
                              <SkillItem>Data Analysis</SkillItem>
                              <SkillItem>Generative AI</SkillItem>
                              <SkillItem>Git/GitHub</SkillItem>
                              <SkillItem>SQL</SkillItem>
                            </SkillsList>
                          </SkillRow>
                          
                          <SkillRow>
                            <RowTitle>Soft Skills</RowTitle>
                            <SkillsList>
                              <SkillItem>Adaptability</SkillItem>
                              <SkillItem>Data Storytelling</SkillItem>
                              <SkillItem>Continuous Learning</SkillItem>
                              <SkillItem>Leadership</SkillItem>
                              <SkillItem>Continuous Learning</SkillItem>
                              <SkillItem>Teamwork</SkillItem>
                              <SkillItem>Problem Solving</SkillItem>
                              <SkillItem>Critical Thinking</SkillItem>
                              <SkillItem>Communication</SkillItem>
                              <SkillItem>Cross-functional Teamwork</SkillItem>
                            </SkillsList>
                          </SkillRow>
                        </SkillsGrid>
                      </ContentWrapper>
                    </Section>

                    <Section id="experience">
                      <ContentWrapper>
                        <SectionTitle>Experience</SectionTitle>
                        <ExperienceItem>
                          <ExperienceLogo>
                            <img src="dais.jpg" alt="DAIS Lab Logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>Undergraduate Researcher @ <Links href="https://sites.google.com/uw.edu/dais-uw" target="_blank" rel="noopener noreferrer">DAIS Lab</Links></ExperienceTitle>
                            <ExperienceDate>May 2025 - Present</ExperienceDate>
                            <p>
                             Dr. Si’s Data Analysis & Intelligent Systems (DAIS) Group - DeepTracer Generative AI Team
                            </p>
                          </div>
                        </ExperienceItem>
                        <ExperienceItem>
                          <ExperienceLogo>
                          <img src="wsos.png" alt="WSOS Lab Logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>Returning STEM Scholar Lead @ <Links href="https://waopportunityscholarship.org/" target="_blank" rel="noopener noreferrer">WSOS</Links></ExperienceTitle>
                            <ExperienceDate>Oct 2024 - Present</ExperienceDate>
                            <p>
                            Returning STEM Scholar Lead for the WSOS program, where I mentor and support STEM students in their academic and career development.
                            </p>
                          </div>
                        </ExperienceItem>
                        <ExperienceItem>
                          <ExperienceLogo>
                          <img src="ihub.jpg" alt="Innovators Hub Logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>Associate Club Founder/Chief Designer @ <Links href="https://www.uwinnovators.com/index.html" target="_blank" rel="noopener noreferrer">Innovators Hub</Links></ExperienceTitle>
                            <ExperienceDate>Sep 2024 - Present</ExperienceDate>
                            <p>
                            A 200+ member tech club for student innovators/builders.
                            </p>
                          </div>
                        </ExperienceItem>
                        <ExperienceItem>
                          <ExperienceLogo>
                            <img src="idea_enterprises_llc_logo.jpg" alt="IDEA logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>UX Designer Intern @ <Links href="https://www.idea-vis.com/" target="_blank" rel="noopener noreferrer">IDEA Enterprises LLC</Links></ExperienceTitle>
                            <ExperienceDate>July 2025 - Sep 2025</ExperienceDate>
                            <p>
                             Interviewed stakeholders, gathered insights, and worked on AI-powered safety systems. Created the full design system and delivered high-fidelity app prototypes.
                            </p>
                          </div>
                        </ExperienceItem>
                        <ExperienceItem>
                          <ExperienceLogo>
                            <img src="billow.png" alt="Billow Logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>Web Designer Intern @ <Links href="https://www.billow.fun/" target="_blank" rel="noopener noreferrer">Billow</Links></ExperienceTitle>
                            <ExperienceDate>June 2025 - Sep 2025</ExperienceDate>
                            <p>
                             Designed and developed a web platform for Billow, a platform that helps people find and book unique experiences. 
                            </p>
                          </div>
                        </ExperienceItem>
                        <ExperienceItem>
                          <ExperienceLogo>
                          <img src="rise.jpg" alt="RISE Logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>
                              Computer Science Mentor @ <Links href="https://www.edmonds.edu/programs-and-degrees/science-technology-engineering-math/rise/" target="_blank" rel="noopener noreferrer">RISE Mentorship</Links>
                            </ExperienceTitle>
                            <ExperienceDate>Nov 2023 - June 2024</ExperienceDate>
                            <p>
                             Mentored students in computer science and helped them with their projects.
                            </p>
                          </div>
                        </ExperienceItem>
                      </ContentWrapper>
                    </Section>

                    <Section id="education">
                      <ContentWrapper>
                        <SectionTitle>Education</SectionTitle>
                        <ExperienceItem>
                          <ExperienceLogo>
                          <img src="uw.png" alt="UW Logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>Bachelor of Science in Computer Science and Software Engineering</ExperienceTitle>
                            <ExperienceDate>University of Washington, Sep 2024 - Jun 2026(Expected)</ExperienceDate>
                            <p>
                              B.S. Computer Science & Software Engineering
                            </p>
                            <p>
                              Extracurricular:
                            </p>
                            <ul>
                              <li>Leadership: Innovators Hub Club Associate Founder/Chief Designer</li>
                              <li>Teamwork: FigBuild2025 Design Hackathon Participant</li>
                              <li>Research: DAIS Lab Undergraduate Researcher</li>
                            </ul>
                          </div>
                        </ExperienceItem>
                        <ExperienceItem>
                          <ExperienceLogo>
                          <img src="rise.jpg" alt="Edmonds College Logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>Associate of Science in Computer Science and Software Engineering</ExperienceTitle>
                            <ExperienceDate>Edmonds College, 2022 - 2024</ExperienceDate>
                            <p>
                              Extracurricular:
                            </p>
                            <ul>
                              <li>Leadership: RISE Mentorship</li>
                              <li>Teamwork: CS for Change Club Member</li>
                              <li>Leaner Startups: <Links href="https://www.surfincubator.com/events" target="_blank" rel="noopener noreferrer">Hackathon Participant</Links></li>
                              <li>listed in the <Links href="https://www.edmonds.edu/programs-and-degrees/science-technology-engineering-math/mesa/student-spotlight.html" target="_blank" rel="noopener noreferrer">MESA Student Spotlight</Links></li>
                            </ul>
                          </div>
                        </ExperienceItem>
                      </ContentWrapper>
                    </Section>

                    <Section id="projects">
                      <ContentWrapper>
                        <SectionTitle>Projects</SectionTitle>
                        <ProjectGrid>

                        <ProjectCard>
                            <ProjectImage src="iFoodBee2.jpg" alt="Project 1" />
                            <ProjectContent>
                              <h3>Food Waste Reduction Platform Design
                              </h3>
                              <p>
                                Jan 2025 - Feb 2025
                              </p>
                              <p>
                              Designed iFoodBee's web platform to help reduce food waste and support local businesses through user-friendly UX and visual storytelling.
                              </p>
                              <ProjectButton className="project-btn" href="https://www.behance.net/gallery/228878415/iFoodBee-Web-Design-MockUp?lo=1750782022?share=1" target="_blank" rel="noopener noreferrer">👀</ProjectButton>
                            </ProjectContent>
                          </ProjectCard>

                        <ProjectCard>
                            <ProjectImage src="Adulthood2.jpg" alt="Adulthood" />
                            <ProjectContent>
                              <h3>FigBuild2025 Design Hackathon
                              </h3>
                              <p>
                                Apr 2025
                              </p>
                              <p>
                                Designed Adulthood, an AI-powered app that helps young adults (18+) navigate real-world challenges like taxes, L&I, and car accidents through an instant-answer chatbot and a built-in learning center.
                              </p>
                            </ProjectContent>
                          </ProjectCard>

                        <ProjectCard>
                            <ProjectImage src="ihubdemoday.jpg" alt="Project 2" />
                            <ProjectContent>
                              <h3>Club Event Visual Design & Planning</h3>
                              <p>
                               Apr 2025 - Jun 2025
                              </p>
                              <p>
                              Led the full design direction for Demo Day and a series of company tours. Created all event visuals and coordinated with club officers to plan the schedule and timeline.
                              </p>
                              <ProjectButton className="project-btn" href="https://www.linkedin.com/feed/update/urn:li:activity:7337213071590944769" target="_blank" rel="noopener noreferrer">👀</ProjectButton>
                            </ProjectContent>
                          </ProjectCard>

                          <ProjectCard>
                            <ProjectImage src="Project1.jpg" alt="Project 1" />
                            <ProjectContent>
                              <h3>AI-Powered Image Classifier with PyTorch
                              </h3>
                              <p>
                                Jan 2025 - Feb 2025
                              </p>
                              <p>
                              A VGG16-based image classifier built with PyTorch to learn deep learning through hands-on training and prediction.
                              </p>
                              <ProjectButton className="project-btn" href="https://github.com/jahabe/Image-Classifier" target="_blank" rel="noopener noreferrer">👀</ProjectButton>
                            </ProjectContent>
                          </ProjectCard>

                          <ProjectCard>
                            <ProjectImage src="mesawebsite.png" alt="Project 2" />
                            <ProjectContent>
                              <h3>Non-Profit Organization Website Design</h3>
                              <p>
                                Jun 2024 - Aug 2024
                              </p>
                              <p>
                              Redesigned the Edmonds College MESA website to improve user interaction and layout.
                              </p>
                              <ProjectButton className="project-btn" href="https://dribbble.com/shots/25951978-Non-Profit-Organization-Website-Design" target="_blank" rel="noopener noreferrer">👀</ProjectButton>
                            </ProjectContent>
                          </ProjectCard>

                        </ProjectGrid>
                      </ContentWrapper>
                    </Section>

                    <Section id="achievements">
                      <ContentWrapper>
                        <SectionTitle>Achievements & Awards</SectionTitle>
                        <AchievementList>
                        <AchievementItem>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src="Codepath.png" alt="Codepath Logo" style={{ width: 40, height: 40, borderRadius: 8, background: '#fff' }} />
                                <h3 style={{ fontFamily: "'Baloo Chettan 2', 'Montserrat', Arial, sans-serif", fontWeight: 600, fontSize: '1.25rem', color: '#222', margin: 0 }}>Intermediate Technical Interview Prep Completion</h3>
                              </div>
                              <div style={{ marginLeft: 58, marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                                <div style={{ color: '#555', fontSize: '1rem' }}>Codepath*org</div>
                                <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 6 }}>Issued Aug 2025</div>
                              </div>
                            </div>
                          </AchievementItem>
                        <AchievementItem>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src="iHubCompletion.jpeg" alt="I Hub Badge Logo" style={{ width: 40, height: 40, borderRadius: 8, background: '#fff' }} />
                                <h3 style={{ fontFamily: "'Baloo Chettan 2', 'Montserrat', Arial, sans-serif", fontWeight: 600, fontSize: '1.25rem', color: '#222', margin: 0 }}>Innovators Hub Launchpad S25 Completion Badge</h3>
                              </div>
                              <div style={{ marginLeft: 58, marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                                <div style={{ color: '#555', fontSize: '1rem' }}>Innovators Hub (1%)</div>
                                <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 6 }}>Issued Jun 2025</div>
                                <CredentialButton href="https://www.linkedin.com/in/jane026/overlay/1749331071596/single-media-viewer/?profileId=ACoAAEKJWnUBiAinhTNzQjlo5oQPwJgDdF1FnxQ" target="_blank" rel="noopener noreferrer">
                                  Show credential
                                  <svg style={{ marginLeft: 8 }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#222" d="M14.293 5.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L17.586 12H5a1 1 0 1 1 0-2h12.586l-3.293-3.293a1 1 0 0 1 0-1.414z"/></svg>
                                </CredentialButton>
                              </div>
                            </div>
                          </AchievementItem>
                          <AchievementItem>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src="udacity.jpg" alt="Udacity Logo" style={{ width: 40, height: 40, borderRadius: 8, background: '#fff' }} />
                                <h3 style={{ fontFamily: "'Baloo Chettan 2', 'Montserrat', Arial, sans-serif", fontWeight: 600, fontSize: '1.25rem', color: '#222', margin: 0 }}>AWS - AI Programming with Python</h3>
                              </div>
                              <div style={{ marginLeft: 58, marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                                <div style={{ color: '#555', fontSize: '1rem' }}>Udacity</div>
                                <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 6 }}>Issued Jan 2025</div>
                                <CredentialButton href="https://www.udacity.com/certificate/e/213d70a6-8b40-11ef-a0dc-83ddb9ef31d2" target="_blank" rel="noopener noreferrer">
                                  Show credential
                                  <svg style={{ marginLeft: 8 }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#222" d="M14.293 5.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L17.586 12H5a1 1 0 1 1 0-2h12.586l-3.293-3.293a1 1 0 0 1 0-1.414z"/></svg>
                                </CredentialButton>
                              </div>
                            </div>
                          </AchievementItem>
                          <AchievementItem>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src="Google.png" alt="Google Logo" style={{ width: 40, height: 40, borderRadius: 8, background: '#fff' }} />
                                <h3 style={{ fontFamily: "'Baloo Chettan 2', 'Montserrat', Arial, sans-serif", fontWeight: 600, fontSize: '1.25rem', color: '#222', margin: 0 }}>Google UX Design Specialization</h3>
                              </div>
                              <div style={{ marginLeft: 58, marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                                <div style={{ color: '#555', fontSize: '1rem' }}>Google</div>
                                <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 6 }}>Issued Jul 2024</div>
                                <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 6 }}>Credential ID 5P25PKM6LN54</div>
                                <CredentialButton href="https://www.coursera.org/account/accomplishments/specialization/certificate/5P25PKM6LN54" target="_blank" rel="noopener noreferrer">
                                  Show credential
                                  <svg style={{ marginLeft: 8 }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#222" d="M14.293 5.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L17.586 12H5a1 1 0 1 1 0-2h12.586l-3.293-3.293a1 1 0 0 1 0-1.414z"/></svg>
                                </CredentialButton>
                              </div>
                            </div>
                          </AchievementItem>
                          <AchievementItem>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src="awis.jpg" alt="AWIS Logo" style={{ width: 40, height: 40, borderRadius: 8, background: '#fff', objectFit: 'contain' }} />
                                <h3 style={{ fontFamily: "'Baloo Chettan 2', 'Montserrat', Arial, sans-serif", fontWeight: 600, fontSize: '1.25rem', color: '#222', margin: 0 }}>Seattle Association for Women in Science (AWIS) Scholarship</h3>
                              </div>
                              <div style={{ marginLeft: 58, marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                                <div style={{ color: '#555', fontSize: '1rem', fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 400 }}>
                                  <Links href="https://seattleawis.org/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'inherit', fontWeight: 'inherit' }}>Seattle AWIS</Links>
                                </div>
                                <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 6 }}>Issued May 2024</div>
                              </div>
                            </div>
                          </AchievementItem>
                          <AchievementItem>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src="wsos.png" alt="WSOS Logo" style={{ width: 40, height: 40, borderRadius: 8, background: '#fff', objectFit: 'contain' }} />
                                <h3 style={{ fontFamily: "'Baloo Chettan 2', 'Montserrat', Arial, sans-serif", fontWeight: 600, fontSize: '1.25rem', color: '#222', margin: 0 }}>Baccalaureate Scholarship</h3>
                              </div>
                              <div style={{ marginLeft: 58, marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                                <div style={{ color: '#555', fontSize: '1rem', fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 400 }}>
                                  <Links href="https://waopportunityscholarship.org/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'inherit', fontWeight: 'inherit' }}>Washington State Opportunity Scholarship</Links>
                                </div>
                                <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 6 }}>Issued Sep 2023</div>
                              </div>
                            </div>
                          </AchievementItem>
                        </AchievementList>
                      </ContentWrapper>
                    </Section>
                  </>
                } />
                <Route path="/gallery" element={
                  <Section>
                    <ContentWrapper>
                      <SectionTitle>Gallery</SectionTitle>
                      <p>Coming soon: A collection of my work and projects in visual format.</p>
                    </ContentWrapper>
                  </Section>
                } />
              </Routes>
            </MainContent>
          </MainWrapper>
          <Footer>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.1em' }}>JC</div>
            <div style={{ marginTop: 4, fontSize: '1rem', color: '#888' }}>© 2025 Jane Choi</div>
          </Footer>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App; 