const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// const Comment = require("../schemas/comment.js");
const authMiddleware = require("../middlewares/auth-middleware.js");
const Posts = require("../schemas/post.js");


const { ObjectId } = mongoose.Types;



// API 전체 조회
router.get("/posts", async (req, res) => {
  const allPosts = await Posts.find()
    .sort({ createdAt: -1 });
  res.json({ allPosts });
});



// API 목록 상세 조회
router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const inquiry = await Posts.find({ "_id": postId });
  res.json({ inquiry });
});

//1. 파람스에 auth 아이디를 넣는다  2. 자기가 만든 아이디 값이 맞으면 글을 쓰게 한다

//글쓰기
router
  .route("/posts")
  .post(authMiddleware, async (req, res) => {
    const { email } = res.locals.user;
    const { postUser, Title, Content } = req.body; // 수정: postUser -> postsUser
    console.log(postUser, Title, Content);
    try {
      if (!email || !Title || !Content || !postUser) {
        return res.status(400).json({
          errorMessage: "데이터 형식이 올바르지 않습니다.",
        });
      } else {
        await Posts.create({ posts: { email, postUser, Title, Content } });
        res.status(200).json({ result: "게시 완료" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "값을 못 받아옴" })
    }
  });




// 수정하기
// 만약에 아이디와 비번이 아니면 펄스 맞으면 리턴값으 뽑아줘서 성공
router
  .route("/posts/:postId")
  .put(authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const { email } = res.locals.user;//
    const { postUser, Title, Content } = req.body;

    try {
      if (!email) {
        return res.status(400).json({
          errorMessage: "해당 아이디의 게시물이 아닙니다."
        });
      } else if (ObjectId.isValid(postId) && (Title || Content)) {
        await Posts.findByIdAndUpdate(postId, { "posts.postUser": postUser, "posts.Title": Title, "posts.Content": Content }); // 스키마 DB posts안에 들어가 있는 애들(경로) 
        console.log(postId)
        return res.status(200).json({ result: "수정 완료" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "값을 받아오지 못했습니다" });
    }
  });


//삭제하기
router
  .route("/posts/:postId")
  .delete(authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const { email } = res.locals.user;
    // const { postUser, Title, Content } = req.body
    await Posts.findOne({ "_id": postId })
    // console.log(postUser, Title, Content  )
    try {
      if (!email) {
        return res.status(400).json({

          errorMessage: "해당 아이디 또는 비밀번호가 맞지 않습니다"
        });
        // postUser,  Title,  Content
      } else if (email) {
        await Posts.deleteOne({ "_id": postId});
        
        return res.status(200).json({ result: "삭제완료" });
      }
    } catch (error) {
      return res.status(500).json({
        msg: "예기치 못한 오류 발생",
      });
    }

  });


module.exports = router;
