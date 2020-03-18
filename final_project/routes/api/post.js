const router = require("express").Router();
const postRepo = require("../../repositories/post");

/**
 * @api {get} /api/posts Request all posts
 * @apiVersion 0.1.0
 * @apiPermission none
 * @apiName GetPosts
 * @apiGroup Posts
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "title": "Title",
 *       "body": "Body",
 *       "auther": {
 *          "firstname" : "John",
 *          "lastname" : "Doa"
 *        },
 *       "isPublished" : false,
 *       "tags": ["angular", "nodejs"]
 *     }]
 */
router.get("/", async (req, res) => {
  try {
    const posts = await postRepo.getAll();
    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

/**
 * @api {get} /api/posts/:id Request one post
 * @apiVersion 0.1.0
 * @apiPermission none
 * @apiName GetPost
 * @apiGroup Posts
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:4300/api/posts/1
 *
 * @apiParam {String} id Posts unique ID.
 *
 * @apiSuccess {String} title Title of the Post.
 * @apiSuccess {String} body  Body of the Post.
 * @apiSuccess {Object} auther  Author of the Post.
 * @apiSuccess {Boolean} isPublished  Publish state of the Post.
 * @apiSuccess {String[]} tags  Tags of the Post.
 * @apiSuccess {Object} comments  Comments of the Post.
 * @apiSuccess {Object} meta  Meta of the Post.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "title": "Title",
 *       "body": "Body",
 *       "auther": {
 *          "firstname" : "John",
 *          "lastname" : "Doa"
 *        },
 *       "isPublished" : false,
 *       "tags": ["angular", "nodejs"]
 *     }
 *
 * @apiError PostNotFound The id of the Post was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "PostNotFound"
 *     }
 */
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
