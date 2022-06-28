const express = require("express");
const router = express.Router();
const photosCtrl = require("../../controllers/photos.js");
const multer = require("multer");
const upload = multer();

router.post(
  "/events/:eventId/photos",
  upload.array("photo"),
  photosCtrl.create
);
router.get("/events/:eventId/photos", photosCtrl.index);
router.delete("/photos/:photoId", photosCtrl.deletePhoto);

module.exports = router;
