import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function EventCard({ event, user, deleteEvent }) {
  console.log(event.user._id, "this is event");
  function handleClick(e) {
    deleteEvent();
  }
  return (
    <Card>
      <Link to={`/${event.title}`}>
        <Image src={event.photoUrl} />
        <Card.Content>
          <Card.Description>{event.title}</Card.Description>
        </Card.Content>
      </Link>
      {event.user._id === user._id ? (
        <Icon name="delete" onClick={handleClick} eventid={event._id} />
      ) : null}
    </Card>
  );
}
