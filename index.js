const express = require("express");
const tokenController = require("./src/controllers/tokenController");

const app = express();

app.get("/token", tokenController.getTokenInfo);

app.listen(4000, () => console.log('App is up and working on port 4000'))