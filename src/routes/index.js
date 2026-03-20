
const express = require("express");
const router = express.Router();

const userRoutes = require("../domains/user");
const newsRoutes = require("../domains/news");
const mediaRoutes = require("../domains/media");
const tagsRoutes = require("../domains/tags");
const emailRoutes = require("../domains/email");
const sokotoRegistrationRoutes = require("../domains/sokoto-registration");

router.use("/user", userRoutes);
router.use("/news", newsRoutes);
router.use("/media", mediaRoutes);
router.use("/tags", tagsRoutes);
router.use("/email", emailRoutes);
router.use("/sokoto/registrations", sokotoRegistrationRoutes);







module.exports = router;