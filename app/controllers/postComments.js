const db = require("../models");
const moment = require('moment');


// Defining methods for the postComments controller
module.exports = {


  // Since comments have a relation with borad posts we need a specal call to get all
  // comments related to the board post
  findByBoardPostId: function(req, res){
    console.log("Find comment by board bpost id request", req.params.id);
    db.PostComment.find({_boardPostId : req.params.id})
      .then(dbPostComment => res.json(dbPostComment))
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    console.log("Find all comments request");
    db.PostComment.find(req.query)
      .then(dbPostComment => res.json(dbPostComment))
      .then(console.log(dbPostComment))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log("Find comment by id request", req.params.id);
    db.PostComment.findById(req.params.id)
      .then(dbPostComment => res.json(dbPostComment))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    req.body.createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    console.log("Create comment to board post request",req.body);
    db.PostComment.create(req.body)
      .then(dbPostComment => res.json(dbPostComment))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("Update comment on board post request", req.params.id, req.body)
    db.PostComment.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbPostComment => (res.json(dbPostComment)))
      .catch(err => res.status(422).json(err));
      
  },
  remove: function(req, res) {
    console.log("Delete comment by id request", req.params.id);
    db.PostComment.findById(req.params.id)
      .then(dbPostComment => dbPostComment.remove())
      .then(dbPostComment => res.json(dbPostComment))
      .catch(err => res.status(422).json(err));
  }
};