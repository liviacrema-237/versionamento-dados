# Exercícios Express — POST

Três projetos Express separados:

- `projeto-1-mensagem`: rota `POST /mensagem` na porta 3001
- `projeto-2-soma`: rota `POST /soma` na porta 3002
- `projeto-3-login`: rota `POST /login` na porta 3003

## Instalação

Execute o comando em cada projeto:

```bash
cd projeto-1-mensagem
npm install
npm start
```

Repita para os projetos 2 e 3.

## Testes rápidos

```bash
curl -X POST http://localhost:3001/mensagem -H "Content-Type: application/json" -d "{\"nome\":\"Carlos\",\"idade\":18,\"timeFavorito\":\"Real Madrid\"}"
curl -X POST http://localhost:3002/soma -H "Content-Type: application/json" -d "{\"num1\":10,\"num2\":25,\"num3\":5}"
curl -X POST http://localhost:3003/login -H "Content-Type: application/json" -d "{\"usuario\":\"admin\",\"senha\":\"123456\"}"
```
