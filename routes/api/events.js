const express = require("express");
const router = express.Router();
const eventsCtrl = require("../../controllers/events");
const multer = require("multer");
const upload = multer();

router.post("/", upload.single("photo"), eventsCtrl.create);
router.get("/:eventId", eventsCtrl.getEvent);
router.get("/", eventsCtrl.index);
router.delete("/:eventId", eventsCtrl.deleteEvent);
router.put("/:eventTitle/edit", eventsCtrl.editEvent);

module.exports = router;
