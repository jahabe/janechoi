import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaMedium, FaEnvelope, FaGlobe, FaDribbble } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const HeroSection = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
  margin: 0;
  padding: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  max-width: 100%;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TextContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const ProfilePicture = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  max-width: 100%;

  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Name = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <ProfileContainer>
        <ProfilePicture>
          <img src="/Jane- pp.jpg" alt="Jane Choi" />
        </ProfilePicture>
        <TextContainer>
          <Name>Jane Choi</Name>
          <Title>Software Engineer | Developer | Designer</Title>
          <Description>
          Hello! My name is Jane :) I'm a junior at University of Washington Bothell studying 
          Computer Science and Software Engineering.
          </Description>
        </TextContainer>
        <SocialLinks>
          <SocialLink href="https://www.linkedin.com/in/jane026/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialLink>
          <SocialLink href="https://github.com/jahabe" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialLink>
          <SocialLink href="https://medium.com/@janechoius03" target="_blank" rel="noopener noreferrer">
            <FaMedium />
          </SocialLink>
          <SocialLink href="mailto:janechoi03@gmail.com">
            <FaEnvelope />
          </SocialLink>
          <SocialLink href="https://x.com/jahabeee" target="_blank" rel="noopener noreferrer">
            <FaXTwitter />
          </SocialLink>
          <SocialLink href="https://jahabe.tistory.com/" target="_blank" rel="noopener noreferrer">
            <FaGlobe />
          </SocialLink>
          <SocialLink href="https://dribbble.com/jahabe" target="_blank" rel="noopener noreferrer">
            <FaDribbble />
          </SocialLink>
        </SocialLinks>
      </ProfileContainer>
    </HeroSection>
  );
};

export default Hero; 