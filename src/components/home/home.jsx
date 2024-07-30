import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Typewriter from "typewriter-effect";
import ApiResultClima from '../../services/apiCity';
import { WeatherDetails } from '../weatherTemp/WeatherDetails';
import WeatherResult from '../weatherTemp/WeatherResult';
import { darkTheme, lightTheme } from '../../utils/Themes';

const ContentHome = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
position: relative;
top: 35px;
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
  max-width: 1200px;
  @media (max-width: 748px;) {
    padding: 10px;
    gap: 8px;
    width: 300px;
  }
  @media screen and (max-width: 900px) {
    margin-bottom: 10px;
    flex-direction: column;
    padding: 16px;
    margin-top: 30px;
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 10px;
    flex-direction: column;
    padding: 16px;
    margin-top: 30px;
  }
  @media screen and (max-width: 378px) {
    font-size: 16px;
    line-height: 28px;
    margin-bottom: 10px;
    flex-direction: column;
    padding: 16px;
    margin-top: 30px;
  }
  
`;
const ColumnDetails = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const TitleWrapper = styled.h1`
  color: ${({ theme }) => theme.text_primary};
  font-size: 36px;
  padding: 6px;
  margin-bottom: 30px;
  font-weight: 900;
  border-radius: 5px;
  width: 100%;
  display: flex;
  justify-content: center;

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
`;
const moveLetters = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;
const Letter = styled.span`
  display: inline-block;
  animation: ${moveLetters} 0.5s ease-in-out;
  animation-delay: ${({ delay }) => delay};
`;
const Title = () => (
  <TitleWrapper>
    {"Bem-vindo ao ClimaAnalizer".split("").map((char, index) => (
      <React.Fragment key={index}>
        <Letter delay={`${index * 0.1}s`}>
          {char}
        </Letter>
        {char === " " && <span>&nbsp;</span>} {/* Adiciona um espaço entre as palavras */}
      </React.Fragment>
    ))}
  </TitleWrapper>
);
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
const Span = styled.span`
    color: ${({ theme }) => theme.primary};
    font-weight: bolder;
    cursor: pointer;
`;
/* const DescriptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  isolation: isolate;
  position: relative;
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 4rem; 
  width: 100%;
  border-radius: 1rem;
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
const SubTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  color: var(--color);
  @media screen and (max-width: 378px) {
    font-size: 14px;

  }
`;
const Paragraph = styled.p`
  margin: 5px 0;
`;
const CardList = styled.ul`
  list-style-type: none;
  padding: 0;
`;
const CardListItem = styled.li`
  margin-bottom: 10px;
`; */
const StaticText = styled.div`
    display: flex;
`;
const DescriptionClima = styled.div`
    border-radius: 10px;
    width: 100%;
    height: 400px;
    display: flex;
    flex-wrap: wrap;
    `;

const SearchCity = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionCity = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column; /* Alinha os itens verticalmente */
  align-items: center; /* Centraliza o conteúdo horizontalmente */
  padding: 10px; /* Adiciona um pouco de preenchimento */
  box-sizing: border-box; /* Inclui padding e border no cálculo da largura e altura */
`;

const ClimateDetails = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column; /* Alinha os itens verticalmente */
  align-items: center; /* Centraliza o conteúdo horizontalmente */
  padding: 10px; /* Adiciona um pouco de preenchimento */
  box-sizing: border-box; /* Inclui padding e border no cálculo da largura e altura */
`;

export const Home = ({ isDark }) => {
  const [WeatherData, setWeatherData] = useState(null);
  
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
              <DescriptionBody>Explore o histórico climático detalhado de Porto Alegre de 1961 a 2023 e descubra padrões climáticos ao longo das últimas décadas. Em breve, estaremos adicionando informações sobre outras localidades para oferecer uma visão abrangente do clima em diferentes regiões. Analise as tendências de temperatura, precipitação e outros fatores climáticos para entender melhor o clima da sua região.</DescriptionBody>
            </Description>
            {/*<DescriptionInfo>
              <DescriptionBorderGlow />
              <DescriptionBody>
                <Paragraph>Selecione um card, insira uma data desejada e a consulta será exibida logo abaixo dos cards.</Paragraph>
              </DescriptionBody>
              <DescriptionBody>
                <SubTitle>Primeiro Card:</SubTitle>
                <Paragraph>Você pode especificar uma data entre 01/01/1961 e 31/12/2023 para obter todos os dados meteorológicos disponíveis para essa data.</Paragraph>
              </DescriptionBody>
              <DescriptionBody>
              </DescriptionBody>
              <DescriptionBody>
                <SubTitle>Segundo Card:</SubTitle>
                <Paragraph>Para consultar os meses menos e mais chuvosos, você pode escolher entre dois tipos de períodos:</Paragraph>
                <CardList>
                  <CardListItem>
                    <strong>Período de até 1 ano:</strong> Especifique o intervalo de datas (01/01/ano inicial até 31/12/ano igual ao inicial) e receba o resultado com o dia e o mês menos e mais chuvosos dentro desse período.
                  </CardListItem>
                  <CardListItem>
                    <strong>Período mais longo:</strong> Especifique apenas o mês e o intervalo de anos desejado para ver os dados meteorológicos desse mês em específico ao longo dos anos selecionados. Por exemplo, você pode selecionar algo como " 01 de junho de 2010 a 01 de junho de 2020 - 01/06/2010 - 01/06/2020."
                  </CardListItem>
                </CardList>
              </DescriptionBody>
              <DescriptionBody>
              <SubTitle>Terceiro Card:</SubTitle>
                <Paragraph>Consulta de Temperatura média de um determinado mês em um período dos últimos 20 anos (2003 a 2023):</Paragraph>
              </DescriptionBody>
            </DescriptionInfo>*/}
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

