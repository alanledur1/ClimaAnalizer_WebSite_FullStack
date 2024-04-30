#Importei pandas, datetime e matplotlib para o vs code, salvei o arquivo csv na mesma pasta onde foi criado o código em python

from flask import Flask, jsonify, request
import csv
from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt

app = Flask(__name__)

#Função para ler os dados do arquivo CSV
def ler_aquivoMet_csv():
    dados = [] 
    with open("backend/Anexo_Arquivo_Dados_Projeto_Logica_e_programacao_de_computadores.csv", "r") as arquivo:
        leitor_csv = csv.DictReader(arquivo)
        for linha in leitor_csv:
            dados.append(dict(linha))
    return dados

meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', # Lista com os nomes dos meses.
          'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

def validar_data(data): # Validar a entrada das datas.
    try:
        datetime.strptime(data, "%d/%m/%Y")
        return True
    except ValueError:
        return False

# Endpoint para visualizar intervalo de dados em modo texto
@app.route('/api/visualizar-dados', methods=['POST'])
def visualizar_dados():
    data = request.json
    tipo_dados = request.json['tipo_dados']
    data_inicial = data.get('data_inicial')
    data_final = data.get('data_final')

    if tipo_dados not in ['todos_os_dados', 'precipitacao', 'temperatura', 'umidade_velocidade']:
        return jsonify({'error': 'Tipo de dados inválido. Escolha um dos seguintes tipos: todos os dados, precipitacao, temperatura, umidade e velocidade do vento.'}), 400

    if not all([data_inicial, data_final]) or not all(map(validar_data, [data_inicial, data_final])):
        return jsonify({'error': 'Datas inválidas. Certifique-se de elas estão no formato DD/MM/AAAA.'}), 400     
    
    # Ler os dados do arquivo CSV
    dados = ler_aquivoMet_csv()

    # Lógica de filtragem de dados e geração de resposta
    response_data = []


    for dado in dados:
        data_dado = datetime.strptime(dado['data'], '%d/%m/%Y')
        if data_dado >= datetime.strptime(data_inicial, '%d/%m/%Y') and data_dado <= datetime.strptime(data_final, '%d/%m/%Y'):
            if tipo_dados == 'todos_os_dados':
                response_data.append({
                    'data' : dado['data'],
                    'precipitacao' : str(dado['precip']) + 'mm',
                    'temperatura_maxima' : str(dado['maxima']) + '°C',
                    'temperatura_minima' : str(dado['minima']) + '°C',
                    'umidade' : str(dado['um_relativa']) + '%',
                    'velocidade_vento' : str(round(float(dado['vel_vento']), 2)) + ' m/s'
                })
            elif tipo_dados == 'precipitacao':
                response_data.append({
                    'data': dado['data'],
                    'precipitacao' : str(dado['precip']) + 'mm'
                })
            elif tipo_dados == 'temperatura':
                response_data.append({
                    'data' : dado['data'],
                    'temperatura_maxima' : dado['maxima'] + '°C',
                    'temperatura_minima' : dado['minima'] + '°C'
                })
            elif tipo_dados == 'umidade_velocidade':
                response_data.append({
                        'data' : dado['data'],
                        'umidade' : str(dado['um_relativa']) + '%',
                        'velocidade_vento' : str(round(float(dado['vel_vento']), 2)) + ' m/s'
                    })
                print(response_data)  # Adicione esta linha para verificar os dados antes de enviá-los

    return jsonify({'message': 'Sucesso', 'dados': response_data}), 200


# Endpoint para obter o mês menos chuvoso
@app.route('/api/mes-menos-chuvoso', methods=['POST'])
def mes_menos_chuvoso():
    data = request.json
    tipo_dados = request.json['tipo_dados']
    data_inicial = data.get('data_inicial')
    data_final = data.get('data_final')


    if tipo_dados not in ['todos_os_dados', 'mes_mais_chuvoso', 'mes_menos_chuvoso','dia_mais_chuvoso_no_ano','dia_mais_chuvoso_no_mes','dia_menos_chuvoso_no_mes','dia_menos_chuvoso_no_ano']:
        return jsonify({'error': 'Tipo de dados inválido. Escolha um dos seguintes tipos: todos os dados,'}), 400

    if not all([data_inicial, data_final]) or not all(map(validar_data, [data_inicial, data_final])):
        return jsonify({'error': 'Datas inválidas. Certifique-se de elas estão no formato DD/MM/AAAA.'}), 400     
    
    # Ler os dados do arquivo CSV
    
    dados = ler_aquivoMet_csv()

    # Dicionário para armazenar a precipitação total para cada mês e dia.
    precipitacao_por_mes = {}
    precipitacao_por_dia = {}
    
    for dado in dados:
        # Extrai o mês e o ano da data.
        mes_ano = dado['data'][3:]

        # Adiciona a precipitação ao total para o mês.
        if mes_ano in precipitacao_por_mes:
            precipitacao_por_mes[mes_ano] += float(dado['precip'])
        else:
            precipitacao_por_mes[mes_ano] = float(dado['precip'])

    # Encontra o mês com a menor precipitação.
    mes_menos_chuvoso = min(precipitacao_por_mes, key=precipitacao_por_mes.get)

    # Constrói a resposta JSON
    resposta = {
        'mensagem': f'O mês/ano menos chuvoso foi {mes_menos_chuvoso} com {precipitacao_por_mes[mes_menos_chuvoso]} mm de precipitação.'
    }

    return jsonify(resposta) 


