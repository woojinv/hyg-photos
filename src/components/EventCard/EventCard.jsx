import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <Link to={`/${event.title}`}>
      <Image src={event.photoUrl} />
    </Link>
  );
}
