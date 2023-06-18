const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  // postId: {
  //   type: String,
  //   required: true, // 무조건 값이 있어야지만 사용하는 것 
  //   unique: true, //해당 값이 무조건 고유한 값인가
//  /
  postUser: {
    type: String,
    required: true, 
  
  },
  postPassword: {
    type: String,
    required: true, //이게 무조건 있어야하는가 
    select : false, // 값을 안 보이게 함
  },
  postTitle: {
    type: String,
  },
  postContent: {
    type: String,
  },
},
{
  timestamps: true, // 시간 보여주게 하는 거 개꿀
  versionKey: false, // _V 안보이게 해주는 거 필요없어서 숨기는 거임
});

module.exports = mongoose.model("Posts",postSchema);
