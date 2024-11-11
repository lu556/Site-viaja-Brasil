// Função de logout
function logout() {
    // Remove os dados de login do localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId"); // Opcional, se estiver armazenando o ID do usuário

    // Redireciona para a página de login
    window.location.href = "../html/Login.html";
}

// Adiciona evento ao botão de logout
document.getElementById("logout-button").addEventListener("click", logout);
