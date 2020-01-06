const router = require("express").Router();
const Joi = require("@hapi/joi");
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
  },
  {
    id: 3,
    title: "third post",
    body: "hhhh post"
  }
];
const postsSchema = Joi.object({
  id: Joi.number().integer(),
  title: Joi.string()
    .min(5)
    .max(40)
    .required(),
  body: Joi.string()
    .min(5)
    .max(255)
    .required()
});

router.get("/", (req, res) => {
  const query = req.query;
  let sort = query.sortBy || "id";
  sort = posts[0][sort] ? sort : "id";
  const response = posts.sort((a, b) => a[sort] > b[sort]);
  res.json(response);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(current => current.id === id);
  if (post) return res.json(post);
  res.status(404).send(`Post with id: ${id} was not found`);
});

router.post("/", (req, res) => {
  const post = req.body;
  const { error, value } = postsSchema.validate(post);

  if (error) return res.status(400).json(error);
  value.id = posts[posts.length - 1].id + 1;
  posts.push(value);
  res.status(201).json(value);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const currentPostIndex = posts.findIndex(current => current.id === id);
  const currentPost = posts[currentPostIndex];
  if (!currentPost)
    return res.status(404).send(`Post with id: ${id} was not found`);
  const { error, value: post } = postsSchema.validate(req.body);
  if (error) return res.status(400).json(error);
  const final = { ...currentPost, ...post };
  posts[currentPostIndex] = final;
  res.json(final);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const currentPostIndex = posts.findIndex(current => current.id === id);
  if (currentPostIndex === -1)
    return res.status(404).send(`Post with id: ${id} was not found`);
  res.json(posts.splice(currentPostIndex, 1));
});

module.exports = router;
