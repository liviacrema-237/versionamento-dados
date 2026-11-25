const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('./server');

test('POST /mensagem cria a frase com os dados recebidos', async () => {
  const response = await request(app).post('/mensagem').send({
    nome: 'Carlos', idade: 18, timeFavorito: 'Real Madrid'
  });

  assert.equal(response.status, 200);
  assert.equal(response.body.mensagem, 'Olá, Carlos! Você tem 18 anos e torce para o Real Madrid!');
});

test('POST /mensagem retorna erro para dados ausentes', async () => {
  const response = await request(app).post('/mensagem').send({ nome: 'Carlos' });
  assert.equal(response.status, 400);
  assert.ok(response.body.erro);
});
