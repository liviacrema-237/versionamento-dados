// Importa o framework Express e os tipos usados nas requisições e respostas.
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3002;

// Ativa a leitura automática de dados enviados em JSON.
app.use(express.json());

// Rota que recebe três números e calcula a soma.
app.post('/soma', (req: Request, res: Response) => {
  try {
    const { num1, num2, num3 } = req.body;
    const problemas: string[] = [];

    // Verifica se cada campo possui um número válido.
    if (typeof num1 !== 'number' || Number.isNaN(num1)) {
      problemas.push('O campo "num1" deve ser um valor numérico válido.');
    }
    if (typeof num2 !== 'number' || Number.isNaN(num2)) {
      problemas.push('O campo "num2" deve ser um valor numérico válido.');
    }
    if (typeof num3 !== 'number' || Number.isNaN(num3)) {
      problemas.push('O campo "num3" deve ser um valor numérico válido.');
    }

    // Retorna todos os problemas encontrados com status 400.
    if (problemas.length > 0) {
      return res.status(400).json({
        erro: 'Dados inválidos na requisição.',
        problemas
      });
    }

    // Calcula a soma após a validação dos dados.
    const resultado = num1 + num2 + num3;

    return res.status(200).json({
      numeros: [num1, num2, num3],
      soma: resultado
    });
  } catch (error) {
    const mensagemErro = error instanceof Error ? error.message : 'Erro desconhecido.';
    return res.status(500).json({
      erro: 'Erro interno ao calcular a soma.',
      detalhes: mensagemErro
    });
  }
});

// Trata JSON malformado enviado pelo cliente.
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400) {
    return res.status(400).json({ erro: 'JSON inválido enviado no corpo da requisição.' });
  }

  next(err);
});

// Inicia o servidor na porta 3002.
app.listen(PORT, () => {
  console.log(`Projeto 2 rodando em http://localhost:${PORT}`);
});
