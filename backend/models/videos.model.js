const httpStatus = require("http-status");
let mongoose = require("mongoose");
let validate = require("mongoose-validator");
let ApiError = require("../utils/ApiError");
let { contentRatings, genres, releaseDate } = require("../utils/values");
//let videoRegex= /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
let videoRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/embed\/|youtu\.be\/)[a-zA-Z0-9_-]+$/;
//let imgRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/;
let imgRegex= /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp|webp)/
let videosModel = mongoose.Schema(
  {
    
    videoLink: {
      type: String,
      trim: true,
      required: true,
      unique: true,

      validate: {
        validator(value) {
          console.log(value);
          console.log(videoRegex.test(value));
          if (!videoRegex.test(value)) {
           
            throw new Error(
              
              "Invalid YouTube video format. It should be in the format 'https://www.youtube.com/embed/<youtube-video-id>' or 'youtube.com/embed/<youtube-video-id>'."
            );
            //return false;
          }
          //message: 'Invalid YouTube video format. It should be in the format'
          return true;
        },
        message: 'Invalid YouTube video format. It should be in the format ---- msg from mongo'
      },

      // validate: {
      //   validator: function(v) {
      //       var re = /^\d{10}$/;
      //       return (!v || !v.trim().length) || re.test(v)
      //   },
      //   message: 'Provided phone number is invalid.'
      // }
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      validation(value) {
        if (!genres.includes(value)) {
          throw new Error(
            'Please Enter valid genres. Genres should be from ("Education',
            "Sports",
            "Movies",
            "Comedy",
            "Lifestyle",
            'All")'
          );
        }
      },
    },
    contentRating: {
      type: String,
      required: true,
      trim: true,
      validation(value) {
        console.log("--------- In ContentRating ------ ", value);
        if (!contentRatings.includes(value)) {
          throw new Error(
            `Please enter valid content rating ${contentRatings}`
          );
        }
      },
    },
    releaseDate: {
      type: Date,
      required: true,
      trim: true,
    },
    previewImage: {
      type: String,
      // required: true,
      trim: true,
      validate:{
        validator(value){
          if(!imgRegex.test(value))
          {
            return false;
          }
          return true;
        },
        message:"Please enter valid image URL."
        
      }
    },
    votes: {
      upVotes: { type: Number, required: true, default: 0 },
      downVotes: { type: Number, required: true, default: 0 },
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  // { versionKey: false }
);

const Videos = mongoose.model("Videos", videosModel);

module.exports = Videos;
