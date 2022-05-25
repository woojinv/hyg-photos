import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

// bootstrap
import Card from "react-bootstrap/Card";

export default function EventCard({ event, user, deleteEvent }) {
  function handleClick(e) {
    const eventId = e.target.attributes[0].value;
    deleteEvent(eventId);
  }

  if (user) {
    return (
      <Card style={{ width: "18rem" }}>
        <Link className="card-link" to={`/${event.title}`}>
          <Card.Img variant="top" src={event.photoUrl} />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.description}</Card.Text>
          </Card.Body>
        </Link>
      </Card>

      // <Card>
      //   <Link to={`/${event.title}`}>
      //     <Image src={event.photoUrl} />
      //     <Card.Content>
      //       <Card.Description>{event.title}</Card.Description>
      //     </Card.Content>
      //   </Link>
      //   {event.user._id === user._id ? (
      //     <Icon name="delete" onClick={handleClick} eventid={event._id} />
      //   ) : null}
      // </Card>
    );
  }

  return (
    <Card>
      <Link to={`/${event.title}`}>
        <Image src={event.photoUrl} />
        <Card.Content>
          <Card.Description>{event.title}</Card.Description>
        </Card.Content>
      </Link>
    </Card>
  );
}
