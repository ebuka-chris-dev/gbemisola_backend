const express = require("express");
const router = express.Router();
const {
  getAllNews,
  createNews,
  getSingleNews,
  updateNews,
  deleteNews
} = require("./controller");

router.post("/create", async (req, res) => {
  try {
    const News = await createNews(req.body);
    res.json({
      status: "SUCCESS",
      message: "News created",
      data: News,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
})
router.get("/all", async (req, res) => {
  try {
    const News = await getAllNews();
  
    res.json({
      status: "SUCCESS",
      data:News
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.get("/single/:NewsId", async (req, res) => {
  try {
    const News = await getSingleNews(req.params.NewsId);
  
    res.json({
      status: "SUCCESS",
      data:News
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

router.put("/update/:id" , async (req, res) => {
  try {
    const response = await updateNews(req.params.id, req.body);

    res.json({
      status: "SUCCESS",
      message: "News Updated",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

router.delete("/delete/:NewsId", async (req, res) => {
  try {
    const News = await deleteNews(req.params.NewsId);
  
    res.json({
      status: "SUCCESS",
      mesage:"Delete successfully"
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

module.exports = router;
