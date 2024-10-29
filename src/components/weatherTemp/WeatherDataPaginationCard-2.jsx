import React, { useState } from 'react';
import { Typography, List, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { darkTheme, lightTheme } from '../../utils/Themes.js';
import styled from 'styled-components';

export const WeatherDataPaginationCard2 = ({ weatherData, isDark }) => {
  const selectedTheme = isDark ? darkTheme : lightTheme;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const DataRow = ({ title, value }) => (
    <Box display="flex" justifyContent="space-between" width="100%">
      <Typography fontWeight="bold" sx={{ color: selectedTheme.text_primary }}>{title}</Typography>
      <Typography sx={{ color: selectedTheme.text_secondary }}>{value}</Typography>
    </Box>
  );

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
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(weatherData.dados.length / itemsPerPage)));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };


  const DataContainer = styled(Box)`
    display: grid;
    height: 100%;
    background-color: ${selectedTheme.BackgroundDados};
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: ${selectedTheme.card}99;
      transform: scale(1.02);
    }
    @media (max-width: 768px) {
      padding: 12px;
      width: 100%;
      margin-bottom: 5px;
    }

    @media (max-width: 378px) {
      padding: 8px;
      margin-bottom: 0px;
    }

  `;


  const renderYearlyData = (data) => (
    <DataContainer>
      <DataRow title={`${data.mes} foi mais chuvoso em:`} value={data.ano_mais_chuvoso} />
      <DataRow title={`Precipitação para ${data.mes} de ${data.ano_mais_chuvoso}: `} value={data.precipitacao_mais} />
      <DataRow title={`${data.mes} foi menos chuvoso em:`} value={data.ano_menos_chuvoso} />
      <DataRow title={`Precipitação para ${data.mes} de ${data.ano_menos_chuvoso}: `} value={data.precipitacao_menos} />
    </DataContainer>
  );

  const renderDailyMonthlyData = (data) => (
    <>
      {data.data_completa_mais_chuvoso && (
        <>
          <DataRow title="Data: 📅" value={data.data_completa_mais_chuvoso} />
          <DataRow title="Dia mais chuvoso:" value={data.dia_mais_chuvoso} />
          <DataRow title="Precipitação para o Dia: ☔" value={data.precipitacao_para_o_dia_mais} />
        </>
      )}
      {data.mes_mais_chuvoso && (
        <>
          <DataRow title="Mês mais chuvoso:" value={data.mes_mais_chuvoso} />
          <DataRow title="Precipitação para o Mês: ☔" value={data.precipitacao_para_o_mes_mais} />
        </>
      )}
      {data.data_completa_menos_chuvoso && (
        <>
          <DataRow title="Data: 📅" value={data.data_completa_menos_chuvoso} />
          <DataRow title="Dia menos chuvoso:" value={data.dia_menos_chuvoso} />
          <DataRow title="Precipitação para o Dia: ☔" value={data.precipitacao_para_o_dia} />
        </>
      )}
      {data.mes_menos_chuvoso && (
        <>
          <DataRow title="Mês menos chuvoso:" value={data.mes_menos_chuvoso} />
          <DataRow title="Precipitação para o Mês: ☔" value={data.precipitacao_para_o_mes} />
        </>
      )}
    </>
  );

  return (
    <Box sx={{ marginTop: '20px', padding: '5px', borderRadius: '8px' }}>
      <Typography variant='h6' sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', color: selectedTheme.text_primary }}>
        Dados Meteorológicos
      </Typography>
      {weatherData && weatherData.dados ? (
        <List             
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              gap: '8px',
              alignContent: 'center',
              height: '100%',
            },
            '@media (max-width: 400px)': {
              // Estilos específicos para telas de até 378px
              padding: '0px', 
              width: '100%', 
              fontSize: '12px', 
              flexDirection:'column', 
              gap: '0px', 
            },
           }}>
          {Array.isArray(weatherData.dados) ? (
            // Renderiza para múltiplos anos
            splitDataIntoColumns(weatherData.dados.slice(startIndex, endIndex), 2).map((columnData, columnIndex) => (
              <Box key={columnIndex}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                maxWidth: '800px',
                width: '100%',
                '@media (max-width: 768px)': {
                  // Estilos específicos para telas de até 768px
                  padding: '0px', 
                  width: '100%',
                  fontSize: '12px',
                  marginBottom:'5px',
                  gap: '0px', 
                  justifyContent: 'center',
                  gridTemplateColumns: 'none',
                },
                '@media (max-width: 400px)': {
                  // Estilos específicos para telas de até 768px
                  padding: '0px', 
                  width: '100%',
                  fontSize: '12px',
                  marginBottom:'5px',
                  gap: '0px', 
                  display: 'block',
                },
              }}
              >
                {columnData.map((data, index) => (
                  <Box key={index} sx={{ padding: '10px',borderRadius: '10px' ,border: `1px solid ${selectedTheme.nav}`, marginBottom: '10px', background: selectedTheme.BackgroundDados }}>
                    {data.id === 2 ? renderYearlyData(data) : renderDailyMonthlyData(data)}
                  </Box>
                ))}
              </Box>
            ))
          ) : (
            <Box sx={{ 
              padding: '10px',
              borderRadius:'10px', 
              border: `1px solid ${selectedTheme.nav}`, 
              marginBottom: '10px', 
              background: selectedTheme.BackgroundDados, 
              width:'60%',
              height: '300px', 
              display:'flex', 
              flexDirection:'column',
              '@media (max-width: 768px)': {
                // Estilos específicos para telas de até 768px
                width: '90%',
                height: '250px',
                fontSize: '12px',
              },
              '@media (max-width: 400px)': {
                // Estilos específicos para telas de até 768px
                padding: '0px', 
                width: '100%',
                fontSize: '12px',
                marginBottom:'5px',
                gap: '0px', 
                display: 'block',
              },
              }}>
              {renderYearlyData(weatherData.dados)} {/* Renderiza dados anuais */}
              {renderDailyMonthlyData(weatherData.dados)} {/* Renderiza dados diários e mensais */}
            </Box>
          )}
        </List>
      ) : (
        <Typography variant='body1'>Nenhum dado meteorológico disponível.</Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>Página Anterior</Button>
        <Button onClick={handleNextPage} disabled={endIndex >= weatherData.dados.length}>Próxima Página</Button>
      </Box>
    </Box>
  );
};

WeatherDataPaginationCard2.propTypes = {
  weatherData: PropTypes.object.isRequired,
  isDark: PropTypes.bool.isRequired,
};
