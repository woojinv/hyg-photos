import React from "react";
import { Card, Image } from "semantic-ui-react";

export default function PhotoCard({ photo }) {
  return (
    <Card>
      <Image src={photo.photoUrl} />
    </Card>
  );
}
