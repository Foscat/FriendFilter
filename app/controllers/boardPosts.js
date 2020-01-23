const db = require("../models");
const moment = require('moment');


// Defining methods for the userController
module.exports = {
  findAll: function(req, res) {
    console.log("Find all board posts request");
    db.BoardPost.find(req.query)
      .then(dbBoardPost => res.json(dbBoardPost))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log("Find a board post by id request", req.params.id);
    db.BoardPost.findById(req.params.id)
      .then(dbBoardPost => res.json(dbBoardPost))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    req.body.createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    console.log("Create board post request",req.body);
    db.BoardPost.create(req.body)
      .then(dbBoardPost => res.json(dbBoardPost))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("Update board post request:", req.params.id, req.body)
    db.BoardPost.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbBoardPost => (res.json(dbBoardPost)))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("Delete board post request", req.params.id);
    db.BoardPost.findById(req.params.id)
      .then(dbBoardPost => dbBoardPost.remove())
      .then(dbBoardPost => res.json(dbBoardPost))
      .catch(err => res.status(422).json(err));
  }
};