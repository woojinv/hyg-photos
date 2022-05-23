import React from "react";
import { Image } from "semantic-ui-react";

export default function EventInfo({
  title,
  description,
  location,
  date,
  photoUrl,
  id,
}) {
  return (
    <>
      <h1>Event Info for {title}</h1>
      <p>description: {description}</p>
      <p>location: {location}</p>
      <p>date: {date}</p>
      <Image src={photoUrl} />
    </>
  );
}
