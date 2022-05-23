const Photo = require("../models/photo");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3();
module.exports = { create };

async function create(req, res) {
  console.log("create controller for photos hit");
  console.log(
    req.body,
    "<- this is req.body",
    req.params,
    "<- this is req.params",
    req.file,
    "<- this is req.file"
  );
}
