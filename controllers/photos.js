const Photo = require("../models/photo");
const Event = require("../models/event");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3();
module.exports = { create, index };

async function create(req, res) {
  try {
    const event = await Event.findOne({ title: req.body.eventTitle });
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
        eventTitle: req.body.eventTitle,
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
    const photos = await Photo.find({ eventTitle: req.params.eventTitle });
    res.status(200).json({ photos });
  } catch (err) {
    console.log(err);
    res.json({ data: err });
  }
}
