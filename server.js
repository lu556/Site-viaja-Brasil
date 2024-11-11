const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt'); // Para criptografar a senha
const app = express();
const port = 3088;
const path = require('path');

// Middleware para processar JSON
app.use(express.json());

// Função para carregar os usuários do arquivo `users.txt`
function loadUsers() {
    try {
        const data = fs.readFileSync('users.txt', 'utf-8');
        return data.split('\n').map(line => {
            const [email, hashedPassword] = line.split(',');
            return { email, hashedPassword };
        }).filter(user => user.email && user.hashedPassword);
    } catch (err) {
        console.error("Erro ao carregar usuários:", err);
        return [];
    }
}

// Rota para processar o registro
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Verifica se o usuário já existe
    const users = loadUsers();
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ success: false, message: 'Usuário já existe.' });
    }

    // Criptografando a senha
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao criptografar a senha.' });
        }

        // Salvando os dados no arquivo users.txt
        const userData = `${email},${hashedPassword}\n`;
        fs.appendFile('users.txt', userData, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Erro ao salvar os dados.' });
            }

            return res.json({ success: true, message: 'Usuário registrado com sucesso!' });
        });
    });
});

app.post('/salvarCompra', (req, res) => {
    const compra = req.body;

    // Criando a string que será salva no arquivo
    const compraData = `Usuário: ${compra.usuario}\nOrigem: ${compra.origem}\nDestino: ${compra.destino}\nData: ${compra.data}\nPreço: R$${compra.preco}\nNome no Cartão: ${compra.nome}\nNúmero do Cartão: ${compra.numeroCartao || 'Não informado'}\nChave Pix: ${compra.chavePix || 'Não informado'}\n\n`;

    // Caminho do arquivo
    const filePath = path.join(__dirname, 'compras.txt');

    // Gravando a compra no arquivo
    fs.appendFile(filePath, compraData, (err) => {
        if (err) {
            console.error('Erro ao gravar a compra:', err);
            return res.status(500).json({ message: 'Erro ao salvar a compra.' });
        }
        
        // Enviar uma resposta de sucesso
        res.status(200).json({ message: 'Compra salva com sucesso!' });
    });
});

app.get('/minhas-compras/:userId', (req, res) => {
    const userId = req.params.userId;
    fs.readFile('compras.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo de compras.');
        }

        // Separar as compras usando duas linhas em branco como delimitador
        const compras = data.split('\n\n').map(compra => compra.trim()).filter(Boolean);
        const comprasUsuario = [];

        // Filtrar compras do usuário
        compras.forEach(compra => {
            const linhas = compra.split('\n');
            const compraObj = {};
            linhas.forEach(linha => {
                const [key, value] = linha.split(':').map(item => item.trim());
                if (key && value) {
                    compraObj[key] = value;
                }
            });

            // Verificar se o usuário é o mesmo
            if (compraObj['Usuário'] === userId) {
                comprasUsuario.push(compraObj);
            }
        });

        // Retornar as compras do usuário em formato JSON
        res.json(comprasUsuario);
    });
});

// Rota para processar o login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = loadUsers();

    // Verificar se o usuário existe e validar a senha
    const user = users.find(u => u.email === email);
    if (user) {
        // Comparando a senha enviada com a senha criptografada armazenada
        bcrypt.compare(password, user.hashedPassword, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
            }
            // Sucesso: Retorna um "userId" fictício para identificar o usuário logado
            return res.json({ success: true, userId: email });
        });
    } else {
        res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
    }
});

// Servindo os arquivos estáticos (HTML, CSS, etc.)
app.use(express.static(__dirname));

// Rota para o caminho '/'
app.get('/', (req, res) => {
    res.send('Servidor está funcionando corretamente!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

