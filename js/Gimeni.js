const { GoogleGenerativeAI } = require('@google/generative-ai');

// Inicialize o Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyCWufTtEyW-F8Ftdgxp-LyeQwVKSXdl85A"); // Coloque sua chave da API

// Rota para comunicação com o chatbot
app.post('/api/chatbot', async (req, res) => {
    const { message } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(message);

        res.json({ reply: result.response.text() });
    } catch (error) {
        console.error('Erro ao comunicar com o chatbot:', error);
        res.status(500).json({ message: 'Erro ao comunicar com o chatbot.' });
    }
});
