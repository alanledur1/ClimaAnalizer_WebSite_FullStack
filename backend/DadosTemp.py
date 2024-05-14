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

# Função para validar o formato da data
def validar_data(data): 
    try:
        datetime.strptime(data, "%d/%m/%Y")
        return True
    except ValueError:
        return False


# Função para calcular a precipitação do mês 
def calcular_precipitação_por_mês_e_dia(dados, data_inicial, data_final): 
    precipitacao_por_mes = {}
    precipitacao_por_dia_do_mes = {}


    for dado in dados:
        data_dado = datetime.strptime(dado['data'], '%d/%m/%Y')

        if data_dado >= datetime.strptime(data_inicial, '%d/%m/%Y') and \
           data_dado <= datetime.strptime(data_final, '%d/%m/%Y'):
            
            dia_do_mes = data_dado.day

            if dia_do_mes in precipitacao_por_dia_do_mes:
                precipitacao_por_dia_do_mes[dia_do_mes] += float(dado['precip'])
            else:
                precipitacao_por_dia_do_mes[dia_do_mes] = float(dado['precip'])

            mes_do_ano = data_dado.strftime('%m/%Y')

            if mes_do_ano in precipitacao_por_mes:
                precipitacao_por_mes[mes_do_ano] += float(dado['precip'])
            else:    
                precipitacao_por_mes[mes_do_ano] = float(dado['precip'])

    return precipitacao_por_dia_do_mes, precipitacao_por_mes


# Função para calcular o mês e o dia mais chuvoso com base em todos os dados
def calcular_mes_dia_mais_chuvoso(dados, data_inicial, data_final):
    precipitacao_por_mes, precipitacao_por_dia_do_mes = calcular_precipitação_por_mês_e_dia(dados, data_inicial, data_final)

    dia_mais_chuvoso = max(precipitacao_por_dia_do_mes, key=precipitacao_por_dia_do_mes.get)
    mes_mais_chuvoso = max(precipitacao_por_mes, key=precipitacao_por_mes.get)
    return dia_mais_chuvoso, mes_mais_chuvoso

# Função para calcular o mês e o dia menos chuvoso com base em todos os dados
def calcular_mes_dia_menos_chuvoso(dados, data_inicial, data_final):
    precipitacao_por_mes, precipitacao_por_dia_do_mes = calcular_precipitação_por_mês_e_dia(dados, data_inicial, data_final)

    dia_menos_chuvoso = min(precipitacao_por_dia_do_mes, key=precipitacao_por_dia_do_mes.get)
    mes_menos_chuvoso = min(precipitacao_por_mes, key=precipitacao_por_mes.get)
    return dia_menos_chuvoso, mes_menos_chuvoso

