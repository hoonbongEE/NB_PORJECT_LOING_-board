const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3050;

const indexRouter = require('./routes');
const postsRouter = require("./routes/posts.js")
const usersRouter = require("./routes/users.js");
const authRouter = require("./routes/auth")
const middileWare = require("./middlewares/auth-middleware.js")
// const commentsRouter = require('./routes/comments.js');
// const commentrouter = require("./routes")
const connect = require("./schemas")
connect();

app.use(express.json()); // post,put 전달된 body 데이터를 req.body로 사용핤 수 있도록 만든 바디파서


app.use(express.urlencoded({ extended: false }));//브라우저 접속시 폼 데이터를 받기 위한 것
app.use(cookieParser());
app.use(express.static("assets")); // 미들웨어 에 에셋에 파일들을 찾고 없음 다음 미들웨어에 감
// 이번 강의에서 쓴가
// app.use((req,res,next)=>{
//   console.log("Request URL", req.originalUrl," - " , new Date());
//   next();
// })

app.use("/api", [postsRouter,indexRouter,usersRouter,authRouter,middileWare]); //api가 사용되기 위한 라우터를 등록




// app.get('/api', (req, res) => {
//     res.send('Hello 못함');
//   });
  
  app.get('/api', (req, res) => {
    res.send('hi');
  });
  




  app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });