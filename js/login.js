// Função de login
async function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Autentica com o servidor
    const response = await fetch('/login', {  // '/login' é o endpoint do seu server.js
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok && result.success) {
        // Salva o token de usuário logado no localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", result.userId);  // Por exemplo, armazena o ID do usuário
        window.location.href = "../html/index.html";
    } else {
        document.getElementById("message").textContent = "Login inválido.";
    }
}

// Adiciona evento ao formulário
document.getElementById("login-form").addEventListener("submit", login);
