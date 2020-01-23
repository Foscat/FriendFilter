const router = require("express").Router();
const userRoutes = require("./users");
const boardPostsRoutes = require("./boardPosts");
const postCommentRoutes = require("./postComments");

// Index serves as directory for routes

// User routes
router.use("/users", userRoutes);
// Board Post routes
router.use("/boardPosts", boardPostsRoutes);
// Board Post comment routes
router.use("/postComments", postCommentRoutes);

module.exports = router;