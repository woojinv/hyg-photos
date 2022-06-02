import React from "react";
import { Link } from "react-router-dom";

// CSS
import "../../pages/EventsPage/EventsPage.css";

// Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function EventCard({ event, user, deleteEvent }) {
  function handleClick(e) {
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
        <Link className="card-link" to={`/${event._id}`}>
          <Card.Img
            variant="top"
            src={event.photoUrl}
            style={{ height: 200, objectFit: "cover" }}
          />
        </Link>
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Link className="card-link" to={`/${event._id}`}>
            <Card.Title className="event-card-title">{event.title}</Card.Title>
            <Card.Text>{event.date}</Card.Text>
          </Link>
          <br />
          {event.user._id === user._id || user.username === "superuser" ? (
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
      <Link className="card-link" to={`/${event._id}`}>
        <Card.Img
          variant="top"
          src={event.photoUrl}
          style={{ height: 200, objectFit: "cover" }}
        />
      </Link>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Link className="card-link" to={`/${event._id}`}>
          <Card.Title className="event-card-title">{event.title}</Card.Title>
          <Card.Text>{event.date}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
}
