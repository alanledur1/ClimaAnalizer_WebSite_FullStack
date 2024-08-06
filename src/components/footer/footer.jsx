import React from 'react'
import styled from 'styled-components'

// Container do rodapé, com largura total, altura fixa e centralização do conteúdo
const FooterContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    position: relative;
    top: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.bg};
    border-radius: 50%;
`;

// Container para o conteúdo dentro do rodapé, centralizado
const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

// Descrição com estilo para o texto do rodapé
const Description = styled.div`
    margin-right: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.text_primary+99};
    font-weight: 600px;
    font-family: monospace;
    @media screen and (max-width: 600px) {
        font-size: 12px;
        margin-bottom: 10px;
    }
    @media screen and (max-width: 378px) {
        font-size: 10px;
        margin-bottom: 10px;
    }
`;

// Span para estilizar parte do texto
const Span = styled.span`
    color: red;
`;

// Componente funcional do rodapé
export const Footer = () => {
  return (
    <FooterContainer>
        <Content>
            <Description>Clima<Span>Analizer</Span>© 2024 |</Description>
            <Description>Todos os direitos reservados</Description>
        </Content>
    </FooterContainer>
  )
}
