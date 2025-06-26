import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaMedium, FaEnvelope, FaGlobe, FaDribbble } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const HeroSection = styled.section`
  position: relative;
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
  @media (max-width: 768px) {
    min-height: 90vh;
    padding: 0 0 ${({ theme }) => theme.spacing.md} 0;
  }
`;

const HeroImage = styled.img`
  position: absolute;
  right: 1vw;
  bottom: 4vw;
  width: 180px;
  max-width: 10vw;
  height: auto;
  z-index: 2;
  pointer-events: none;
  user-select: none;
  @media (max-width: 768px) {
    width: 140px;
    right: 2vw;
    bottom: 6vw;
  }
  @media (max-width: 480px) {
    width: 120px;
    right: 3vw;
    bottom: 8vw;
  }
`;

const WeatherWrapper = styled.div<{ show: boolean }>`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  opacity: ${props => (props.show ? 1 : 0)};
  transform: translateX(${props => (props.show ? '0' : '50px')});
  transition: opacity 0.7s 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.7s 0.3s cubic-bezier(0.4,0,0.2,1);
  z-index: 10;
  @media (max-width: 600px) {
    display: none;
  }
`;

const WeatherText = styled.div`
  position: absolute;
  right: -5vw;
  bottom: 18.5vw;
  background: rgba(255,255,255,0.92);
  color: #222;
  font-size: 0.9em;
  font-weight: 500;
  border-radius: 12px;
  padding: 0.7em 2.2em;
  min-width: 220px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  z-index: 3;
  pointer-events: none;
  user-select: none;
  @media (max-width: 768px) {
    font-size: 0.85em;
    padding: 0.6em 1.8em;
    min-width: 200px;
    right: -4vw;
    bottom: 16vw;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const TextContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const ProfilePicture = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  max-width: 100%;
  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
    border-width: 3px;
  }
  @media (max-width: 480px) {
    width: 140px;
    height: 140px;
  }

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
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin: ${({ theme }) => theme.spacing.md} 0;
  font-size: 1.1rem;
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
  }
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  transition: color ${({ theme }) => theme.transitions.default};
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const MascotContainer = styled.div`
  position: absolute;
  left: -5vw;
  bottom: 4vw;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 1vw;
  z-index: 2;
  pointer-events: none;
  user-select: none;
  @media (max-width: 768px) {
    gap: 0.5vw;
    bottom: 6vw;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

const MascotImage = styled.img`
  width: 120px;
  max-width: 9vw;
  height: auto;
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const Hero = () => {
  const [weather, setWeather] = useState<'rain' | 'sunny' | 'cloudy' | null>(null);
  const [weatherText, setWeatherText] = useState<string>('');
  const [showWeather, setShowWeather] = useState(false);
  const [meonjiClicked, setMeonjiClicked] = useState(false);

  useEffect(() => {
    const fetchWeather = () => {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Seattle,US&appid=${apiKey}&units=metric`;
  
      fetch(url)
        .then(res => res.json())
        .then(data => {
          const description = data.weather?.[0]?.description?.toLowerCase() || "";
          const temp = data.main?.temp;
          const tempText = typeof temp === "number" ? `${Math.round(temp)}°C` : "";
  
          if (description.includes("thunderstorm")) {
            setWeather("rain");
            setWeatherText(`Thunderstorm in Seattle, ${tempText}`);
          } else if (description.includes("rain") || description.includes("drizzle")) {
            setWeather("rain");
            setWeatherText(`It's raining in Seattle, ${tempText}`);
          } else if (description.includes("clear")) {
            setWeather("sunny");
            setWeatherText(`It's sunny in Seattle, ${tempText}`);
          } else if (description.includes("cloud")) {
            setWeather("cloudy");
            setWeatherText(`It's cloudy in Seattle, ${tempText}`);
          } else {
            setWeather("cloudy");
            setWeatherText(`Seattle weather: ${description}, ${tempText}`);
          }
        })
        .catch(() => {
          setWeather("cloudy");
          setWeatherText("Weather info unavailable");
        });
    };
  
    fetchWeather(); // Run once on mount
  
    const interval = setInterval(fetchWeather, 1000 * 60 * 15); // Refresh every 15 minutes
  
    return () => clearInterval(interval);
  }, []);
  

  // Animate weather after hero section appears
  useEffect(() => {
    const timer = setTimeout(() => setShowWeather(true), 600); // 600ms after mount
    return () => clearTimeout(timer);
  }, []);

  return (
    <HeroSection>
      <MascotContainer>
        <MascotImage
          src={meonjiClicked ? 'clickmeonji.png' : 'meonji.png'}
          alt="Meonji"
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          onClick={() => setMeonjiClicked(clicked => !clicked)}
        />
        <MascotImage src="lotto.png" alt="Lotto" />
        <MascotImage src="milo.png" alt="Milo" />
      </MascotContainer>
      <ProfileContainer>
        <ProfilePicture>
          <img src="Jane- pp.jpg" alt="Jane Choi" />
        </ProfilePicture>
        <TextContainer>
          <Name>Jane Choi</Name>
          <Title>Software Engineer | Developer | Designer</Title>
          <Description>
          Hello! My name is Jane :) I'm a senior at University of Washington Bothell studying 
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
      <WeatherWrapper show={showWeather}>
        {weather && weatherText && <WeatherText>{weatherText}</WeatherText>}
        {weather === 'rain' && <HeroImage src="rainyDay.png" alt="Rainy Day Chibi" />}
        {weather === 'sunny' && <HeroImage src="sunnyDay.png" alt="Sunny Day Chibi" />}
        {weather === 'cloudy' && <HeroImage src="cloudyDay.png" alt="Cloudy Day Chibi" />}
      </WeatherWrapper>
    </HeroSection>
  );
};

export default Hero; 