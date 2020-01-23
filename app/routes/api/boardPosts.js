const router = require("express").Router();
const boardPostsController = require("../../controllers/boardPosts");

// Matches with "/api/users"
router.route("/")
  .get(boardPostsController.findAll)
  .post(boardPostsController.create);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(boardPostsController.findById)
  .put(boardPostsController.update)
  .delete(boardPostsController.remove);

module.exports = router;
