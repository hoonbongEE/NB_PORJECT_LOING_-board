const mongoose = require("mongoose");

// new mongoose.Schema
const postsSchema = {
  posts: {
    email: {
      type: String,
      // ref: 'User',
      required: true,
      unique: true,
      
    },
    postUser: {
      type: String,
      // ref: 'User',
      // required: true,
    },

    Title: {
      type: String,
      required: true,
    },
    Content: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      versionKey: false, // _V 안보이게 해주는 거 필요없어서 숨기는 거임
    },
  },
};
// postsSchema.virtual("postId").get(function () {
//   return this._id.toHexString();
// });
// postsSchema.set("toJSON", {
//   virtuals: true,
// });



module.exports = mongoose.model("Posts",postsSchema);


// const postSchema = new mongoose.Schema({
//   // postId: {
//   //   type: String,
//   //   required: true, // 무조건 값이 있어야지만 사용하는 것 
//   //   unique: true, //해당 값이 무조건 고유한 값인가
// //  /

//   postUser: {
//     type: String,
//     required: true, 
  
//   },
  
//   Title: {
//     type: String,
//   },
//   Content: {
//     type: String,
//   },
// },
// {
//   timestamps: true, // 시간 보여주게 하는 거 개꿀
//   versionKey: false, // _V 안보이게 해주는 거 필요없어서 숨기는 거임
// });