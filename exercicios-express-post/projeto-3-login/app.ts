// Importa o framework Express e os módulos nativos necessários.
import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3003;

// Habilita o recebimento de dados enviados em JSON.
app.use(express.json());

// Rota responsável por autenticar usuário e senha.
app.post('/login', (req: Request, res: Response) => {
  try {
    const { usuario, senha } = req.body;

    // Verifica se os campos obrigatórios foram preenchidos.
    if (!usuario || !senha) {
      return res.status(400).json({
        erro: 'Os campos "usuario" e "senha" são obrigatórios.'
      });
    }

    // Monta o caminho do arquivo usuarios.json.
    const caminhoArquivo = path.join(__dirname, 'usuarios.json');

    // Lê o arquivo JSON e converte o conteúdo em uma lista JavaScript.
    const dadosBrutos = fs.readFileSync(caminhoArquivo, 'utf-8');
    const listaUsuarios = JSON.parse(dadosBrutos) as Array<{ usuario: string; senha: string }>;

    // Verifica se existe um usuário com a mesma senha informada.
    const usuarioValido = listaUsuarios.find(
      (item) => item.usuario === usuario && item.senha === senha
    );

    // Credenciais incorretas recebem o status HTTP 401.
    if (!usuarioValido) {
      return res.status(401).json({
        erro: 'Usuário ou senha incorretos.'
      });
    }

    return res.status(200).json({
      mensagem: `Login realizado com sucesso! Bem-vindo, ${usuario}.`
    });
  } catch (error) {
    const mensagemErro = error instanceof Error ? error.message : 'Erro desconhecido.';
    return res.status(500).json({
      erro: 'Erro interno ao processar o login ou ler o arquivo de usuários.',
      detalhes: mensagemErro
    });
  }
});

// Captura o envio de JSON com sintaxe inválida.
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400) {
    return res.status(400).json({ erro: 'JSON inválido enviado no corpo da requisição.' });
  }

  next(err);
});

// Inicia o servidor na porta 3003.
app.listen(PORT, () => {
  console.log(`Projeto 3 rodando em http://localhost:${PORT}`);
});
