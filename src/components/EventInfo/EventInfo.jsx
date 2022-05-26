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
      <Card.ImgOverlay>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Location: {location}</Card.Text>
        <Card.Text>Date: {date}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}
