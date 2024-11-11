// Função de busca de voos
function buscarVoos(origemBusca, destinoBusca, mesBusca) {
    let resultados = voos.filter(voo => {
        // Comparação de origem e destino
        let condicaoOrigemDestino = voo.origem.toLowerCase() === origemBusca.toLowerCase() &&
                                    voo.destino.toLowerCase() === destinoBusca.toLowerCase();

        // Se o mês for especificado, inclui também a comparação de mês e ano
        if (mesBusca) {
            const [anoBusca, mesBuscaStr] = mesBusca.split('-');
            const dataVoo = new Date(voo.data);
            const anoVoo = dataVoo.getFullYear();
            const mesVoo = (dataVoo.getMonth() + 1).toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário
            
            return condicaoOrigemDestino && anoBusca === anoVoo.toString() && mesBuscaStr === mesVoo;
        }

        // Se o mês não for especificado, retorna apenas pela origem e destino
        return condicaoOrigemDestino;
    });

    return resultados;
}

// Função para exibir os resultados na página
function exibirResultados() {
    const origemInput = document.getElementById("origem").value;
    const destinoInput = document.getElementById("destino").value;
    const mesInput = document.getElementById("mes").value;

    // Chama a função de busca com os valores fornecidos
    const resultados = buscarVoos(origemInput, destinoInput, mesInput);

    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";

    if (resultados.length > 0) {
        resultados.forEach(voo => {
            const vooElement = document.createElement("div");
            vooElement.innerHTML = `
                <p><strong>Origem:</strong> ${voo.origem}</p>
                <p><strong>Destino:</strong> ${voo.destino}</p>
                <p><strong>Data:</strong> ${voo.data}</p>
                <p><strong>Horário:</strong> ${voo.horario}</p>
                <p><strong>Preço:</strong> R$${voo.preco.toFixed(2)}</p>
                <button onclick="comprarPassagem('${voo.origem}', '${voo.destino}', '${voo.data}', ${voo.preco})">Compre sua passagem</button>
                <hr>
            `;
            resultadosDiv.appendChild(vooElement);
        });
    } else {
        resultadosDiv.innerHTML = "<p>Nenhum voo encontrado.</p>";
    }
}

// Função de compra de passagem
function comprarPassagem(origem, destino, data, preco) {
    // Redireciona para a página de pagamento com os detalhes do voo na URL
    window.location.href = `PaginaPagamento.html?origem=${encodeURIComponent(origem)}&destino=${encodeURIComponent(destino)}&data=${encodeURIComponent(data)}&preco=${preco}`;
}

// cidades.js

// cidades.js

// Lista de cidades do Brasil e internacionais
const cidades_brasil = [
    "São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Curitiba"
];

const cidades_internacionais = [
    "Nova York", "Londres", "Paris", "Tóquio", "Dubai", "Buenos Aires", "Madri", "Berlim", "Roma",
    "Lisboa", "Sydney", "Toronto", "Moscou", "Pequim", "Cidade do México", "Los Angeles",
    "São Francisco", "Chicago", "Las Vegas", "Miami", "Barcelona", "Amsterdã", "Copenhague",
    "Estocolmo", "Helsinque", "Viena", "Praga", "Budapeste", "Bruxelas", "Zurique", "Genebra",
    "Cairo", "Joanesburgo", "Nairobi", "Singapura", "Hong Kong", "Seul", "Bangkok", "Kuala Lumpur",
    "Manila", "Nova Délhi", "Mumbai", "Délhi", "Lima", "Caracas", "Bogotá",
    "San José", "Havana", "Oslo", "Dublin", "Edimburgo", "Áustria", "Bratislava", 
    "Riga", "Tallinn", "Vilnius", "Nápoles", "Bucareste", "Doha", "Abu Dhabi", 
    "Bangalore", "San Francisco", "Malmö", "Catania", "Vancouver", 
    "Seattle", "Atlanta", "Filadélfia", "Dallas", "Houston", "Phoenix", "Boston", "Cleveland", 
    "São Petersburgo", "Tbilisi", "Baku", "Yerevan", "Ankara", "Tel Aviv", "Beirute", 
    "Casablanca", "Túnis", "Algiers", "Lagos", "Accra", "Kigali", "Auckland", 
    "Wellington", "Suva", "Port Moresby", "Santiago", "La Paz", "Montevidéu", "Asunción", 
    "Quito", "San Salvador", "Manágua", "Tegucigalpa", "Kingston", 
    "Georgetown", "Bridgetown"
];

// Função para filtrar e exibir sugestões
function filtrarSugestoes(valor, idSugestoes) {
    const sugestõesDiv = document.getElementById(idSugestoes);
    sugestõesDiv.innerHTML = ""; // Limpa sugestões anteriores
    sugestõesDiv.style.display = "none"; // Esconde as sugestões inicialmente

    if (valor.length === 0) return; // Não faz nada se o campo estiver vazio

    // Filtra as cidades que contêm o valor digitado
    const todasCidades = [...cidades_brasil, ...cidades_internacionais];
    const cidadesFiltradas = todasCidades.filter(cidade => cidade.toLowerCase().includes(valor.toLowerCase())).slice(0, 5);

    // Adiciona as sugestões filtradas ao div
    if (cidadesFiltradas.length > 0) {
        cidadesFiltradas.forEach(cidade => {
            const divItem = document.createElement("div");
            divItem.classList.add("suggestion-item");
            divItem.textContent = cidade;

            // Ação ao clicar em uma sugestão
            divItem.onclick = () => {
                document.getElementById(idSugestoes).style.display = "none"; // Esconde a lista após a seleção
                document.getElementById(idSugestoes === 'sugestoesOrigem' ? 'origem' : 'destino').value = cidade; // Preenche o campo correspondente
            };

            sugestõesDiv.appendChild(divItem);
        });

        sugestõesDiv.style.display = "block"; // Exibe as sugestões
    }
}

// Função para preencher o datalist (pode ser mantida se necessário)
function preencherDatalist() {
    // Se ainda quiser preencher o datalist, mantenha esta função
}

// Chama a função quando a página é carregada (não é mais necessário)
document.addEventListener("DOMContentLoaded", preencherDatalist);

// Chama a função quando a página é carregada
document.addEventListener("DOMContentLoaded", preencherDatalist);
