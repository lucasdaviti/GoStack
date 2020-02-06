const express = require('express');

const server = express();

server.use(express.json());

const projectList = [];

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projectList.push(project);

  return res.json(project);
});

server.listen(3000);