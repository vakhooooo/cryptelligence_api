const express = require("express");
const tokenController = require("./src/controllers/tokenController");

const app = express();
const config = require("./src/config/index");

app.get("/token", tokenController.getTokenInfo);

app.listen(config.port, () => console.log(`App is up and working on port ${config.port}`));
