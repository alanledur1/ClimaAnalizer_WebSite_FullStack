import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

const Button = styled.button`
    padding: 5px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 35px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #0056b3;
    }
    &:active {
        background-color: #004494;
    }
    @media screen and (max-width: 640) {
        padding: 3px 10px;
        font-size: 14px;
    }
    @media screen and (max-width: 600px) {
        padding: 3px 10px;
        font-size: 14px;
    }
    @media screen and (max-width: 378px) {
            margin-top: 10px;
        font-size: 12px;
    }
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    @media screen and (max-width: 600px) {
        padding: 3px 10px;
        font-size: 14px;
    }
    @media screen and (max-width: 378px) {
        font-size: 12px;
        margin: 0;
    }
`;

function ApiResultClima({ onDataFetch}) {
    const [data, setData] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const handleOptionSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`https://climaanalizerserver.rj.r.appspot.com/api/clima/${city}`);
            setData(response.data);
            onDataFetch(response.data); 
        } catch (error) {
            console.error(error);
            setError('Não foi possível obter os dados. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer>
            <form onSubmit={handleOptionSubmit}>
                <Stack spacing={1}>
                    <Input
                        placeholder="Digite a cidade"
                        value={city}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit">
                        {loading ? 'Carregando...' : 'Consultar Clima'}
                    </Button>
                </Stack>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && <p>Aguarde, carregando os dados...</p>}
            {!loading && !error && !data && <p>Por favor, digite uma cidade e clique em "Consultar Clima".</p>}
        </FormContainer>
    );
}

export default ApiResultClima;
