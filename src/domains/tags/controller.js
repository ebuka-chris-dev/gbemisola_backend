const Tag = require("./model");

const createTag = async (data) => {
  const { name} = data;
  try {
    const tag = new Tag({
      name
    });
    await tag.save();
    return tag;
  } catch (err) {
    throw err;
  }
};
const getAllTag = async () => {
  try {
    const tag = await Tag.find();

    return tag;
  } catch (err) {
    console.log(err);
  }
};

const getSingleTag = async (_id) => {
  try {
    const tag = await Tag.findOne({_id});

    return tag;
  } catch (err) {
    console.log(err);
  }
};
// update user
const updateTag = async (tagId, data) => {
  try {
    const tag = await Tag.updateOne({ _id: tagId }, data);
    return tag;
  } catch (err) {
    throw err;
  }
};
//delete
const deleteTag = async (tagId) => {
  try {
    const tag = await Tag.deleteOne({ _id: tagId });
    return {
      tag,
    };
  } catch (err) {
    throw err;
  }
};
module.exports = {
  createTag,
  getAllTag,
  getSingleTag,
  updateTag,
  deleteTag
};
