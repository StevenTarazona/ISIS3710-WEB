const messages = "messages.json";
const url = "/chat/api/messages/";

const Joi = require("joi");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fs = require("fs");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const schema = Joi.object({
  message: Joi.string().required().min(5),
  author: Joi.string()
    .required()
    .pattern(/^[a-zA-Z]+\s+[a-zA-Z]+$/, "name"),
});

app.get(url, function (req, res) {
  fs.readFile(messages, "utf8", (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

app.get(url + ":ts", function (req, res) {
  fs.readFile(messages, "utf8", (err, data) => {
    if (err) throw err;
    const msg = JSON.parse(data).find((m) => m.ts == req.params.ts);
    if (!msg)
      return res
        .status(404)
        .send("The message with the given ts was not found");
    res.send(msg);
  });
});

app.post(url, function (req, res) {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  fs.readFile(messages, (err, data) => {
    if (err) throw err;
    let json = JSON.parse(data);
    req.body.ts = Date.now();
    json.push(req.body);
    fs.writeFile(messages, JSON.stringify(json, null, 2), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    res.send(req.body);
  });
});

app.put(url + ":ts", function (req, res) {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  fs.readFile(messages, "utf8", (err, data) => {
    if (err) throw err;
    let json = JSON.parse(data);
    const msg = json.find((item) => item.ts == req.params.ts);
    if (!msg)
      return res
        .status(404)
        .send("The message with the given ts was not found");
    const index = json.indexOf(msg);
    json[index].message = req.body.message;
    json[index].author = req.body.author;
    fs.writeFile(messages, JSON.stringify(json, null, 2), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    res.send(req.body);
  });
});

app.delete(url + ":ts", function (req, res) {
  fs.readFile(messages, "utf8", (err, data) => {
    if (err) throw err;
    let json = JSON.parse(data);
    const msg = json.find((item) => item.ts == req.params.ts);
    if (!msg)
      return res
        .status(404)
        .send("The message with the given ts was not found");
    const index = json.indexOf(msg);
    json.splice(index, 1);
    fs.writeFile(messages, JSON.stringify(json, null, 2), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    res.send("The message with the given ts was successfully deleted");
  });
});

module.exports = app;
