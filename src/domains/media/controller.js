const Media = require("./model");

const createMedia = async (data) => {
  const { file, title, description,mediaType} = data;
  try {
    const media = new Media({
      file,
     title,
     description,
     mediaType
    });
    await media.save();
    return media;
  } catch (err) {
    throw err;
  }
};
const getAllMedia = async () => {
  try {
    const media = await Media.find();

    return media;
  } catch (err) {
    console.log(err);
  }
};

const getSingleMedia = async (_id) => {
  try {
    const media = await Media.findOne({_id});

    return media;
  } catch (err) {
    console.log(err);
  }
};
// update user
const updateMedia = async (mediaId, data) => {
  try {
    const media = await Media.updateOne({ _id: mediaId }, data);
    return media;
  } catch (err) {
    throw err;
  }
};
//delete
const deleteMedia = async (mediaId) => {
  try {
    const media = await Media.deleteOne({ _id: mediaId });
    return {
      media,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createMedia,
  getAllMedia,
  getSingleMedia,
  updateMedia,
  deleteMedia
};
