import React, { useState } from 'react';
import { darkTheme, lightTheme } from '../../utils/Themes';
import ApiResultClima from '../../services/apiCity';
import styled, { keyframes } from 'styled-components';
import Typewriter from "typewriter-effect";
import { WeatherDetails } from '../weatherTemp/WeatherDetails';
import WeatherResult from '../weatherTemp/WeatherResult';


// Container principal da página inicial, ajustado para centralizar seu conteúdo
const ContentHome = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 35px;
  @media screen and (min-width: 1026px) {
    height: 100vh;
  }
`;

// Container principal do conteúdo, com estilo para centralização e ajuste responsivo
const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  padding: 35px;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.bg} opacity: 0.5;
  border-radius: 20px;
  @media (max-width: 748px;) {
    padding: 10px;
    gap: 8px;
    width: 300px;
  }
  @media screen and (max-width: 900px) {
    margin-bottom: 10px;
    padding: 16px;
    margin-top: 30px;
    display: block;
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 10px;
    padding: 16px;
    margin-top: 30px;
    display: block;
  }
  @media screen and (max-width: 378px) {
    font-size: 16px;
    line-height: 28px;
    margin-bottom: 10px;
    flex-direction: column;
    padding: 16px;
    margin-top: 30px;
    display: block;
    height: 100%;
  }
  
`;

// Container para detalhes da coluna, usa flexbox para disposição vertical
const ColumnDetails = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

// Título principal com animação de letras e estilo responsivo
const TitleWrapper = styled.h1`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 6px;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 36px;
  font-weight: 900;
  border-radius: 5px;

  @media (max-width: 900px) {
    font-size: 22px;
  }

  @media screen and (max-width: 600px) {
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 10px;
    justify-content: center;
    display: flex;
  }

  @media screen and (max-width: 378px) {
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 0px;
    justify-content: center;
    display: flex;
  }
  no-translate {
    translate: no;
  }
`;

// Animação de movimento das letras
const moveLetters = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

// Estilo para cada letra do título com animação
const Letter = styled.span`
  display: inline-block;
  animation: ${moveLetters} 0.5s ease-in-out;
  animation-delay: ${({ $delay }) => $delay};
`;

// Componente Título com animação de letras
const Title = () => (
  <TitleWrapper translate="no"> {/* Adiciona o atributo translate="no" */}
    {"Bem-vindo ao ClimaAnalizer".split("").map((char, index) => (
      <React.Fragment key={index}>
        <Letter $delay={`${index * 0.1}s`}>
          {char}
        </Letter>
        {char === " " && <span>&nbsp;</span>} {/* Adiciona um espaço entre as palavras */}
      </React.Fragment>
    ))}
  </TitleWrapper>
);

// Loop de texto com animação de digitação
const TextLoop = styled.div`
    display: flex;
    gap: 12px;
    padding: 6px;
    margin-bottom: 30px;
    line-height: 68px;
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    @media screen and (max-width: 960px) {
      text-align: center;
    }

    @media screen and (max-width: 600px) {
      font-size: 16px;
      margin-bottom: 16px;
      margin-bottom: 10px;
      justify-content: center;
      .static-text {
        display: none;
      }
    }
    @media screen and (max-width: 378px) {
      font-size: 12px;
      margin-bottom: 10px;
      justify-content: center;
      .static-text {
        display: none;
      }
    }
`;

