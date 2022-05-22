const express = require("express");
const router = express.Router();
const eventsCtrl = require("../../controllers/events");
const multer = require("multer");
const upload = multer();

router.post("/", upload.single("photo"), eventsCtrl.create);
router.get("/", eventsCtrl.index);

module.exports = router;