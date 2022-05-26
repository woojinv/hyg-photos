import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

// bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function EventCard({ event, user, deleteEvent }) {
  function handleClick(e) {
    const eventId = e.target.attributes[0].value;
    deleteEvent(eventId);
  }

  if (user) {
    return (
      <Card style={{ width: "20rem", marginBottom: "1rem" }}>
        <Link className="card-link" to={`/${event.title}`}>
          <Card.Img variant="top" src={event.photoUrl} />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.description}</Card.Text>
            {event.user._id === user._id ? (
              <Button variant="outline-danger">Delete</Button>
            ) : null}
          </Card.Body>
        </Link>
      </Card>
    );
  }

  return (
    <Card style={{ width: "18rem", marginBottom: "1rem" }}>
      <Link className="card-link" to={`/${event.title}`}>
        <Card.Img variant="top" src={event.photoUrl} />
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Text>{event.description}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}
