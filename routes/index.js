const router = require("express").Router();
const api = require("./api");
const controllers = require("./controllers");

router.use(api);
router.use(controllers);

module.exports = router;
