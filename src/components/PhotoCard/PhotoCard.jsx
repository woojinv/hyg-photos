import React, { useState } from "react";
import { Image, Icon } from "semantic-ui-react";
import PhotoModal from "../PhotoModal/PhotoModal";

// bootstrap
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function PhotoCard({ photo, user, deletePhoto }) {
  const [modalShow, setModalShow] = useState(false);
  function handleClick(e) {
    console.log(e.target.attributes, "attributes");
    const photoId = e.target.attributes[1].value;
    deletePhoto(photoId);
  }

  if (user) {
    return (
      <>
        <Card style={{ width: "40rem" }}>
          <Card.Img variant="top" src={photo.photoUrl} />
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {photo.user === user._id ? (
              <Button
                variant="outline-danger"
                onClick={handleClick}
                photoid={photo._id}
              >
                Delete
              </Button>
            ) : null}
          </Card.Body>
        </Card>

        <PhotoModal show={modalShow} onHide={() => setModalShow(false)} />
      </>
    );
  }

  return (
    <Card style={{ width: "40rem", marginBottom: "1rem", MarginTop: "1rem" }}>
      <Card.Img variant="top" src={photo.photoUrl} />
    </Card>
  );
}
