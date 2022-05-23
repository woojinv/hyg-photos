import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";

export default function PhotoCard({ photo, user }) {
  function deletePhoto(e) {
    console.log("deletePhoto function hit");
  }

  if (user) {
    return (
      <Card>
        <Image src={photo.photoUrl} />

        {photo.user === user._id ? (
          <Icon name="delete" onClick={deletePhoto} />
        ) : null}
      </Card>
    );
  }

  return (
    <Card>
      <Image src={photo.photoUrl} />
    </Card>
  );
}
