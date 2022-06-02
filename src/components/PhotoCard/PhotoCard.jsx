import React, { useState } from "react";
import PhotoModal from "../PhotoModal/PhotoModal";

// Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function PhotoCard({ photo, user, deletePhoto }) {
  const [modalShow, setModalShow] = useState(false);
  function handleClick(e) {
    const photoId = e.target.attributes[1].value;
    deletePhoto(photoId);
  }

  if (user) {
    return (
      <>
        <Card
          className="shadow-3-strong"
          style={{
            width: "40rem",
            marginBottom: "1rem",
            MarginTop: "1rem",
            cursor: "pointer",
          }}
          onClick={() => setModalShow(true)}
        >
          <Card.Img
            variant="top"
            src={photo.photoUrl}
            style={{ height: 400, objectFit: "cover" }}
          />
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {photo.user === user._id || user.username === "superuser" ? (
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

        <PhotoModal
          show={modalShow}
          photo={photo.photoUrl}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }

  return (
    <>
      <Card
        className="shadow-3-strong"
        style={{
          width: "40rem",
          marginBottom: "1rem",
          MarginTop: "1rem",
          cursor: "pointer",
        }}
        onClick={() => setModalShow(true)}
      >
        <Card.Img
          variant="top"
          src={photo.photoUrl}
          style={{ height: 400, objectFit: "cover" }}
        />
      </Card>
      <PhotoModal
        show={modalShow}
        photo={photo.photoUrl}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
