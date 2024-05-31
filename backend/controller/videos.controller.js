let {
  getAll,
  getById,
  addVideo,
  updateViewCount,
  updateVoteCount,
} = require("../services/videos.service");
let catchAsync = require("../utils/catchAsync");
let ApiError = require("../utils/ApiError");
let httpStatus = require("http-status");
const { json } = require("express");

let getAllvideos = catchAsync(async (req, res) => {
  try {
    let title = req.query.title ? req.query.title : "";
    let contentRating = req.query.contentRating
      ? req.query.contentRating
      : "All";
    let genres = req.query.genres ? req.query.genres.split(",") : ["All"];
    let sortBy = req.query.sortBy ? req.query.sortBy : "";
    let list = await getAll(title, contentRating, genres, sortBy);
    if (list.length === 0) {
      return res.status(404).json({ message: "No Videos Found" });
    }
    // req.body({ videos: list });
    let resultObj = {
      videos: list,
    };
    // res.status(200).json({body:resultObj});
    res.body = resultObj;
    res.status(200).send({ videos: list });
    // res.send(resultObj);
    // res.status(httpStatus.OK).json({ videos: list });
  } catch (error) {
    console.log(error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
});
let getVideoById = catchAsync(async (req, res) => {
  let { videoId } = req.params;
  let result = await getById(videoId);

  if (result) {
    let resultObj = {
      id: result._id,
      videoLink: result.videoLink,
      title: result.title,
      genre: result.genre,
      contentRating: result.contentRating,
      releaseDate: result.releaseDate,
      previewImage: result.previewImage,
      votes: result.votes,
      viewCount: result.viewCount,
    };
    // res.status(httpStatus.FOUND).json(result);
    //res.send(resultObj)
    res.body = resultObj;
    res.status(httpStatus.OK).json(resultObj);
  } else {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `No data found with this id ${videoId}`
    );
  }
});
let addNewVideo = catchAsync(async (req, res) => {
  try {
    let result = await addVideo(req.body);
    if (result) {
      // let resultObj = {
      //   id: result._id,
      //   videoLink: result.videoLink,
      //   title: result.title,
      //   genre: result.genre,
      //   contentRating: result.contentRating,
      //   releaseDate: result.releaseDate,
      //   previewImage: result.previewImage,
      //   votes: result.votes,
      //   viewCount: result.viewCount,
      // };
      // res.send({"body":resultObj});
      //res.body=resultObj;
      // res.status(httpStatus.CREATED).json(resultObj);
      //res.status(httpStatus.CREATED).json(resultObj);
      res.status(200).send(result);
    }
  } catch (error) {
    console.log("---------------------> error ->", error.name);
    // console.log("---------------------> error ->",error.message["Videos validation failed"]);
    console.log(error.code);
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      // return res.status(400).send(errors);
      throw new ApiError(httpStatus.BAD_REQUEST, `${JSON.stringify(errors)}`);
    }
    if (error.code == 11000) {
      throw new ApiError(409, error.message);
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Not able to add new data at the moment`
    );
  }
});
let updateView = catchAsync(async (req, res) => {
  console.log("View controller");
  let { videoId } = req.params;
  let obj = await updateViewCount(videoId);
  res.status(201).send(obj);
});
let updateVotes = catchAsync(async (req, res) => {
  console.log("vote controller");
  let { videoId } = req.params;
  let obj = await updateVoteCount(videoId, req.body);
  res.status(201).send(obj);
});
module.exports = {
  getAllvideos,
  getVideoById,
  addNewVideo,
  updateView,
  updateVotes,
};
