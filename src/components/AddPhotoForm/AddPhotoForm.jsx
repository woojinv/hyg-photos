import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

export default function AddPhotoForm({ handleAddPhoto }) {
  const [selectedFile, setSelectedFile] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", selectedFile);
    handleAddPhoto(formData);
  }

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <Form.Input
        className="form-control"
        type="file"
        name="photo"
        placeholder="upload image"
        onChange={handleFileInput}
      />
      <Button type="submit" className="btn">
        Add Photo
      </Button>
    </Form>
  );
}
