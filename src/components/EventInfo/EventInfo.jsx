import React, { useState } from "react";
import PhotoModal from "../PhotoModal/PhotoModal";

// bootstrap
import Card from "react-bootstrap/Card";

export default function EventInfo({
  title,
  description,
  location,
  date,
  photoUrl,
  id,
}) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Card
        className="bg-dark text-white shadow-5-strong"
        onClick={() => setModalShow(true)}
      >
        <Card.Img
          src={photoUrl}
          alt={"Picture of" + title}
          style={{ opacity: 0.2, maxHeight: 400, objectFit: "cover" }}
        />
        <Card.ImgOverlay
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            cursor: "pointer",
          }}
        >
          <Card.Title>{date}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.ImgOverlay>
      </Card>

      <PhotoModal
        show={modalShow}
        photo={photoUrl}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
