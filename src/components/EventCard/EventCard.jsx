import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
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
