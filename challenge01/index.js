const express = require('express');

const server = express();

server.use(express.json());

const projectList = [];

server.use ((req, res, next) => {
  
  console.count("Request counter");

  next();
});

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const projectExists = projectList.find(p => p.id == id);
  if (!projectExists) {
    return res.status(400).json({ error: 'Project does not exists.' });
  }

  return next();
}

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

server.get('/projects', (req, res) => {
  return res.json(projectList);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const searchedProject = projectList.find(p => p.id == id);

  searchedProject.title = title;

  return res.json(searchedProject);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projectList.findIndex(p => p.id == id);

  projectList.splice(projectIndex, 1);

  return res.status(200).json({ message: 'Project deleted succeed!' });
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const searchedProject = projectList.find(p => p.id == id);

  searchedProject.tasks.push(title);

  return res.json(searchedProject);
});

server.listen(3000);
