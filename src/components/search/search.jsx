import React, {useState} from 'react'
import { HomeCards } from '../cards/homeCards'
import styled from 'styled-components';
import WeatherDataPagination from '../weatherTemp/WeatherDataPagination.jsx';
import { WeatherDataPaginationCard2 } from '../weatherTemp/WeatherDataPaginationCard-2.jsx';


const ObjectTitle = styled.div`
    display: flex;
    width: 40%;
    height: 120px;
    margin: 10px 12px;
    align-items: center;
    justify-content: center;
`;
const Title = styled.h1`
  position: relative;
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  padding: 6px;
  font-weight: 900;
  width: 35%;
  display: flex;
  justify-content: center;
  z-index: 2;

  @media (max-width: 900px) {
    font-size: 22px;
  }

  @media screen and (max-width: 600px) {
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 10px;
    justify-content: center;
  }

  @media screen and (max-width: 378px) {
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 0px;
    justify-content: center;

  }

  /* Definição da animação */
  @keyframes clipPathAnimation {
    0% {
      clip-path: polygon(0 0, 100% 0, 100% 80%, 80% 100%, 20% 100%, 0 80%);
    }
    50% {
      clip-path: polygon(0 20%, 100% 0, 100% 100%, 80% 100%, 20% 100%, 0 80%);
    }
    100% {
      clip-path: polygon(0 0, 100% 0, 100% 80%, 80% 100%, 20% 100%, 0 80%);
    }
  }
`;
const Circle = styled.div`
  position: absolute;
  width: 200px;
  height: 90px;
  background-color: ${({ theme }) => theme.card}; 
  border-radius: 50%;
  opacity: 0.5;
  animation: pulseAnimation 2s infinite alternate; 
  z-index: 1;

  @keyframes pulseAnimation {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }
`;

const ContentSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  top: 30px;
  flex-direction: column;
  margin: auto;
  background-image: ${({ theme }) => theme.backgroundImage};
  background-repeat: no-repeat;
  background-size: cover;
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
  flex-wrap: nowrap;
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
    flex-direction: column;
    padding: 16px;
    margin: 0;

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

const ContainerCards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  position: relative;
  top: 30px;
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
const CardContent = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 0px;
    width: 100%;
`;
const ContainerResults = styled.div`
    display: flex;
    width: 100%;
    background-color: ${({ theme }) => theme.card+80};
    border-radius: 20px;
    margin-top: 32px;
`;
const BoxContent = styled.div`
    width: 100%;
    height: auto;
    margin-top: 5px;
    background-color: ${({ theme }) => theme.card+80};
    border-radius: 20px;
    padding: 20px;
    cursor: pointer;
    box-shadow: rgba(33, 60, 115, 0.15) 0px 4px 24px;
    backdrop-filter: blur(6px);
    border: 1px solid ${({ theme }) => theme.border};
    @media screen and (max-width: 600px) {
      font-size: 16px;
      margin-bottom: 8px;
      padding: 0px;
      flex-direction: column;
      .static-text {
        display: none;
      }
    @media screen and (max-width: 378px) {
      font-size: 12px;
      margin-bottom: 8px;
      padding: 0px;
      .static-text {
        display: none;
      }
`;

const Search = ({ isDark, darkTheme, lightTheme}) => {
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
    <ContentSearch id='climaHistórico'>
        <Content>
            <ContainerCards>
                <ObjectTitle>
                    <Circle /> {/* Coloca o círculo aqui */}
                    <Title>Histórico Climático:</Title>
                </ObjectTitle>
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
            </ContainerCards>
            <ContainerResults>
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
            </ContainerResults>
        </Content>
    </ContentSearch>
  )
}

export default Search