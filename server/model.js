const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class Model {
  constructor() {
    this.url = 'mongodb://localhost:27017';
    this.dbName = 'snake';
    this.db;
  }

  insertDocument(document) {
    const that = this;
    MongoClient.connect(this.url, { useNewUrlParser: true }, (err, client) => {
      assert.equal(null, err);
      console.log('Connected successfully');

      that.db = client.db(that.dbName);
      that._createCollectionIfNotExist();
      that.db.collection('Scoreboard').insertOne(document, (err) => {
        if (err) throw err;
        console.log('Document inserted!');
      });
    });
  }

  _createCollectionIfNotExist() {
    const that = this;
    this.db.listCollections({name: 'Scoreboard'})
            .next((err, colinfo) => {
              if (!colinfo) {
                console.log('Collection info: ', colinfo);
                that.db.createCollection('Scoreboard', (err) => {
                  if (err) throw err;
                  console.log('Collection created');
                });
              }
            });
  }
}

module.exports = Model;
