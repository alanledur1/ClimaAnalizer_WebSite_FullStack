import React, { useState } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography, TextField, Button,Box } from "@mui/material";

function ApiTempChuva({ onSelectData, onCloseModal }) {
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
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
    <Typography variant="h6" component="h4">Encontre os Dias ou Meses Mais Chuvosos</Typography>
    <Typography variant="h6" component="h4" sx={{ fontSize:'14px'}}>Escolha um Período para Visualizar a Chuva Mais Intensa.</Typography>
    <Box>
      <TextField
        type="text"
        id="data_inicial"
        label="Data Inicial"
        value={startDate}
        onChange={handleStartDateChange}
        placeholder='DD/MM/YYYY'
        maxLength="8"
        InputLabelProps={{ shrink: true }}
        sx={{marginRight: '4px'}}
      />
      <TextField
        type="text"
        id="data_final"
        label="Data final"
        value={endDate}
        onChange={handleEndDateChange}
        placeholder='DD/MM/YYYY'
        maxLength="8"
        InputLabelProps={{ shrink: true }}
        sx={{marginLeft: '4px'}}
      />
    </Box>
    <FormControl sx={{ minWidth: 200 }} size="small">
      <InputLabel id="demo-select-small-label">Opção</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={option}
        label="Opção"
        onChange={handleOptionChange}
        variant="outlined"
        fullWidth
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
