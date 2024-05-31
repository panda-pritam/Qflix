let joi=require("joi");
let {objectId,checkLink,checkImageLink}=require("./custom");
let { contentRatings,genres,releaseDate,updateVoteTypes,changeVoteTypes} =require("../utils/values");
const Joi = require("joi");


//.custom(checkLink)
//.custom(checkImageLink)
let postVideos={
    body:joi.object().keys({
    videoLink: joi.string().required(),
    title: joi.string().required(),
    genre: joi.string().valid(...genres).required(),
    contentRating: joi.string().valid(...contentRatings).required(),
    releaseDate: joi.date().required(),
    previewImage: joi.string().required(),
    votes: joi.object({
        upVotes: Joi.number().default(0),
        downVotes: Joi.number().default(0),
      }),
    viewCount: joi.string().default(0)
    })
}
//'15.207.18.'
let searchVideos={
    query:joi.object().keys({
        title: joi.string(),
        genres: joi.string(),
        contentRating: joi.string().valid(...contentRatings),
        sortBy:joi.string()
    })
}

let updateVote={
    body:joi.object().keys({
        vote:joi.string().valid(...updateVoteTypes).required(),
        change:joi.string().valid(...changeVoteTypes).required(),
    })
}

let checkID={
    params:joi.object().keys({
        videoId:joi.required().custom(objectId)
    })
}

module.exports={
    postVideos,searchVideos,updateVote,checkID
}