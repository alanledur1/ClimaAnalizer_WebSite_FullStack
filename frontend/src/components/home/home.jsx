import React, { useState } from 'react';
import styled from 'styled-components';
import Typewriter from "typewriter-effect";
import '../home/home.css' 
import { HomeCards } from '../cards/homeCards';
import { WeatherDataPagination } from '../weatherTemp/WeatherDataPagination';
import { WeatherDataPaginationCard2 } from '../weatherTemp/WeatherDataPaginationCard-2';

const ContentHome = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;

`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.bg} opacity: 0.2;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 35px;
  max-width: 900px;
  
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text_primary};
  font-size: 36px;
  padding: 6px;
  margin-bottom: 30px;
  font-weight: 900;
  border-radius: 5px;
  width: 100%;
`;

const TextLoop = styled.div`
    font-size: 20px;
    font-weight: 600px;
    color: ${({ theme }) => theme.text_primary};
    line-height: 68px;
    gap: 12px;
    display: flex;
    padding: 6px;
    margin-bottom: 30px;
    

    @media screen and (max-width: 960px) {
      text-align: center;
    }

    @media screen and (max-width: 640px) {
      font-size: 22px;
      line-height: 48px;
      margin-bottom: 16px;
    }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  isolation: isolate;
  position: relative;
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 30px; 
  width: 100%;
  border-radius: 1rem;
  flex-direction: column;
  isolation: isolate;
  overflow: hidden;
  padding: 0.65rem 0.25rem 0.4rem 1.25rem;
  background: #29292c;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  --gradient: linear-gradient(to right top, #00c6fb, #005bea, #00c6fb, #005bea);
  --color: #32a6ff;
  &:before {
    position: absolute;
    content: "";
    inset: 0.0625rem;
    border-radius: 0.9375rem;
    background: ${({ theme }) => theme.card_light};
    z-index: 2;
  }
  &:after {
    position: absolute;
    content: "";
    width: 0.25rem;
    inset: 0.65rem auto 0.65rem 0.5rem;
    border-radius: 0.125rem;
    background: var(--gradient);
    transition: transform 300ms ease;
    z-index: 4;
  }
  &:hover:after {
    transform: translateX(0.15rem)
  }
  
`;

const DescriptionBody = styled.p`
  color: ${({ theme }) => theme.text_primary+99};
  padding: 0 1.25rem;
  transition: transform 300ms ease;
  z-index: 5;
  &:hover {
    transform: translateX(0.25rem)
  }
`;

const DescriptionGlow = styled.div`
position: absolute;
width: 20rem;
height: 20rem;
transform: translate(-50%, -50%);
background: radial-gradient(circle closest-side at center, white, transparent);
opacity: 0;
transition: opacity 300ms ease;
z-index: 3;
&:hover{
  opacity: 0.1;
}
`;

 const DescriptionBorderGlow = styled.div`
  position: absolute;
  width: 20rem;
  height: 20rem;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle closest-side at center, white, transparent);
  opacity: 0.5;
  transition: opacity 300ms ease;
  z-index: 1;
  &:hover {
    opacity: 0.1;
  }
 `;

const CardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 0px;
`;

const Span = styled.span`
    color: ${({ theme }) => theme.primary};
    font-weight: bolder;
    cursor: pointer;
`;

const BoxContent = styled.div`
    width: 100%;
    height: auto;
    margin-top: 10px;
    background-color: ${({ theme }) => theme.card+80};
    border-radius: 20px;
    padding: 20px;
    transition: transform 0.3s ease;
    cursor: pointer;
    box-shadow: rgba(33, 60, 115, 0.15) 0px 4px 24px;
    backdrop-filter: blur(6px);
    border: 1px solid ${({ theme }) => theme.border};

`;

export const Home = ({ isDark, darkTheme, lightTheme }) => {
  const [weatherDataFromApiTemp, setWeatherDataFromApiTemp] = useState(null);
  const [weatherDataFromApiTempChuva, setWeatherDataFromApiTempChuva] = useState(null);


  const handleSelectDataApiTemp = (selectedData) => {
    setWeatherDataFromApiTemp(selectedData);
    setWeatherDataFromApiTempChuva(null); // Limpa os dados do segundo card
  };

  const handleSelectDataApiTempChuva = (selectedData) => {
    setWeatherDataFromApiTempChuva(selectedData);
    setWeatherDataFromApiTemp(null); // Limpa os dados do primeiro card
  };

  return (
    <ContentHome>
      <Content>
        <Title>Bem-vindo ao ClimaAnalizer</Title>
        <TextLoop>
          Analise os dados meteorológicos: 
          <Span>
            <Typewriter 
            options={{
              strings:["precipitação (mm)", "temperatura mínima e máxima", "horas de sol", "umidade relativa", "velocidade do vento"],
              autoStart: true,
              loop: true,
            }}
            />
          </Span>
        </TextLoop>
        <Description>
          <DescriptionGlow></DescriptionGlow>
          <DescriptionBorderGlow></DescriptionBorderGlow>
          <DescriptionBody>Explore o histórico climático detalhado de Porto Alegre de 1996 a 2016 e descubra padrões climáticos ao longo das últimas décadas. Em breve, estaremos adicionando informações sobre outras localidades para oferecer uma visão abrangente do clima em diferentes regiões. Analise as tendências de temperatura, precipitação e outros fatores climáticos para entender melhor o clima da sua região.</DescriptionBody>
        </Description>
        <CardContent>
        <HomeCards 
            onSelectDataApiTemp={handleSelectDataApiTemp} 
            onSelectDataApiTempChuva={handleSelectDataApiTempChuva}             
            isDark={isDark} 
            darkTheme={darkTheme} 
            lightTheme={lightTheme} 
            theme={isDark ? darkTheme : lightTheme} 
          />
        </CardContent>
        {weatherDataFromApiTemp && (
          <BoxContent>
            <WeatherDataPagination 
              weatherData={weatherDataFromApiTemp} 
              isDark={isDark} 
              darkTheme={darkTheme} 
              lightTheme={lightTheme} 
              theme={isDark ? darkTheme : lightTheme} 
            />
          </BoxContent>
        )}
        {weatherDataFromApiTempChuva && (
          <BoxContent>
            <WeatherDataPaginationCard2 
              weatherData={weatherDataFromApiTempChuva} 
              isDark={isDark} 
              darkTheme={darkTheme} 
              lightTheme={lightTheme} 
              theme={isDark ? darkTheme : lightTheme} 
            />
          </BoxContent>
        )}
      </Content>
    </ContentHome>
  );
};

