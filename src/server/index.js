const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const lodashId = require('lodash-id');

const adapter = new FileSync('db.json');
const db = low(adapter);

db._.mixin(lodashId);
db.defaults({ nodes: [], links: [] }).write();

const app = express();

app.use(express.static('dist'));
app.use(express.json());

app.get('/api/data', (req, res) => {
  const nodes = db.get('nodes').value();
  const links = db.get('links').value();

  res.send({ nodes, links });
});

app.post('/api/node', (req, res) => {
  console.log('post node req.body', req.body);

  const collection = db.defaults({ nodes: [] }).get('nodes');

  collection.insert({ ...req.body, x: 100, y: 100 }).write();

  const nodes = db.get('nodes').value();
  const links = db.get('links').value();

  res.send({ result: 'ok', data: { nodes, links } });
});

app.post('/api/link', (req, res) => {
  console.log('post link req.body', req.body);

  const collection = db.defaults({ links: [] }).get('links');

  collection.insert({ ...req.body }).write();

  const nodes = db.get('nodes').value();
  const links = db.get('links').value();

  res.send({ result: 'ok', data: { nodes, links } });
});

app.put('/api/node', (req, res) => {
  console.log('put node req.body', req.body);

  const {
    id, icon, label, x, y
  } = req.body;

  db.get('nodes')
    .find({ id })
    .assign({
      icon, label, x, y
    })
    .write();

  const nodes = db.get('nodes').value();
  const links = db.get('links').value();

  res.send({ result: 'ok', data: { nodes, links } });
});

app.listen(process.env.PORT || 8888, () => console.log(`Listening on port ${process.env.PORT || 8888}!`));
