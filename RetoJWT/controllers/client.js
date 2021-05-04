const Mongolib = require("../db/Mongolib");
const ObjectId = require("mongodb").ObjectID;

const getClients = (req, res) => {
  Mongolib.getDatabase((db) => {
    db.collection("clients")
      .find({})
      .toArray((err, data) => {
        res.send(data);
      });
  });
};

const getClient = (req, res) => {
  Mongolib.getDatabase((db) => {
    db.collection("clients")
      .findOne({ _id: ObjectId(req.params.id) })
      .then((data) => {
        if (data) res.send(data);
        else
          res.status(404).send("El cliente con el id proporcionado no existe");
      });
  });
};

const addClient = (req, res) => {
  Mongolib.getDatabase((db) => {
    db.collection("clients")
      .insertOne(req.body)
      .then((data) => {
        res.send(data.ops);
      });
  });
};

const updateClient = (req, res) => {
  Mongolib.getDatabase((db) => {
    db.collection("clients").updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.send("Updated!");
  });
};

const deleteClient = (req, res) => {
  Mongolib.getDatabase((db) => {
    db.collection("clients").deleteOne({ _id: ObjectId(req.params.id) });
    res.send("Deleted!");
  });
};

const checkRol = (rols) => {
  return (req, res, next) => {
    Mongolib.getDatabase((db) => {
      db.collection("clients")
        .findOne({ username: req.decoded.username })
        .then((data) => {
          if (data && rols.includes(data.rol)) {
            next();
          } else {
            return res.json({
              success: false,
              message: "Unauthorized",
            });
          }
        });
    });
  };
};

const client = {
  getClients,
  getClient,
  addClient,
  updateClient,
  deleteClient,
  checkRol,
};

module.exports = client;