// Descrição com estilo e efeitos de borda
const Description = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  isolation: isolate;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px; 
  padding: 0.65rem 0.25rem 0.4rem 1.25rem;
  line-height: 1.5;
  background: #29292c;
  border-radius: 1rem;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 18px;
  --color: #32a6ff;
  --gradient: linear-gradient(to right top, #00c6fb, #005bea, #00c6fb, #005bea);
  &:before {
    position: absolute;
    content: "";
    inset: 0.0625rem;
    border-radius: 0.9375rem;
    background: ${({ theme }) => theme.card_light};
    z-index: 2;
  }
  &:after {
    width: 0.25rem;
    position: absolute;
    content: "";
    inset: 0.65rem auto 0.65rem 0.5rem;
    border-radius: 0.125rem;
    background: var(--gradient);
    transition: transform 300ms ease;
    z-index: 4;
  }
  &:hover:after {
    transform: translateX(0.15rem)
  }
  @media screen and (max-width: 600px) {
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 15px;
  }
  @media screen and (max-width: 378px) {
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 15px;
  }
  
`;

// Corpo da descrição com efeito de hover
const DescriptionBody = styled.p`
  color: ${({ theme }) => theme.text_primary+99};
  padding: 0 1.25rem;
  transition: transform 300ms ease;
  z-index: 5;
  &:hover {
    transform: translateX(0.25rem)
  }
`;

// Descrição com efeito de brilho
const DescriptionGlow = styled.div`
  width: 20rem;
  height: 20rem;
  position: absolute;
  opacity: 0;
  z-index: 3;
  background: radial-gradient(circle closest-side at center, white, transparent);
  transform: translate(-50%, -50%);
  transition: opacity 300ms ease;
  &:hover{
    opacity: 0.1;
  }
`;

// Descrição com borda de brilho
 const DescriptionBorderGlow = styled.div`
  width: 20rem;
  height: 20rem;
  position: absolute;
  opacity: 0.5;
  z-index: 1;
  background: radial-gradient(circle closest-side at center, white, transparent);
  transform: translate(-50%, -50%);
  transition: opacity 300ms ease;
  &:hover {
    opacity: 0.1;
  }
 `;

 // Estilo para elementos com destaque
 const Span = styled.span`
 color: ${({ theme }) => theme.primary};
 font-weight: 600;
 cursor: pointer;
 font-family: 'Montserrat', sans-serif;
 font-size: 16px;
 letter-spacing: 0.5px;

 opacity: 0.9; /* Opacidade padrão */
`;



// Texto estático que será ocultado em dispositivos móveis
const StaticText = styled.div`
    display: flex;
`;

// Container para a descrição climática com estilo responsivo
const DescriptionClima = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    border-radius: 10px;
    flex-wrap: wrap;

  @media screen and (max-width: 900px) {
      font-size: 22px;
  }

  @media screen and (max-width: 600px) {
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 10px;
    flex-direction: column;
  }

  @media screen and (max-width: 378px) {
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 0px;
    flex-direction: column;
  }
`;

// Container de busca de cidade
const SearchCity = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Descrição da cidade com estilo responsivo
const DescriptionCity = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column; /* Alinha os itens verticalmente */
  align-items: center; /* Centraliza o conteúdo horizontalmente */
  padding: 10px; /* Adiciona um pouco de preenchimento */
  box-sizing: border-box; /* Inclui padding e border no cálculo da largura e altura */
      @media screen and (max-width: 960px) {
      text-align: center;
    }

    @media screen and (max-width: 600px) {
      width: 100%;
      padding: 0px;
    }
    @media screen and (max-width: 378px) {
    width: 100%;
    padding: 0px;
    }
`;

// Detalhes climáticos com estilo responsivo
const ClimateDetails = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column; /* Alinha os itens verticalmente */
  align-items: center; /* Centraliza o conteúdo horizontalmente */
  padding: 10px; /* Adiciona um pouco de preenchimento */
  box-sizing: border-box; /* Inclui padding e border no cálculo da largura e altura */
  @media screen and (max-width: 960px) {
  }

  @media screen and (max-width: 600px) {
      width: 100%;
      padding: 0px;
  }
  @media screen and (max-width: 378px) {
  width: 100%;
  padding: 0px;

  }
`;

// Componente principal da página inicial
export const Home = ({ isDark }) => {
  const [WeatherData, setWeatherData] = useState(null);
  
  // Função para atualizar os dados do clima
  const handleDataFeath = (data) => {
    setWeatherData(data);
  };

  return (
    <ContentHome id='inicio'>
      <Content>
      <Title>Bem-vindo ao ClimaAnalizer</Title>
        <ColumnDetails>
        <TextLoop>
             <StaticText className='static-text'>Analise os dados meteorológicos:</StaticText>
            <Span translate="no">
                <Typewriter
                options={{
                  strings:["precipitação", "temperatura mínima e máxima", "horas de sol", "umidade relativa", "velocidade do vento"],
                  autoStart: true,
                  loop: true,
                }}
                />
            </Span>
          </TextLoop>
            <Description>
              <DescriptionGlow></DescriptionGlow>
              <DescriptionBorderGlow></DescriptionBorderGlow>
              <DescriptionBody>Explore o histórico climático detalhado de Porto Alegre, de 1961 a 2023, e descubra padrões climáticos ao longo das últimas décadas.
Em breve, estaremos adicionando dados sobre outras localidades para oferecer uma visão abrangente do clima em diferentes regiões. Analise as tendências de temperatura, precipitação e outros fatores climáticos para entender melhor o clima de sua região.</DescriptionBody>
            </Description>
            <Description>
              <DescriptionGlow></DescriptionGlow>
              <DescriptionBorderGlow></DescriptionBorderGlow>
              <DescriptionBody>Além disso, você pode consultar o clima atual de qualquer cidade diretamente aqui. Fique atento às atualizações para acessar tanto o histórico climático quanto as condições atuais das cidades ao redor do mundo.</DescriptionBody>
            </Description>
            <DescriptionClima>
              <SearchCity>
                <ApiResultClima onDataFetch={handleDataFeath}/>
              </SearchCity>
              <DescriptionCity>
                {WeatherData && <WeatherResult data={WeatherData} isDark={isDark} darkTheme={darkTheme} lightTheme={lightTheme} />}
              </DescriptionCity>
              <ClimateDetails>
                {WeatherData && <WeatherDetails data={WeatherData} isDark={isDark} darkTheme={darkTheme} lightTheme={lightTheme}/>}
              </ClimateDetails>
            </DescriptionClima>
        </ColumnDetails>
      </Content>
    </ContentHome>
  );
};

