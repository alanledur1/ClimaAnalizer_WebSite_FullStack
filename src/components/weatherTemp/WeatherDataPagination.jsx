import React, { useState } from 'react';
import { Typography, List, Button, Box, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { darkTheme, lightTheme } from '../../utils/Themes.js';

const WeatherDataPagination = ({ weatherData, isDark }) => {
  const selectedTheme = isDark ? darkTheme : lightTheme;
  const [currentPage, setCurrentPage] = useState(1);

  const isSmallScreen = useMediaQuery('(max-width:378px)');
  const isMediumScreen = useMediaQuery('(max-width:600px)');
  const isLargeScreen = useMediaQuery('(max-width:900px)');
  let itemsPerPage;

  if (isSmallScreen) {
    itemsPerPage = 4; // Se for uma tela pequena (378px), mostrar 4 itens por pesquisa
  } else if (isMediumScreen) {
    itemsPerPage = 4; // Se for uma tela média (600px), mostrar 6 itens por pesquisa
  } else if (isLargeScreen) {
    itemsPerPage = 6; // Se for uma tela média (900px), mostrar 6 itens por pesquisa
  } else {
    itemsPerPage = 6; // Outras telas mostrarão 6 itens por pesquisa
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const gridTemplateColumns = '1fr 1fr'; // 2 columns on all screen sizes

   const marginSize = isSmallScreen ? '5px' :
  isMediumScreen ? '10px' :
  isLargeScreen ? '15px' :
  '20px'; // Ajustar margem com base no tamanho da tela

  const paddingSize = isSmallScreen ? '4px' :
    isMediumScreen ? '12px' :
    isLargeScreen ? '16px' :
    '16px'; // Ajustar padding com base no tamanho da tela
  const fontSize = isSmallScreen ? '10px' :
  isMediumScreen ? '12px' :
  isLargeScreen ? '14px' :
  '16px'; // Ajustar tamanho da fonte com base no tamanho da tela 


  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Box
      sx={{
        marginTop: '20px',  
        padding: '5px',
        borderRadius: '8px' 
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center', 
          fontWeight: 'bold', 
          marginBottom: '20px', 
          color: selectedTheme.text_primary
        }}
      >
        Dados Meteorológicos
      </Typography>
      {weatherData && weatherData.dados && weatherData.dados.length > 0 ? (
        <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', flexDirection: 'column' }}>
          {weatherData.dados.slice(startIndex, endIndex).map((data, index) =>  (
            <Box
              key={index}
              sx={{
                display: 'grid',
                gridTemplateColumns: gridTemplateColumns,
                gap: '2px',
                border: `1px solid ${({ theme }) => theme.nav}`,
                borderRadius: '8px',
                background: selectedTheme.BackgroundDados,
                marginBottom: marginSize,
                marginRight: '1px',
                width: '32%',
                color: selectedTheme.text_secondary,
                transition: 'all 0.5s ease-in-out',
                '@media (max-width: 600px)': {
                  // Estilos específicos para telas de até 378px
                  padding: '0px', 
                  width: '49%',
                  fontSize: '12px', 
                  gap: '0px', 
                },
                '@media (max-width: 378px)': {
                  // Estilos específicos para telas de até 378px
                  padding: '0px', 
                  width: '49%', 
                  fontSize: '12px', 
                  gap: '0px', 
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold', padding: paddingSize, fontSize,'@media (max-width: 378px)': {width:'96px' }}}>Data: 📅</Typography>
              <Typography variant="body2" sx={{ padding: paddingSize, borderRight: '1px solid gray', fontSize, '@media (max-width: 378px)': {border:'none' }}}>{data.data}</Typography>
              {(!isSmallScreen || index < 4) && (
                <>
                  {data.precipitacao && (
                    <>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', padding: paddingSize, fontSize }}>Precipitação: ☔</Typography>
                      <Typography variant="body2" sx={{ padding: paddingSize, borderRight: '1px solid gray', fontSize,'@media (max-width: 378px)': {border:'none' }}}>{data.precipitacao}</Typography>
                    </>
                  )}
                  {data.temperatura_maxima && data.temperatura_minima && (
                    <>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', padding: paddingSize, fontSize }}>Temp. Máxima: 🔥</Typography>
                      <Typography variant="body2" sx={{ padding: paddingSize, borderRight: '1px solid gray', fontSize,'@media (max-width: 378px)': {border:'none' }}}>{data.temperatura_maxima}</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', padding: paddingSize, fontSize }}>Temp. Mínima: ❄️</Typography>
                      <Typography variant="body2" sx={{ padding: paddingSize, borderRight: '1px solid gray', fontSize,'@media (max-width: 378px)': {border:'none' }}}>{data.temperatura_minima}</Typography>
                    </>
                  )}
                  {data.umidade && data.velocidade_vento && (
                    <>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', padding: paddingSize, fontSize }}>Umidade: 💧</Typography>
                      <Typography variant="body2" sx={{ padding: paddingSize, borderRight: '1px solid gray', fontSize,'@media (max-width: 378px)': {border:'none' }}}>{data.umidade}</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', padding: paddingSize, fontSize }}>Vel. do Vento: 🌬️</Typography>
                      <Typography variant="body2" sx={{ padding: paddingSize, borderRight: '1px solid gray', fontSize,'@media (max-width: 378px)': {border:'none' }}}>{data.velocidade_vento}</Typography>
                    </>
                  )}
                </>
              )}
            </Box>
          ))}
        </List>
      ) : (
        <Typography variant="body1">Nenhum dado meteorológico disponível.</Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>Página Anterior</Button>
        <Button onClick={handleNextPage} disabled={endIndex >= weatherData.dados.length}>Próxima Página</Button>
      </Box>
    </Box>
  );
};

WeatherDataPagination.propTypes = {
  weatherData: PropTypes.object.isRequired,
  isDark: PropTypes.bool.isRequired,
};

export default WeatherDataPagination;
