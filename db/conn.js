const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tempRegister")
.then(()=>{
    console.log(`success`);
})
.catch((e)=>{
    console.log(`nope`);
})