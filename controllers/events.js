const Event = require("../models/event");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3();

module.exports = {
  create,
  index,
  getEvent,
  deleteEvent,
  editEvent,
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

async function deleteEvent(req, res) {
  console.log(req.params.eventId, "<- this is req.params.eventId");
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.eventId });
    res.status(200).json({ event });
  } catch (err) {
    console.log(err, "<- this is err from deleteEvent controller");
  }
}

async function editEvent(req, res) {
  try {
    const event = await Event.findOne({ title: req.body.previousTitle });
    console.log(event, "<- this is event");
    event.title = req.body.title;
    event.description = req.body.description;
    event.location = req.body.location;
    event.date = req.body.date;
    event.save();
    res.status(200).json({ event });
    console.log(event, "<- this should have a new title");
  } catch (err) {
    console.log(err, "<- this is err from editEvent controller");
  }
}
