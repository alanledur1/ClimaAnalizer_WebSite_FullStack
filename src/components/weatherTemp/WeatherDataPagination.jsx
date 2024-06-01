import React, { useState } from 'react';
import { Typography, List, Button, Box, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { darkTheme, lightTheme } from '../../utils/Themes.js';

export const WeatherDataPagination = ({ weatherData, isDark }) => {
  const selectedTheme = isDark ? darkTheme : lightTheme;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const isSmallScreen = useMediaQuery('(max-width:378px)');
  const isMediumScreen = useMediaQuery('(max-width:600px)');


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
