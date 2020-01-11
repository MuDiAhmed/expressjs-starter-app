const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", { name: "Hello World!" });
});

module.exports = router;
