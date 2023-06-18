const mongoose = require("mongoose");

const connect = ()=>{
    mongoose
    .connect("mongodb://localhost:27017/NB_proj")
    .catch(err=>console.log(err)); //포트를 열었을때 에러가 안 뜨면 서버가 잘 열린거임
};

mongoose.connection.on("error",err=>{
    console.log("몽고디비 연결 에러", err);
});


module.exports = connect