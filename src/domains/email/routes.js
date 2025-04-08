const express = require("express");
const router = express.Router();
const {
  getAllEmail,
  createEmail,
  getSingleEmail,
  updateEmail,
  deleteEmail
} = require("./controller");

router.post("/create", async (req, res) => {
  try {
    const Email = await createEmail(req.body);
    res.json({
      status: "SUCCESS",
      message: "Email created",
      data: Email,
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
    const Email = await getAllEmail();
  
    res.json({
      status: "SUCCESS",
      data:Email
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.get("/single/:emailId", async (req, res) => {
  try {
    const Email = await getSingleEmail(req.params.emailId);
  
    res.json({
      status: "SUCCESS",
      data:Email
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
    const response = await updateEmail(req.params.id, req.body);

    res.json({
      status: "SUCCESS",
      message: "Email Updated",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

router.delete("/delete/:emailId", async (req, res) => {
  try {
    const Email = await deleteEmail(req.params.emailId);
  
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
    const response = await deleteEmail(req.params.id);

    res.json({
      status: "SUCCESS",
      message: "Email deleted",
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
