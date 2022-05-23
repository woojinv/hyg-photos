import React from "react";
import { Card, Image } from "semantic-ui-react";

export default function PhotoCard({ photo }) {
  console.log(photo, "<this is photo for PhotoCard");
  return (
    <Card>
      <Image src={photo.photoUrl} />
    </Card>
  );
}
