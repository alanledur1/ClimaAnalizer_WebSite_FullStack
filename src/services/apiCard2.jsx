import React, { useState } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { darkTheme, lightTheme } from '../utils/Themes.js';
import { Typography, TextField, Button,Box, CircularProgress } from "@mui/material";


function ApiTempChuva({ onSelectData, isDark }) {
  const selectedTheme = isDark ? darkTheme : lightTheme;
  const [option, setOption] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [month, setMonth] = useState('');
  const [intervaloTempo, setIntervaloTempo] = useState(''); // Inicializando o estado aqui
  const [tempo, setTempo] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null); // Novo estado para armazenar os dados

  const handleStartYearChange = (event) => {
    let inputYear = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (inputYear.length > 4) {
      inputYear = inputYear.slice(0, 4); // Limita a entrada a 4 dígitos (ano)
    }
    setStartYear(inputYear); // Atualiza o estado startYear
  };

  const handleEndYearChange = (event) => {
    let inputYear = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (inputYear.length > 4) {
      inputYear = inputYear.slice(0, 4); // Limita a entrada a 4 dígitos (ano)
    }
    setEndYear(inputYear); // Atualiza o estado endYear
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleTempoChange = (event) => {
    setTempo(event.target.value); // Atualiza o estado do intervalo de tempo
    setIntervaloTempo(event.target.value); // Atualiza o intervalo de tempo aqui
  };
  
  const handleStartDateChange = (event) => {
    let inputDate = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    
    if (tempo === 'varios_anos') {
      if (inputDate.length > 4) {
        inputDate = inputDate.slice(0, 4); // Limita a entrada a 4 dígitos (ano)
      }
    } else {
      // Formato de data DD/MM/YYYY
      if (inputDate.length > 0) {
        // Insere barras após o dia e o mês, se necessário
        if (inputDate.length > 2 && inputDate.length <= 4) {
          inputDate = inputDate.replace(/^(\d{2})(\d{2})/, '$1/$2');
        } else if (inputDate.length > 4) {
          inputDate = inputDate.replace(/^(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        }
      }
    }

    setStartDate(inputDate); // Atualiza o estado startDate
  };

  const handleEndDateChange = (event) => {
    let inputDate = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (tempo === 'varios_anos') {
      if (inputDate.length > 4) {
        inputDate = inputDate.slice(0, 4); // Limita a entrada a 4 dígitos (ano)
      }
    } else {
      if (inputDate.length > 0) {
        if (inputDate.length > 2 && inputDate.length <= 4) {
          inputDate = inputDate.replace(/^(\d{2})(\d{2})/, '$1/$2');
        } else if (inputDate.length > 4) {
          inputDate = inputDate.replace(/^(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        }
      }
    }

    setEndDate(inputDate); // Atualiza o estado
  };

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  // Função de formatação para datas no formato DD/MM/YYYY e YYYY
  const formatDate = (date, isYearOnly) => {
    if (isYearOnly) return date.length === 4 ? date : '';
    if (date.length === 10) return date; // Se já estiver formatado corretamente
    const formattedDate = date.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
    return formattedDate;
  };

  // Exemplo de validação rápida
  const isValidDate = (date) => {
    // Check if day and month are within valid ranges
    const [day, month, year] = date.split('/').map(Number);
    return (
      day >= 1 && day <= 31 &&
      month >= 1 && month <= 12 &&
      year && year.toString().length === 4
    );
  };

  // Verificação no envio
  const handleOptionSubmit = async () => {
    setLoading(true);
    const formattedStartDate = formatDate(startDate, tempo === 'varios_anos');
    const formattedEndDate = formatDate(endDate, tempo === 'varios_anos');

    // Validação para 'um_ano' caso seja necessário
    if (tempo === 'um_ano' && (!isValidDate(formattedStartDate) || !isValidDate(formattedEndDate))) {
      alert("Por favor, insira datas válidas no formato DD/MM/YYYY.");
      setLoading(false);
      return;
    }
    
    try {
      let response;

      // Validação de dados antes da requisição
      if (tempo === 'varios_anos' && (!startYear || !endYear || !month)) {
        alert("Por favor, insira todos os campos: ano inicial, ano final e mês.");
        setLoading(false);
        return;
      }
      
      if (tempo === 'um_ano' && (!startDate || !endDate)) {
        alert("Por favor, insira as datas inicial e final no formato DD/MM/YYYY.");
        setLoading(false);
        return;
      }

      // Executa a requisição conforme o tipo de intervalo
      if (tempo === 'varios_anos') {
        response = await axios.post('https://climaanaliyzerserver.rj.r.appspot.com/api/mes-dia-chuvoso', {
          tipo_dados: 'todos_os_dados',
          intervalo_tempo: intervaloTempo,
          ano_inicial: startYear ? parseInt(startYear, 10) : null,
          ano_final: endYear ? parseInt(endYear, 10) : null,
          mes: month ? parseInt(month, 10) : null, // Converte para inteiro
        });
      } else {
        response = await axios.post('https://climaanaliyzerserver.rj.r.appspot.com/api/mes-dia-chuvoso', {
          tipo_dados: 'todos_os_dados',
          intervalo_tempo: intervaloTempo,
          data_inicial: startDate,
          data_final: endDate,
        });
      }
      
      onSelectData(response.data);
      setData(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error('Erro ao processar a opção:', error);
      alert('Erro ao processar a opção. Verifique a conexão com o servidor.');
    } finally {
      setLoading(false);
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
  }}>
    <Typography variant="h6" component="h4" sx={{ color: selectedTheme.text_primary }}>
      Encontre os Dias ou Meses mais e menos chuvosos
    </Typography>
    <Typography variant="h6" component="h4" sx={{ fontSize:'14px', color: selectedTheme.text_secondary}}>
      Para o periodo de 1 ano a data tem que ser ex.: 01/01/2003 - 31/12/2003.
      <br/>
      Para o periodo de varios anos apenas informe o ano inicial, final e mês.
    </Typography>

    {/* Exibir campos diferentes com base na seleção do intervalo de tempo */}
    {tempo === 'um_ano' && (
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
          sx={{ marginLeft: '4px' }}
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
          sx={{ marginLeft: '4px' }}
        />
      </Box>
    )}

    {tempo === 'varios_anos' && (
      <Box>
        <TextField
          type="text"
          id="startYear"
          label="Ano Inicial"
          value={startYear}
          onChange={handleStartYearChange}
          placeholder="AAAA"
          maxLength="4"
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
          sx={{ marginLeft: '4px' }}
        />
        <TextField
          type="text"
          id="endYear"
          label="Ano Final"
          value={endYear}
          onChange={handleEndYearChange}
          placeholder="AAAA"
          maxLength="4"
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
          sx={{ marginLeft: '4px' }}
        />
        <TextField
          type="text"
          id="month"
          label="Mês"
          value={month}
          onChange={handleMonthChange}
          placeholder="MM"
          maxLength="2"
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
          sx={{ marginLeft: '4px' }}
        />
      </Box>
    )}

    <FormControl sx={{ minWidth: 200 }} size="small">
      <InputLabel id="demo-select-tempo-label" sx={{color: selectedTheme.text_primary}}>Intervalo de Tempo</InputLabel>
      <Select
        labelId="demo-select-tempo-label"
        id="controllable-states-tempo"
        value={tempo}
        label="Intervalo de Tempo"
        onChange={handleTempoChange}
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
        <MenuItem value="um_ano">Um Ano</MenuItem>
        <MenuItem value="varios_anos">Vários Anos</MenuItem>
      </Select>
    </FormControl>
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
          '& .MuiSelect-select': { color: selectedTheme.text_primary },
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
      </Select>
    </FormControl>

    <Button variant="contained" onClick={handleOptionSubmit}>
      Selecionar
    </Button>
        {/* Seção para exibir os dados */}
    {data && (
      <Box sx={{ marginTop: '20px', textAlign: 'center', color: selectedTheme.text_primary }}>
        <Typography variant="h6">Dados Retornados:</Typography>
        <pre>{JSON.stringify(data, null, 2)}</pre> {/* Exibe os dados formatados */}
      </Box>
    )}

    {loading && <CircularProgress color="secondary" size={24} />}
  </div>
  );
} 

export default ApiTempChuva;
