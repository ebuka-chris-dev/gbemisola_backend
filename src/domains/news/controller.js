const News = require("./model");

const createNews = async (data) => {
  const { image,title,description,tags} = data;
  try {
    const news = new News({
      image,
      tags,
    title,
    description
    });
    await news.save();
    return news;
  } catch (err) {
    throw err;
  }
};
const getAllNews = async () => {
  try {
    const news = await News.find();

    return news;
  } catch (err) {
    console.log(err);
  }
};

const getSingleNews = async (_id) => {
  try {
    const news = await News.findOne({_id});

    return news;
  } catch (err) {
    console.log(err);
  }
};
// update user
const updateNews = async (newsId, data) => {
  try {
    const news = await News.updateOne({ _id: newsId }, data);
    return news;
  } catch (err) {
    throw err;
  }
};
//delete
const deleteNews = async (newsId) => {
  try {
    const news = await News.deleteOne({ _id: newsId });
    return {
      news,
    };
  } catch (err) {
    throw err;
  }
};
module.exports = {
  createNews,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews
};
