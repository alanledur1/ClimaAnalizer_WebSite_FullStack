import React, { useState } from 'react';
import { Typography, List, Button, Box, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { darkTheme, lightTheme } from '../../utils/Themes.js';

export const WeatherDataPagination = ({ weatherData, isDark }) => {
  const selectedTheme = isDark ? darkTheme : lightTheme;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const isSmallScreen = useMediaQuery('(max-width:378px)');
  const isMediumScreen = useMediaQuery('(max-width:600px)');
  const isLargeScreen = useMediaQuery('(min-width: 901px)');

  const splitDataIntoColumns = (data, columns) => {
    const result = [];
    const dataSize = data.length;
    const rows = Math.ceil(dataSize / columns);
    for (let i = 0; i < rows; i++) {
      result.push(data.slice(i * columns, (i + 1) * columns));
    }
    return result;
  };

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
        splitDataIntoColumns(weatherData.dados.slice(startIndex, endIndex), isSmallScreen ? 1 : isMediumScreen ? 1 : isLargeScreen ? 2 : 2).map((columnData, columnIndex) => (
          <List key={columnIndex} sx={{ display: 'flex', marginBottom: '20px', justifyContent: 'space-around' }}>
            {columnData.map((data, index) => (
              <Box
                key={index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: isSmallScreen ? '1fr' : isMediumScreen ? '1fr' : isLargeScreen ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
                  gap: '8px',
                  padding: '20px',
                  border: `1px solid ${({ theme }) => theme.nav}`,
                  borderRadius: '8px',
                  background: selectedTheme.BackgroundDados,
                  marginBottom: '0px',
                  marginLeft: '5px',
                  marginRight: '5px',
                  maxWidth: '800px',
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
                <Typography variant="body1" sx={{ fontWeight: 'bold', padding: '5px' }}>Data: 📅</Typography>
                <Typography variant="body2" sx={{ padding: '5px', borderRight: '1px solid gray' }}>{data.data}</Typography>
                {data.precipitacao && (
                  <>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', padding: '5px' }}>Precipitação: ☔</Typography>
                    <Typography variant="body2" sx={{ padding: '5px', borderRight: '1px solid gray' }}>{data.precipitacao}</Typography>
                  </>
                )}
                {data.temperatura_maxima && data.temperatura_minima && (
                  <>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', padding: '5px' }}>Temp. Máxima: 🔥</Typography>
                    <Typography variant="body2" sx={{ padding: '5px', borderRight: '1px solid gray' }}>{data.temperatura_maxima}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', padding: '5px' }}>Temp. Mínima: ❄️</Typography>
                    <Typography variant="body2" sx={{ padding: '5px', borderRight: '1px solid gray' }}>{data.temperatura_minima}</Typography>
                  </>
                )}
                {data.umidade && data.velocidade_vento && (
                  <>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', padding: '5px' }}>Umidade: 💧</Typography>
                    <Typography variant="body2" sx={{ padding: '5px', borderRight: '1px solid gray' }}>{data.umidade}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', padding: '5px' }}>Vel. do Vento: 🌬️</Typography>
                    <Typography variant="body2" sx={{ padding: '5px', borderRight: '1px solid gray' }}>{data.velocidade_vento}</Typography>
                  </>
                )}
              </Box>
            ))}
          </List>
        ))
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
