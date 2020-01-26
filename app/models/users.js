const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const boardPosts = require("./boardPosts")

const userSchema = new Schema({
    name: { type: String, required: true},
    username: { type: String, required: true},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    phone_num: { type: Number },
    surveyAnswers: { type: Array },
    surveyScore: { type: Number},
    avatarImage: { type: String },
    personalityType: { type: String },
    createdAt: { type: String, required: true},
    updatedAt: { type: String }
});

// When a board post is deleted all comments associated with it are deleted as well
userSchema.post("remove", user => {
    const userId = user._id;
    postComment.find({_postAuthorId: {$in: [userId] } }).then(BPs => {
        Promise.all(
            BPs.map(bp =>  boardPosts.findByIdAndDelete(
                bp._id
            ))
        )
    })
})

const User = mongoose.model("User", userSchema);
module.exports = User;