const express = require("express");
const router = express.Router();
const {
  getAllMedia,
  createMedia,
  getSingleMedia,
  updateMedia,
  deleteMedia,
} = require("./controller");

router.post("/create", async (req, res) => {
  try {
    const media = await createMedia(req.body);
    res.json({
      status: "SUCCESS",
      message: "Media created",
      data: media,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
})
router.get("/all", async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  try {
     await getAllMedia(page,limit,res);

  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.get("/single/:mediaId", async (req, res) => {
  try {
    const media = await getSingleMedia(req.params.mediaId);
  
    res.json({
      status: "SUCCESS",
      data:media
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
    const response = await updateMedia(req.params.id, req.body);

    res.json({
      status: "SUCCESS",
      message: "Media Updated",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.delete("/delete/:mediaId", async (req, res) => {
  try {
    const News = await deleteMedia(req.params.mediaId);
  
    res.json({
      status: "SUCCESS",
      mesage:"Deleted successfully"
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
module.exports = router;
