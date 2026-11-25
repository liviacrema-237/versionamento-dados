const express = require('express');

const app = express();
app.use(express.json());

app.post('/mensagem', (req, res) => {
    const { nome, idade, timeFavorito } = req.body ?? {};

    if (!nome || idade === undefined || !timeFavorito) {
    return res.status(400).json({
    erro: 'Os campos nome, idade e timeFavorito são obrigatórios.'
    });
    }

    if (typeof nome !== 'string' || typeof timeFavorito !== 'string') {
    return res.status(400).json({
    erro: 'Os campos nome e timeFavorito devem ser textos.'
    });
    }

    const idadeNumero = Number(idade);
    if (!Number.isInteger(idadeNumero) || idadeNumero < 0) {
    return res.status(400).json({
    erro: 'O campo idade deve ser um número inteiro não negativo.'
    });
    }

    return res.status(200).json({
    mensagem: `Olá, ${nome}! Você tem ${idadeNumero} anos e torce para o ${timeFavorito}!`
    });
});

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ erro: 'JSON enviado no corpo da requisição é inválido.' });
    }
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
});

if (require.main === module) {
    const port = process.env.PORT || 3001;
    app.listen(port, () => console.log(`Servidor /mensagem executando na porta ${port}`));
}

module.exports = app;
