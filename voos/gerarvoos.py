import json
from datetime import datetime, timedelta

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
            "preco": preco_base + i * 10
        })

        # Incrementar o horário dos voos
        horario_base += 2
        if horario_base > 22:  # Se passar das 22:00, reinicia para 08:00 e passa para o próximo dia
            horario_base = 8
            data_atual += timedelta(days=1)
    
    return voos

# Gerar 50 voos de São Paulo para Rio de Janeiro a partir de 2024-10-10
voos_gerados = gerar_voos(50, "São Paulo", "Rio de Janeiro", "2024-10-10", 350.00)

# Convertendo a lista de voos para o formato de string JavaScript
voos_js_content = f"const voos = {json.dumps(voos_gerados, indent=2)};"

# Salvando o conteúdo diretamente no arquivo voos.js
with open("voos.js", "w", encoding="utf-8") as file:
    file.write(voos_js_content)

print("Arquivo 'voos.js' gerado com sucesso e atualizado diretamente!")
