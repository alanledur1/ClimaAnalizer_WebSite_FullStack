import React, { useState } from 'react';
import { Typography, List, Button, Box, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { darkTheme, lightTheme } from '../../utils/Themes.js';

export const WeatherDataPagination = ({ weatherData, isDark }) => {
  const selectedTheme = isDark ? darkTheme : lightTheme;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Keeping the items per page high to control visibility through styles
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const isSmallScreen = useMediaQuery('(max-width:378px)');
  const isMediumScreen = useMediaQuery('(max-width:600px)');

  const itemWidth = isSmallScreen ? '100%' : isMediumScreen ? '50%' : 'calc(100% / 3)'; // Adjust width based on screen size

  const fontSize = isSmallScreen ? '10px' : isMediumScreen ? '12px' : 'inherit'; // Adjust font size based on screen size

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
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: selectedTheme.text_primary,
        }}
      >
        Dados Meteorológicos
      </Typography>
      {weatherData && weatherData.dados && weatherData.dados.length > 0 ? (
        <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {weatherData.dados.slice(startIndex, endIndex).map((data, index) => (
            <Box
              key={index}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '8px',
                padding: '20px',
                border: `1px solid ${({ theme }) => theme.nav}`,
                borderRadius: '8px',
                background: selectedTheme.BackgroundDados,
                marginBottom: '10px',
                width: itemWidth,
                color: selectedTheme.text_secondary,
                transition: 'all 0.5s ease-in-out',
                '&:hover': {
                  backgroundColor: selectedTheme.card + 99,
                  color: selectedTheme.text_primary,
                  cursor: 'pointer',
                  transform: 'scale(1.02)',
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold', padding: '5px', fontSize }}>Data: 📅</Typography>
              <Typography variant="body2" sx={{ padding: '5px', borderRight: '1px solid gray', fontSize }}>{data.data}</Typography>
              {(!isSmallScreen || index < 3) && ( // Render only if not on small screen or if index is less than 3
                <>
                  {data.precipitacao && (
                    <>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', padding: '5px', fontSize }}>Precipitação: ☔</Typography>
                      <Typography variant="body2" sx={{ padding: '5px', borderRight: '1px solid gray', fontSize }}>{data.precipitacao}</Typography>
                    </>
                  )}
                  {data.temperatura_maxima && data.temperatura_minima && (
                    <>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', padding: '5px', fontSize }}>Temp. Máxima: 🔥</Typography>
                      <Typography variant="body2" sx={{ padding: '5px', borderRight: '1px solid gray', fontSize }}>{data.temperatura_maxima}</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', padding: '5px', fontSize }}>Temp. Mínima: ❄️</Typography>
                      <Typography variant="body2" sx={{ padding: '5px', borderRight: '1px solid gray', fontSize }}>{data.temperatura_minima}</Typography>
                    </>
                  )}
                  {data.umidade && data.velocidade_vento && (
                    <>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', padding: '5px', fontSize }}>Umidade: 💧</Typography>
                      <Typography variant="body2" sx={{ padding: '5px', borderRight: '1px solid gray', fontSize }}>{data.umidade}</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', padding: '5px', fontSize }}>Vel. do Vento: 🌬️</Typography>
                      <Typography variant="body2" sx={{ padding: '5px', borderRight: '1px solid gray', fontSize }}>{data.velocidade_vento}</Typography>
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