# Função para gerar o gráfico de barras das médias de temperatura mínima de um mês
def gerar_grafico_temperatura_minima(mes):
    # Implementação da função aqui
    pass

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
# Endpoint para obter o mês/dia menos/mais chuvoso
@app.route('/api/mes-dia-chuvoso', methods=['POST'])
def mes_menos_e_mais_chuvoso():
    # Extrair os dados da requisição JSON
    data = request.json
    tipo_dados = request.json['tipo_dados']
    data_inicial = data.get('data_inicial')
    data_final = data.get('data_final')
    ano_inicial = data.get('ano_inicial')
    ano_final = data.get('ano_final')
    mes = data.get('mes')
    intervalo_tempo = data.get('intervalo_tempo')

    # Ler os dados do arquivo CSV
    dados = ler_aquivoMet_csv()

    # Lógica de filtragem de dados e geração de resposta
    response_data = []


    # Verificar a validade dos dados
    if intervalo_tempo not in ['um_ano', 'varios_anos']:
        return jsonify({'error': 'Intervalo de tempo inválido. Escolha um dos seguintes intervalos: todos os dados, um ano, varios_anos'}), 400

    if tipo_dados not in ['todos_os_dados', 'precipitacao', 'temperatura', 'umidade_velocidade']:
        return jsonify({'error': 'Tipo de dados inválido. Escolha um dos seguintes tipos: todos os dados, precipitacao, temperatura, umidade e velocidade do vento.'}), 400

    if intervalo_tempo == 'um_ano':
        if not all([data_inicial, data_final]) or not all(map(validar_data, [data_inicial, data_final])):
            return jsonify({'error': 'Datas inválidas. Certifique-se de elas estão no formato DD/MM/AAAA.'}), 400 


    # Filtrar os dados pelo intervalo de datas especificado
    dados_filtrados = []
    for dado in dados:
        data_dado = datetime.strptime(dado['data'], '%d/%m/%Y')
        if intervalo_tempo == 'um_ano':
            if data_dado >= datetime.strptime(data_inicial, '%d/%m/%Y') and\
            data_dado <= datetime.strptime(data_final, '%d/%m/%Y'):
                dados_filtrados.append(dado)
        elif intervalo_tempo == 'varios_anos':
            if data_dado.year >= ano_inicial and data_dado.year <= ano_final and data_dado.month == mes:
                dados_filtrados.append(dado)   


    # Determinar se é para calcular para um ano ou para um mês específico em vários anos
    if intervalo_tempo == 'um_ano':
        dia_mais_chuvoso, mes_mais_chuvoso, data_mais_chuvoso, precipitacao_dia_mais, precipitacao_mes_mais = calcular_mes_dia_mais_chuvoso(dados_filtrados, data_inicial, data_final)
        dia_menos_chuvoso, mes_menos_chuvoso, data_menos_chuvoso, precipitacao_dia_menos, precipitacao_mes_menos = calcular_mes_dia_menos_chuvoso(dados_filtrados, data_inicial, data_final)
        if tipo_dados == 'todos_os_dados':
            response_data.append({
                'mes_mais_chuvoso': mes_mais_chuvoso, 
                'dia_mais_chuvoso': dia_mais_chuvoso,
                'precipitacao_para_o_dia': str(round(precipitacao_dia_mais, 2)) + 'mm',
                'precipitacao_para_o_mes': str(round(precipitacao_mes_mais, 2)) + 'mm',
                'data_completa_mais_chuvoso': data_mais_chuvoso
            })
            response_data.append({
                'mes_menos_chuvoso': mes_menos_chuvoso, 
                'dia_menos_chuvoso': dia_menos_chuvoso,
                'precipitacao_para_o_dia': str(round(precipitacao_dia_menos, 2)) + 'mm',
                'precipitacao_para_o_mes': str(round(precipitacao_mes_menos, 2)) + 'mm',
                'data_completa_menos_chuvoso': data_menos_chuvoso
            })
        elif tipo_dados == 'mes_dia_mais_chuvoso':
            response_data.append({
                'mes_mais_chuvoso': mes_mais_chuvoso, 
                'dia_mais_chuvoso': dia_mais_chuvoso,
                'precipitacao_para_o_dia': str(round(precipitacao_dia_mais, 2)) + 'mm',
                'precipitacao_para_o_mes': str(round(precipitacao_mes_mais, 2)) + 'mm',
                'data_completa_mais_chuvoso': data_mais_chuvoso
            })
        elif tipo_dados == 'mes_dia_menos_chuvoso':
            response_data.append({
                'mes_menos_chuvoso': mes_menos_chuvoso, 
                'dia_menos_chuvoso': dia_menos_chuvoso,
                'precipitacao_para_o_dia': str(round(precipitacao_dia_menos, 2)) + 'mm',
                'precipitacao_para_o_mes': str(round(precipitacao_mes_menos, 2)) + 'mm',
                'data_completa_menos_chuvoso': data_menos_chuvoso
            })

    elif intervalo_tempo == 'varios_anos':   # Se os dados abrangem vários anos
        # Dicionário para armazenar a precipitação para cada ano.
        precipitacao_mes_escolhido_por_ano = {}

        for dado in dados:
            # Extrai o ano e o mês da data.
            ano = int(dado['data'][6:])
            precipitacao = float(dado['precip'])
            data_dado = datetime.strptime(dado['data'], '%d/%m/%Y') 

            # Se o mês do dado é o mês escolhido, adiciona a precipitação ao total para aquele ano.
            if ano >= int(ano_inicial) and ano <= int(ano_final) and data_dado.month == mes:
                    if ano in precipitacao_mes_escolhido_por_ano:
                        precipitacao_mes_escolhido_por_ano[ano] += precipitacao
                    else:
                        precipitacao_mes_escolhido_por_ano[ano] = precipitacao

        # Converter o número do mês para nome do mês.
        nome_mes = meses[mes - 1]  # Subtrai 1 porque os índices da lista começam em 0.

        # Construir a resposta JSON com as médias
        if tipo_dados == 'todos_os_dados':
            response_data = {
                'precipitacao_mes_escolhido_por_ano': {f"{nome_mes}/{ano}": precipitacao for ano, precipitacao in precipitacao_mes_escolhido_por_ano.items()}
            }

        


    return jsonify({'message': 'Sucesso', 'dados': response_data}), 200

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




if __name__ == '__main__':
    app.run(debug=True)

