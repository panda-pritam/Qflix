const ApiError = require("../utils/ApiError");
let { contentRatings,genres,releaseDate,updateVoteTypes,changeVoteTypes} =require("../utils/values");
const Joi = require("joi");
const httpStatus = require("http-status");
let genreSchema=Joi.object().keys({
    genres:Joi.array().items(Joi.string().valid(...genres))
})
let validateGenres= (req, res, next) => {
   let list=req.query.genres.split(" ")
   console.log(list)
    let result = genreSchema.validate({genres:list});
    if (result.error) 
    {
        throw new ApiError(httpStatus.BAD_REQUEST, result.error.details[0].message);
    }
    // return res.status(422).json({ message: result.error.details[0].message });
    next();
};

module.exports=validateGenres;