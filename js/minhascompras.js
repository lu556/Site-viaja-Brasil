async function carregarCompras() {
    const userId = localStorage.getItem('userId'); // Pegue o ID do usuário no localStorage
    const response = await fetch(`/minhas-compras/${userId}`);
    
    if (response.ok) {
        const compras = await response.json();
        const listaCompras = document.getElementById('compras-list');
        
        if (compras.length === 0) {
            listaCompras.innerHTML = "<p>Nenhuma compra encontrada.</p>";
        } else {
            listaCompras.innerHTML = compras.map(compra => `
                <div class="compra-item">
                    <p><strong>Usuário:</strong> ${compra['Usuário']}</p>
                    <p><strong>Origem:</strong> ${compra['Origem']}</p>
                    <p><strong>Destino:</strong> ${compra['Destino']}</p>
                    <p><strong>Data:</strong> ${compra['Data']}</p>
                    <p><strong>Preço:</strong> ${compra['Preço']}</p>
                    <p><strong>Nome no Cartão:</strong> ${compra['Nome no Cartão']}</p>
                    <p><strong>Número do Cartão:</strong> ${compra['Número do Cartão']}</p>
                    <p><strong>Chave Pix:</strong> ${compra['Chave Pix']}</p>
                    <hr>
                </div>
            `).join('');
        }
    } else {
        console.error("Erro ao carregar as compras:", response.statusText);
    }
}

// Carrega as compras ao abrir a página
window.onload = carregarCompras;

// Função para carregar as compras do usuário (código original que você queria usar)
async function loadCompras() {
    const userId = localStorage.getItem('userId'); // Obtenha o userId do localStorage

    try {
        const response = await fetch(`/minhas-compras/${userId}`);
        if (!response.ok) throw new Error("Erro na resposta da rede.");
        
        const compras = await response.json();
        const comprasList = document.getElementById("compras-list");
        comprasList.innerHTML = ''; // Limpa a lista antes de adicionar novas compras

        if (compras.length === 0) {
            comprasList.innerHTML = "<p>Nenhuma compra encontrada.</p>";
        } else {
            compras.forEach(compra => {
                const compraItem = document.createElement("div");
                compraItem.classList.add("compra-item");

                compraItem.innerHTML = `
                    <p><strong>Usuário:</strong> ${compra['Usuário']}</p>
                    <p><strong>Origem:</strong> ${compra['Origem']}</p>
                    <p><strong>Destino:</strong> ${compra['Destino']}</p>
                    <p><strong>Data:</strong> ${compra['Data']}</p>
                    <p><strong>Preço:</strong> ${compra['Preço']}</p>
                    <p><strong>Nome no Cartão:</strong> ${compra['Nome no Cartão']}</p>
                    <p><strong>Número do Cartão:</strong> ${compra['Número do Cartão']}</p>
                    <p><strong>Chave Pix:</strong> ${compra['Chave Pix']}</p>
                `;
                comprasList.appendChild(compraItem);
            });
        }
    } catch (error) {
        console.error("Erro ao carregar as compras:", error);
    }
}

// Mova esta chamada para carregarCompras na janela.onload
