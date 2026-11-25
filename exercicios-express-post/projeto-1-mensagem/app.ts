// Importa o framework Express e os tipos usados nas requisições e respostas.
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3001;

// Permite que o servidor leia dados enviados no formato JSON.
app.use(express.json());

// Rota responsável por receber os dados e montar a mensagem.
app.post('/mensagem', (req: Request, res: Response) => {
    try {
    // Extrai nome, idade e time favorito do corpo da requisição.
    const { nome, idade, timeFavorito } = req.body;

    // Verifica se todos os campos obrigatórios foram enviados.
    if (!nome || idade === undefined || !timeFavorito) {
return res.status(400).json({
        erro: 'Todos os campos são obrigatórios: nome, idade e timeFavorito.'
    });
    }

    // Monta a frase usando os valores recebidos pelo cliente.
    const frase = `Olá, ${nome}! Você tem ${idade} anos e torce para o ${timeFavorito}!`;

    return res.status(200).json({ mensagem: frase });
    } catch (error) {
    // Trata qualquer erro inesperado ocorrido durante o processamento.
    const mensagemErro = error instanceof Error ? error.message : 'Erro desconhecido.';
    return res.status(500).json({
    erro: 'Erro interno ao processar a requisição.',
    detalhes: mensagemErro
    });
    }
});

// Captura erros de sintaxe JSON enviados pelo cliente.
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'status' in err && err.status === 400) {
    return res.status(400).json({ erro: 'JSON inválido enviado no corpo da requisição.' });
    }

    next(err);
});

// Coloca o servidor em funcionamento na porta definida.
app.listen(PORT, () => {
    console.log(`Projeto 1 rodando em http://localhost:${PORT}`);
});
