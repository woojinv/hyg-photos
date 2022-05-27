import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "../../pages/EventsPage/EventsPage.css";
// bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function EventCard({ event, user, deleteEvent }) {
  function handleClick(e) {
    console.log(e.target.attributes, "<- this is e.target");
    e.stopPropagation();
    const eventId = e.target.attributes[1].value;
    deleteEvent(eventId);
  }

  if (user) {
    return (
      <Card
        style={{ width: "20rem", marginBottom: "1rem" }}
        className="shadow-1-strong"
      >
        <Link className="card-link" to={`/${event.title}`}>
          <Card.Img variant="top" src={event.photoUrl} />
        </Link>
        <Card.Body>
          <Link className="card-link" to={`/${event.title}`}>
            <Card.Title className="event-card-title">{event.title}</Card.Title>
          </Link>
          <br />
          {event.user._id === user._id ? (
            <Button
              id={event._id}
              variant="outline-danger"
              onClick={handleClick}
            >
              Delete
            </Button>
          ) : null}
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card
      style={{ width: "20rem", marginBottom: "1rem" }}
      className="shadow-1-strong"
    >
      <Link className="card-link" to={`/${event.title}`}>
        <Card.Img variant="top" src={event.photoUrl} />
        <Card.Body>
          <Card.Title className="event-card-title">{event.title}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
}
