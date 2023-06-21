const express = require("express");
const router = express.Router();
const userSchema = require("../schemas/user.js");
const authMiddleware = require("../middlewares/auth-middleware.js");


// 내 정보 조회 API
router.get("/users/me", authMiddleware, async (req, res) => {
  const { email, nickname } = res.locals.user;

  res.status(200).json({
    user: {
      email: email,
      nickname: nickname,
    },
  });
});
  
router.post("/users", async (req, res) => {

  const { email, nickname, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({                      
      errorMessage: "패스워드와 확인 패스워드가 일치하지 않습니다.",
    });
    return;
  }
  try {
    const isExistUser = await userSchema.findOne({
      $or: [{ email }, { nickname }],
    });
    if (isExistUser) {
      res.status(400).json({
        errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
      });
      return;
    }

    const user = new userSchema({ email, nickname, password });
    await user.save();

    res.status(200).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: "서버 오류가 발생했습니다.",
    });
  }
});








module.exports = router;