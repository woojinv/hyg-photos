const express = require("express");
const router = express.Router();
const photosCtrl = require("../../controllers/photos.js");
const multer = require("multer");
const upload = multer();

router.post("/events/:eventTitle/photos", photosCtrl.create);
