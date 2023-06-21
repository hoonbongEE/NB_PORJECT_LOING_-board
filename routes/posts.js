const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// const Comment = require("../schemas/comment.js");
const authMiddleware = require("../middlewares/auth-middleware.js");
const Posts = require("../schemas/post.js");
const user = require("../schemas/user.js");

const { ObjectId } = mongoose.Types;


// const posts = [
//   {
//     postId: "안녕",
//     postUser: "공부",
//     postPassword: 12344123,
//     postTitle: "안녕하세염",
//     postContent: "안녕",
//     postCreatedAt: new Date(),
//   },
// ];


// API 전체 조회
router.get("/posts", async (req, res) => {
  const allPosts = await Posts.find()
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
      return res.status(500).json({ msg: "값을 못 받아옴" });

    }

  });


// router.put("/posts/:postId", async (req, res) => {
//   const { postId } = req.params;
//   const { password, title, content } = req.body;
//   if (!password || !title || !content || !postId) {
//     return res
//       .status(400)
//       .json({ msg: "비밀번호, 게시글, 타이틀이 존재하지 않습니다" });
//   }

//   try {
//     const updatePost = await Posts.findOneAndUpdate(
//       { postId, password },
//       { $set: { title, content } },
//       { new: true }
//     );
//     if (!updatePost) {
//       return res
//         .status(404)
//         .json({ msg: "비밀번호 또는 postId가 올바르지 않습니다" });
//     }
//     return res.status(200).json({ msg: "수정이 정상적으로 완료되었습니다" });
//   } catch (err) {
//     return res.status(500).json({ msg: "예기치 못한 오류 발생" });
//   }
// });





// 수정하기
// 만약에 아이디와 비번이 아니면 펄스 맞으면 리턴값으 뽑아줘서 성공
router.put("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { postUser, postPassword, postTitle, postContent } = req.body;
  const existPosts = await Posts.findOne({ "_id": postId, "postPassword": postPassword }).select("+password");

  if (!ObjectId.isValid(postId) || postPassword !== existPosts.postPassword) {
    return res.status(400).json({
      success: false,
      errorMessage: "해당 아이디 또는 비밀번호가 맞지 않습니다"
    });

  } else if (postPassword === existPosts.postPassword) {
    await Posts.findByIdAndUpdate(existPosts["_id"], { postUser, postPassword, postTitle, postContent });

    return res.status(200).json({ result: "수정완료" });
  }
});


//삭제하기
router.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { postPassword } = req.body;
  const existPosts = await Posts.findOne({ "_id": postId, "postPassword": postPassword }).select("+password");


  if (!ObjectId.isValid(postId) || postPassword !== existPosts.postPassword) {
    return res.status(400).json({
      success: false,
      errorMessage: "해당 아이디 또는 비밀번호가 맞지 않습니다"
    });

  } else if (postPassword === existPosts.postPassword) {
    await Posts.deleteOne({ "_id": postId, "postPassword": postPassword });
    return res.status(200).json({ result: "삭제완료" });
  }
});
















// router.put("/posts/:postId", async (req, res) => {
//   const { postId } = req.params;
//   const { password, title, content } = req.body;
//   if (!password || !title || !content || !postId) {
//     return res
//       .status(400)
//       .json({ msg: "비밀번호, 게시글, 타이틀이 존재하지 않습니다" });
//   }

//   try {
//     const updatePost = await Posts.findOneAndUpdate(
//       { postId, password },
//       { $set: { title, content } },
//       { new: true }
//     );
//     if (!updatePost) {
//       return res
//         .status(404)
//         .json({ msg: "비밀번호 또는 postId가 올바르지 않습니다" });
//     }
//     return res.status(200).json({ msg: "수정이 정상적으로 완료되었습니다" });
//   } catch (err) {
//     return res.status(500).json({ msg: "예기치 못한 오류 발생" });
//   }
// });









module.exports = router;