# Endpoint para calcular a média da temperatura mínima de um determinado mês nos últimos 11 anos
@app.route('/api/media-temperatura-minima', methods=['POST'])
def media_temperatura_minima():
    # Obter o mês do corpo da solicitação
    mes = int(request.json['mes'])

    if mes < 1 or mes > 12:
        return jsonify({'error': 'Mês inválido. O valor do mês deve estar entre 1 e 12.'}), 400


    # Ler os dados do arquivo CSV
    dados = ler_aquivoMet_csv()

    # Chamar a função para calcular a média da temperatura mínima
    resposta = calcular_media_temperatura_minima(dados, mes)

    return jsonify(resposta)

def calcular_media_temperatura_minima(dados, mes):

    # Dicionário para armazenar a temperatura mínima para cada ano.
    temp_minima_por_ano = {}

    for dado in dados:
        # Extrai o ano e o mês da data.
        ano = int(dado['data'][6:])
        mes_dado = int(dado['data'][3:5])

        # Verifica se o dado é do mês desejado e está no intervalo de anos.
        if mes_dado and 2006 <= ano <=2016:
            # Adiciona a temperatura mínima ao total para o ano.
            if ano in temp_minima_por_ano:
                temp_minima_por_ano[ano].append(float(dado['minima']))
            else:
                temp_minima_por_ano[ano] = [float(dado['minima'])]

    # Calcula a média da temperatura mínima para cada ano.  
    medias = {ano: sum(temps) / len(temps) for ano, temps in temp_minima_por_ano.items()}

    
    # Calcula a média geral da temperatura mínima para todos os anos.
    media_geral = sum(medias.values()) / len(medias)
    
    # Converter o número do mês para nome do mês.
    nome_mes = meses[mes - 1]  # Subtrai 1 porque os índices da lista começam em 0.

    # Construir a resposta JSON com as médias
    resposta = {
        'media_por_ano': {f"{nome_mes}/{ano}": media for ano, media in medias.items()},
        'media_geral': f"A média geral da temperatura mínima de {nome_mes}/2006 a {nome_mes}/2016 foi {media_geral:.2f} °C"
    } 

    return resposta



# Endpoint para gerar gráfico de barras das médias de temperatura mínima de um mês
@app.route('/api/gerar-grafico', methods=['POST'])
def calcular_e_graficar_temperatura_minima():

    # Obter o mês do corpo da solicitação 
    mes = int(request.json['mes'])

    # Ler os dados do arquivo CSV
    dados = ler_aquivoMet_csv()

    # Dicionário para armazenar as médias de temperatura mínima para cada ano
    medias = calcular_media_temperatura_minima(dados, mes)

    # As chaves do dicionário (os anos) são extraídas e convertidas em uma lista
    anos = list(medias.keys())

    # Os valores do dicionário (as médias de temperatura mínima) são extraídos e convertidos em uma lista.
    medias_valores = list(medias.values())

    # Um gráfico de barras é criado usando a biblioteca matplotlib.
    plt.bar(anos, medias_valores)

    # O eixo x é rotulado como 'Ano'.
    plt.xlabel('Ano')

    # O eixo y é rotulado como 'Temperatura Mínima Média (°C)'.
    plt.ylabel('Temperatura Mínima Média (°C)')

    # O título do gráfico é definido como 'Média da Temperatura Mínima em {meses[mes-1]} de 2006 a 2016'.
    plt.title(f'Média da Temperatura Mínima em {meses[mes - 1]} de 2006 a 2016')

    # Salvar o gráfico em um arquivo
    caminho_do_arquivo = f"grafico_{mes}.png"
    plt.savefig(caminho_do_arquivo)

    # Fechar o gráfico para liberar recursos
    plt.close()

    # Retornar o caminho do arquivo na resposta JSON
    return jsonify({'grafico': caminho_do_arquivo})


dados_climaticos = ler_aquivoMet_csv() # Carregar os dados do arquivo CSV.

if __name__ == '__main__':
    app.run(debug=True)

