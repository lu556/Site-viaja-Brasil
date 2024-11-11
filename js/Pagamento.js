document.getElementById('payment-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const method = document.getElementById('payment-method').value;
    const email = document.getElementById('email').value;
    const successMessage = document.getElementById('success-message');
    const paymentResult = document.getElementById('payment-result');
    let resultMessage = `Método de pagamento: ${method}<br>E-mail: ${email}<br>Valor: R$ 3.500,00`;

    // Prepare os dados da compra
    const params = getQueryParams();
    const compra = {
        usuario: email,
        origem: params.origem,
        destino: params.destino,
        data: params.data,
        preco: params.preco,
        nome: document.getElementById('name').value,
        numeroCartao: method === 'cartao' ? document.getElementById('card-number').value : null // Somente se o método for cartão
    };

    if (method === 'pix') {
        const pixKey = document.getElementById('pix-key').value;
        resultMessage += `<br>Chave Pix: ${pixKey}<br>QR Code gerado para pagamento Pix.`;
        compra.chavePix = pixKey; // Adicione a chave Pix à compra
    } else {
        const cardNumber = document.getElementById('card-number').value;
        const name = document.getElementById('name').value;
        const expiration = document.getElementById('expiration').value;
        resultMessage += `<br>Nome no cartão: ${name}<br>Número do cartão: ${cardNumber}<br>Data de validade: ${expiration}`;
    }

    // Salvar compra no servidor
    const response = await fetch('/salvarCompra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(compra)
    });

    if (response.ok) {
        paymentResult.innerHTML = resultMessage; // Exibir o resultado do pagamento
        successMessage.style.display = 'block'; // Mostrar mensagem de sucesso
        
        // Redireciona para a página de resultados após 2 segundos
        setTimeout(() => {
            window.location.href = '../html/sucesso.html'; // Substitua pelo caminho da sua página de resultados
        }, 2000); // Espera 2 segundos antes do redirecionamento
    } else {
        // Trate o erro caso a compra não seja bem-sucedida
        const errorData = await response.json();
        paymentResult.innerText = `Erro: ${errorData.message}`; // Exibir mensagem de erro
    }
});

// Função para obter parâmetros da URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split("&");

    pairs.forEach(pair => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    return params;
}

// Função para exibir detalhes do voo
function exibirDetalhesDoVoo() {
    const params = getQueryParams();
    document.getElementById("origem").innerText = `Origem: ${params.origem}`;
    document.getElementById("destino").innerText = `Destino: ${params.destino}`;
    document.getElementById("data").innerText = `Data: ${params.data}`;
    document.getElementById("preco").innerText = `Preço: R$${parseFloat(params.preco).toFixed(2)}`;
}

// Chama a função para exibir os detalhes do voo ao carregar a página
window.onload = function() {
    exibirDetalhesDoVoo();
};
