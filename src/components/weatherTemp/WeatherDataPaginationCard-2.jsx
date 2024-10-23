import React, { useState } from 'react'
import { Typography, List, Button, Box } from '@mui/material'
import PropTypes from 'prop-types';
import { darkTheme, lightTheme } from '../../utils/Themes.js';


export const WeatherDataPaginationCard2 = ({ weatherData, isDark }) => {
  const selectedTheme = isDark ? darkTheme : lightTheme;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; //Define quantos itens serão exibidos por página
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const DataRow = ({ title, value }) => (
    <tr style={{width: '320px', display: 'flex', marginBottom:'8px'}}>
      <td style={{ fontWeight: 'bold', padding: '5px' }}>{title}</td>
      <td style={{ padding: '5px' }}>{value}</td>
    </tr>
  );


  // Função para dividir os dados em grupos de duas colunas
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
        borderRadius: '8px' 
        
      }}>
      <Typography 
        variant='h6' 
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
        // Dividindo os dados em grupos de duas colunas
        splitDataIntoColumns(weatherData.dados.slice(startIndex, endIndex), 2).map((columnData, columnIndex) => (
          <List 
            key={columnIndex} 
            sx={{ 
              display: 'flex', 
              marginBottom: '20px',
              '@media (max-width: 768px)': {
                // Estilos específicos para telas de até 768px
                padding: '0px', 
                fontSize: '12px', 
              },
              '@media (max-width: 378px)': {
                // Estilos específicos para telas de até 378px
                padding: '0px', 
                width: '100%', 
                fontSize: '12px', 
                gap: '0px', 
              },
           }}>
            {columnData.map((data, index) => (
              <Box
                key={index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
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
                  '@media (max-width: 768px)': {
                    // Estilos específicos para telas de até 768px
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
                <table>
                  {data.data_completa_mais_chuvoso && data.dia_mais_chuvoso && data.precipitacao_para_o_dia_mais && (
                    <>
                      <DataRow title="Data: 📅" value={data.data_completa_mais_chuvoso} />
                      <DataRow title="Dia mais chuvoso:" value={data.dia_mais_chuvoso} />
                      <DataRow title="Precipitação para o Dia: ☔" value={data.precipitacao_para_o_dia_mais} />
                    </>
                  )}
                  {data.mes_mais_chuvoso && data.precipitacao_para_o_mes_mais && (
                    <>
                      <DataRow title="Mês mais chuvoso:" value={data.mes_mais_chuvoso} />
                      <DataRow title="Precipitação para o Mês: ☔" value={data.precipitacao_para_o_mes_mais} />
                    </>
                  )}
                  {data.data_completa_menos_chuvoso && data.dia_menos_chuvoso && data.precipitacao_para_o_dia && (
                    <>
                      <DataRow title="Data: 📅" value={data.data_completa_menos_chuvoso} />
                      <DataRow title="Dia menos chuvoso:" value={data.dia_menos_chuvoso} />
                      <DataRow title="Precipitação para o Dia: ☔" value={data.precipitacao_para_o_dia} />
                    </>
                  )}
                  {data.mes_menos_chuvoso && data.precipitacao_para_o_mes && (
                    <>
                      <DataRow title="Mês menos chuvoso:" value={data.mes_menos_chuvoso} />
                      <DataRow title="Precipitação para o Mês: ☔" value={data.precipitacao_para_o_mes} />
                    </>
                  )}
                </table>
              </Box>
            
            ))}
          </List>
        ))
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
  theme: PropTypes.object.isRequired // Defina o tipo da prop theme como um objeto
};