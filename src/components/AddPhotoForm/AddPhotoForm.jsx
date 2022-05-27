import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AddPhotoForm({ handleAddPhoto, title }) {
  const [selectedFile, setSelectedFile] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("eventTitle", title);
    handleAddPhoto(formData);
  }

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
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
