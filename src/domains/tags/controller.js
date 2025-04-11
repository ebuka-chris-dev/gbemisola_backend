const Tag = require("./model");

const createTag = async (data) => {
  const { name } = data;
  try {
    const existingTag = await Tag.findOne({ name }); // Await the result
    if (existingTag) {
      throw new Error("Tag with the same name already exists");
    }

    const tag = new Tag({ name });
    await tag.save();

    return tag;
  } catch (err) {
    throw err;
  }
};

const getAllTag = async  (page,limit,res) => {
  const skip = (page - 1) * limit;
  try {
    const tags = await Tag.find().skip(skip).limit(limit);
    const total = await Tag.countDocuments();

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
      data: tags,
    });}
     catch (err) {
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
    const existingTag = await Tag.findOne({ name:data.name }); // Await the result
    if (existingTag) {
      throw new Error("Tag with the same name already exists");
    }
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
