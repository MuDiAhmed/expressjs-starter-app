const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", { name: "testing engine template" });
});

router.get("/about", (req, res) => {
  res.render("about", { name: "about page" });
});

module.exports = router;
