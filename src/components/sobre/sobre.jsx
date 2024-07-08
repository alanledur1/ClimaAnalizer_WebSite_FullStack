import React from 'react';
import styled from 'styled-components';

const ContentSobre = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
  position: relative;
  top: 30px;
  margin: 72px auto; 
  @media (max-width: 768px) {
    height: auto; 
    top: 14px;
    margin: 30px auto;
  }
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.bg};
  border-radius: 20px;
  width: 100%;
  padding: 35px;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
  justify-content: space-between; /* distribui os ColumnDetails uniformemente */
  @media (max-width: 768px) {
    padding: 20px; 
    max-width: 90%; 
    justify-content: center; 
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text_primary};
  font-size: 36px;
  padding: 6px;
  margin-bottom: 30px;
  font-weight: 900;
  border-radius: 5px;
  width: 100%;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
  @media (max-width: 378px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const ColumnDetails = styled.div`
  flex: 1;
  min-width: 280px; 
  padding: 20px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const DescriptionBody = styled.p`
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  line-height: 1.5;
  @media (max-width: 600px) {
    font-size: 16px;
  }
  @media (max-width: 378px) {
    font-size: 14px;
  }
`;
export const Sobre = ({ isDark, darkTheme, lightTheme }) => {
return (
    <ContentSobre>
        <Content>
        <Title>Sobre</Title>
        <ColumnDetails>
            <DescriptionBody>
            Nosso site foi criado com o propósito de tornar a busca por informações climáticas históricas uma experiência amigável e intuitiva. 🌍 Em breve, estaremos disponibilizando acesso a informações meteorológicas em tempo real, para ajudá-lo a planejar viagens e muito mais. 🌦️
            </DescriptionBody>
        </ColumnDetails>
        <ColumnDetails>
            <DescriptionBody>
            O Clima Analyzer começou como um projeto desenvolvido durante um programa acadêmico e gradualmente evoluiu para a plataforma que você vê hoje. 🚀 Construído com tecnologias de ponta no front end, como React, JavaScript e CSS, e suportado por um backend/API desenvolvido em Python e Flask, nosso site oferece acesso a um banco de dados confiável contendo informações climáticas precisas armazenadas em formato CSV.
            </DescriptionBody>
        </ColumnDetails>
        <ColumnDetails>
            <DescriptionBody>
            Nosso compromisso é fornecer a você acesso fácil e rápido a informações climáticas precisas e confiáveis, ajudando-o a tomar decisões informadas em todas as áreas da vida. Explore o Clima Analyzer e descubra como podemos ajudá-lo a entender e planejar com antecedência as condições climáticas, seja para uma viagem de fim de semana ou para entender os padrões climáticos globais. 🌐
            </DescriptionBody>
        </ColumnDetails>
        <ColumnDetails>
            <DescriptionBody>
            Junte-se a nós nesta jornada enquanto continuamos a desenvolver e aprimorar nossa plataforma para fornecer a você a melhor experiência possível no que diz respeito ao clima. 🌱
            </DescriptionBody>
        </ColumnDetails>
        <ColumnDetails>
            <DescriptionBody>
            Obrigado por escolher o Clima Analyzer. Estamos empolgados para ajudá-lo a descobrir o clima como nunca antes! 🌞
            </DescriptionBody>
        </ColumnDetails>
        </Content>
    </ContentSobre>
    );
};
