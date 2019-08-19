const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


class Model {
  constructor() {
    this._url = 'mongodb://localhost:27017';
    this._dbName = 'snake';
    this._db;
    this._collection = 'Scoreboard';
    this._collectionData;
    this._fetchAllDataInCollection();
  }

  _fetchAllDataInCollection() {
    const that = this;
    this._connect((client) => {
      that._db = client.db(that._dbName);
      that._db.collection(that._collection)
             .find({})
             .toArray((err, res) => {
               if (err) throw(err);
               console.log(`select all documents in collection ${that._collection}`);
               that._collectionData = res;
             });
    });
  }

  _connect(cb) {
    MongoClient.connect(this._url, { useNewUrlParser: true }, (err, client) => {
      assert.equal(null, err);
      console.log('Connected successfully');

      cb(client);
    });
  }

  insertDocument(document) {
    const that = this;
    this._connect((client) => {
        that.db = client.db(that._dbName);
        that._createCollectionIfNotExist();
        that.db.collection('Scoreboard').insertOne(document, (err) => {
          if (err) throw err;
          console.log('Document inserted!');

          that._fetchAllDataInCollection();
        });
    });
  }

  _createCollectionIfNotExist() {
    const that = this;
    this._db.listCollections({name: this._collection})
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

  getAllScores() {
    return this._collectionData;
  }
}


module.exports = Model;
