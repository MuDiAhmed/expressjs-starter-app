const router = require("express").Router();
const postRepo = require("../../repositories/post");

router.get("/", async (req, res) => {
  const posts = await postRepo.getAll();
  return res.json(posts);
});

module.exports = router;
