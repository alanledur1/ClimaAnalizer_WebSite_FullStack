import React from 'react'
import styled from 'styled-components'


const WeatherDetailsContainer = styled.div`
    width: 90%;
    height: 235px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    position: relative;
    padding: 16px;
    font-size: 16px;
    background-color: ${({ theme}) => theme.card_light+90};
    box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    border-radius: 23px;
    transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
      }

    @media screen and (max-width: 600px) {  
      padding: 12px;
    }

    @media screen and (max-width: 378px) {
      padding: 10px;
    }
`;

const DetailItem = styled.p`
  margin-bottom: 6px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};

  strong {
    color: ${({ theme }) => theme.text_card_primary};
  }

  @media screen and (max-width: 600px) { 
    font-size: 14px;
    margin-bottom: 6px; 
  }
  @media screen and (max-width: 378px) {
      font-size: 12px;
      margin-bottom: 0px;
  }
`;

export const WeatherDetails = ({ data, theme }) => {
  return (
    <WeatherDetailsContainer theme={theme}>
      <DetailItem theme={theme}><strong>Temperatura Máxima:</strong> {data.main?.temp_max} °C</DetailItem>
      <DetailItem theme={theme}><strong>Temperatura Mínima:</strong> {data.main?.temp_min} °C</DetailItem>
      <DetailItem theme={theme}><strong>Umidade:</strong> {data.main?.humidity} %</DetailItem>
      <DetailItem theme={theme}><strong>Pressão:</strong> {data.main?.pressure} hPa</DetailItem>
      <DetailItem theme={theme}><strong>Visibilidade:</strong> {data.visibility} m</DetailItem>
      <DetailItem theme={theme}><strong>Velocidade do Vento:</strong> {data.wind?.speed} m/s</DetailItem>
      <DetailItem theme={theme}><strong>Direção do Vento:</strong> {data.wind?.deg}°</DetailItem>
    </WeatherDetailsContainer>
  );
}

