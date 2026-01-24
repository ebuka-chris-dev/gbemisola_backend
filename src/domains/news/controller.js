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
const getAllNews = async (page, limit, res) => {
  const skip = (page - 1) * limit;

  try {
    const [news, total] = await Promise.all([
      News.find()
        .sort({ createdAt: -1 }) // newest first
        .skip(skip)
        .limit(limit),
      News.countDocuments()
    ]);

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
      data: news
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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
