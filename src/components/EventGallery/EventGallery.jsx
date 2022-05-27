import React from "react";
import EventCard from "../EventCard/EventCard";

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
              <EventCard
                event={event}
                key={i}
                user={user}
                deleteEvent={deleteEvent}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
