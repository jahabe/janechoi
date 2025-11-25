import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  @media (max-width: 768px) {
    height: 60px;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    right: ${props => (props.isOpen ? '0' : '-100%')};
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.background};
    width: 100%;
    height: calc(100vh - 60px);
    padding: ${({ theme }) => theme.spacing.lg};
    gap: ${({ theme }) => theme.spacing.xl};
    transition: right 0.3s ease-in-out;
    box-shadow: -2px 0 4px rgba(0,0,0,0.1);
  }
`;

const NavAnchor = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: ${({ theme }) => theme.spacing.sm} 0;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname === '/gallery') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = `#${id}`;
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'top' } });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setIsMenuOpen(false);
  };

  return (
    <NavbarContainer>
      <Logo to="/" onClick={handleLogoClick}>Jane Choi :)</Logo>
      <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>
      <NavLinks isOpen={isMenuOpen}>
        <NavAnchor href="#about" onClick={e => handleNavClick(e, 'about')}>About Me</NavAnchor>
        <NavAnchor href="#education" onClick={e => handleNavClick(e, 'education')}>Education</NavAnchor>
        <NavAnchor href="#experience" onClick={e => handleNavClick(e, 'experience')}>Experience</NavAnchor>
        <NavAnchor href="#projects" onClick={e => handleNavClick(e, 'projects')}>Projects</NavAnchor>
        <NavAnchor href="#extracurriculars" onClick={e => handleNavClick(e, 'extracurriculars')}>Extracurriculars</NavAnchor>
        <NavAnchor href="#achievements" onClick={e => handleNavClick(e, 'achievements')}>Achievements</NavAnchor>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
