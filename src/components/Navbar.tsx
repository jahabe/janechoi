import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.small};
  z-index: 1000;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  outline: none;
  &:focus, &:active {
    outline: none;
    box-shadow: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const NavAnchor = styled.a`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  text-decoration: none;
  outline: none;
  transition: background ${({ theme }) => theme.transitions.default};
  &:hover, &:active {
    #background: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    box-shadow: none;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  outline: none;
  transition: background ${({ theme }) => theme.transitions.default};
  &:hover, &:active {
    #background: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    box-shadow: none;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing.lg};
  outline: none;
  &:focus, &:active {
    outline: none;
    box-shadow: none;
  }
`;

const Navbar = ({ isDarkMode, toggleTheme }: { isDarkMode: boolean; toggleTheme: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: section } });
    } else {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        if (window.history.pushState) {
          window.history.pushState(null, '', `#${section}`);
        } else {
          window.location.hash = `#${section}`;
        }
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'top' } });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.history.pushState) {
        window.history.pushState(null, '', '/');
      } else {
        window.location.hash = '';
      }
    }
  };

  return (
    <NavbarContainer>
      <Logo to="/" onClick={handleLogoClick}>Jane Choi :)</Logo>
      <NavLinks>
        <NavAnchor href="#about" onClick={e => handleNavClick(e, 'about')}>About Me</NavAnchor>
        <NavAnchor href="#experience" onClick={e => handleNavClick(e, 'experience')}>Experience</NavAnchor>
        <NavAnchor href="#education" onClick={e => handleNavClick(e, 'education')}>Education</NavAnchor>
        <NavAnchor href="#projects" onClick={e => handleNavClick(e, 'projects')}>Projects</NavAnchor>
        <NavAnchor href="#achievements" onClick={e => handleNavClick(e, 'achievements')}>Achievements</NavAnchor>
        <StyledLink to="/gallery">Gallery</StyledLink>
        {/* <ThemeToggle onClick={toggleTheme} aria-label="Toggle dark mode">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggle> */}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar; 