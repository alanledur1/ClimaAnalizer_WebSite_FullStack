import React, { useState } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { darkTheme, lightTheme } from '../utils/Themes.js';
import { Typography, TextField, Button,Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function ApiTempChuva({ onSelectData, isDark }) {
  const selectedTheme = isDark ? darkTheme : lightTheme;
  const [option, setOption] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  
  const handleStartDateChange = (event) => {
    let inputDate = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (inputDate.length > 0) {
      // Insere barras após o dia e o mês, se necessário
      if (inputDate.length > 2 && inputDate.length <= 4) {
        inputDate = inputDate.replace(/^(\d{2})(\d{2})/, '$1/$2');
      } else if (inputDate.length > 4) {
        inputDate = inputDate.replace(/^(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
      }
    }
    setStartDate(inputDate); // Atualiza o estado startDate
  };

  const handleEndDateChange = (event) => {
    let inputDate = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (inputDate.length > 0) {
      // Insere barras após o dia e o mês, se necessário
      if (inputDate.length > 2 && inputDate.length <= 4) {
        inputDate = inputDate.replace(/^(\d{2})(\d{2})/, '$1/$2');
      } else if (inputDate.length > 4) {
        inputDate = inputDate.replace(/^(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
      }
    }
    setEndDate(inputDate); // Atualiza o estado endDate
  };

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  const handleOptionSubmit = async () => {
    try {
      switch (option) {
        case '1':
          const responseAll = await axios.post('/api/visualizar-dados', {
            tipo_dados: 'mes_dia_menos_chuvoso',
            data_inicial: startDate,
            data_final: endDate
          });
          onSelectData(responseAll.data);
          break;
        case '2':
          const responsePrecip = await axios.post('/api/visualizar-dados', {
            tipo_dados:  'mes_dia_mais_chuvoso',
            data_inicial: startDate,
            data_final: endDate
          });
          onSelectData(responsePrecip.data);
          break;
        case '3': 
          const responseTemp = await axios.post('/api/visualizar-dados', {
            tipo_dados: 'mes_dias_mais_seco',
            data_inicial: startDate,
            data_final: endDate
          });
          onSelectData(responseTemp.data);
          break;
        case '4':
          const responseHumidityVel = await axios.post('/api/visualizar-dados', {
            tipo_dados: 'ano_mais_E_menos_chuvoso',
            data_inicial: startDate,
            data_final: endDate
          });
          onSelectData(responseHumidityVel.data);
          break;
        default:
          alert('Opção inválida. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao processar a opção:', error);
    }
  };


  return (
  <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px', 
      padding: '20px', 
      border: selectedTheme.border_modals, 
      borderRadius: '20px',
      backgroundColor: selectedTheme.text_secondary+20,
      boxShadow: selectedTheme.shadow
      }}
  >
    <Typography variant="h6" component="h4" sx={{ color: selectedTheme.text_primary }}>Encontre os Dias ou Meses Mais Chuvosos</Typography>
    <Typography variant="h6" component="h4" sx={{ fontSize:'14px', color: selectedTheme.text_secondary}}>Escolha um Período para Visualizar a Chuva Mais Intensa.</Typography>
    <Box>
    <TextField
          type="text"
          id="data_inicial"
          label="Data Inicial" 
          value={startDate}
          onChange={handleStartDateChange}
          placeholder="DD/MM/YYYY"
          maxLength="8"
          InputLabelProps={{ 
            shrink: true,
            style: {  
                width: '50%',
                textAlign: 'center',
                color: selectedTheme.text_primary,
                backgroundColor: selectedTheme.bgLight,
                borderRadius: '7px'
            }
          }}
          sx={{marginLeft: '4px'}}
        />
        <TextField
          type="text" 
          id="data_final"
          label="Data Final"
          value={endDate}
          onChange={handleEndDateChange}
          placeholder="DD/MM/YYYY"
          maxLength="8"
          InputLabelProps={{ 
            shrink: true,
            style: { 
              width: '50%',
              textAlign: 'center',
              color: selectedTheme.text_primary,
              backgroundColor: selectedTheme.bgLight,
              borderRadius: '7px'
            }
          }}
          sx={{marginLeft: '4px'}}
        />
    </Box>
    <FormControl sx={{ minWidth: 200 }} size="small">
      <InputLabel id="demo-select-small-label" sx={{color: selectedTheme.text_primary}}>Opção</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="controllable-states-demo"
        value={option}
        label="Opção"
        onChange={handleOptionChange}
        variant="outlined"
        fullWidth
        sx={{
          '& .MuiSelect-select': {
            color: selectedTheme.text_primary, // Cor do texto selecionado
          },
        }}
        MenuProps={{ 
          PaperProps: {
            sx: {
              backgroundColor: selectedTheme.card_light,
              color: selectedTheme.text_primary,
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              padding: '8px',
              fontFamily: 'Arial, sans-serif',
            },
          },
          
        }}
      >
        <MenuItem disabled value="">
          <em>Selecione as opções desejadas</em>
        </MenuItem>
        <MenuItem value="1">Todos os dados</MenuItem>
        <MenuItem value="2">Mês Mais Chuvoso</MenuItem>
        <MenuItem value="3">Mês Menos Chuvoso</MenuItem>
        <MenuItem value="4">Umidade e Velocidade do vento</MenuItem>
      </Select>
    </FormControl>
    <Button variant="contained" onClick={handleOptionSubmit}>Selecionar</Button>
  </div>
  );
} 

export default ApiTempChuva;
