const Photo = require("../models/photo");
const Event = require("../models/event");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3();
module.exports = { create };

async function create(req, res) {
  console.log("create controller for photos hit");
  console.log(req.body, "<- this is req.body");
  console.log(req.user, "<- this is req.user");
  console.log(req.file, "<- this is req.file");

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
      });
      console.log(
        photo,
        "<- this is the created photo from the create controller"
      );
      await photo.populate("user");
      await photo.populate("event");
      res.status(201).json({ photo: photo });
    });
  } catch (err) {
    console.log(err);
    res.json({ data: err });
  }
}
