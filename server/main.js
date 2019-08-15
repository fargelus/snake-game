const express = require('express');
const bodyParser = require('body-parser')
const Model = require('./model.js');


const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`We are living in the yellow ${port}`);
});

app.use(bodyParser.json());
app.use(express.static('./public'));

app.get('/', (res) => {
  res.sendFile('index.html');
});

const scoreModel = new Model();
app.post('/save_score', (req, res) => {
  const data = req.body;
  const isData = Object.keys(data).length;
  const responsed = {};
  if (isData) {
    scoreModel.insertDocument(data);
    responsed.status = 'success';
  }
  res.json(responsed);
});
