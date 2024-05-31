let express=require("express");
let {errorHandler} =require("./middleware/error");
const cors = require("cors");
let router=require("./routes/videos.router");
let app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.get("/",(req,res)=>{
    console.log("Server is up and running");
    res.send("Server is up and running");
});
app.use("/v1",router)
app.use(errorHandler);
module.exports = app;