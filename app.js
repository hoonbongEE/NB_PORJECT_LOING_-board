const express = require('express');
const app = express();
const port = 5000;

const indexRouter = require('./routes');
const postsRouter = require("./routes/posts.js")
const commentsRouter = require('./routes/comments.js');
// const commentrouter = require("./routes")
const connect = require("./schemas")
connect();

app.use(express.json());
app.use('/api', [postsRouter, commentsRouter,indexRouter]);



app.get('/api', (req, res) => {
    res.send('Hello 못함');
  });
  
  app.get('/', (req, res) => {
    res.send('Hellowwwwww 못함');
  });
  




app.listen(port, () => {
    console.log(port, '열려라 참깨!');
  });