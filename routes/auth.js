// routes/auth.js

const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const User = require("../schemas/user");

// 로그인 API

router.post("/auth", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user || password !== user.password) {
        res.status(400).json({
          errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
        });
        return;
      }
  
      const token = jwt.sign(
        { userId: user.userId },
        "custom-secret-key"
      );
  
      res.cookie("Authorization", `Bearer ${token}`);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        errorMessage: "서버 오류가 발생했습니다.",
      });
    }
  });
  

module.exports = router;


