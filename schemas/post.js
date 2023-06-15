const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true, // 무조건 값이 있어야지만 사용하는 것 
    unique: true, //해당 값이 무조건 고유한 값인가
  },
  postUser: {
    type: String,
    required: true, 
    unique: true,
  },
  postPassword: {
    type: String,
    required: true, 
  },
  postTitle: {
    type: String,
  },
  postContent: {
    type: String,
  },
  postsCreatedAt: {
    type:  String,
  },
});

module.exports = mongoose.model("Posts",postSchema);
