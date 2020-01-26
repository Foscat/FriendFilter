const router = require("express").Router();
const boardPostsController = require("../../controllers/boardPosts");

// Matches with "/api/boardPosts"
router.route("/")
  .get(boardPostsController.findAll)
  .post(boardPostsController.create);

// Matches with "/api/boardPosts/:id"
router
  .route("/:id")
  .get(boardPostsController.findById)
  .put(boardPostsController.update)
  .delete(boardPostsController.remove);

router
  .route("/user/:authorId")
  .get(boardPostsController.findByAuthorId)

module.exports = router;
