const express = require('express');

const server = express();

// Query params => ?teste=1
// Route params => /users/1
// Request body => { "name": "Diego", "email": "rocketseat@suporte.com.br" }

const users = ['Diego', 'Cláudio', 'Victor'];

server.get('/users/:index', (req, res) => {
  // const nome = req.query.nome;
  const { index } = req.params;

  return res.json(users[index]);
});

server.listen(3000);