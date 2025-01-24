const express = require("express");
const {
  createNewUser,
  getAllUser,
  deleteUser,
  loginUser,
  forgetPassword,
  updatePassword,
  updateUser,
  getSingleUser,
  findUserById,
} = require("./controller");
const router = express.Router();
//signup

router.post("/register", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    email = email.trim();
    email = email.toLowerCase();
    password = password.trim();

    if (email == "") {
      throw Error("Empty input fields!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Invalid email entered");
    } else if (password.length < 6) {
      throw Error("Password is too short!");
    } else {
      // valid credentials
      // const subject = "Verify Email";
      const newUser = await createNewUser({
        username,
        email,
        password
      });
      res.json({
        status: "SUCCESS",
        message: "Signup Successful",
        data:newUser
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// signin
router.post("/signin", async (req, res) => {
  try {
    const response = await loginUser(req.body, res);
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// all user
router.get("/all", async (req, res) => {
  try {
    const allusers = await getAllUser();
    res.json({
      status: "SUCCESS",
      data: allusers,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// single user
router.get("/single/:id",async (req, res) => {
  try {
    const response = await getSingleUser(req.params.id);
    res.json({
      status: "SUCCESS",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// get users by Id
router.get("/find/:userId",async (req, res) => {
  try {
    const response = await findUserById(req.params.userId);
    res.json({
      status: "SUCCESS",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// forget password
router.post("/forget-password", async (req, res) => {
  try {
    const response = await forgetPassword(req.body);
    res.json({
      status: "SUCCESS",
      message: "Mail has been sent, check your email for otp",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.post("/update-password", async (req, res) => {
  try {
    const { password } = req.body;
    if (password.length < 6) {
      throw Error("Password is too short!");
    }
    const response = await updatePassword(req.body);
    res.json({
      status: "SUCCESS",
      message: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// update user
router.put("/update/:id" , async (req, res) => {
  try {
    const response = await updateUser(req.params.id, req.body);

    res.json({
      status: "SUCCESS",
      message: "User Updated",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    const response = await deleteUser(req.params.id);

    res.json({
      status: "SUCCESS",
      message: "User deleted",
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
