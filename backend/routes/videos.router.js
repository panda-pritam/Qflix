let express=require("express");
let router=express.Router();
let {postVideos,searchVideos,updateVote,checkID}=require("../validator/videos.validator");
let reqBodyValidater=require("../middleware/validateReqBody");
let validateReqQuery=require("../middleware/validateReqQuery");
let validateReqParams=require("../middleware/validateReqParams");
let validateGenres=require("../middleware/genernsValidation");
let {getAllvideos,getVideoById,addNewVideo,updateView,updateVotes}=require("../controller/videos.controller");

router.get("/videos",validateReqQuery(searchVideos),getAllvideos);
router.get("/videos/:videoId",validateReqParams(checkID),getVideoById);
router.post("/videos",reqBodyValidater(postVideos),addNewVideo);
router.patch("/videos/:videoId/votes",validateReqParams(checkID),reqBodyValidater(updateVote),updateVotes);
router.patch("/videos/:videoId/views",validateReqParams(checkID),updateView);

module.exports=router;