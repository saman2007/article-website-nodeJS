const path = require("path");

const express = require("express");

const HomePage = require("./routes/HomePageRoute");
const ArticlesPage = require("./routes/ArticlesPageRoute");
const AboutMePage = require("./routes/AboutMeRoute");
const jsonReader = require("./helpers/JSONReader");

const server = express();

server.listen(3000);

server.use(express.static(path.resolve(__dirname, "public")));

server.set("view engine", "pug");
server.set("views", path.resolve(__dirname, "views"));

server.use(async (req, res, next) => {
  const menu = await jsonReader("menu.json");

  res.renderConfig = { menu, url: req.url };

  next();
});
server.use(HomePage);
server.use(ArticlesPage);
server.use(AboutMePage);

server.use((req, res) => {
  res.render("404", res.renderConfig);
});
