const express = require("express");

const articles = require("../helpers/Articles");

const router = express.Router({ caseSensitive: true });

router.get("/", async (req, res) => {
  const featuredArticles = await articles.getNArticles(3);

  res.renderConfig.title = "home";
  res.renderConfig.articles = featuredArticles;

  res.render("home", res.renderConfig);
});

module.exports = router;
