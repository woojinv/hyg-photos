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
  console.log('hit index');
  try {
    const events = await Event.find({})
      .sort({ date: "desc" })
      .populate("user")
      .exec();

    res.status(200).json({ events });
  } catch (err) {
    console.log(err, "<- err from events index controller");
  }
}

async function getEvent(req, res) {
  try {
    const event = await Event.findOne({ _id: req.params.eventId });
    if (!event)
      return res
        .status(404)
        .json({ err: "Event not found! Please refresh and try again" });
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
  // if a new cover photo was not selected:
  if (!req.file) {
    try {
      const event = await Event.findOne({ _id: req.body._id });
      event.title = req.body.title;
      event.description = req.body.description;
      event.location = req.body.location;
      event.date = req.body.date;
      event.save();
      res.status(200).json({ event });
    } catch (err) {
      console.log(err, "<- this is err from editEvent controller");
    }
  }

  // if a new cover photo WAS selected:
  else {
    try {
      const filePath = `${uuidv4()}/${req.file.originalname}`;
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filePath,
        Body: req.file.buffer,
      };
      s3.upload(params, async function (err, data) {
        console.log(req.user, "<- this is req.user");

        console.log(err, "<- from aws");
        const event = await Event.findOne({ _id: req.body._id });
        event.title = req.body.title;
        event.description = req.body.description;
        event.location = req.body.location;
        event.date = req.body.date;
        event.photoUrl = data.Location;
        event.save();
        console.log(event, "<- this is event");
        res.status(200).json({ event });
      });
    } catch (err) {
      console.log(err, "<- this is err from editEvent controller");
    }
  }
}
