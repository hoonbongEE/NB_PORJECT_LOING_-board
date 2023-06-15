const express = require("express");
const router = express.Router();

const posts = [
  {
    postId: "안녕",
    postUser: "공부",
    postPassword: 12344123,
    postTitle: "안녕하세염",
    postContent: "안녕",
    postCreatedAt: new Date(),
  },
  {
    postId: 5256165165,
    postUser: "너무",
    postPassword: 12323446,
    postTitle: "안녕하세열",
    postContent: "반말하지마",
    postCreatedAt: new Date(),
  },
  {
    postId: 654165198498,
    postUser: "어려웡",
    postPassword: 18112213818,
    postTitle: "안녕하셈",
    postContent: "반말마",
    postCreatedAt: new Date(),
  },
];

// API 조회
router.get("/posts", (req, res) => {
  res.json({ posts: posts });
});

// API 목록 상세 조회
router.get("/posts/:postId", (req, res) => {
  const { postId } = req.params;
  const detail = posts.find((post) => post.postId === postId);
  res.json({ detail });
});

const Comment = require("../schemas/comment.js");

router.post("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;

  const existsComments = await Comment.find({ postId });
  if (existsComments.length)
    return res.status(400).json({
      success: false,
      errorMessage: "이미 해당 id가 존재합니다.",
    });

  await Comment.create({ postId });

  res.json({ result: "success" });
});

const Post = require("../schemas/post.js");


router.post("/posts", async (req, res) => {
  const { postId, postUser, postPassword, postTitle, postContent, postCreatedAt } = req.body;

  // const existingPost = await Post.find({ postId });
  // if (existingPost.length) {
  //   return res.status(400).json({
  //     success: false,
  //     errorMessage: "이미 존재하는 아이디입니다.",
  //   });
  // }

  const createPost = await Post.create({ postId, postUser, postPassword, postTitle, postContent, postCreatedAt });

  res.json({ posts: createPost });
});

module.exports = router;
