import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  margin: 0;
  padding: 0;
  max-width: 100%;
`;

const NameSection = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  text-align: center;
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const ProfileImageSection = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    height: 160px;
  }
  @media (max-width: 480px) {
    height: 140px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ContentSection = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const DecorativeElementsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: ${({ theme }) => theme.spacing.xl} auto ${({ theme }) => theme.spacing.xl} auto;
  margin-top: 10rem;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  @media (max-width: 768px) {
    margin: 3rem auto ${({ theme }) => theme.spacing.lg} auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
  @media (max-width: 600px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: 2.5rem;
  }
`;

const HeroImage = styled.img`
  width: 180px;
  max-width: 150px;
  height: auto;
  pointer-events: none;
  user-select: none;
  margin-right: 5rem;
  @media (max-width: 768px) {
    width: 140px;
    max-width: 120px;
  }
  @media (max-width: 480px) {
    width: 120px;
    max-width: 100px;
  }
`;

const WeatherWrapper = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  opacity: ${props => (props.show ? 1 : 0)};
  transform: translateX(${props => (props.show ? '0' : '50px')});
  transition: opacity 0.7s 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.7s 0.3s cubic-bezier(0.4,0,0.2,1);
  @media (max-width: 600px) {
    align-items: center;
  }
`;

const WeatherText = styled.div`
  background: rgba(255,255,255,0.92);
  color: #222;
  font-size: 0.9em;
  font-weight: 500;
  border-radius: 12px;
  padding: 0.7em 2.2em;
  min-width: 220px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  text-align: center;
  @media (max-width: 768px) {
    font-size: 0.85em;
    padding: 0.6em 1.8em;
    min-width: 200px;
  }
  @media (max-width: 600px) {
    white-space: normal;
    min-width: auto;
    width: 100%;
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

const Name = styled.h1`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: 450;
  letter-spacing: 0.05em;
  font-family: 'Georgia', 'Times New Roman', serif;
  font-style: italic;
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
  @media (max-width: 480px) {
    font-size: 2.5rem;
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
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: -9em;
  padding-left: 7rem;
  pointer-events: none;
  user-select: none;
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const MascotImage = styled.img`
  width: 160px;
  max-width: 120px;
  height: auto;
  @media (max-width: 768px) {
    width: 80px;
    max-width: 70px;
  }
  @media (max-width: 480px) {
    width: 60px;
    max-width: 60px;
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
      <NameSection>
        <Name>Jane Choi</Name>
      </NameSection>
      <ProfileImageSection>
        <img src="Jane- pp.jpg" alt="Jane Choi" />
      </ProfileImageSection>
      <ContentSection>
        <TextContainer>
          <Description>
          Hello! I’m Jane, a CS student at UW and a UX-driven product thinker with a 
          strong technical background, passionate about building products that solve pain points for someone. 
          </Description>
        </TextContainer>
        <SocialLinks>gi
          <SocialLink href="https://www.linkedin.com/in/jane026/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialLink>
          <SocialLink href="https://github.com/jahabe" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialLink>
          <SocialLink href="mailto:janechoi03@gmail.com">
            <FaEnvelope />
          </SocialLink>
        </SocialLinks>
        <DecorativeElementsContainer>
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
          <WeatherWrapper show={showWeather}>
            {weather && weatherText && <WeatherText>{weatherText}</WeatherText>}
            {weather === 'rain' && <HeroImage src="rainyDay.png" alt="Rainy Day Chibi" />}
            {weather === 'sunny' && <HeroImage src="sunnyDay.png" alt="Sunny Day Chibi" />}
            {weather === 'cloudy' && <HeroImage src="cloudyDay.png" alt="Cloudy Day Chibi" />}
          </WeatherWrapper>
        </DecorativeElementsContainer>
      </ContentSection>
    </HeroSection>
  );
};

export default Hero; 