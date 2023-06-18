const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// const Comment = require("../schemas/comment.js");
const Posts = require("../schemas/post.js");
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

//글쓰기
router.post("/posts", async (req, res) => {
  const { postUser, postPassword, postTitle, postContent } = req.body;
  const existsPosts = await Posts.find({ postUser, "postPassword": postPassword }).select("+password"); //  셀렉트 사용할 수 있게 넣어준 함수 
  if (existsPosts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 해당 id가 존재합니다.",
    });
  } else {
    await Posts.create({ _id, postUser, postPassword, postTitle, postContent });
    res.json({ result: "게시 완료오옹오오" });
  }
});





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
