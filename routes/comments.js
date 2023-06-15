const express = require('express');
const router = express.Router();

const Comment = require("../schemas/comment.js");
const Post = require("../schemas/post.js");

const comments = [
  {
    user: "hoon",
    password: "1234567",
    content: "안녕하세요",
    v: "",
    date: new Date(),
    postId: "",
  },
];

router.get("/comments", async (req, res) => {
  const commentsData = await Comment.find({});

  const postIds = commentsData.map((comment) => {
    return comment.postId;
  });
  const posts = await Post.find({ postId: postIds });

  const results = commentsData.map((comment) => {
    return {
      comment: comment,
      post: posts.find((item) => item.postId === comment.postId),
    };
  });

  res.json({
    comments: results,
  });
});

module.exports = router;
