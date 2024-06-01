import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.bg};
    border-radius: 50%;
`;


const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Description = styled.div`
    margin-right: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.text_primary+99};
    font-weight: 600px;
    font-family: monospace;
    

`;

const Span = styled.span`
    color: red;

`;

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
