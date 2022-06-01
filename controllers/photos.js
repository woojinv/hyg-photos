const Photo = require("../models/photo");
const Event = require("../models/event");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3();
module.exports = { create, index, deletePhoto };

async function create(req, res) {
  try {
    const event = await Event.findOne({ _id: req.body.event });
    const filePath = `${uuidv4()}/${req.file.originalname}`;
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filePath,
      Body: req.file.buffer,
    };
    s3.upload(params, async function (err, data) {
      console.log(err, "<- from aws");
      const photo = await Photo.create({
        photoUrl: data.Location,
        user: req.user,
        event: event,
      });

      await photo.populate("user");
      await photo.populate("event");
      res.status(201).json({ photo: photo });
    });
  } catch (err) {
    console.log(err);
    res.json({ data: err });
  }
}

async function index(req, res) {
  try {
    const photos = await Photo.find({ event: req.params.eventId }).sort({
      createdAt: "desc",
    });
    res.status(200).json({ photos });
  } catch (err) {
    console.log(err);
    res.json({ data: err });
  }
}

async function deletePhoto(req, res) {
  console.log(req.params.photoId, "<- this is req.params.photoId");
  console.log("delete photo controller hit");
  try {
    const photo = await Photo.findOneAndDelete({ _id: req.params.photoId });
    res.status(200).json({ photo });
  } catch (err) {
    console.log(err, "this is err from deletePhoto controller");
    res.json({ data: err });
  }
}
