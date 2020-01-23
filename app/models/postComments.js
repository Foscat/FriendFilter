const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postCommentSchema = new Schema({

    _boardPostId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "BoardPost"
    },
    _comAuthorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    commentAuthor: { type: String },
    commentBody: { type: String, required: true},
    createdAt: { type: String, required: true},
    updatedAt: { type: String }
})


const PostComment = mongoose.model("PostComment", postCommentSchema);
module.exports = PostComment;

