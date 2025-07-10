import React, { useState } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { darkTheme, lightTheme } from '../utils/Themes.js';
import { Typography, TextField, Button, Box } from "@mui/material";
import './api.css'

function ApiTemp({ onSelectData, isDark }) {
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

  // Função para enviar os dados para o servidor
  const handleOptionSubmit = async () => {
    // Faz a requisição para o servidor com as datas sem alteração
    try {
      switch (option) {
        case '1':
        case '2':
        case '3':
        case '4':
          const responseData = await axios.post('https://climaanalizerserver.rj.r.appspot.com/api/visualizar-dados', {
            tipo_dados: option === '1' ? 'todos_os_dados' : option === '2' ? 'precipitacao' : option === '3' ? 'temperatura' : 'umidade_velocidade',
            data_inicial: startDate,
            data_final: endDate
          });
          onSelectData(responseData.data);
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
      boxShadow: selectedTheme.shadow,
      color: selectedTheme.text_primary+99
      }}
  >
        
  
    <Typography variant="h6" component="h4">Visualizar intervalo de dados em modo texto
      <br></br>
      Intervalo de data ex.: 01/02/2014 - 21/06/2016.
    </Typography>
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
      <InputLabel id="demo-select-small-label" sx={{color: selectedTheme.text_primary}}>Opções</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={option}
        label="Opção"
        onChange={handleOptionChange}
        variant="outlined"
        fullWidth
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
        <MenuItem disabled value="" >
            <em>Selecione as opções desejadas</em>
          </MenuItem>
        <MenuItem value="1">Todos os dados</MenuItem>
        <MenuItem value="2">Precipitação</MenuItem>
        <MenuItem value="3">Temperatura</MenuItem>
        <MenuItem value="4">Umidade e Velocidade do vento</MenuItem>
      </Select>
    </FormControl>
    <Button variant="contained" onClick={handleOptionSubmit}>Selecionar</Button>

    
  </div>
  );
} 

export default ApiTemp;
