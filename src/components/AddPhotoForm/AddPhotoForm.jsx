import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AddPhotoForm({ handleAddPhoto, eventId }) {
  const [selectedFiles, setSelectedFiles] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    // console.log(selectedFiles, "<- this is selectedFiles");
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("photo", selectedFiles[i]);
    }
    formData.append("event", eventId);

    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${typeof pair[1]}`, "<- this is formData");
    // }
    handleAddPhoto(formData);
  }

  function handleFileInput(e) {
    // console.log(e.target.files, "<- this is e.target.files");
    setSelectedFiles(e.target.files);
  }

  return (
    <Form.Group
      autoComplete="off"
      controlId="formFile"
      className="mb-3"
      style={{ maxWidth: 450 }}
    >
      <Form.Control
        className="form-control"
        type="file"
        name="photo"
        onChange={handleFileInput}
        multiple
      />

      <Button
        as="input"
        type="submit"
        value="Submit"
        onClick={handleSubmit}
        style={{ marginTop: "1rem" }}
      />
    </Form.Group>
  );
}
