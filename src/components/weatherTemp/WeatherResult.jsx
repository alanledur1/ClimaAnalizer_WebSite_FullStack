import React from 'react';
import styled from 'styled-components';


const ResultContainer = styled.div`
    margin-top: 20px;
    font-size: 16px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column; 
    align-items: center;
    box-sizing: border-box;
    @media screen and (max-width: 600px) {
      font-size: 16px;
      height: 50%;

    }
    @media screen and (max-width: 378px) {
    }
`;

const CardContainer = styled.div`
  width: 90%;
  height: 235px;
  position: relative;
  padding: 25px;  
  box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.card_light + 90};
  border-radius: 23px;
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    }

    @media screen and (max-width: 600px) {
    }
    @media screen and (max-width: 378px) {
        padding: 15px;
    }
`;

const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    position: relative;

    span:first-child{
        word-break: break-all;
        font-weight: 800;
        font-size: 15px;
        line-height: 135%;
        color: ${({ theme }) => theme.text_card_primary}

    }
    span:last-child{
        font-weight: 700;
        font-size: 15px;
        line-height: 135%;
        color: ${({ theme }) => theme.text_card_secondary};
    }
    @media screen and (max-width: 600px) {
    }
    @media screen and (max-width: 378px) {
        span:first-child{
            word-break: break-all;
            font-weight: 800;
            font-size: 16px;
            line-height: 135%;
        }
    span:last-child{
            font-weight: 700;
            font-size: 12px;
            line-height: 135%;
        }
    }
`;

const Temp = styled.div`
    position: absolute;
    left: 25px;
    bottom: 12px;
    font-weight: 700;
    font-size: 64px;
    line-height: 77px;
    color: ${({ theme }) => theme.text_primary};
    `;
const TempScale = styled.div`
    width: 30%;
    position: absolute;
    right: 25px;
    bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.card};
    border-radius: 9px;

    span{
        font-weight: 700;
        font-size: 16px;
        text-align: center;
        line-height: 134.49%;
        color: ${({ theme }) => theme.text_primary};
    }
`;
const CardDetails = styled.div`
  width: 50%;
  height: 250px;
  position: absolute;
  right: -35px;
  top: -50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.7);

  @media screen and (max-width: 960px) {
    transform: scale(0.6);
    right: -10px;
    top: 5px;
  }


  @media screen and (max-width: 600px) {
    transform: scale(0.5);
    right: -10px;
    top: 5px;
  }
  @media screen and (max-width: 378px) {
    transform: scale(0.4);
    right: -10px;
    top: 10px;
  }
`;
const WeatherResult = ({ data, isDark, theme }) => {


    if (!data) return null;

    // Construa a URL do ícone
    const iconCode = data.weather?.[0]?.icon;
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';

    // Obtendo a data e hora atuais
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR', { month: 'long', day: '2-digit' });
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return (
        <ResultContainer theme={theme}>
            <CardContainer theme={theme}>
                <CardHeader theme={theme}>
                    <span>{data.name}, {data.sys?.country}</span>
                    <br />
                    <span> {formattedDate} <br /> {formattedTime}</span>
                </CardHeader>

                <Temp theme={theme}>
                    {data.main?.temp?.toFixed(1)}°C
                </Temp>

                <TempScale theme={theme}>
                    <span>{data.weather?.[0]?.description}</span>
                </TempScale>

                <CardDetails>
                    <img
                        src={iconUrl}
                        alt={data.weather?.[0]?.descricao || "Ícone do clima"}
                        style={{ width: '200px', height: '200px' }} />
                </CardDetails>

            </CardContainer>
        </ResultContainer>
    );
}

export default WeatherResult;
