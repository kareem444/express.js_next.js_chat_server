const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser')
const routes = require('./routes/index');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.use('/user', routes.user);
app.use('/auth', routes.auth);
app.use('/room', routes.room);


module.exports = app;
