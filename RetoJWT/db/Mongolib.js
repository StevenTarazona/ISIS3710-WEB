const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "jwt";

const client = new MongoClient(url, { useUnifiedTopology: true });

let db;

const getDatabase = (callback) => {
    if (db == undefined){
        client.connect(function (err) {
            assert.equal(null, err);
            db = client.db(dbName);
            console.log("Connected successfully to server");
            callback(db, client);
        });
    } else {
    callback(db, client);
    }
}

exports.getDatabase = getDatabase;