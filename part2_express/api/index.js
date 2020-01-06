const router = require("express").Router();
const posts = require("./posts");

router.use("/api/posts", posts);

router.all("/api", (req, res) => {
  res.json({
    "/post": {
      method: "GET"
    },
    "/todo": {
      method: "GET"
    }
  });
});

module.exports = router;
