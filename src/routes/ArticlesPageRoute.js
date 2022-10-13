const express = require("express");

const articles = require("../helpers/Articles");

const router = express.Router({ caseSensitive: true });

router.get("/articles", async (req, res) => {
  const allArticles = await articles.getAllArticles();

  res.renderConfig.title = "all articles";
  res.renderConfig.articles = allArticles;

  res.render("articles", res.renderConfig);
});

router.get("/articles/:path", async (req, res, next) => {
  const article = await articles.getSpecificArticle(req.path);

  if (!article) return next();

  res.renderConfig.title = article.title;
  res.renderConfig.article = article;

  res.render("article", res.renderConfig);
});

module.exports = router;
