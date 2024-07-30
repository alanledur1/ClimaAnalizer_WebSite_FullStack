import React from 'react'
import styled from 'styled-components'


const WeatherDetailsContainer = styled.div`
    width: 90%;
    height: 235px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    position: relative;
    padding: 16px;
    background-color: ${({ theme}) => theme.card_light+90};
    box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    border-radius: 23px;
    transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
`;

const DetailItem = styled.p`
  margin-bottom: 5px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};

  strong {
    color: ${({ theme }) => theme.text_card_primary};
  }
`;

export const WeatherDetails = ({ data, theme }) => {

  return (
    <WeatherDetailsContainer theme={theme}>
      <DetailItem theme={theme}><strong>Temperatura Máxima:</strong> {data.temp_max}</DetailItem>
      <DetailItem theme={theme}><strong>Temperatura Mínima:</strong> {data.temp_min}</DetailItem>
      <DetailItem theme={theme}><strong>Umidade:</strong> {data.umidade}</DetailItem>
      <DetailItem theme={theme}><strong>Pressão:</strong> {data.pressao}</DetailItem>
      <DetailItem theme={theme}><strong>Visibilidade:</strong> {data.visibilidade}</DetailItem>
      <DetailItem theme={theme}><strong>Velocidade do Vento:</strong> {data.velocidade_vento}</DetailItem>
      <DetailItem theme={theme}><strong>Direção do Vento:</strong> {data.direcao_vento}</DetailItem>
    </WeatherDetailsContainer>
  )
}
