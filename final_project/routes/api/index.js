const router = require("express").Router();
const posts = require("./post");

router.use("/api/posts", posts);

module.exports = router;
