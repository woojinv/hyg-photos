import React from "react";
import PhotoCard from "../PhotoCard/PhotoCard";

// framer-motion
import { motion } from "framer-motion";

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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, ease: "easeInOut", duration: 1 }}
              >
                <PhotoCard
                  photo={photo}
                  key={i}
                  user={user}
                  deletePhoto={deletePhoto}
                />
              </motion.div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
