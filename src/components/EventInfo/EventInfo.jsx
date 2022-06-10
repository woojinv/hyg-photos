import React, { useState } from "react";
import PhotoModal from "../PhotoModal/PhotoModal";

// framer-motion
import { motion } from "framer-motion";

// CSS
import "../../pages/ViewEventPage/ViewEventPage.css";

// Bootstrap
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
      {" "}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Card
          className="bg-dark text-white shadow-2-strong"
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
            <Card.Title className="event-info-date">{date}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.ImgOverlay>
        </Card>
      </motion.div>
      <PhotoModal
        show={modalShow}
        photo={photoUrl}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
