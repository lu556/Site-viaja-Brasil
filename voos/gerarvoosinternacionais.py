import json
from datetime import datetime, timedelta
import random

# Função para gerar voos automaticamente
def gerar_voos(quantidade, origem, destino, data_inicial, preco_base):
    voos = []
    data_atual = datetime.strptime(data_inicial, "%Y-%m-%d")
    horario_base = 8  # Começa com voos às 08:00

    for i in range(quantidade):
        # Formatar data e horário
        data_formatada = data_atual.strftime("%Y-%m-%d")
        horario = f"{horario_base:02}:00"

        # Adicionar voo ao array
        voos.append({
            "id": i + 1,
            "origem": origem,
            "destino": destino,
            "data": data_formatada,
            "horario": horario,
            "preco": round(preco_base + random.uniform(0, 100), 2) # Preço variado para cada voo
        })

        # Incrementar o horário dos voos
        horario_base += 2
        if horario_base > 22:  # Se passar das 22:00, reinicia para 08:00 e passa para o próximo dia
            horario_base = 8
            data_atual += timedelta(days=1)
    
    return voos

# Listas de cidades e países para origens e destinos
cidades_brasil = [
    "São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte",
    "Curitiba"
]


cidades_internacionais = [
    "Nova York", "Londres", "Paris", "Tóquio", "Dubai", "Buenos Aires", "Madri",
    "Berlim", "Roma", "Lisboa", "Sydney", "Toronto", "Moscou", "Pequim", "Cidade do México",
    "Los Angeles", "São Francisco", "Chicago", "Las Vegas", "Miami", "Barcelona", "Amsterdã",
    "Copenhague", "Estocolmo", "Helsinque", "Viena", "Praga", "Budapeste", "Bruxelas",
    "Zurique", "Genebra", "Cairo", "Joanesburgo", "Nairobi", "Singapura", "Hong Kong",
    "Seul", "Bangkok", "Kuala Lumpur", "Manila", "Nova Délhi", "Mumbai", "Délhi",
    "Lima", "Santiago", "Caracas", "Bogotá", "Quito", "San José", "Havana", "Oslo",
    "Dublin", "Edimburgo", "Bruxelas", "Áustria", "Bratislava", "Riga", "Tallinn",
    "Vilnius", "Catania", "Nápoles", "Bucareste", "Doha", "Abu Dhabi", "Bangalore",
    "Helsinque", "San Francisco", "Malmö", "Oslo", "Catania", "Vancouver", "Seattle",
    "Atlanta", "Filadélfia", "Dallas", "Houston", "Phoenix", "Boston", "Cleveland",
    "São Petersburgo", "Tbilisi", "Baku", "Yerevan", "Ankara", "Tel Aviv", "Beirute",
    "Casablanca", "Túnis", "Algiers", "Lagos", "Accra", "Nairobi", "Kigali",
    "Auckland", "Wellington", "Suva", "Port Moresby", "Santiago", "La Paz", "Montevidéu",
    "Asunción", "Quito", "San Salvador", "Manágua", "Havana", "Tegucigalpa", "Caracas",
    "Kingston", "Georgetown", "Bridgetown"
]

# Lista para armazenar todos os voos
todos_voos = []

# Gerar 500 rotas com origens e destinos variados
for _ in range(100000):
    origem = random.choice(cidades_internacionais + cidades_brasil)
    destino = random.choice(cidades_brasil + cidades_internacionais )
    
    # Garantir que origem e destino não sejam iguais
    while destino == origem:
        destino = random.choice(cidades_brasil + cidades_internacionais)
    
    # Preço base variando conforme o tipo de rota
    preco_base = 200 if origem in cidades_brasil and destino in cidades_brasil else 700

    # Data inicial variando dentro de um período de 6 meses a partir de 2024-10-01
    meses_a_frente = random.randint(0, 6)
    dias_a_frente = random.randint(0, 30)
    data_inicial = (datetime(2024, 10, 1) + timedelta(days=meses_a_frente * 30 + dias_a_frente)).strftime("%Y-%m-%d")

    # Gerar voos com as características definidas
    voos_gerados = gerar_voos(
        quantidade=random.randint(1, 3),  # Cada rota terá entre 1 e 5 voos
        origem=origem,
        destino=destino,
        data_inicial=data_inicial,
        preco_base=preco_base
    )
    
    # Adicionar os voos gerados à lista total
    todos_voos.extend(voos_gerados)

# Convertendo a lista de voos para o formato de string JavaScript
voos_js_content = f"const voos = {json.dumps(todos_voos, indent=2)};"

# Salvando o conteúdo diretamente no arquivo voos.js
with open("voos.js", "w", encoding="utf-8") as file:
    file.write(voos_js_content)

print("Arquivo 'voos.js' gerado com sucesso e atualizado com 10000 rotas diferentes!")
