const router = require("express").Router();
const postCommentsController = require("../../controllers/postComments");

  // For comment creation have a general route
  router.route("/")
    .get(postCommentsController.findAll)
    .post(postCommentsController.create);
  
  // For gets puts and deletes need a specific route
  router
    .route("/:id")
    .get(postCommentsController.findByBoardPostId)
    .put(postCommentsController.update)
    .delete(postCommentsController.remove);


  

module.exports = router;