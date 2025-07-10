import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Typewriter from "typewriter-effect";

// Importe seus componentes filhos. Certifique-se que os caminhos estão corretos.
import ApiResultClima from '../../services/apiCity';
import { WeatherDetails } from '../weatherTemp/WeatherDetails';
import WeatherResult from '../weatherTemp/WeatherResult';
// Para os temas, você pode passar as cores diretamente ou usar o ThemeProvider do styled-components
// import { darkTheme, lightTheme } from '../../utils/Themes';


// --- Animações ---
const moveLetters = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// --- Componentes de Estilo ---

// Container principal que ocupa a tela inteira
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  box-sizing: border-box;
  /* Adicione um fundo gradiente ou uma imagem para o efeito de vidro funcionar bem */
  background: ${({ theme }) => theme.bg}; /* Usando a cor de fundo do seu tema */
`;

// O "cartão de vidro" que contém todo o conteúdo
const GlassCard = styled.div`
  width: 100%;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.1); /* Cor base para o efeito de vidro */
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
`;

// Seção de boas-vindas
const HeroSection = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text_primary};
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const AnimatedLetter = styled.span`
  display: inline-block;
  animation: ${moveLetters} 0.5s ease-in-out;
  animation-delay: ${({ $delay }) => $delay};
`;

const TextLoop = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  min-height: 2rem; /* Evita pulos de layout */

  .static-text {
    @media (max-width: 600px) {
      display: none;
    }
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
`;

// Seção de descrição
const Description = styled.p`
  max-width: 800px;
  margin: 1rem auto 0 auto;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 1rem;
`;

// Container para a seção do clima
const WeatherSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

// Container para a busca
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// Container para os resultados do clima, usando Grid para um layout mais robusto
const WeatherDashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  /* Animação para quando os componentes filhos aparecerem */
  ${({ show }) => show && css`
    & > * {
      animation: ${fadeIn} 0.6s ease-out forwards;
    }
  `}
`;


// --- Componente Principal ---

export const Home = ({ isDark, theme }) => { // Recebe o tema como prop
  const [weatherData, setWeatherData] = useState(null);

  const handleDataFetch = (data) => {
    setWeatherData(data);
  };

  const renderAnimatedTitle = (text) => {
    return text.split("").map((char, index) => (
      <React.Fragment key={index}>
        {char === " " ? (
          <span>&nbsp;</span>
        ) : (
          <AnimatedLetter $delay={`${index * 0.05}s`}>{char}</AnimatedLetter>
        )}
      </React.Fragment>
    ));
  };

  return (
    <PageContainer theme={theme}>
      <GlassCard>
        <HeroSection>
          <Title>{renderAnimatedTitle("Bem-vindo ao ClimaAnalizer")}</Title>
          <TextLoop>
            <div className='static-text'>Analise dados de:</div>
            <Span>
              <Typewriter
                options={{
                  strings: ["precipitação", "temperatura", "umidade", "vento"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </Span>
          </TextLoop>
          <Description>
            Explore o histórico climático detalhado ou consulte o tempo atual de qualquer cidade do mundo. Nossa missão é fornecer dados precisos e acessíveis para suas análises.
          </Description>
        </HeroSection>

        <WeatherSection>
          <SearchContainer>
            <ApiResultClima onDataFetch={handleDataFetch} />
          </SearchContainer>

          {/* O dashboard só é renderizado se houver dados */}
          {weatherData && (
            <WeatherDashboard show={!!weatherData}>
              {/* Componente principal com o resultado da cidade */}
              <WeatherResult data={weatherData} theme={theme} />
              {/* Detalhes adicionais como umidade, vento, etc. */}
              <WeatherDetails data={weatherData} theme={theme} />
            </WeatherDashboard>
          )}
        </WeatherSection>
      </GlassCard>
    </PageContainer>
  );
};