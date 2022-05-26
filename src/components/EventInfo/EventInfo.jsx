import React from "react";

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
  return (
    <Card className="bg-dark text-white">
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
        }}
      >
        <Card.Title>{date}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}
