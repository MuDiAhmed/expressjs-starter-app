const router = require("express").Router();
const postRepo = require("../../repositories/post");

router.get("/", async (req, res) => {
  try {
    const posts = await postRepo.getAll();
    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postRepo.get(id);
    return res.json(post);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.status).send(err.message);
    }
    return res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const createdPost = await postRepo.create(req.body);
    return res.status(201).json(createdPost);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.status).send(err.message);
    }
    return res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = req.body;
    const id = req.params.id;
    const updatedPost = await postRepo.update(id, post);
    return res.json(updatedPost);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.status).send(err.message);
    }
    return res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPost = await postRepo.delete(id);
    return res.json(deletedPost);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.status).send(err.message);
    }
    return res.status(500).send(err.message);
  }
});

module.exports = router;
