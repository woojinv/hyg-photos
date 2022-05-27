import React from "react";
import PhotoCard from "../PhotoCard/PhotoCard";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function PhotoGallery({ photos, user, deletePhoto }) {
  return (
    <Container>
      <Row>
        {photos.map((photo, i) => {
          return (
            <Col className="photos-column">
              <PhotoCard
                photo={photo}
                key={i}
                user={user}
                deletePhoto={deletePhoto}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
