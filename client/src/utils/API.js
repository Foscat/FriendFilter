import axios from "axios";

export default {
// Use this as working boilerplate and copy code for new table in db

  ///// User CRUD \\\\\

  // Add a user
  addUser: function(userData) {
    console.log("Add user data: ", userData);
    return axios.post("/api/users", userData);
  },
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Update info on a user
  updateUser: function(id, updateData) {
    console.log("Update user id and data: ", id, updateData);
    return axios.put("/api/users/" + id, updateData)
  },
  // Delete a user
  deleteUser: function(id) {
    console.log("Delete user with id: ", id);
    return axios.delete("/api/users/" + id);
  },
  // Sign in a user
  signInUser: function(signInData){
    console.log("Sign in user data:", signInData);
    return axios.post("/api/users/signIn", signInData);
  },
  // Authenticate a user
  currentUser: function(token){
    return axios.post("/api/users/current", token);
  },
  // Find matches for user
  findMatches: function(personalityType){
    return axios.post("/api/users/matches", personalityType);
  },

    ///// Board Post CRUD \\\\\
    
  // Add a Board Post
  addBoardPost: function(boardPostData) {
    console.log("Add BoardPost data: ", boardPostData);
    return axios.post("/api/boardPosts", boardPostData);
  },
  // Gets all Board Posts
  getBoardPosts: function() {
    return axios.get("/api/boardPosts");
  },
  // Update info on Board Post
  updateBoardPost: function(id, updateData) {
    console.log("Update Board Post id and data: ", id, updateData);
    return axios.put("/api/boardPosts/" + id, updateData)
  },
  // Delete a Board Post
  deleteBoardPost: function(id) {
    console.log("Delete Board Post with id: ", id);
    return axios.delete("/api/boardPosts/" + id);
  },
  // Add a comment to a post
  addComment: function(postCommentData) {
    console.log("Add post comment data: ", postCommentData);
    return axios.post("/api/postComments", postCommentData);
  },
  // Gets all comments on a post
  getComments: function(bpId) {
    console.log("get comments", bpId);
    // Needs to have a boardPost Id it is ties to
    return axios.get("/api/postComments/" + bpId);
  },
  // Update info on comment
  updateComment: function(id, updateData) {
    console.log("Update comment with id and data: ", id, updateData);
    return axios.put("/api/postComments/" + id, updateData)
  },
  // Delete a comment
  deleteComment: function(id) {
    console.log("Delete comment with id: ", id);
    return axios.delete("/api/postComments/" + id);
  },
}