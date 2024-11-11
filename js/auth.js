window.addEventListener("load", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        // Redireciona para a página de login se o usuário não estiver logado
        window.location.href = "Login.html";
    } else {
        console.log("Usuário está logado.");
    }
});