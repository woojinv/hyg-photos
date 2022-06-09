import React from "react";
import EventCard from "../EventCard/EventCard";

import { motion } from "framer-motion";

// React bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function EventGallery({ events, user, deleteEvent }) {
  return (
    <Container className="events-container">
      <Row>
        {events.map((event, i) => {
          return (
            <Col className="events-column">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, ease: "easeInOut", duration: 1 }}
              >
                <EventCard
                  event={event}
                  key={i}
                  user={user}
                  deleteEvent={deleteEvent}
                />
              </motion.div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
