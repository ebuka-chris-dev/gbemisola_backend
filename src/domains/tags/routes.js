const express = require("express");
const router = express.Router();
const {
  getAllTag,
  createTag,
  getSingleTag,
  updateTag,
  deleteTag
} = require("./controller");

router.post("/create", async (req, res) => {
  try {
    const tag = await createTag(req.body);
    res.json({
      status: "SUCCESS",
      message: "tag created",
      data: tag,
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
    const tag = await getAllTag();
  
    res.json({
      status: "SUCCESS",
      data:tag
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.get("/single/:tagId", async (req, res) => {
  try {
    const tag = await getSingleTag(req.params.tagId);
  
    res.json({
      status: "SUCCESS",
      data:tag
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
    const response = await updateTag(req.params.id, req.body);

    res.json({
      status: "SUCCESS",
      message: "tag Updated",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

router.delete("/delete/:tagId", async (req, res) => {
  try {
    const tag = await deleteTag(req.params.tagId);
  
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
router.delete("/delete/:id", async (req, res) => {
  try {
    const response = await deleteTag(req.params.id);

    res.json({
      status: "SUCCESS",
      message: "Tag deleted",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

module.exports = router;
