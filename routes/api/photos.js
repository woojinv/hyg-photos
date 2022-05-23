const express = require("express");
const router = express.Router();
const photosCtrl = require("../../controllers/photos.js");
const multer = require("multer");
const upload = multer();

router.post(
  "/events/:eventTitle/photos",
  upload.single("photo"),
  photosCtrl.create
);
router.get("/events/:eventTitle/photos", photosCtrl.index);

module.exports = router;
