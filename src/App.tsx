import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './styles/theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  text-align: left;
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
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  width: 100%;
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
    color: ${({ theme }) => theme.colors.text};
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <ScrollToHashOrState />
        <AppContainer>
          <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <MainWrapper>
            <MainContent>
              <Routes>
                <Route path="/" element={
                  <>
                    <Section id="hero">
                      <Hero />
                    </Section>
                    <Section id="about">
                      <ContentWrapper>
                        <SectionTitle>About Me</SectionTitle>
                        <p>
                        Hi, I'm Jane!
                        </p>
                        <p>
                        I'm a Computer Science & Software Engineering student at the University of Washington Bothell, 
                        graduating in June 2026. I am passionate about building thoughtful, user-centered products that make
                        tech more meaningful and accessible.
                        </p>
                        <p>
                        I've worked across research, engineering, and leadership — from contributing to the DAIS 
                        (Data Analytics and Intelligent Systems) Lab, to leading design and operations for a 200+ 
                        member tech club, UWB Innovators Hub. 
                        </p>
                        <p>
                        I love designing and bringing ideas to life — whether that's through code, user 
                        experiences, or team projects. I'm endlessly curious, always learning, and constantly 
                        looking for ways to grow.
                        </p>
                      </ContentWrapper>
                    </Section>

                    <Section id="skills">
                      <ContentWrapper>
                        <SectionTitle>Skills</SectionTitle>
                        <ul style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '1.2rem',
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          justifyContent: 'center',
                        }}>
                          <li style={{
                            background: '#e3f2fd',
                            color: '#0e0e45',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '20px',
                            fontWeight: 500,
                            fontSize: '1rem',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                          }}>C++</li>
                          <li style={{ background: '#e3f2fd', color: '#0e0e45', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: 500, fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>Python</li>
                          <li style={{ background: '#e3f2fd', color: '#0e0e45', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: 500, fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>JavaScript</li>
                          <li style={{ background: '#e3f2fd', color: '#0e0e45', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: 500, fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>React</li>
                          <li style={{ background: '#e3f2fd', color: '#0e0e45', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: 500, fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>HTML/CSS</li>
                          <li style={{ background: '#e3f2fd', color: '#0e0e45', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: 500, fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>Figma</li>
                          <li style={{ background: '#e3f2fd', color: '#0e0e45', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: 500, fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>UI/UX Design</li>
                          <li style={{ background: '#e3f2fd', color: '#0e0e45', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: 500, fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>Machine Learning</li>
                          <li style={{ background: '#e3f2fd', color: '#0e0e45', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: 500, fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>Git/GitHub</li>
                          <li style={{ background: '#e3f2fd', color: '#0e0e45', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: 500, fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>Leadership</li>
                          <li style={{ background: '#e3f2fd', color: '#0e0e45', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: 500, fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>Teamwork</li>
                          <li style={{ background: '#e3f2fd', color: '#0e0e45', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: 500, fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>Problem Solving</li>
                          <li style={{ background: '#e3f2fd', color: '#0e0e45', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: 500, fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>Communication</li> 
                        </ul>
                      </ContentWrapper>
                    </Section>

                    <Section id="experience">
                      <ContentWrapper>
                        <SectionTitle>Experience</SectionTitle>
                        <ExperienceItem>
                          <ExperienceLogo>
                            <img src="/dais.jpg" alt="DAIS Lab Logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>Undergraduate Researcher @ <Links href="https://sites.google.com/uw.edu/dais-uw" target="_blank" rel="noopener noreferrer">DAIS Lab</Links></ExperienceTitle>
                            <ExperienceDate>May 2025 - Present</ExperienceDate>
                            <p>
                              Selected to join the DAIS Lab under Dr. Si, focused on intelligent systems and machine learning research in the field of biomedicine.
                            </p>
                          </div>
                        </ExperienceItem>
                        <ExperienceItem>
                          <ExperienceLogo>
                          <img src="/wsos.png" alt="WSOS Lab Logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>STEM Scholar Lead @ <Links href="https://waopportunityscholarship.org/" target="_blank" rel="noopener noreferrer">WSOS</Links></ExperienceTitle>
                            <ExperienceDate>Oct 2024 - Present</ExperienceDate>
                            <p>
                            Designed and executed a 9-month outreach plan using biweekly emails, Google Meet invites, and peer-based accountability check-ins for 15+ mentees, raising engagement from 7% to 60%.
                            </p>
                          </div>
                        </ExperienceItem>
                        <ExperienceItem>
                          <ExperienceLogo>
                          <img src="/ihub.jpg" alt="Innovators Hub Logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>Associate Club Founder/Chief Designer @ <Links href="https://www.uwinnovators.com/index.html" target="_blank" rel="noopener noreferrer">Innovators Hub</Links></ExperienceTitle>
                            <ExperienceDate>Sep 2024 - Present</ExperienceDate>
                            <p>
                            Led a 200+ member tech club's logistics, design, and planning operations for student innovators/builders. </p>
                          </div>
                        </ExperienceItem>
                        <ExperienceItem>
                          <ExperienceLogo>
                          <img src="/rise.jpg" alt="RISE Logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>
                              Computer Science Mentor @ <Links href="https://www.edmonds.edu/programs-and-degrees/science-technology-engineering-math/rise/" target="_blank" rel="noopener noreferrer">RISE Mentorship</Links>
                            </ExperienceTitle>
                            <ExperienceDate>Nov 2023 - June 2024</ExperienceDate>
                            <p>
                              Mentored STEM students by guiding them through academic challenges, fostering a user-centered mindset, 
                              and encouraging collaboration. I tailored strategies to support individual growth, helping students 
                              build confidence, resilience, and teamwork skills. 
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
                          <img src="/uw.png" alt="UW Logo" />
                          </ExperienceLogo>
                          <div>
                            <ExperienceTitle>Bachelor of Science in Computer Science and Software Engineering</ExperienceTitle>
                            <ExperienceDate>University of Washington, 2024 - 2026</ExperienceDate>
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
                          <img src="/rise.jpg" alt="Edmonds College Logo" />
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
                            <ProjectImage src="Project1.jpg" alt="Project 1" />
                            <ProjectContent>
                              <h3>AI-Powered Image Classifier with PyTorch
                              </h3>
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
                          <style>
                            {`
                              .credential-btn {
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
                              }
                              .credential-btn:hover {
                                background: #f5f5f5;
                                border-color: #222;
                                color: #111;
                              }
                            `}
                          </style>
                          <AchievementItem>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src="/udacity.jpg" alt="Udacity Logo" style={{ width: 40, height: 40, borderRadius: 8, background: '#fff' }} />
                                <h3 style={{ fontFamily: "'Baloo Chettan 2', 'Montserrat', Arial, sans-serif", fontWeight: 600, fontSize: '1.25rem', color: '#222', margin: 0 }}>AWS - AI Programming with Python</h3>
                              </div>
                              <div style={{ marginLeft: 58, marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                                <div style={{ color: '#555', fontSize: '1rem' }}>Udacity</div>
                                <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 6 }}>Issued Jan 2025</div>
                                <a href="https://www.udacity.com/certificate/e/213d70a6-8b40-11ef-a0dc-83ddb9ef31d2" target="_blank" rel="noopener noreferrer" className="credential-btn">
                                  Show credential
                                  <svg style={{ marginLeft: 8 }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#222" d="M14.293 5.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L17.586 12H5a1 1 0 1 1 0-2h12.586l-3.293-3.293a1 1 0 0 1 0-1.414z"/></svg>
                                </a>
                              </div>
                            </div>
                          </AchievementItem>
                          <AchievementItem>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src="/Google.png" alt="Google Logo" style={{ width: 40, height: 40, borderRadius: 8, background: '#fff' }} />
                                <h3 style={{ fontFamily: "'Baloo Chettan 2', 'Montserrat', Arial, sans-serif", fontWeight: 600, fontSize: '1.25rem', color: '#222', margin: 0 }}>Google UX Design Specialization</h3>
                              </div>
                              <div style={{ marginLeft: 58, marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                                <div style={{ color: '#555', fontSize: '1rem' }}>Google</div>
                                <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 6 }}>Issued Jul 2024</div>
                                <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 6 }}>Credential ID 5P25PKM6LN54</div>
                                <a href="https://www.coursera.org/account/accomplishments/specialization/certificate/5P25PKM6LN54" target="_blank" rel="noopener noreferrer" className="credential-btn">
                                  Show credential
                                  <svg style={{ marginLeft: 8 }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#222" d="M14.293 5.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L17.586 12H5a1 1 0 1 1 0-2h12.586l-3.293-3.293a1 1 0 0 1 0-1.414z"/></svg>
                                </a>
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
                                <img src="/wsos.png" alt="WSOS Logo" style={{ width: 40, height: 40, borderRadius: 8, background: '#fff', objectFit: 'contain' }} />
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
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App; 