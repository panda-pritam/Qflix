
let videoRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/embed\/|youtu\.be\/)[a-zA-Z0-9_-]+$/;
let imgRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/;
const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
  };
let checkLink= (value, helpers) => {
  if (!value.match(videoRegex)) {
    return helpers.message('"{{#label}}"Invalid YouTube video format. It should be in the format https:www.youtube.com/embed/<youtube-video-id> or youtube.com/embed/<youtube-video-id>"');
  }
  return value;
};

let checkImageLink=(value, helpers) => {
  if (!value.match(imgRegex)) {
    return helpers.message('"{{#label}}"Invalid image Link."');
  }
  return value;
};


module.exports={objectId,checkLink,checkImageLink}