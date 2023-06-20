const express = require("express");
const router = express.Router();
const userSchema = require("../schemas/user.js");

router.post("/users", async (req, res) => {
    try {
      const { email, nickname, password, confirmPassword } = req.body;
  
      if (password !== confirmPassword) {
        res.status(400).json({
          errorMessage: "패스워드와 전달된 패스워드 확인값이 일치하지 않습니다.",
        });
        return;
      }
  
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
  
      res.status(201).json({});
    } catch (error) {
      console.error(error);
      res.status(500).json({
        errorMessage: "서버 오류가 발생했습니다.",
      });
    }
  });
  
module.exports = router;