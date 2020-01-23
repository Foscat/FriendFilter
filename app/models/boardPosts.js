const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postComment = require("./postComments");

const boardPostSchema = new Schema({

    _postAuthorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    postAuthor: { type: String },
    postTitle: { type: String },
    postBody: { type: String, required: true},
    createdAt: { type: String, required: true},
    updatedAt: { type: String }
    
});

// When a board post is deleted all comments associated with it are deleted as well
boardPostSchema.post("remove", document => {
    const bpId = document._id;
    postComment.find({_boardPostId: {$in: [bpId] } }).then(comments => {
        Promise.all(
            comments.map(comment => postComment.findByIdAndDelete(
                comment._id
            ))
        )
    })
})

const BoardPost = mongoose.model("BoardPost", boardPostSchema);
module.exports = BoardPost;