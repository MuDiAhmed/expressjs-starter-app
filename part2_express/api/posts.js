const router = require("express").Router();
const posts = [
  {
    id: 1,
    title: "first post",
    body: "woow post"
  },
  {
    id: 2,
    title: "second post",
    body: "moow post"
  }
];
const postsKeys = ["title", "body"];

router.get("/", (req, res) => {
  const query = req.query;
  let sort = query.sortBy || "id";
  sort = posts[0][sort] ? sort : "id";
  const response = posts.sort((a, b) => a[sort] > b[sort]);
  res.json(response);
});

router.post("/", (req, res) => {
  const post = req.body;
  const error = {};
  for (let key of postsKeys) {
    if (!post[key]) error[key] = `${key} is missing`;
  }
  if (Object.keys(error).length > 0) return res.status(400).json(error);
  post.id = posts[posts.length - 1].id + 1;
  posts.push(post);
  res.status(201).json(post);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find(current => current.id == id);
  if (post) return res.json(post);
  res.status(404).send(`Post with id: ${id} was not found`);
});

module.exports = router;
