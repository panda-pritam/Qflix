const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

// let server=config.env.url;
let PORT=8082;
// console.log("------------------------------Hello from server---------------------");
// console.log(config.port)
// console.log(config.mongoose.url)
// console.log(config.mongoose.url);
mongoose.connect("mongodb://127.0.0.1:27017/xflix")
.then((res)=>console.log("DB Connected "))
.catch((err)=>{
    console.log(err);
    console.log("can't connect to the DB "+err);
});

app.listen(PORT,()=>{
    console.log(PORT);
    console.log("Server is runing at "+PORT);
})