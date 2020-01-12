const router = require("express").Router();
const postRepo = require("../../repositories/post");

router.get("/", async (req, res) => {
  const posts = await postRepo.getAll();
  return res.json(posts);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await postRepo.getOneById(id);
  if (!post) return res.sendStatus(404);
  return res.json(post);
});

router.post("/", async (req, res) => {
  const post = req.body;
  const { error, value } = postRepo.validatePost(post);
  if (error) return res.status(400).send(error);
  try {
    const postDoc = await postRepo.createPost(value);
    return res.status(201).json(postDoc);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put("/:id", async (req, res) => {
  const post = req.body;
  const id = req.params.id;
  try {
    await postRepo.getOneById(id);
    if (!post) return res.sendStatus(404);
  } catch (error) {
    return res.status(500).send(err);
  }
  const { error, value } = postRepo.validatePost(post);
  if (error) return res.status(400).send(error);
  try {
    const postDoc = await postRepo.updatePostById(id, value);
    return res.status(200).json(postDoc);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postRepo.getOneById(id);
    if (!post) return res.sendStatus(404);
    const postDoc = await postRepo.deletePostById(id);
    return res.status(200).json(postDoc);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
