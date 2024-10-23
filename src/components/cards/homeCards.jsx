import React, { useState } from 'react'
import styled from 'styled-components';
import { Button, Box, Modal } from "@mui/material";
import { Typography } from "@mui/material";
import { darkTheme, lightTheme } from '../../utils/Themes.js';
import ImgMedia from "../../img/termometros.png";
import ImgMedia2 from "../../img/nuvemChuva.png";
import ImgMedia3 from "../../img/solNuvem.png";

import ApiTempChuva from '../../services/apiCard2.jsx';
import ApiTemp from '../../services/api.jsx';

const CardContent = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 20px;
  margin-top: 0px;
  flex-direction: row;
  align-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    font-size: 16px;
    margin: 10px 0;
    flex-direction: row;
    gap: 0px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
  }
  @media screen and (max-width: 378px) {
    font-size: 12px;
    margin: 10px 0;
    flex-direction: row;
    gap: 0px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.card+80};
  border-radius: 20px;
  padding: 20px;
  transition: transform 0.3s ease;
  cursor: pointer;
  box-shadow: rgba(33, 60, 115, 0.15) 0px 4px 24px;
  backdrop-filter: blur(6px);
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.5s;
  display: flex
  user-select: none;
  font-weight: bolder;
  color: black;
  box-sizing: border-box;
  text-align: center;

  &:hover {
    border: 1px solid black;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95) rotateZ(1.7deg);
  }

  @media (max-width: 748px;) {
    padding: 10px;
    gap: 8px;
    width: 300px;
  }
  @media screen and (max-width: 600px) {
    font-size: 16px;
    margin-right: 3px;
    height: 120px;
    width: 120px;
  }
  @media screen and (max-width: 378px) {
    font-size: 12px;
    margin-right: 3px;
    flex-direction: column;
    width: 100px;
    height: 100px;
    padding: 2px;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 60px;
  height: auto;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  @media (max-width: 768px) {
    height: 40px;
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 10px;
    flex-direction: column;
    width: 35px;
  }
  @media screen and (max-width: 378px) {
    margin-bottom: 10px;
    flex-direction: column;
    width: 20px;
    height: 20px;
  }
`;

const Body = styled.div`
  width: 100%;
  margin-top: 2px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};

  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media screen and (max-width: 378px) {
    font-size: 10px;
    line-height: 1.5;
  }
`;

export const HomeCards = ({ onSelectDataApiTemp, onSelectDataApiTempChuva, isDark }) => {
  const selectedTheme = isDark ? darkTheme : lightTheme;
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);

  const handleOpenModal1 = () => {
    setOpenModal1(true);
  };
  const handleOpenModal2 = () => {
    setOpenModal2(true);
  };
  const handleOpenModal3 = () => {
    setOpenModal3(true);
  }

  const handleCloseModal1 = () => {
    setOpenModal1(false);
  };
  const handleCloseModal2 = () => {
    setOpenModal2(false);
  };

  const handleCloseModal3 = () => {
    setOpenModal3(false);
  };

  const handleSelectDataApiTemp = (selectedData) => {
    onSelectDataApiTemp(selectedData);
    handleCloseModal1();
  };
  const handleSelectDataApiTempChuva = (selectedData) => {
    onSelectDataApiTempChuva(selectedData);
    handleCloseModal2();
  };

  return (
    <CardContent>

      {/* card 1 */}
      <Card onClick={handleOpenModal1}>
        <Top>
          <Image src={ImgMedia3}/>
          <Body>
            <Title>Todos os dados meteorológicos</Title>
          </Body>
        </Top>
      </Card>
        <Modal open={openModal1} onClose={handleCloseModal1}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 900,
              bgcolor: selectedTheme.bgLight,
              borderRadius: 8,         
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{color: selectedTheme.text_primary}}>
              Dados Meteorológicos
            </Typography>
            <ApiTemp 
              onSelectData={handleSelectDataApiTemp} 
              isDark={isDark} 
              darkTheme={darkTheme} 
              lightTheme={lightTheme} 
              theme={isDark ? darkTheme : lightTheme}
            />
            <Box 
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2}}
            >
              <Button
                variant="contained"
                onClick={handleCloseModal1}
                sx={{ marginRight: 2 }}
              >
                Fechar
              </Button>
            </Box>
          </Box>
        </Modal>

      {/* card 2 */}
      <Card onClick={handleOpenModal2}>
        <Top>
          <Image src={ImgMedia2}/>
          <Body>
            <Title>Mês menos chuvoso</Title>
          </Body>
        </Top>
      </Card>
        <Modal open={openModal2} onClose={handleCloseModal2}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 900,
              bgcolor: selectedTheme.bgLight,
              borderRadius: 8,         
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{color: selectedTheme.text_primary}}>
              Dados Meteorológicos
            </Typography>
            <ApiTempChuva 
              onSelectData={handleSelectDataApiTempChuva} 
              isDark={isDark} 
              darkTheme={darkTheme} 
              lightTheme={lightTheme} 
              theme={isDark ? darkTheme : lightTheme}
              />
            <Box 
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
            >
              <Button
                variant="contained"
                onClick={handleCloseModal2}
                sx={{ marginRight: 2 }}
              >
                Fechar
              </Button>
            </Box>
          </Box>
        </Modal>

      {/* card 3 */}
      <Card onClick={handleOpenModal3}>
        <Top>
          <Image src={ImgMedia}/>
          <Body>
            <Title>Média da temperatura mínima </Title>
          </Body>
        </Top>
      </Card>
      <Modal open={openModal3} onClose={handleCloseModal3}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 900,
              bgcolor: selectedTheme.bgLight,
              borderRadius: 8,         
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{color: selectedTheme.text_primary}}>
              Card em construção.
            </Typography>
            <Box 
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
            >
              <Button
                variant="contained"
                onClick={handleCloseModal3}
                sx={{ marginRight: 2 }}
              >
                Fechar
              </Button>
            </Box>
          </Box>
        </Modal>
      
    </CardContent>
  )
}
