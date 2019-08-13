const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;


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

app.post('/save_score', () => {
  console.log('Request receive');
});
