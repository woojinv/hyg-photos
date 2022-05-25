import React from "react";
import EventCard from "../EventCard/EventCard";
import { Grid, Image } from "semantic-ui-react";

// React bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function EventGallery({ events, user, deleteEvent }) {
  return (
    <Container>
      <Row>
        {events.map((event, i) => {
          return (
            <Col>
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
