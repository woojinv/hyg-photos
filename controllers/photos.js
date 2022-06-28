const Photo = require("../models/photo");
const Event = require("../models/event");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3();
module.exports = { create, index, deletePhoto };

async function create(req, res) {
  console.log(req.files, "<- this is req.files");
  console.log(req.body, "<- this is req.body");
  try {
    const event = await Event.findOne({ _id: req.body.event });
    const photosArr = [];
    for (let i = 0; i < req.files.length; i++) {
      const filePath = `${uuidv4()}/${req.files[i].originalname}`;
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filePath,
        Body: req.files[i].buffer,
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
        photosArr.push(photo);
      });
    }

    await res.status(201).json({ photosArr });
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
