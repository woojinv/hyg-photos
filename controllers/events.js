const Event = require("../models/event");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3();

module.exports = {
  create,
  index,
  getEvent,
};

async function create(req, res) {
  try {
    const filePath = `${uuidv4()}/${req.file.originalname}`;
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filePath,
      Body: req.file.buffer,
    };
    s3.upload(params, async function (err, data) {
      console.log(err, "<- from aws");
      const event = await Event.create({
        user: req.user,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        photoUrl: data.Location,
      });
      await event.populate("user");

      res.status(201).json({ event: event });
    });
  } catch (err) {
    console.log(err, "<- this is err from events create controller");
    res.json({ data: err });
  }
}

async function index(req, res) {
  try {
    const events = await Event.find({}).populate("user").exec();
    res.status(200).json({ events });
  } catch (err) {
    console.log(err, "<- err from events index controller");
  }
}

async function getEvent(req, res) {
  try {
    const event = await Event.findOne({ title: req.params.eventTitle });
    if (!event) return res.status(404).json({ err: "Event not found" });
    res.status(200).json({ event: event });
  } catch (err) {
    console.log(err, "<- this is err from getEvent controller");
    res.status(400).json({ err });
  }
}
