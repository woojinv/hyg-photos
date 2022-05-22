const Event = require("../models/event");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3();

module.exports = {
  create,
};

function create(req, res) {
  console.log("create controller hit");
}
