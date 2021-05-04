var express = require("express");
var router = express.Router();
const client = require("../controllers/client");

var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
//router.get("/", middleware.checkToken, HandlerGenerator.index);

router.post("/login", HandlerGenerator.login);

router.get(
  "/",
  middleware.checkToken,
  client.checkRol(["admin", "write", "read"]),
  client.getClients
);

router.get(
  "/:id",
  middleware.checkToken,
  client.checkRol(["admin", "write", "read"]),
  client.getClient
);

router.post(
  "/",
  middleware.checkToken,
  client.checkRol(["admin", "write"]),
  client.addClient
);

router.put(
  "/:id",
  middleware.checkToken,
  client.checkRol(["admin", "write"]),
  client.updateClient
);

router.delete(
  "/:id",
  middleware.checkToken,
  client.checkRol(["admin"]),
  client.deleteClient
);

module.exports = router;
