import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

export default function EventCard({ event }) {
  return <Image src={event.photoUrl} />;
}
